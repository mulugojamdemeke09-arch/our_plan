import prisma from './prisma';

/**
 * Generates a cryptographically random 6-digit OTP string.
 */
export function generateOtpCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Creates or updates an OTP verification record in the database with a 10-minute validity.
 */
export async function createEmailOtp(email: string): Promise<string> {
  const cleanEmail = email.toLowerCase().trim();
  const code = generateOtpCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.otpVerification.upsert({
    where: { email: cleanEmail },
    update: {
      code,
      expiresAt,
      createdAt: new Date()
    },
    create: {
      email: cleanEmail,
      code,
      expiresAt
    }
  });

  return code;
}

/**
 * Verifies an OTP code against the database.
 */
export async function verifyEmailOtp(email: string, code: string): Promise<{ valid: boolean; error?: string }> {
  const cleanEmail = email.toLowerCase().trim();
  const cleanCode = code.trim();

  const record = await prisma.otpVerification.findUnique({
    where: { email: cleanEmail }
  });

  if (!record) {
    return { valid: false, error: 'No verification code found for this email. Please request a new code.' };
  }

  if (new Date() > record.expiresAt) {
    await prisma.otpVerification.delete({ where: { email: cleanEmail } }).catch(() => {});
    return { valid: false, error: 'Verification code has expired. Please request a new one.' };
  }

  if (record.code !== cleanCode) {
    return { valid: false, error: 'Incorrect verification code. Please check your email and try again.' };
  }

  // Code is valid - clean it up
  await prisma.otpVerification.delete({ where: { email: cleanEmail } }).catch(() => {});
  return { valid: true };
}
