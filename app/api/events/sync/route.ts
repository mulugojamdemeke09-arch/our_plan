import { NextResponse } from 'next/server';
import { autoUpdateWeekendEvents } from '@/lib/notifications';
import { getPrismaEvents } from '@/lib/db';
import { filterActiveUpcomingEvents } from '@/lib/event-timing';

export async function POST() {
  try {
    await autoUpdateWeekendEvents();
    const rawEvents = await getPrismaEvents();
    const events = filterActiveUpcomingEvents(rawEvents, new Date());
    return NextResponse.json({ success: true, events, message: 'Weekend events synchronized to current calendar week' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
