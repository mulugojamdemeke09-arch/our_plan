import { PrismaClient } from '@prisma/client';
import { INITIAL_SPOTS } from '../lib/data/initial-spots';
import { INITIAL_EVENTS } from '../lib/data/initial-events';

const prisma = new PrismaClient();

function getNextWeekendDates() {
  const now = new Date();
  const currentDay = now.getDay(); // 0 is Sun, 6 is Sat
  const daysUntilSaturday = (6 - currentDay + 7) % 7 || 7;
  const satDate = new Date(now);
  satDate.setDate(now.getDate() + daysUntilSaturday);

  const sunDate = new Date(satDate);
  sunDate.setDate(satDate.getDate() + 1);

  const satStr = satDate.toISOString().split('T')[0];
  const sunStr = sunDate.toISOString().split('T')[0];
  return { satStr, sunStr };
}

async function main() {
  console.log('🌱 Starting Our Weekend database seed...');

  // 1. Seed or update couple profile and CoupleSpace
  const existingSpace = await prisma.coupleSpace.findFirst({ where: { inviteCode: 'ADDIS-LOVE' } });
  let coupleSpace = existingSpace;
  if (!coupleSpace) {
    coupleSpace = await prisma.coupleSpace.create({
      data: {
        name: 'Abeba & Yohannes Sanctuary',
        inviteCode: 'ADDIS-LOVE',
        anniversaryDate: '2024-10-18',
        favoriteVibe: 'Romantic & Cozy Coffee Dates'
      }
    });
    console.log('✅ Created CoupleSpace: ADDIS-LOVE');
  }

  // Seed demo couple accounts
  const crypto = require('crypto');
  const salt = '1234567890abcdef';
  const hash = crypto.scryptSync('love123', salt, 64).toString('hex');
  const defaultPasswordHash = `${salt}:${hash}`;

  const user1 = await prisma.user.upsert({
    where: { email: 'abeba@ourweekend.app' },
    update: { coupleSpaceId: coupleSpace.id },
    create: {
      email: 'abeba@ourweekend.app',
      name: 'Abeba',
      passwordHash: defaultPasswordHash,
      partnerNickname: 'Yohannes',
      coupleSpaceId: coupleSpace.id
    }
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'yohannes@ourweekend.app' },
    update: { coupleSpaceId: coupleSpace.id },
    create: {
      email: 'yohannes@ourweekend.app',
      name: 'Yohannes',
      passwordHash: defaultPasswordHash,
      partnerNickname: 'Abeba',
      coupleSpaceId: coupleSpace.id
    }
  });

  console.log('✅ Seeded couple users:', user1.name, '&', user2.name);

  // Seed initial notification
  await prisma.notification.create({
    data: {
      coupleSpaceId: coupleSpace.id,
      actorId: user2.id,
      actorName: user2.name,
      recipientId: user1.id,
      title: 'Pine Forest Sunset Planned! 🌲',
      message: 'Yohannes added Saturday date at Entoto Kuriftu for both of us!',
      type: 'date_created',
      read: false
    }
  });

  const existingProfile = await prisma.coupleProfile.findFirst();
  let profile = existingProfile;
  if (!profile) {
    profile = await prisma.coupleProfile.create({
      data: {
        partner1Name: 'Abeba',
        partner2Name: 'Yohannes',
        favoriteVibe: 'Romantic & Cozy Coffee Dates',
        reminderChannel: 'in_app'
      }
    });
  }

  // 2. Upsert Spots
  console.log(`📍 Seeding ${INITIAL_SPOTS.length} spots...`);
  for (const s of INITIAL_SPOTS) {
    await prisma.spot.upsert({
      where: { id: s.id },
      update: {
        name: s.name,
        category: s.category,
        subCategory: s.subCategory ?? null,
        knownCategory: s.knownCategory ?? null,
        bestKnownFor: s.bestKnownFor ?? null,
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
        interiorPhotos: s.interiorPhotos ? JSON.stringify(s.interiorPhotos) : null,
        interiorVibe: s.interiorVibe ?? null,
        menuHighlights: s.menuHighlights ? JSON.stringify(s.menuHighlights) : null,
        tags: JSON.stringify(s.tags || []),
        googleMapsUrl: s.googleMapsUrl,
        appleMapsUrl: s.appleMapsUrl ?? null,
        phone: s.phone ?? null
      },
      create: {
        id: s.id,
        name: s.name,
        category: s.category,
        subCategory: s.subCategory ?? null,
        knownCategory: s.knownCategory ?? null,
        bestKnownFor: s.bestKnownFor ?? null,
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
        interiorPhotos: s.interiorPhotos ? JSON.stringify(s.interiorPhotos) : null,
        interiorVibe: s.interiorVibe ?? null,
        menuHighlights: s.menuHighlights ? JSON.stringify(s.menuHighlights) : null,
        tags: JSON.stringify(s.tags || []),
        googleMapsUrl: s.googleMapsUrl,
        appleMapsUrl: s.appleMapsUrl ?? null,
        phone: s.phone ?? null
      }
    });
  }
  console.log(`✅ Upserted ${INITIAL_SPOTS.length} spots.`);

  // 3. Upsert Events
  console.log(`🎭 Seeding ${INITIAL_EVENTS.length} weekend events...`);
  for (const e of INITIAL_EVENTS) {
    await prisma.event.upsert({
      where: { id: e.id },
      update: {
        title: e.title,
        organizer: e.organizer,
        category: e.category,
        venue: e.venue,
        neighborhood: e.neighborhood,
        dayOfWeek: e.dayOfWeek,
        dateStr: e.dateStr,
        time: e.time,
        priceETB: String(e.priceETB),
        description: e.description,
        romanticReason: e.romanticReason,
        lat: e.lat,
        lng: e.lng,
        image: e.image,
        tags: JSON.stringify(e.tags || []),
        recommendedDressCode: e.recommendedDressCode
      },
      create: {
        id: e.id,
        title: e.title,
        organizer: e.organizer,
        category: e.category,
        venue: e.venue,
        neighborhood: e.neighborhood,
        dayOfWeek: e.dayOfWeek,
        dateStr: e.dateStr,
        time: e.time,
        priceETB: String(e.priceETB),
        description: e.description,
        romanticReason: e.romanticReason,
        lat: e.lat,
        lng: e.lng,
        image: e.image,
        tags: JSON.stringify(e.tags || []),
        recommendedDressCode: e.recommendedDressCode
      }
    });
  }
  console.log(`✅ Upserted ${INITIAL_EVENTS.length} events.`);

  // 4. Seed initial date plans if none exist
  const existingPlans = await prisma.datePlan.count();
  if (existingPlans === 0) {
    const { satStr, sunStr } = getNextWeekendDates();

    // Plan 1: Entoto
    const plan1 = await prisma.datePlan.create({
      data: {
        id: 'date-sat-entoto-escapade',
        title: 'Pine Forest Sunset & Mountain Feast at Entoto',
        targetDate: satStr,
        dayLabel: 'Saturday',
        time: '15:30',
        timeSlot: 'sunset',
        proposedBy: 'Babe',
        status: 'confirmed',
        budgetETB: 3400,
        dressCode: 'Cozy Knit Sweaters & Mountain Boots',
        notes: 'Take the scenic route through Entoto pines. Grab spiced macchiatos first, watch sunset from the wooden deck, then dinner by the outdoor fireplace!',
        reminderEnabled: true,
        reminderNotice: '2h',
        coupleProfileId: profile.id,
        eventId: 'evt-entoto-sunset-picnic',
        checklist: {
          create: [
            { text: 'Confirm Kuriftu table reservation for 6:30 PM', done: true, order: 0 },
            { text: 'Pack warm couple blanket & cameras', done: false, order: 1 },
            { text: 'Fuel up car for mountain drive', done: false, order: 2 }
          ]
        },
        spots: {
          create: [
            { spotId: 'spot-tomoca-entoto', order: 0 },
            { spotId: 'spot-kuriftu-entoto', order: 1 }
          ]
        }
      }
    });

    // Plan 2: Sunday Art & Jazz
    const plan2 = await prisma.datePlan.create({
      data: {
        id: 'date-sun-art-jazz',
        title: 'Sunday Sip & Paint + Fendika Ethio-Jazz Chill',
        targetDate: sunStr,
        dayLabel: 'Sunday',
        time: '14:30',
        timeSlot: 'afternoon',
        proposedBy: 'Me',
        status: 'planned',
        budgetETB: 2400,
        dressCode: 'Artistic Chic & Comfortable',
        notes: 'Red velvet cupcakes first at Atlas, paint our twin canvases at Atmosphere, then finish Sunday with acoustic jazz at Fendika!',
        reminderEnabled: true,
        reminderNotice: '1d',
        coupleProfileId: profile.id,
        eventId: 'evt-atmosphere-paint-sip',
        checklist: {
          create: [
            { text: 'Book canvas spots at Atmosphere lab', done: true, order: 0 },
            { text: 'Save appetite for roasted kolo and tej', done: false, order: 1 }
          ]
        },
        spots: {
          create: [
            { spotId: 'spot-cupcake-delights-atlas', order: 0 },
            { spotId: 'spot-fendika-cultural', order: 1 }
          ]
        }
      }
    });

    console.log('✅ Created default weekend date plans');
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch(e => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
