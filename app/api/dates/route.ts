import { NextResponse } from 'next/server';
import { readDb, createPrismaDatePlan, updatePrismaDatePlan, deletePrismaDatePlan } from '@/lib/db';
import { getUserFromReq } from '@/lib/auth';
import { createCoupleNotification } from '@/lib/notifications';
import prisma from '@/lib/prisma';
import { DatePlan } from '@/lib/types';

export async function GET(req: Request) {
  try {
    const user = await getUserFromReq(req);
    const coupleSpaceId = user?.coupleSpaceId || undefined;

    const db = await readDb(coupleSpaceId);
    const sorted = [...db.dates].sort((a, b) => a.targetDate.localeCompare(b.targetDate));
    return NextResponse.json({ dates: sorted, profile: db.profile });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getUserFromReq(req);
    const body = await req.json();

    // Default or user couple space
    let coupleSpaceId = user?.coupleSpaceId;
    if (!coupleSpaceId) {
      const defaultSpace = await prisma.coupleSpace.findUnique({
        where: { inviteCode: 'ADDIS-LOVE' }
      });
      coupleSpaceId = defaultSpace?.id;
    }

    const actorName = user?.name || body.proposedBy || 'Partner';
    const actorId = user?.id;

    const planToCreate: DatePlan = {
      id: body.id || `date-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: body.title || 'Untitled Weekend Date',
      targetDate: body.targetDate || new Date().toISOString().split('T')[0],
      dayLabel: body.dayLabel || 'Saturday',
      time: body.time || '18:00',
      timeSlot: body.timeSlot || 'dinner',
      proposedBy: actorName,
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
      createdAt: new Date().toISOString(),
      coupleSpaceId,
      createdById: actorId
    };

    const newDate = await createPrismaDatePlan(planToCreate, undefined, coupleSpaceId, actorId);

    // Notify couple
    if (coupleSpaceId) {
      await createCoupleNotification({
        coupleSpaceId,
        actorId,
        actorName,
        title: 'New Date Planned! 🌹',
        message: `${actorName} planned: "${newDate.title}" for ${newDate.dayLabel || newDate.targetDate}! Check it out.`,
        type: 'date_created',
        datePlanId: newDate.id
      });
    }

    return NextResponse.json({ success: true, date: newDate }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user = await getUserFromReq(req);
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: 'Missing date ID' }, { status: 400 });
    }

    // Retrieve previous state to determine notification type
    const previous = await prisma.datePlan.findUnique({
      where: { id: body.id },
      include: { checklist: true }
    });

    const updated = await updatePrismaDatePlan(body.id, body);

    const actorName = user?.name || body.actorName || 'Partner';
    const actorId = user?.id;
    const coupleSpaceId = updated.coupleSpaceId || user?.coupleSpaceId;

    if (coupleSpaceId) {
      const isChecklistOnly = body.isChecklistUpdate || (
        body.checklist &&
        previous &&
        JSON.stringify(previous.checklist.map(c => c.done)) !== JSON.stringify(body.checklist.map((c: any) => c.done))
      );

      if (isChecklistOnly) {
        const completedCount = (body.checklist || []).filter((c: any) => c.done).length;
        await createCoupleNotification({
          coupleSpaceId,
          actorId,
          actorName,
          title: 'Checklist Progress! ✍️',
          message: `${actorName} updated the prep checklist for "${updated.title}" (${completedCount} items completed).`,
          type: 'checklist_toggle',
          datePlanId: updated.id
        });
      } else if (previous && previous.status !== updated.status) {
        await createCoupleNotification({
          coupleSpaceId,
          actorId,
          actorName,
          title: 'Date Status Changed! ✨',
          message: `${actorName} marked "${updated.title}" as ${updated.status.toUpperCase()}!`,
          type: 'date_updated',
          datePlanId: updated.id
        });
      } else {
        await createCoupleNotification({
          coupleSpaceId,
          actorId,
          actorName,
          title: 'Date Updated 💖',
          message: `${actorName} updated details for "${updated.title}".`,
          type: 'date_updated',
          datePlanId: updated.id
        });
      }
    }

    return NextResponse.json({ success: true, date: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await getUserFromReq(req);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id query parameter' }, { status: 400 });
    }

    const existing = await prisma.datePlan.findUnique({ where: { id } });
    const success = await deletePrismaDatePlan(id);

    const coupleSpaceId = existing?.coupleSpaceId || user?.coupleSpaceId;
    if (coupleSpaceId && existing) {
      const actorName = user?.name || 'Partner';
      await createCoupleNotification({
        coupleSpaceId,
        actorId: user?.id,
        actorName,
        title: 'Date Plan Removed 🗑️',
        message: `${actorName} removed the planned date "${existing.title}".`,
        type: 'date_deleted'
      });
    }

    return NextResponse.json({ success, removedId: id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
