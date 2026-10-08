import { NextResponse } from 'next/server';
import { readDb } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dateId = searchParams.get('id');

  const db = await readDb();
  const datePlan = db.dates.find(d => d.id === dateId) || db.dates[0];

  if (!datePlan) {
    return new NextResponse('Date not found', { status: 404 });
  }

  // Parse target date and time
  const [year, month, day] = datePlan.targetDate.split('-').map(Number);
  const [hours, minutes] = (datePlan.time || '18:00').split(':').map(Number);

  const startDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3 hours duration

  const formatICSDate = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const startStr = formatICSDate(startDate);
  const endStr = formatICSDate(endDate);
  const nowStr = formatICSDate(new Date());

  const location = datePlan.spots.length > 0 
    ? `${datePlan.spots[0].name}, ${datePlan.spots[0].neighborhood}, Addis Ababa`
    : 'Addis Ababa, Ethiopia';

  const description = [
    `Weekend Date with ${datePlan.proposedBy === 'Me' ? 'Babe' : 'My Love'}`,
    `Vibe: ${datePlan.dressCode}`,
    `Budget: ETB ${datePlan.budgetETB}`,
    datePlan.notes ? `Notes: ${datePlan.notes}` : '',
    datePlan.checklist.length > 0 ? `Checklist: ${datePlan.checklist.map(c => (c.done ? '✓ ' : '□ ') + c.text).join(', ')}` : ''
  ].filter(Boolean).join('\\n');

  // Alarm trigger: 2 hours prior or 1 day prior
  const alarmOffset = datePlan.reminderNotice === '1d' ? '-P1D' : '-PT2H';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Our Weekend Dates//Date Planner//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:date-${datePlan.id}@our-weekend.app`,
    `DTSTAMP:${nowStr}`,
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    `SUMMARY:❤️ Date: ${datePlan.title.replace(/,/g, '\\,')}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location.replace(/,/g, '\\,')}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    `TRIGGER:${alarmOffset}`,
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: Upcoming weekend date in Addis Ababa!`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return new NextResponse(icsContent, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="addis-date-${datePlan.id}.ics"`
    }
  });
}
