import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';
import { DateSpot } from '@/lib/types';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const neighborhood = searchParams.get('neighborhood');
  const query = searchParams.get('q')?.toLowerCase();

  const db = await readDb();
  let spots = [...db.spots];

  if (category && category !== 'all') {
    spots = spots.filter(s => s.category === category);
  }

  if (neighborhood && neighborhood !== 'all') {
    spots = spots.filter(s => s.neighborhood.toLowerCase().includes(neighborhood.toLowerCase()));
  }

  if (query) {
    spots = spots.filter(s =>
      s.name.toLowerCase().includes(query) ||
      s.vibe.toLowerCase().includes(query) ||
      s.romanticHighlight.toLowerCase().includes(query) ||
      s.neighborhood.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({ spots });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await readDb();

    const newSpot: DateSpot = {
      id: `spot-${Date.now()}`,
      name: body.name,
      category: body.category || 'coffee',
      neighborhood: body.neighborhood || 'Bole',
      address: body.address || 'Addis Ababa',
      lat: Number(body.lat) || 9.0192,
      lng: Number(body.lng) || 38.7525,
      priceLevel: body.priceLevel || 'ETB $$',
      avgCostForTwoETB: Number(body.avgCostForTwoETB) || 500,
      vibe: body.vibe || 'Cozy & Romantic',
      romanticHighlight: body.romanticHighlight || 'Great spot for couples to relax and talk.',
      signatureOrder: body.signatureOrder || 'House Special',
      openingHours: body.openingHours || '8:00 AM – 10:00 PM',
      rating: Number(body.rating) || 4.8,
      reviewCount: 1,
      image: body.image || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
      tags: body.tags || ['Couple Spot'],
      googleMapsUrl: body.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(body.name + ' Addis Ababa')}`,
      appleMapsUrl: body.appleMapsUrl || `https://maps.apple.com/?q=${encodeURIComponent(body.name + ' Addis Ababa')}`
    };

    db.spots.unshift(newSpot);
    await writeDb(db);

    return NextResponse.json({ success: true, spot: newSpot }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
