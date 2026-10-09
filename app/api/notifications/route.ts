import { NextResponse } from 'next/server';
import { getUserFromReq } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getCoupleNotifications, markAllNotificationsRead } from '@/lib/notifications';

export async function GET(req: Request) {
  try {
    const user = await getUserFromReq(req);
    let coupleSpaceId = user?.coupleSpaceId;

    if (!coupleSpaceId) {
      // Find fallback space ADDIS-LOVE
      const space = await prisma.coupleSpace.findUnique({
        where: { inviteCode: 'ADDIS-LOVE' }
      });
      coupleSpaceId = space?.id;
    }

    if (!coupleSpaceId) {
      return NextResponse.json({ notifications: [], unreadCount: 0 });
    }

    const data = await getCoupleNotifications(coupleSpaceId);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getUserFromReq(req);
    let coupleSpaceId = user?.coupleSpaceId;

    if (!coupleSpaceId) {
      const space = await prisma.coupleSpace.findUnique({
        where: { inviteCode: 'ADDIS-LOVE' }
      });
      coupleSpaceId = space?.id;
    }

    if (!coupleSpaceId) {
      return NextResponse.json({ success: true });
    }

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      // empty body means mark all read
    }

    if (body.notificationId) {
      await prisma.notification.update({
        where: { id: body.notificationId },
        data: { read: true }
      });
    } else {
      await markAllNotificationsRead(coupleSpaceId);
    }

    const data = await getCoupleNotifications(coupleSpaceId);
    return NextResponse.json({ success: true, ...data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
