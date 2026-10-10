import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

export function getDatabaseUrl(): string {
  // If a remote DATABASE_URL is provided, use it directly
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('file:')) {
    return process.env.DATABASE_URL;
  }

  // In Vercel / AWS Lambda serverless environments:
  const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
  if (isServerless) {
    const tmpDbPath = '/tmp/dev.db';
    if (!fs.existsSync(tmpDbPath)) {
      const srcPrisma = path.join(process.cwd(), 'prisma', 'dev.db');
      const srcRoot = path.join(process.cwd(), 'dev.db');
      if (fs.existsSync(srcPrisma)) {
        try { fs.copyFileSync(srcPrisma, tmpDbPath); } catch {}
      } else if (fs.existsSync(srcRoot)) {
        try { fs.copyFileSync(srcRoot, tmpDbPath); } catch {}
      }
    }
    return `file:${tmpDbPath}`;
  }

  // In local development / runtime:
  const prismaDb = path.join(process.cwd(), 'prisma', 'dev.db');
  const rootDb = path.join(process.cwd(), 'dev.db');

  if (fs.existsSync(prismaDb)) {
    return `file:${prismaDb}`;
  }
  if (fs.existsSync(rootDb)) {
    return `file:${rootDb}`;
  }

  return `file:${prismaDb}`;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
