import { AddisEvent } from './types';

/**
 * Robustly parses 24h ('15:00', '20:30'), 12h ('3:00 PM', '10:00 AM'), or shorthand ('3', '3:00') time strings.
 */
export function parseEventTime(timeStr?: string, dateStr?: string): { hours: number; minutes: number } {
  let clean = (timeStr || '').trim().toUpperCase();

  // If time is missing or generic, try extracting from dateStr (e.g. "This Friday • 3:00 PM")
  if (!clean && dateStr) {
    const match = dateStr.match(/\b(\d{1,2}(?::\d{2})?\s*(?:AM|PM)?)\b/i);
    if (match) clean = match[1].trim().toUpperCase();
  }

  if (!clean) return { hours: 18, minutes: 0 };

  const isPM = clean.includes('PM');
  const isAM = clean.includes('AM');
  const sanitized = clean.replace(/AM|PM/g, '').trim();
  const parts = sanitized.split(':');
  let h = parseInt(parts[0], 10) || 0;
  const m = parseInt(parts[1], 10) || 0;

  if (isPM && h < 12) h += 12;
  if (isAM && h === 12) h = 0;

  // If no AM or PM was specified (e.g. "3" or "3:00"):
  // For event scheduling, values 1 to 6 (1:00 to 6:00) represent afternoon/evening (13:00 - 18:00),
  // not early morning before dawn.
  if (!isPM && !isAM && h >= 1 && h <= 6) {
    h += 12;
  }

  return { hours: h, minutes: m };
}

/**
 * Calculates the exact scheduled Date object for an Addis weekend event relative to current live date.
 */
export function getEventExactDate(event: AddisEvent, refDate: Date = new Date()): Date {
  // If event has an explicit YYYY-MM-DD date in dateStr, honor that exact date
  const isoMatch = event.dateStr?.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const month = parseInt(isoMatch[2], 10) - 1;
    const day = parseInt(isoMatch[3], 10);
    const { hours, minutes } = parseEventTime(event.time, event.dateStr);
    return new Date(year, month, day, hours, minutes, 0, 0);
  }

  const currentDay = refDate.getDay(); // 0 is Sun, 1 is Mon ... 5 is Fri, 6 is Sat

  let friOffset = 0;
  let satOffset = 0;
  let sunOffset = 0;

  if (currentDay >= 1 && currentDay <= 4) {
    // Mon - Thu: upcoming weekend
    friOffset = 5 - currentDay;
    satOffset = 6 - currentDay;
    sunOffset = 7 - currentDay;
  } else if (currentDay === 5) {
    // Friday: today
    friOffset = 0;
    satOffset = 1;
    sunOffset = 2;
  } else if (currentDay === 6) {
    // Saturday: Fri was yesterday (-1), Sat is today (0), Sun is tomorrow (+1)
    friOffset = -1;
    satOffset = 0;
    sunOffset = 1;
  } else {
    // Sunday (0): Fri was -2, Sat was -1, Sun is today (0)
    friOffset = -2;
    satOffset = -1;
    sunOffset = 0;
  }

  const dayLower = (event.dayOfWeek || '').toLowerCase();
  let dayOffset = satOffset; // default to Saturday
  if (dayLower.includes('fri')) {
    dayOffset = friOffset;
  } else if (dayLower.includes('sun')) {
    dayOffset = sunOffset;
  }

  const { hours, minutes } = parseEventTime(event.time, event.dateStr);
  const eventDate = new Date(
    refDate.getFullYear(),
    refDate.getMonth(),
    refDate.getDate() + dayOffset,
    hours,
    minutes,
    0,
    0
  );

  return eventDate;
}

/**
 * Checks whether an event's exact start time has passed relative to live current time.
 * For example: if an event is on Friday at 3:00 PM (15:00), at 3:01 PM (15:01) this returns true.
 */
export function isEventPast(event: AddisEvent, now: Date = new Date()): boolean {
  const eventDate = getEventExactDate(event, now);
  return now.getTime() >= eventDate.getTime();
}

/**
 * Filters out all events whose start time has already passed.
 * Any past event is immediately removed.
 */
export function filterActiveUpcomingEvents(events: AddisEvent[], now: Date = new Date()): AddisEvent[] {
  if (!events || events.length === 0) return [];

  // Filter out any event whose scheduled time has already passed
  return events.filter(event => !isEventPast(event, now));
}

/**
 * Returns a human-friendly live countdown or time badge.
 * e.g. "Starts in 45 mins 🔥", "Today at 3:00 PM", "Tomorrow at 4:30 PM"
 */
export function getLiveEventTimingBadge(event: AddisEvent, now: Date = new Date()): {
  label: string;
  isSoon: boolean;
  isToday: boolean;
} {
  const eventDate = getEventExactDate(event, now);
  const diffMs = eventDate.getTime() - now.getTime();

  if (diffMs <= 0) {
    return { label: 'Event Ended / Started', isSoon: false, isToday: false };
  }

  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffMins < 60) {
    return {
      label: `Starts in ${diffMins} min${diffMins === 1 ? '' : 's'} 🔥`,
      isSoon: true,
      isToday: true
    };
  }

  const isToday = eventDate.getDate() === now.getDate() && eventDate.getMonth() === now.getMonth();
  if (isToday) {
    if (diffHours < 6) {
      return {
        label: `Today in ${diffHours}h ${diffMins % 60}m ✨`,
        isSoon: true,
        isToday: true
      };
    }
    return {
      label: `Today at ${event.time || '18:00'}`,
      isSoon: false,
      isToday: true
    };
  }

  const isTomorrow =
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getDate() === eventDate.getDate();

  if (isTomorrow) {
    return {
      label: `Tomorrow at ${event.time || '18:00'}`,
      isSoon: false,
      isToday: false
    };
  }

  return {
    label: event.dateStr || `${event.dayOfWeek} at ${event.time}`,
    isSoon: false,
    isToday: false
  };
}
