import fs from 'fs';
import path from 'path';
import prisma from './prisma';
import { DatePlan, DateSpot, AddisEvent, CoupleProfile, MenuItem } from './types';
import { INITIAL_SPOTS } from './data/initial-spots';
import { INITIAL_EVENTS } from './data/initial-events';

interface DatabaseSchema {
  dates: DatePlan[];
  spots: DateSpot[];
  events: AddisEvent[];
  profile: CoupleProfile;
}

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

// --- Helpers to parse and format Prisma entities into App Types ---

export function mapPrismaSpot(s: any): DateSpot {
  return {
    id: s.id,
    name: s.name,
    category: s.category,
    subCategory: s.subCategory ?? undefined,
    knownCategory: s.knownCategory ?? undefined,
    bestKnownFor: s.bestKnownFor ?? undefined,
    neighborhood: s.neighborhood,
    address: s.address,
    lat: s.lat,
    lng: s.lng,
    priceLevel: s.priceLevel,
    avgCostForTwoETB: s.avgCostForTwoETB,
    vibe: s.vibe,
    romanticHighlight: s.romanticHighlight,
    signatureOrder: s.signatureOrder,
    openingHours: s.openingHours,
    rating: s.rating,
    reviewCount: s.reviewCount,
    image: s.image,
    interiorPhotos: s.interiorPhotos ? safeJsonParse(s.interiorPhotos, []) : [],
    interiorVibe: s.interiorVibe ?? undefined,
    menuHighlights: s.menuHighlights ? safeJsonParse<MenuItem[]>(s.menuHighlights, []) : [],
    tags: s.tags ? safeJsonParse<string[]>(s.tags, []) : [],
    googleMapsUrl: s.googleMapsUrl,
    appleMapsUrl: s.appleMapsUrl ?? undefined,
    phone: s.phone ?? undefined
  };
}

export function mapPrismaEvent(e: any): AddisEvent {
  const priceParsed = e.priceETB === 'Free' ? 'Free' : (isNaN(Number(e.priceETB)) ? 'Free' : Number(e.priceETB));
  return {
    id: e.id,
    title: e.title,
    organizer: e.organizer,
    category: e.category,
    venue: e.venue,
    neighborhood: e.neighborhood,
    dayOfWeek: e.dayOfWeek,
    dateStr: e.dateStr,
    time: e.time,
    priceETB: priceParsed,
    description: e.description,
    romanticReason: e.romanticReason,
    lat: e.lat,
    lng: e.lng,
    image: e.image,
    tags: e.tags ? safeJsonParse<string[]>(e.tags, []) : [],
    recommendedDressCode: e.recommendedDressCode
  };
}

export function mapPrismaDatePlan(p: any): DatePlan {
  const spots: DateSpot[] = (p.spots || [])
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    .map((ps: any) => ps.spot ? mapPrismaSpot(ps.spot) : null)
    .filter(Boolean);

  const checklist = (p.checklist || [])
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    .map((c: any) => ({
      id: c.id,
      text: c.text,
      done: c.done
    }));

  return {
    id: p.id,
    title: p.title,
    targetDate: p.targetDate,
    dayLabel: p.dayLabel ?? undefined,
    time: p.time,
    timeSlot: p.timeSlot,
    proposedBy: p.proposedBy,
    status: p.status,
    spots,
    event: p.event ? mapPrismaEvent(p.event) : undefined,
    budgetETB: p.budgetETB,
    dressCode: p.dressCode,
    notes: p.notes,
    checklist,
    reminderEnabled: p.reminderEnabled,
    reminderNotice: p.reminderNotice,
    createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : p.createdAt,
    coupleSpaceId: p.coupleSpaceId ?? undefined,
    createdById: p.createdById ?? undefined
  };
}

