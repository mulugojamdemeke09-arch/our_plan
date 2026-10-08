'use client';

import React, { useState, useEffect } from 'react';
import { DatePlan } from '@/lib/types';
import { Clock, Calendar, Heart, Sparkles, MapPin, Download, CheckCircle2 } from 'lucide-react';

interface WeekendCountdownProps {
  upcomingDate?: DatePlan;
  onOpenNewDate: () => void;
  onOpenDateDetails?: (date: DatePlan) => void;
}

export const WeekendCountdown: React.FC<WeekendCountdownProps> = ({
  upcomingDate,
  onOpenNewDate,
  onOpenDateDetails
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isWeekendNow: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isWeekendNow: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 is Sun, 6 is Sat, 5 is Fri
      
      const isWeekend = currentDay === 0 || currentDay === 6 || (currentDay === 5 && now.getHours() >= 17);

      let targetTime: Date;

      if (upcomingDate?.targetDate) {
        const [y, m, d] = upcomingDate.targetDate.split('-').map(Number);
        const [hr, min] = (upcomingDate.time || '14:00').split(':').map(Number);
        targetTime = new Date(y, m - 1, d, hr, min);
      } else {
        // Calculate next Saturday 10:00 AM
        const daysUntilSat = (6 - currentDay + 7) % 7 || 7;
        targetTime = new Date(now);
        targetTime.setDate(now.getDate() + daysUntilSat);
        targetTime.setHours(10, 0, 0, 0);
      }

      const diff = targetTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isWeekendNow: isWeekend
        });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isWeekendNow: isWeekend
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [upcomingDate]);

  const downloadICS = (dateId: string) => {
    window.open(`/api/export-ics?id=${dateId}`, '_blank');
  };

  return (
    <section
      className="glass-panel"
      style={{
        padding: '24px 20px',
        marginBottom: '24px',
        background: 'linear-gradient(135deg, rgba(30, 20, 36, 0.85), rgba(15, 18, 30, 0.9))',
        border: '1px solid rgba(244, 63, 94, 0.25)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(244, 63, 94, 0.15)'
      }}
    >
      {/* Top Banner: Couple dynamic & M-F busy schedule reminder */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '18px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '14px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge-rose">
            <Heart size={12} fill="currentColor" /> Couple Date Mode
          </span>
          <span className="badge-gold">
            <Clock size={12} /> Mon–Fri Work Free Zone
          </span>
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <MapPin size={13} color="var(--rose-400)" /> Addis Ababa • 22°C Mild
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Sparkles size={18} color="var(--gold-400)" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
              {timeLeft.isWeekendNow ? '🎉 It’s Date Weekend!' : 'Weekend Date Countdown'}
            </h2>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
            {timeLeft.isWeekendNow
              ? 'Work is done for the week! Time to disconnect and enjoy Addis Ababa together.'
              : 'Hang in there during the busy work week! Your next romantic escape is coming up:'}
          </p>

          {/* Realtime Countdown Blocks */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px',
              maxWidth: '380px',
              marginBottom: '20px'
            }}
          >
            {[
              { label: 'DAYS', val: timeLeft.days },
              { label: 'HOURS', val: timeLeft.hours },
              { label: 'MINS', val: timeLeft.minutes },
              { label: 'SECS', val: timeLeft.seconds }
            ].map((unit, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '10px 4px',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-heading)',
                    color: i === 0 ? 'var(--rose-400)' : i === 1 ? 'var(--gold-400)' : '#fff',
                    lineHeight: 1
                  }}
                >
                  {String(unit.val).padStart(2, '0')}
                </div>
                <div style={{ fontSize: '0.62rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '4px', letterSpacing: '0.05em' }}>
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Upcoming Date Card */}
        {upcomingDate ? (
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--rose-400)', fontWeight: 700 }}>
                  Next Up • {upcomingDate.dayLabel || 'Saturday'}
                </div>
                <h3 style={{ fontSize: '1.05rem', marginTop: '2px' }}>{upcomingDate.title}</h3>
              </div>
              <span className="badge-emerald" style={{ fontSize: '0.7rem' }}>
                <CheckCircle2 size={12} /> {upcomingDate.status.toUpperCase()}
              </span>
            </div>

            {upcomingDate.spots.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <MapPin size={14} color="var(--rose-400)" />
                <span>
                  {upcomingDate.spots.map(s => s.name).join(' → ')}
                </span>
              </div>
            )}

            {upcomingDate.notes && (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: 0 }}>
                "{upcomingDate.notes}"
              </p>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
              <button
                onClick={() => downloadICS(upcomingDate.id)}
                className="btn-secondary"
                style={{
                  padding: '8px 14px',
                  fontSize: '0.8rem',
                  gap: '6px'
                }}
                title="Download .ics for Apple Calendar or Google Calendar"
              >
                <Download size={14} /> Add to iPhone Calendar
              </button>

              {upcomingDate.spots[0] && (
                <a
                  href={upcomingDate.spots[0].appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{
                    padding: '8px 14px',
                    fontSize: '0.8rem',
                    gap: '6px',
                    textDecoration: 'none'
                  }}
                >
                  <MapPin size={14} /> Apple Maps
                </a>
              )}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '12px' }}>
              No dates scheduled yet for this weekend!
            </p>
            <button onClick={onOpenNewDate} className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
              Plan Our Saturday Date
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
