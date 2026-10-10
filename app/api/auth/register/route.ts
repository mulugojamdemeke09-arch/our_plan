import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, createSessionToken, generateCoupleInviteCode } from '@/lib/auth';
import { createCoupleNotification } from '@/lib/notifications';
import { verifyEmailOtp } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, confirmPassword, name, partnerNickname, inviteCode, otpCode } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    if (confirmPassword && password !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match. Please verify both passwords match.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Verify OTP code if provided or required
    if (!otpCode) {
      return NextResponse.json({ error: 'Email verification code (OTP) is required' }, { status: 400 });
    }

    const otpResult = await verifyEmailOtp(cleanEmail, otpCode);
    if (!otpResult.valid) {
      return NextResponse.json({ error: otpResult.error || 'Invalid verification code' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
      include: { coupleSpace: true }
    });

    let user;
    let coupleSpace = existingUser?.coupleSpace;

    if (existingUser) {
      // User verified email ownership via OTP -> update password hash and verify account
      user = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          name: name.trim(),
          passwordHash: hashPassword(password),
          emailVerified: true,
          partnerNickname: partnerNickname?.trim() || existingUser.partnerNickname
        },
        include: { coupleSpace: true }
      });
      coupleSpace = user.coupleSpace;
    } else {
      // Brand new user registration
      if (inviteCode && inviteCode.trim()) {
        coupleSpace = await prisma.coupleSpace.findUnique({
          where: { inviteCode: inviteCode.trim().toUpperCase() }
        });
        if (!coupleSpace) {
          return NextResponse.json({ error: 'Invalid partner couple code. Check code or leave blank.' }, { status: 404 });
        }
      } else {
        coupleSpace = await prisma.coupleSpace.create({
          data: {
            name: `${name}'s Couple Sanctuary`,
            inviteCode: generateCoupleInviteCode(),
            favoriteVibe: 'Romantic & Cozy Coffee Dates'
          }
        });
      }

      user = await prisma.user.create({
        data: {
          email: cleanEmail,
          passwordHash: hashPassword(password),
          name: name.trim(),
          partnerNickname: partnerNickname?.trim() || null,
          emailVerified: true,
          coupleSpaceId: coupleSpace.id
        },
        include: { coupleSpace: true }
      });

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
    }

    const token = createSessionToken(user.id);
    const res = NextResponse.json({
      success: true,
      message: 'Account created and email verified successfully!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        partnerNickname: user.partnerNickname,
        avatar: user.avatar,
        emailVerified: true
      },
      coupleSpace,
      token
    });

    // Persistent cookie (30 days) to always remember account
    res.cookies.set('couple_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/'
    });

    return res;
  } catch (err: any) {
    console.error('Registration error:', err);
    return NextResponse.json({ error: err.message || 'Registration failed' }, { status: 500 });
  }
}