function safeJsonParse<T>(val: string, fallback: T): T {
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

// Fallback JSON-based reader in case Prisma has not yet run migrations
async function readFallbackJson(): Promise<DatabaseSchema> {
  if (fs.existsSync(DB_PATH)) {
    try {
      const data = await fs.promises.readFile(DB_PATH, 'utf-8');
      return JSON.parse(data);
    } catch {
      // ignore
    }
  }
  return {
    dates: [],
    spots: INITIAL_SPOTS,
    events: INITIAL_EVENTS,
    profile: {
      partner1Name: 'Me',
      partner2Name: 'My Boyfriend',
      favoriteVibe: 'Romantic & Cozy Coffee Dates',
      reminderChannel: 'in_app'
    }
  };
}

/**
 * Reads database state via Prisma ORM with automatic fallback
 */
export async function readDb(coupleSpaceId?: string): Promise<DatabaseSchema> {
  try {
    const datePlanWhere = coupleSpaceId
      ? {
          OR: [
            { coupleSpaceId },
            { coupleSpaceId: null }
          ]
        }
      : {};

    const [rawSpots, rawEvents, rawPlans, rawProfile] = await Promise.all([
      prisma.spot.findMany(),
      prisma.event.findMany(),
      prisma.datePlan.findMany({
        where: datePlanWhere,
        include: {
          spots: { include: { spot: true } },
          event: true,
          checklist: true
        },
        orderBy: { targetDate: 'asc' }
      }),
      prisma.coupleProfile.findFirst()
    ]);

    // If SQLite is empty (e.g. before first seed), fall back to initial JSON data
    if (rawSpots.length === 0 && rawEvents.length === 0) {
      return readFallbackJson();
    }

    const spots = rawSpots.map(mapPrismaSpot);
    const events = rawEvents.map(mapPrismaEvent);
    const dates = rawPlans.map(mapPrismaDatePlan);
    const profile: CoupleProfile = rawProfile ? {
      partner1Name: rawProfile.partner1Name,
      partner2Name: rawProfile.partner2Name,
      anniversaryDate: rawProfile.anniversaryDate ?? undefined,
      favoriteVibe: rawProfile.favoriteVibe ?? undefined,
      reminderChannel: (rawProfile.reminderChannel as any) ?? 'in_app'
    } : {
      partner1Name: 'Me',
      partner2Name: 'My Boyfriend',
      favoriteVibe: 'Romantic & Cozy Coffee Dates',
      reminderChannel: 'in_app'
    };

    return { dates, spots, events, profile };
  } catch (err) {
    console.warn('Prisma query failed, falling back to JSON store:', (err as any).message);
    return readFallbackJson();
  }
}

/**
 * Write/sync database state to Prisma (and backup to db.json)
 */
export async function writeDb(data: DatabaseSchema): Promise<void> {
  // Always keep JSON backup updated
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir, { recursive: true });
    }
    await fs.promises.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing fallback JSON:', err);
  }
}

// --- Specific Prisma CRUD Helpers ---

export async function getPrismaSpots(category?: string, neighborhood?: string, query?: string): Promise<DateSpot[]> {
  try {
    const spots = await prisma.spot.findMany();
    let mapped = spots.map(mapPrismaSpot);

    if (category && category !== 'all') {
      mapped = mapped.filter(s => s.category === category);
    }
    if (neighborhood && neighborhood !== 'all') {
      mapped = mapped.filter(s => s.neighborhood.toLowerCase().includes(neighborhood.toLowerCase()));
    }
    if (query) {
      mapped = mapped.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.vibe.toLowerCase().includes(query) ||
        s.romanticHighlight.toLowerCase().includes(query) ||
        s.neighborhood.toLowerCase().includes(query)
      );
    }
    return mapped;
  } catch {
    const db = await readFallbackJson();
    return db.spots;
  }
}

export async function createPrismaSpot(spot: DateSpot): Promise<DateSpot> {
  try {
    const created = await prisma.spot.create({
      data: {
        id: spot.id,
        name: spot.name,
        category: spot.category,
        subCategory: spot.subCategory ?? null,
        knownCategory: spot.knownCategory ?? null,
        bestKnownFor: spot.bestKnownFor ?? null,
        neighborhood: spot.neighborhood,
        address: spot.address,
        lat: spot.lat,
        lng: spot.lng,
        priceLevel: spot.priceLevel,
        avgCostForTwoETB: spot.avgCostForTwoETB,
        vibe: spot.vibe,
        romanticHighlight: spot.romanticHighlight,
        signatureOrder: spot.signatureOrder,
        openingHours: spot.openingHours,
        rating: spot.rating,
        reviewCount: spot.reviewCount,
        image: spot.image,
        interiorPhotos: spot.interiorPhotos ? JSON.stringify(spot.interiorPhotos) : null,
        interiorVibe: spot.interiorVibe ?? null,
        menuHighlights: spot.menuHighlights ? JSON.stringify(spot.menuHighlights) : null,
        tags: JSON.stringify(spot.tags || []),
        googleMapsUrl: spot.googleMapsUrl,
        appleMapsUrl: spot.appleMapsUrl ?? null,
        phone: spot.phone ?? null
      }
    });
    return mapPrismaSpot(created);
  } catch (err) {
    console.error('Failed to create spot in Prisma:', err);
    throw err;
  }
}

