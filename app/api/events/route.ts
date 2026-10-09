import { NextResponse } from 'next/server';
import { getPrismaEvents, createPrismaEvent } from '@/lib/db';
import { autoUpdateWeekendEvents, createCoupleNotification } from '@/lib/notifications';
import { getUserFromReq } from '@/lib/auth';
import { AddisEvent } from '@/lib/types';

export async function GET(req: Request) {
  try {
    // Self-update all weekend events dynamically based on current live calendar date
    await autoUpdateWeekendEvents();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const query = searchParams.get('q')?.toLowerCase() || undefined;

    const events = await getPrismaEvents(category, query);
    return NextResponse.json({ events });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getUserFromReq(req);
    const body = await req.json();

    const newEvent: AddisEvent = {
      id: body.id || `evt-${Date.now()}`,
      title: body.title,
      organizer: body.organizer || 'Addis Community',
      category: body.category || 'music',
      venue: body.venue || 'Addis Ababa',
      neighborhood: body.neighborhood || 'Bole',
      dayOfWeek: body.dayOfWeek || 'Saturday',
      dateStr: body.dateStr || 'This Weekend',
      time: body.time || '18:00',
      priceETB: body.priceETB ?? 0,
      description: body.description || '',
      romanticReason: body.romanticReason || 'Great romantic weekend vibe in Addis.',
      lat: Number(body.lat) || 9.0192,
      lng: Number(body.lng) || 38.7525,
      image: body.image || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      tags: body.tags || ['Weekend Date', 'Addis Ababa'],
      recommendedDressCode: body.recommendedDressCode || 'Smart Casual'
    };

    const saved = await createPrismaEvent(newEvent);

    if (user?.coupleSpaceId) {
      await createCoupleNotification({
        coupleSpaceId: user.coupleSpaceId,
        actorId: user.id,
        actorName: user.name,
        title: 'New Weekend Event Discovered! 🎟️',
        message: `${user.name} added "${saved.title}" in ${saved.neighborhood} for this weekend!`,
        type: 'date_created'
      });
    }

    return NextResponse.json({ success: true, event: saved }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
