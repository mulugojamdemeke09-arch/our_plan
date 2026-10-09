import { NextResponse } from 'next/server';
import { getUserFromReq } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getCoupleNotifications } from '@/lib/notifications';

export async function GET(req: Request) {
  try {
    const user = await getUserFromReq(req);

    if (!user) {
      // Check if there is a default couple space or user for smooth experience
      const defaultSpace = await prisma.coupleSpace.findUnique({
        where: { inviteCode: 'ADDIS-LOVE' },
        include: {
          users: {
            select: { id: true, name: true, email: true, partnerNickname: true, avatar: true }
          }
        }
      });

      return NextResponse.json({
        user: null,
        partner: null,
        coupleSpace: defaultSpace || null,
        notifications: [],
        unreadCount: 0
      });
    }

    const partner = user.coupleSpace?.users.find(u => u.id !== user.id) || null;
    const notificationData = user.coupleSpaceId 
      ? await getCoupleNotifications(user.coupleSpaceId)
      : { notifications: [], unreadCount: 0 };

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        partnerNickname: user.partnerNickname,
        avatar: user.avatar,
        coupleSpaceId: user.coupleSpaceId
      },
      partner,
      coupleSpace: user.coupleSpace,
      notifications: notificationData.notifications,
      unreadCount: notificationData.unreadCount
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
