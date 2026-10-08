import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';
import { DatePlan } from '@/lib/types';

export async function GET() {
  const db = await readDb();
  // Sort dates by targetDate ascending
  const sorted = [...db.dates].sort((a, b) => a.targetDate.localeCompare(b.targetDate));
  return NextResponse.json({ dates: sorted, profile: db.profile });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await readDb();

    const newDate: DatePlan = {
      id: `date-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: body.title || 'Untitled Weekend Date',
      targetDate: body.targetDate || new Date().toISOString().split('T')[0],
      dayLabel: body.dayLabel || 'Saturday',
      time: body.time || '18:00',
      timeSlot: body.timeSlot || 'dinner',
      proposedBy: body.proposedBy || 'Me',
      status: body.status || 'planned',
      spots: body.spots || [],
      event: body.event || undefined,
      budgetETB: Number(body.budgetETB) || 0,
      dressCode: body.dressCode || 'Smart Casual',
      notes: body.notes || '',
      checklist: body.checklist || [
        { id: `c-${Date.now()}-1`, text: 'Check opening hours or reservation', done: false },
        { id: `c-${Date.now()}-2`, text: 'Pick matching outfits', done: false }
      ],
      reminderEnabled: body.reminderEnabled ?? true,
      reminderNotice: body.reminderNotice || '2h',
      createdAt: new Date().toISOString()
    };

    db.dates.push(newDate);
    await writeDb(db);

    return NextResponse.json({ success: true, date: newDate }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: 'Missing date ID' }, { status: 400 });
    }

    const db = await readDb();
    const idx = db.dates.findIndex(d => d.id === body.id);
    if (idx === -1) {
      return NextResponse.json({ error: 'Date not found' }, { status: 404 });
    }

    // Merge update
    db.dates[idx] = {
      ...db.dates[idx],
      ...body
    };

    await writeDb(db);
    return NextResponse.json({ success: true, date: db.dates[idx] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id query parameter' }, { status: 400 });
    }

    const db = await readDb();
    db.dates = db.dates.filter(d => d.id !== id);
    await writeDb(db);

    return NextResponse.json({ success: true, removedId: id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
