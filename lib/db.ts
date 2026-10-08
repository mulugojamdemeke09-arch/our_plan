import fs from 'fs';
import path from 'path';
import { DatePlan, DateSpot, AddisEvent, CoupleProfile } from './types';
import { INITIAL_SPOTS } from './data/initial-spots';
import { INITIAL_EVENTS } from './data/initial-events';

interface DatabaseSchema {
  dates: DatePlan[];
  spots: DateSpot[];
  events: AddisEvent[];
  profile: CoupleProfile;
}

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

// Helper to calculate this coming Saturday and Sunday
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

function getInitialDates(): DatePlan[] {
  const { satStr, sunStr } = getNextWeekendDates();

  return [
    {
      id: 'date-sat-entoto-escapade',
      title: 'Pine Forest Sunset & Mountain Feast at Entoto',
      targetDate: satStr,
      dayLabel: 'Saturday',
      time: '15:30',
      timeSlot: 'sunset',
      proposedBy: 'Babe',
      status: 'confirmed',
      spots: [
        INITIAL_SPOTS.find(s => s.id === 'spot-tomoca-entoto') || INITIAL_SPOTS[3],
        INITIAL_SPOTS.find(s => s.id === 'spot-kuriftu-entoto') || INITIAL_SPOTS[6]
      ],
      event: INITIAL_EVENTS.find(e => e.id === 'evt-entoto-sunset-picnic'),
      budgetETB: 3400,
      dressCode: 'Cozy Knit Sweaters & Mountain Boots',
      notes: 'Take the scenic route through Entoto pines. Grab spiced macchiatos first, watch sunset from the wooden deck, then dinner by the outdoor fireplace!',
      checklist: [
        { id: 'c1', text: 'Confirm Kuriftu table reservation for 6:30 PM', done: true },
        { id: 'c2', text: 'Pack warm couple blanket & cameras', done: false },
        { id: 'c3', text: 'Fuel up car for mountain drive', done: false }
      ],
      reminderEnabled: true,
      reminderNotice: '2h',
      createdAt: new Date().toISOString()
    },
    {
      id: 'date-sun-art-jazz',
      title: 'Sunday Sip & Paint + Fendika Ethio-Jazz Chill',
      targetDate: sunStr,
      dayLabel: 'Sunday',
      time: '14:30',
      timeSlot: 'afternoon',
      proposedBy: 'Me',
      status: 'planned',
      spots: [
        INITIAL_SPOTS.find(s => s.id === 'spot-cupcake-delights') || INITIAL_SPOTS[4],
        INITIAL_SPOTS.find(s => s.id === 'spot-fendika-lounge') || INITIAL_SPOTS[8]
      ],
      event: INITIAL_EVENTS.find(e => e.id === 'evt-atmosphere-paint-sip'),
      budgetETB: 2400,
      dressCode: 'Artistic Chic & Comfortable',
      notes: 'Red velvet cupcakes first at Atlas, paint our twin canvases at Atmosphere, then finish Sunday with acoustic jazz at Fendika!',
      checklist: [
        { id: 'c4', text: 'Book canvas spots at Atmosphere lab', done: true },
        { id: 'c5', text: 'Save appetite for roasted kolo and tej', done: false }
      ],
      reminderEnabled: true,
      reminderNotice: '1d',
      createdAt: new Date().toISOString()
    }
  ];
}

const DEFAULT_DB: DatabaseSchema = {
  dates: getInitialDates(),
  spots: INITIAL_SPOTS,
  events: INITIAL_EVENTS,
  profile: {
    partner1Name: 'Me',
    partner2Name: 'My Boyfriend',
    favoriteVibe: 'Romantic & Cozy Coffee Dates',
    reminderChannel: 'in_app'
  }
};

export async function readDb(): Promise<DatabaseSchema> {
  try {
    if (!fs.existsSync(DB_PATH)) {
      await writeDb(DEFAULT_DB);
      return DEFAULT_DB;
    }
    const data = await fs.promises.readFile(DB_PATH, 'utf-8');
    const parsed: DatabaseSchema = JSON.parse(data);

    let updated = false;
    INITIAL_SPOTS.forEach(initSpot => {
      const existingIdx = parsed.spots.findIndex(s => s.id === initSpot.id);
      if (existingIdx === -1) {
        parsed.spots.push(initSpot);
        updated = true;
      } else {
        // Merge in fresh menu highlights, interior details, knownCategory, and bestKnownFor
        const existing = parsed.spots[existingIdx];
        if (!existing.menuHighlights || !existing.interiorPhotos || !existing.knownCategory || existing.knownCategory !== initSpot.knownCategory || existing.bestKnownFor !== initSpot.bestKnownFor) {
          parsed.spots[existingIdx] = { ...existing, ...initSpot };
          updated = true;
        }
      }
    });

    INITIAL_EVENTS.forEach(initEvt => {
      if (!parsed.events.some(e => e.id === initEvt.id)) {
        parsed.events.push(initEvt);
        updated = true;
      }
    });

    if (updated) {
      await writeDb(parsed);
    }

    return parsed;
  } catch (err) {
    console.error('Error reading DB, falling back to default:', err);
    return DEFAULT_DB;
  }
}

export async function writeDb(data: DatabaseSchema): Promise<void> {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      await fs.promises.mkdir(dir, { recursive: true });
    }
    await fs.promises.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing DB:', err);
  }
}