export async function createPrismaDatePlan(
  plan: DatePlan,
  clerkUserId?: string,
  coupleSpaceId?: string,
  createdById?: string
): Promise<DatePlan> {
  try {
    // Ensure spots and event exist in the DB to satisfy foreign keys
    if (plan.spots && plan.spots.length > 0) {
      for (const s of plan.spots) {
        await prisma.spot.upsert({
          where: { id: s.id },
          update: {},
          create: {
            id: s.id,
            name: s.name,
            category: s.category || 'restaurant',
            subCategory: s.subCategory ?? null,
            knownCategory: s.knownCategory ?? null,
            bestKnownFor: s.bestKnownFor ?? null,
            neighborhood: s.neighborhood || 'Addis Ababa',
            address: s.address || 'Addis Ababa',
            lat: Number(s.lat) || 9.0192,
            lng: Number(s.lng) || 38.7525,
            priceLevel: s.priceLevel || 'ETB $$',
            avgCostForTwoETB: Number(s.avgCostForTwoETB) || 1000,
            vibe: s.vibe || 'Cozy Couple Spot',
            romanticHighlight: s.romanticHighlight || 'Great romantic spot in Addis Ababa.',
            signatureOrder: s.signatureOrder || 'Special',
            openingHours: s.openingHours || 'Daily',
            rating: Number(s.rating) || 4.8,
            reviewCount: Number(s.reviewCount) || 1,
            image: s.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
            interiorPhotos: s.interiorPhotos ? JSON.stringify(s.interiorPhotos) : null,
            interiorVibe: s.interiorVibe ?? null,
            menuHighlights: s.menuHighlights ? JSON.stringify(s.menuHighlights) : null,
            tags: JSON.stringify(s.tags || []),
            googleMapsUrl: s.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.name + ' Addis Ababa')}`,
            appleMapsUrl: s.appleMapsUrl ?? null,
            phone: s.phone ?? null
          }
        });
      }
    }

    if (plan.event) {
      await prisma.event.upsert({
        where: { id: plan.event.id },
        update: {},
        create: {
          id: plan.event.id,
          title: plan.event.title,
          organizer: plan.event.organizer || 'Addis Event',
          category: plan.event.category || 'music',
          venue: plan.event.venue || 'Addis Ababa',
          neighborhood: plan.event.neighborhood || 'Bole',
          dayOfWeek: plan.event.dayOfWeek || 'Saturday',
          dateStr: plan.event.dateStr || 'This Weekend',
          time: plan.event.time || '18:00',
          priceETB: String(plan.event.priceETB),
          description: plan.event.description || '',
          romanticReason: plan.event.romanticReason || 'Romantic couple date event',
          lat: Number(plan.event.lat) || 9.0192,
          lng: Number(plan.event.lng) || 38.7525,
          image: plan.event.image || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
          tags: JSON.stringify(plan.event.tags || []),
          recommendedDressCode: plan.event.recommendedDressCode || 'Smart Casual'
        }
      });
    }

    // Find or create profile
    let profile = await prisma.coupleProfile.findFirst();
    if (!profile) {
      profile = await prisma.coupleProfile.create({
        data: {
          partner1Name: 'Me',
          partner2Name: 'My Boyfriend',
          clerkUserId: clerkUserId ?? null
        }
      });
    }

    const finalCoupleSpaceId = coupleSpaceId || plan.coupleSpaceId || null;
    const finalCreatedById = createdById || plan.createdById || null;

    const created = await prisma.datePlan.create({
      data: {
        id: plan.id,
        title: plan.title,
        targetDate: plan.targetDate,
        dayLabel: plan.dayLabel ?? null,
        time: plan.time,
        timeSlot: plan.timeSlot,
        proposedBy: plan.proposedBy,
        createdById: finalCreatedById,
        coupleSpaceId: finalCoupleSpaceId,
        status: plan.status,
        budgetETB: plan.budgetETB,
        dressCode: plan.dressCode,
        notes: plan.notes,
        reminderEnabled: plan.reminderEnabled,
        reminderNotice: plan.reminderNotice,
        coupleProfileId: profile.id,
        eventId: plan.event?.id ?? null,
        checklist: {
          create: (plan.checklist || []).map((c, i) => ({
            id: c.id,
            text: c.text,
            done: c.done,
            order: i
          }))
        },
        spots: {
          create: (plan.spots || []).map((s, i) => ({
            spotId: s.id,
            order: i
          }))
        }
      },
      include: {
        spots: { include: { spot: true } },
        event: true,
        checklist: true
      }
    });

    return mapPrismaDatePlan(created);
  } catch (err) {
    console.error('Failed to create date plan in Prisma:', err);
    throw err;
  }
}

export async function updatePrismaDatePlan(id: string, updates: Partial<DatePlan>): Promise<DatePlan> {
  try {
    const updateData: any = {};
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.targetDate !== undefined) updateData.targetDate = updates.targetDate;
    if (updates.dayLabel !== undefined) updateData.dayLabel = updates.dayLabel;
    if (updates.time !== undefined) updateData.time = updates.time;
    if (updates.timeSlot !== undefined) updateData.timeSlot = updates.timeSlot;
    if (updates.proposedBy !== undefined) updateData.proposedBy = updates.proposedBy;
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.budgetETB !== undefined) updateData.budgetETB = Number(updates.budgetETB);
    if (updates.dressCode !== undefined) updateData.dressCode = updates.dressCode;
    if (updates.notes !== undefined) updateData.notes = updates.notes;
    if (updates.reminderEnabled !== undefined) updateData.reminderEnabled = updates.reminderEnabled;
    if (updates.reminderNotice !== undefined) updateData.reminderNotice = updates.reminderNotice;
    if (updates.event !== undefined) updateData.eventId = updates.event?.id ?? null;

    // If checklist was updated, replace checklist items
    if (updates.checklist) {
      await prisma.checklistItem.deleteMany({ where: { datePlanId: id } });
      updateData.checklist = {
        create: updates.checklist.map((c, i) => ({
          id: c.id || `c-${Date.now()}-${i}`,
          text: c.text,
          done: c.done,
          order: i
        }))
      };
    }

    // If spots were updated, ensure they exist in DB and replace spot relations
    if (updates.spots) {
      for (const s of updates.spots) {
        await prisma.spot.upsert({
          where: { id: s.id },
          update: {},
          create: {
            id: s.id,
            name: s.name,
            category: s.category || 'restaurant',
            subCategory: s.subCategory ?? null,
            knownCategory: s.knownCategory ?? null,
            bestKnownFor: s.bestKnownFor ?? null,
            neighborhood: s.neighborhood || 'Addis Ababa',
            address: s.address || 'Addis Ababa',
            lat: Number(s.lat) || 9.0192,
            lng: Number(s.lng) || 38.7525,
            priceLevel: s.priceLevel || 'ETB $$',
            avgCostForTwoETB: Number(s.avgCostForTwoETB) || 1000,
            vibe: s.vibe || 'Cozy Couple Spot',
            romanticHighlight: s.romanticHighlight || 'Great romantic spot in Addis Ababa.',
            signatureOrder: s.signatureOrder || 'Special',
            openingHours: s.openingHours || 'Daily',
            rating: Number(s.rating) || 4.8,
            reviewCount: Number(s.reviewCount) || 1,
            image: s.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
            interiorPhotos: s.interiorPhotos ? JSON.stringify(s.interiorPhotos) : null,
            interiorVibe: s.interiorVibe ?? null,
            menuHighlights: s.menuHighlights ? JSON.stringify(s.menuHighlights) : null,
            tags: JSON.stringify(s.tags || []),
            googleMapsUrl: s.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.name + ' Addis Ababa')}`,
            appleMapsUrl: s.appleMapsUrl ?? null,
            phone: s.phone ?? null
          }
        });
      }

      await prisma.datePlanSpot.deleteMany({ where: { datePlanId: id } });
      updateData.spots = {
        create: updates.spots.map((s, i) => ({
          spotId: s.id,
          order: i
        }))
      };
    }

    const updated = await prisma.datePlan.update({
      where: { id },
      data: updateData,
      include: {
        spots: { include: { spot: true } },
        event: true,
        checklist: true
      }
    });

    return mapPrismaDatePlan(updated);
  } catch (err) {
    console.error('Failed to update date plan in Prisma:', err);
    throw err;
  }
}

