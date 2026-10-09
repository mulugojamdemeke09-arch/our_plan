import prisma from './prisma';

export interface CreateNotificationParams {
  coupleSpaceId: string;
  actorId?: string;
  actorName: string;
  recipientId?: string;
  title: string;
  message: string;
  type: 'date_created' | 'date_updated' | 'date_deleted' | 'checklist_toggle' | 'partner_joined';
  datePlanId?: string;
}

export async function createCoupleNotification(params: CreateNotificationParams) {
  try {
    return await prisma.notification.create({
      data: {
        coupleSpaceId: params.coupleSpaceId,
        actorId: params.actorId ?? null,
        actorName: params.actorName,
        recipientId: params.recipientId ?? null,
        title: params.title,
        message: params.message,
        type: params.type,
        datePlanId: params.datePlanId ?? null,
        read: false
      }
    });
  } catch (err) {
    console.error('Failed to create notification:', err);
    return null;
  }
}

export async function getCoupleNotifications(coupleSpaceId: string) {
  try {
    const notifications = await prisma.notification.findMany({
      where: { coupleSpaceId },
      orderBy: { createdAt: 'desc' },
      take: 30
    });

    const unreadCount = notifications.filter(n => !n.read).length;
    return { notifications, unreadCount };
  } catch {
    return { notifications: [], unreadCount: 0 };
  }
}

export async function markAllNotificationsRead(coupleSpaceId: string) {
  try {
    await prisma.notification.updateMany({
      where: { coupleSpaceId, read: false },
      data: { read: true }
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Self-updating weekend events engine:
 * Dynamically updates all curated Addis weekend events to match this coming weekend's exact dates.
 */
export async function autoUpdateWeekendEvents() {
  try {
    const now = new Date();
    const currentDay = now.getDay(); // 0 is Sun, 1 is Mon ... 5 is Fri, 6 is Sat

    let friOffset = 0;
    let satOffset = 0;
    let sunOffset = 0;

    if (currentDay >= 1 && currentDay <= 4) {
      // Monday through Thursday: point to upcoming Friday, Saturday, Sunday
      friOffset = 5 - currentDay;
      satOffset = 6 - currentDay;
      sunOffset = 7 - currentDay;
    } else if (currentDay === 5) {
      // Friday: Friday is today, Saturday is tomorrow, Sunday is +2
      friOffset = 0;
      satOffset = 1;
      sunOffset = 2;
    } else if (currentDay === 6) {
      // Saturday: Friday was yesterday, Saturday is today, Sunday is tomorrow
      friOffset = -1;
      satOffset = 0;
      sunOffset = 1;
    } else {
      // Sunday (0): Friday was -2, Saturday was -1, Sunday is today
      friOffset = -2;
      satOffset = -1;
      sunOffset = 0;
    }

    const friDate = new Date(now);
    friDate.setDate(now.getDate() + friOffset);

    const satDate = new Date(now);
    satDate.setDate(now.getDate() + satOffset);

    const sunDate = new Date(now);
    sunDate.setDate(now.getDate() + sunOffset);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const formatEventDate = (d: Date, dayLabel: string, timeStr: string) => {
      const month = monthNames[d.getMonth()];
      const day = d.getDate();
      return `This ${dayLabel} (${month} ${day}) • ${timeStr}`;
    };

    const events = await prisma.event.findMany({ where: { autoUpdate: true } });

    for (const ev of events) {
      let targetDate = satDate;
      let dayName = 'Saturday';

      if (ev.dayOfWeek.toLowerCase().includes('fri')) {
        targetDate = friDate;
        dayName = 'Friday';
      } else if (ev.dayOfWeek.toLowerCase().includes('sun')) {
        targetDate = sunDate;
        dayName = 'Sunday';
      }

      const timeParts = (ev.time || '18:00').split(':');
      const hours = Number(timeParts[0]);
      const minutes = timeParts[1] || '00';
      const timeFormatted = hours >= 12
        ? `${hours === 12 ? 12 : hours - 12}:${minutes} PM`
        : `${hours === 0 ? 12 : hours}:${minutes} AM`;

      const updatedDateStr = formatEventDate(targetDate, dayName, timeFormatted);

      if (ev.dateStr !== updatedDateStr) {
        await prisma.event.update({
          where: { id: ev.id },
          data: { dateStr: updatedDateStr }
        });
      }
    }
  } catch (err) {
    console.error('Failed to auto-update events:', err);
  }
}
