import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { readDb } from '@/lib/db';

export async function GET() {
  try {
    const profile = await prisma.coupleProfile.findFirst();
    if (profile) {
      return NextResponse.json({ profile });
    }
    const db = await readDb();
    return NextResponse.json({ profile: db.profile });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const existing = await prisma.coupleProfile.findFirst();

    if (existing) {
      const updated = await prisma.coupleProfile.update({
        where: { id: existing.id },
        data: {
          partner1Name: body.partner1Name ?? existing.partner1Name,
          partner2Name: body.partner2Name ?? existing.partner2Name,
          anniversaryDate: body.anniversaryDate !== undefined ? body.anniversaryDate : existing.anniversaryDate,
          favoriteVibe: body.favoriteVibe !== undefined ? body.favoriteVibe : existing.favoriteVibe,
          reminderChannel: body.reminderChannel !== undefined ? body.reminderChannel : existing.reminderChannel
        }
      });
      return NextResponse.json({ success: true, profile: updated });
    } else {
      const created = await prisma.coupleProfile.create({
        data: {
          partner1Name: body.partner1Name || 'Me',
          partner2Name: body.partner2Name || 'My Partner',
          anniversaryDate: body.anniversaryDate || null,
          favoriteVibe: body.favoriteVibe || 'Romantic & Cozy Coffee Dates',
          reminderChannel: body.reminderChannel || 'in_app'
        }
      });
      return NextResponse.json({ success: true, profile: created });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