export async function deletePrismaDatePlan(id: string): Promise<boolean> {
  try {
    await prisma.datePlan.delete({ where: { id } });
    return true;
  } catch (err) {
    console.error('Failed to delete date plan in Prisma:', err);
    return false;
  }
}

export async function getPrismaEvents(category?: string, query?: string): Promise<AddisEvent[]> {
  try {
    const rawEvents = await prisma.event.findMany();
    let events = rawEvents.map(mapPrismaEvent);

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
    return events;
  } catch {
    const db = await readFallbackJson();
    return db.events;
  }
}

export async function createPrismaEvent(event: AddisEvent): Promise<AddisEvent> {
  try {
    const created = await prisma.event.create({
      data: {
        id: event.id,
        title: event.title,
        organizer: event.organizer,
        category: event.category,
        venue: event.venue,
        neighborhood: event.neighborhood,
        dayOfWeek: event.dayOfWeek,
        dateStr: event.dateStr,
        time: event.time,
        priceETB: String(event.priceETB),
        description: event.description,
        romanticReason: event.romanticReason,
        lat: event.lat,
        lng: event.lng,
        image: event.image,
        tags: JSON.stringify(event.tags || []),
        recommendedDressCode: event.recommendedDressCode
      }
    });
    return mapPrismaEvent(created);
  } catch (err) {
    console.error('Failed to create event in Prisma:', err);
    throw err;
  }
}

