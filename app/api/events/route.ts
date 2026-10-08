import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';
import { AddisEvent } from '@/lib/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const query = searchParams.get('q')?.toLowerCase();

  const db = await readDb();
  let events = [...db.events];

  if (category && category !== 'all') {
    events = events.filter(e => e.category === category);
  }

  if (query) {
    events = events.filter(e => 
      e.title.toLowerCase().includes(query) ||
      e.description.toLowerCase().includes(query) ||
      e.neighborhood.toLowerCase().includes(query) ||
      e.venue.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({ events });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await readDb();

    const newEvent: AddisEvent = {
      id: `evt-${Date.now()}`,
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

    db.events.unshift(newEvent);
    await writeDb(db);

    return NextResponse.json({ success: true, event: newEvent }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
