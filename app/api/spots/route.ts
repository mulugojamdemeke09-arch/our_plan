import { NextResponse } from 'next/server';
import { getPrismaSpots, createPrismaSpot } from '@/lib/db';
import { DateSpot } from '@/lib/types';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const neighborhood = searchParams.get('neighborhood') || undefined;
    const query = searchParams.get('q')?.toLowerCase() || undefined;

    const spots = await getPrismaSpots(category, neighborhood, query);
    return NextResponse.json({ spots });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newSpot: DateSpot = {
      id: body.id || `spot-${Date.now()}`,
      name: body.name,
      category: body.category || 'coffee',
      subCategory: body.subCategory || undefined,
      knownCategory: body.knownCategory || undefined,
      bestKnownFor: body.bestKnownFor || undefined,
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
      reviewCount: Number(body.reviewCount) || 1,
      image: body.image || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
      interiorPhotos: body.interiorPhotos || [],
      interiorVibe: body.interiorVibe || undefined,
      menuHighlights: body.menuHighlights || [],
      tags: body.tags || ['Couple Spot'],
      googleMapsUrl: body.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(body.name + ' Addis Ababa')}`,
      appleMapsUrl: body.appleMapsUrl || `https://maps.apple.com/?q=${encodeURIComponent(body.name + ' Addis Ababa')}`,
      phone: body.phone || undefined
    };

    const saved = await createPrismaSpot(newSpot);
    return NextResponse.json({ success: true, spot: saved }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
