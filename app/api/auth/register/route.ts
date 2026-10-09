import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, createSessionToken, generateCoupleInviteCode } from '@/lib/auth';
import { createCoupleNotification } from '@/lib/notifications';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, partnerNickname, inviteCode } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Email, password, and name are required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 400 });
    }

    let coupleSpace;

    if (inviteCode && inviteCode.trim()) {
      // Find space by invite code
      coupleSpace = await prisma.coupleSpace.findUnique({
        where: { inviteCode: inviteCode.trim().toUpperCase() }
      });
      if (!coupleSpace) {
        return NextResponse.json({ error: 'Invalid couple invite code' }, { status: 404 });
      }
    } else {
      // Create fresh couple space
      coupleSpace = await prisma.coupleSpace.create({
        data: {
          name: `${name}'s Couple Sanctuary`,
          inviteCode: generateCoupleInviteCode(),
          favoriteVibe: 'Romantic & Cozy Coffee Dates'
        }
      });
    }

    const user = await prisma.user.create({
      data: {
        email: cleanEmail,
        passwordHash: hashPassword(password),
        name: name.trim(),
        partnerNickname: partnerNickname?.trim() || null,
        coupleSpaceId: coupleSpace.id
      }
    });

    // Notify couple if joined via invite code
    if (inviteCode) {
      await createCoupleNotification({
        coupleSpaceId: coupleSpace.id,
        actorId: user.id,
        actorName: user.name,
        title: 'Partner Joined! 💖',
        message: `${user.name} joined your couple date planner! You are now connected.`,
        type: 'partner_joined'
      });
    }

    const token = createSessionToken(user.id);
    const res = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, partnerNickname: user.partnerNickname },
      coupleSpace,
      token
    });

    res.cookies.set('couple_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
