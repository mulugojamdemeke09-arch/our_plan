import { NextResponse } from 'next/server';
import { createEmailOtp } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const code = await createEmailOtp(cleanEmail);

    console.log(`[OTP DISPATCH] 📬 Code ${code} generated for ${cleanEmail} (${name || 'User'})`);

    return NextResponse.json({
      success: true,
      message: `A 6-digit confirmation code was sent to ${cleanEmail}`,
      otpPreview: code // Included for instant in-app notification preview
    });
  } catch (err: any) {
    console.error('Send OTP error:', err);
    return NextResponse.json({ error: err.message || 'Failed to send verification code' }, { status: 500 });
  }
}
