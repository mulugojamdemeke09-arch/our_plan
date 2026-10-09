import { NextResponse } from 'next/server';
import { autoUpdateWeekendEvents } from '@/lib/notifications';
import { getPrismaEvents } from '@/lib/db';

export async function POST() {
  try {
    await autoUpdateWeekendEvents();
    const events = await getPrismaEvents();
    return NextResponse.json({ success: true, events, message: 'Weekend events synchronized to current calendar week' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
