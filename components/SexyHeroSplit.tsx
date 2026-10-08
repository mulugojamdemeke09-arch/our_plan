'use client';

import React, { useState, useEffect } from 'react';
import { DatePlan, DateSpot } from '@/lib/types';
import { 
  Sparkles, 
  Heart, 
  Clock, 
  MapPin, 
  Calendar, 
  Download, 
  Navigation, 
  Compass, 
  Volume2, 
  Flame, 
  Wine, 
  Coffee, 
  Music, 
  Trees, 
  ArrowRight
} from 'lucide-react';

interface SexyHeroSplitProps {
  upcomingDate?: DatePlan;
  onOpenNewDate: () => void;
  onExploreEvents: () => void;
  onExploreSpots: () => void;
}

export const SexyHeroSplit: React.FC<SexyHeroSplitProps> = ({
  upcomingDate,
  onOpenNewDate,
  onExploreEvents,
  onExploreSpots
}) => {
  const [selectedVibe, setSelectedVibe] = useState<'dinner' | 'coffee' | 'dessert' | 'jazz' | 'nature'>('dinner');
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isWeekend: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isWeekend: false
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 Sun, 6 Sat, 5 Fri
      const isWeekendNow = currentDay === 0 || currentDay === 6 || (currentDay === 5 && now.getHours() >= 17);

      let target: Date;
      if (upcomingDate?.targetDate) {
        const [y, m, d] = upcomingDate.targetDate.split('-').map(Number);
        const [hr, min] = (upcomingDate.time || '18:00').split(':').map(Number);
        target = new Date(y, m - 1, d, hr, min);
      } else {
        const daysUntilSat = (6 - currentDay + 7) % 7 || 7;
        target = new Date(now);
        target.setDate(now.getDate() + daysUntilSat);
        target.setHours(11, 0, 0, 0);
      }

      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isWeekend: isWeekendNow });
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
          isWeekend: isWeekendNow
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [upcomingDate]);

  const VIBES = {
    dinner: {
      image: '/hero-romantic.jpg',
      tag: 'CANDLELIT NIGHT',
      title: 'Rooftop Dinner & Wine Under Addis Lights',
      spotName: 'Gusto Ristorante & Entoto Kuriftu',
      soundtrack: 'Soft Italian Cello & Ambient Jazz',
      quote: 'Dressed up, eyes locked, clinking glasses over the glowing city skyline.'
    },
    coffee: {
      image: '/hero-coffee.jpg',
      tag: 'MORNING SANCTUARY',
      title: 'Sunlit Ethiopian Coffee & Slow Whispers',
      spotName: 'Tomoca Piassa & Galani Sanctuary',
      soundtrack: 'Jebena Roast crackles & Acoustic Soul',
      quote: 'Steam rising from fresh macchiatos, warm morning light, and all the time in the world.'
    },
    dessert: {
      image: '/hero-coffee.jpg',
      tag: 'SWEET INDULGENCE',
      title: 'Molten Chocolate, Waffles & Sweet Whispers',
      spotName: 'Caramel Pastry & Gelato Addis',
      soundtrack: 'Romantic Bossa Nova & Acoustic Piano',
      quote: 'Feeding each other Belgian dark chocolate truffles, molten lava cake, and pistachio gelato.'
    },
    jazz: {
      image: '/hero-romantic.jpg',
      tag: 'ETHIO-JAZZ & TEJ',
      title: 'Hypnotic Saxophone & Kazanchis Rhythm',
      spotName: 'Fendika Cultural Centre',
      soundtrack: 'Mulatu Astatke & Azmari Beats',
      quote: 'Sharing carafes of golden honey wine while the horn section burns the midnight air.'
    },
    nature: {
      image: '/hero-romantic.jpg',
      tag: 'MOUNTAIN ESCAPE',
      title: 'Pine Forest Sunset & Bonfire Warmth',
      spotName: 'Entoto Natural Park Hills',
      soundtrack: 'Mountain Breeze & Acoustic Guitars',
      quote: 'Wrapped in a cozy blanket at 2,600m above the world, watching the golden hour fade.'
    }
  };

  const currentVibeData = VIBES[selectedVibe];

  const downloadICS = () => {
    if (upcomingDate?.id) {
      window.open(`/api/export-ics?id=${upcomingDate.id}`, '_blank');
    } else {
      window.open('/api/export-ics', '_blank');
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, rgba(28, 20, 32, 0.95), rgba(16, 17, 26, 0.95))',
        border: '1px solid rgba(244, 63, 94, 0.3)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 40px rgba(244, 63, 94, 0.15)',
        marginBottom: '26px'
      }}
    >
      {/* Background warm lighting aura */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          left: '20%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.16) 0%, rgba(244, 63, 94, 0.12) 50%, transparent 75%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Main Side-by-Side Container */}
      <div
        className="hero-split-grid"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          alignItems: 'stretch',
          minHeight: '520px'
        }}
      >
        {/* LEFT COLUMN: Sexy Romantic Messaging & Countdown */}
        <div
          style={{
            padding: '36px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '24px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(0, 0, 0, 0.2))'
          }}
        >
          {/* Top Tag & Status */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.2), rgba(245, 158, 11, 0.15))',
                border: '1px solid rgba(244, 63, 94, 0.35)',
                marginBottom: '16px'
              }}
            >
              <Flame size={14} color="var(--rose-400)" />
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--gold-300)'
                }}
              >
                Our Weekend Sanctuary • Addis Ababa
              </span>
            </div>

            {/* Seductive Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                color: '#fff',
                marginBottom: '14px',
                letterSpacing: '-0.01em',
                textShadow: '0 2px 20px rgba(0,0,0,0.5)'
              }}
            >
              Forget the 9 to 5.<br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #f43f5e 20%, #fbbf24 85%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontStyle: 'italic'
                }}
              >
                The Weekend Belongs to Us.
              </span>
            </h1>

            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                maxWidth: '480px'
              }}
            >
              Five busy workdays are behind you. Now it’s just the two of you — candlelit rooftop dinners in Bole, fresh mountain breezes in Entoto, and slow Sunday macchiatos.
            </p>
          </div>

          {/* Seductive Countdown Glass Card */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '18px',
              padding: '18px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={15} color="var(--gold-400)" />
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>
                  {timeLeft.isWeekend ? '🎉 IT’S DATE WEEKEND' : 'COUNTDOWN TO OUR DATE'}
                </span>
              </div>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: 'var(--rose-400)',
                  backgroundColor: 'rgba(244, 63, 94, 0.15)',
                  padding: '2px 8px',
                  borderRadius: '6px'
                }}
              >
                {upcomingDate?.dayLabel || 'Saturday Date'}
              </span>
            </div>

            {/* Glowing Digits */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px'
              }}
            >
              {[
                { label: 'DAYS', val: timeLeft.days, color: '#fb7185' },
                { label: 'HOURS', val: timeLeft.hours, color: '#fbbf24' },
                { label: 'MINUTES', val: timeLeft.minutes, color: '#f8fafc' },
                { label: 'SECONDS', val: timeLeft.seconds, color: '#c084fc' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.35)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '10px 4px',
                    textAlign: 'center'
                  }}
                >
                  <div
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-heading)',
                      color: item.color,
                      lineHeight: 1
                    }}
                  >
                    {String(item.val).padStart(2, '0')}
                  </div>
                  <div
                    style={{
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      letterSpacing: '0.08em',
                      marginTop: '4px'
                    }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <button
              onClick={onOpenNewDate}
              className="btn-primary"
              style={{
                padding: '13px 26px',
                fontSize: '0.94rem',
                gap: '8px',
                flex: 1,
                minWidth: '180px'
              }}
            >
              <Wine size={18} /> Plan Our Date
            </button>

            <button
              onClick={onExploreEvents}
              className="btn-secondary"
              style={{
                padding: '13px 20px',
                fontSize: '0.94rem',
                gap: '8px'
              }}
            >
              <Compass size={17} /> Addis Events
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Warm Luxury Photography Showcase & Live Romance Card */}
        <div
          style={{
            position: 'relative',
            minHeight: '420px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px',
            backgroundImage: `url(${currentVibeData.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 0.5s ease-in-out'
          }}
        >
          {/* Seductive gradient overlay: protects contrast & creates sensual vignette */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(12, 14, 23, 0.95) 0%, rgba(12, 14, 23, 0.35) 45%, rgba(12, 14, 23, 0.7) 100%)',
              pointerEvents: 'none'
            }}
          />

          {/* Top Floating Glass Header: Addis Weather & Audio Vibe */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {/* Live Audio Vibe indicator */}
            <div
              style={{
                background: 'rgba(10, 12, 20, 0.75)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '999px',
                padding: '6px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
              }}
            >
              <Volume2 size={14} color="var(--rose-400)" />
              <span style={{ fontSize: '0.74rem', color: '#fff', fontWeight: 600 }}>
                {currentVibeData.soundtrack}
              </span>
            </div>

            {/* Addis Location Badge */}
            <div
              style={{
                background: 'rgba(10, 12, 20, 0.75)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '999px',
                padding: '6px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--gold-400)',
                fontSize: '0.74rem',
                fontWeight: 600
              }}
            >
              <MapPin size={13} />
              <span>Addis Ababa • 22°C</span>
            </div>
          </div>

          {/* Center Interactive Vibe Switcher */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              margin: 'auto 0 16px 0'
            }}
          >
            {[
              { id: 'dinner', label: '🍷 Candlelit Dinner', icon: Wine },
              { id: 'coffee', label: '☕ Morning Bunna', icon: Coffee },
              { id: 'dessert', label: '🍰 Sweet Dessert', icon: Wine },
              { id: 'jazz', label: '🎷 Live Ethio-Jazz', icon: Music },
              { id: 'nature', label: '🌲 Entoto Forest', icon: Trees }
            ].map(v => {
              const active = selectedVibe === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedVibe(v.id as any)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '999px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    backgroundColor: active ? 'rgba(244, 63, 94, 0.9)' : 'rgba(10, 12, 20, 0.7)',
                    backdropFilter: 'blur(12px)',
                    color: '#fff',
                    border: active ? '1px solid #fff' : '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: active ? '0 4px 14px var(--rose-glow)' : 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  {v.label}
                </button>
              );
            })}
          </div>

          {/* Bottom Floating Featured Date Glass Card */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              background: 'rgba(15, 18, 30, 0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '20px',
              padding: '18px 20px',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  color: 'var(--rose-400)',
                  textTransform: 'uppercase'
                }}
              >
                {currentVibeData.tag}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--gold-400)', fontWeight: 600 }}>
                📍 {currentVibeData.spotName}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '6px',
                lineHeight: 1.25
              }}
            >
              {currentVibeData.title}
            </h3>

            <p
              style={{
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.4,
                marginBottom: '14px',
                fontStyle: 'italic'
              }}
            >
              "{currentVibeData.quote}"
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={downloadICS}
                className="btn-gold"
                style={{
                  padding: '8px 14px',
                  fontSize: '0.8rem',
                  gap: '6px',
                  flex: 1
                }}
                title="Download .ics for native Apple Calendar sync"
              >
                <Download size={14} /> Add to iPhone Calendar
              </button>

              <button
                onClick={onExploreSpots}
                className="btn-secondary"
                style={{
                  padding: '8px 14px',
                  fontSize: '0.8rem',
                  gap: '6px'
                }}
              >
                <Navigation size={14} /> View on Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
