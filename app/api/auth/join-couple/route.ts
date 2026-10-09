import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getUserFromReq } from '@/lib/auth';
import { createCoupleNotification } from '@/lib/notifications';

export async function POST(req: Request) {
  try {
    const user = await getUserFromReq(req);
    if (!user) {
      return NextResponse.json({ error: 'Please sign in first' }, { status: 401 });
    }

    const { inviteCode } = await req.json();
    if (!inviteCode || !inviteCode.trim()) {
      return NextResponse.json({ error: 'Invite code is required' }, { status: 400 });
    }

    const code = inviteCode.trim().toUpperCase();
    const space = await prisma.coupleSpace.findUnique({
      where: { inviteCode: code },
      include: {
        users: { select: { id: true, name: true, email: true } }
      }
    });

    if (!space) {
      return NextResponse.json({ error: 'Couple space not found with this code' }, { status: 404 });
    }

    if (space.users.length >= 2 && !space.users.some(u => u.id === user.id)) {
      return NextResponse.json({ error: 'This couple space already has 2 partners connected.' }, { status: 400 });
    }

    // Link user to this space
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { coupleSpaceId: space.id }
    });

    // Notify the space
    await createCoupleNotification({
      coupleSpaceId: space.id,
      actorId: user.id,
      actorName: user.name,
      title: 'Partner Connected! 💑',
      message: `${user.name} joined your couple date planner space!`,
      type: 'partner_joined'
    });

    return NextResponse.json({
      success: true,
      coupleSpace: space,
      user: updatedUser
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
