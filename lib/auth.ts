import crypto from 'crypto';
import prisma from './prisma';

const SECRET = process.env.AUTH_SECRET || 'our-weekend-addis-secret-key-2026';

// Password Hashing
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(':');
    if (!salt || !key) return false;
    const keyBuffer = Buffer.from(key, 'hex');
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

// Lightweight secure tokens
export function createSessionToken(userId: string): string {
  const payload = JSON.stringify({ userId, exp: Date.now() + 30 * 24 * 60 * 60 * 1000 });
  const signature = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  return Buffer.from(payload).toString('base64url') + '.' + signature;
}

export function verifySessionToken(token: string): { userId: string } | null {
  try {
    const [encodedPayload, signature] = token.split('.');
    if (!encodedPayload || !signature) return null;

    const payloadStr = Buffer.from(encodedPayload, 'base64url').toString('utf8');
    const expectedSig = crypto.createHmac('sha256', SECRET).update(payloadStr).digest('hex');

    if (signature !== expectedSig) return null;

    const parsed = JSON.parse(payloadStr);
    if (parsed.exp < Date.now()) return null;

    return { userId: parsed.userId };
  } catch {
    return null;
  }
}

// Generate memorable 6-char couple invite code
export function generateCoupleInviteCode(): string {
  const words = ['ADDIS', 'LOVE', 'HEART', 'ROSE', 'BOLE', 'HABESHA'];
  const word = words[Math.floor(Math.random() * words.length)];
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${word}-${num}`;
}

export async function getUserFromReq(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const cookieHeader = req.headers.get('cookie') || '';

    let token: string | undefined;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      const match = cookieHeader.match(/couple_session=([^;]+)/);
      if (match) token = match[1];
    }

    if (!token) return null;
    const verified = verifySessionToken(token);
    if (!verified) return null;

    const user = await prisma.user.findUnique({
      where: { id: verified.userId },
      include: {
        coupleSpace: {
          include: {
            users: {
              select: { id: true, name: true, email: true, partnerNickname: true, avatar: true }
            }
          }
        }
      }
    });

    return user;
  } catch {
    return null;
  }
}
