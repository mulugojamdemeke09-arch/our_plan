'use client';

import React, { useState } from 'react';
import { AddisEvent } from '@/lib/types';
import { 
  Compass, 
  Music, 
  Palette, 
  Trees, 
  UtensilsCrossed, 
  Film, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  Plus, 
  HeartHandshake,
  Search,
  Filter
} from 'lucide-react';

interface EventsExplorerProps {
  events: AddisEvent[];
  onPlanDateFromEvent: (event: AddisEvent) => void;
  onOpenNewCustomEvent: () => void;
}

export const EventsExplorer: React.FC<EventsExplorerProps> = ({
  events,
  onPlanDateFromEvent,
  onOpenNewCustomEvent
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredEvents = events.filter(evt => {
    if (selectedCategory !== 'all' && evt.category !== selectedCategory) return false;
    if (selectedDay !== 'all') {
      if (selectedDay === 'friday' && !evt.dayOfWeek.includes('Friday')) return false;
      if (selectedDay === 'saturday' && !evt.dayOfWeek.includes('Saturday')) return false;
      if (selectedDay === 'sunday' && !evt.dayOfWeek.includes('Sunday')) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = 
        evt.title.toLowerCase().includes(q) ||
        evt.venue.toLowerCase().includes(q) ||
        evt.neighborhood.toLowerCase().includes(q) ||
        evt.description.toLowerCase().includes(q) ||
        evt.tags.some(t => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'music': return <Music size={14} />;
      case 'art': return <Palette size={14} />;
      case 'outdoor': return <Trees size={14} />;
      case 'food': return <UtensilsCrossed size={14} />;
      case 'cinema': return <Film size={14} />;
      default: return <Sparkles size={14} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass size={22} color="var(--rose-400)" />
            Addis Ababa Weekend Events
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
            Curated concerts, art openings, and escapes to plan your date around
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={async () => {
              try {
                await fetch('/api/events/sync', { method: 'POST' });
                window.location.reload();
              } catch (e) {
                console.error(e);
              }
            }}
            style={{
              padding: '8px 14px',
              fontSize: '0.78rem',
              fontWeight: 700,
              borderRadius: '10px',
              backgroundColor: 'rgba(52, 211, 153, 0.15)',
              border: '1px solid rgba(52, 211, 153, 0.4)',
              color: '#34d399',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="Real-time live weekend events schedule"
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            <span>🔴 Live Real-Time Weekend Events</span>
          </button>

          <button
            onClick={onOpenNewCustomEvent}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          >
            <Plus size={15} /> Add Custom Event
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search Ethio-Jazz, Entoto bonfires, art galleries, Sarbet brunch…"
          className="form-input"
          style={{ paddingLeft: '40px' }}
        />
        <Search
          size={18}
          color="var(--text-muted)"
          style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
        />
      </div>

      {/* Category Pills */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px'
        }}
      >
        {[
          { id: 'all', label: 'All Addis Events' },
          { id: 'music', label: '🎷 Live Music & Jazz' },
          { id: 'outdoor', label: '🌲 Outdoor & Nature' },
          { id: 'art', label: '🎨 Art & Paint' },
          { id: 'food', label: '🥐 Food & Markets' },
          { id: 'cinema', label: '🎬 Open-Air Cinema' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '8px 14px',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              backgroundColor: selectedCategory === cat.id ? 'var(--rose-600)' : 'rgba(255, 255, 255, 0.05)',
              color: selectedCategory === cat.id ? '#fff' : 'var(--text-secondary)',
              border: selectedCategory === cat.id ? '1px solid var(--rose-400)' : '1px solid var(--border-subtle)'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Day Filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
        <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Filter Day:</span>
        {[
          { id: 'all', label: 'All Days' },
          { id: 'friday', label: 'Friday Eve' },
          { id: 'saturday', label: 'Saturday' },
          { id: 'sunday', label: 'Sunday' }
        ].map(d => (
          <button
            key={d.id}
            onClick={() => setSelectedDay(d.id)}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '0.76rem',
              fontWeight: 600,
              backgroundColor: selectedDay === d.id ? 'rgba(244, 63, 94, 0.2)' : 'transparent',
              color: selectedDay === d.id ? 'var(--rose-400)' : 'var(--text-secondary)',
              border: selectedDay === d.id ? '1px solid var(--rose-400)' : '1px solid transparent'
            }}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="glass-panel" style={{ padding: '36px 20px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            No events match your search or filter. Try another keyword!
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px'
          }}
        >
          {filteredEvents.map(evt => (
            <article
              key={evt.id}
              className="glass-panel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px',
                overflow: 'hidden'
              }}
            >
              {/* Image banner */}
              <div
                style={{
                  position: 'relative',
                  height: '160px',
                  backgroundImage: `url(${evt.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(14, 18, 30, 0.95), rgba(0, 0, 0, 0.2))'
                  }}
                />
                
                {/* Badges on image */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    display: 'flex',
                    gap: '6px'
                  }}
                >
                  <span className="badge-purple">
                    {getCategoryIcon(evt.category)} {evt.category.toUpperCase()}
                  </span>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '14px',
                    right: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                  }}
                >
                  <span className="badge-rose" style={{ fontSize: '0.72rem' }}>
                    <Calendar size={12} /> {evt.dateStr}
                  </span>
                  <span
                    style={{
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      color: 'var(--gold-400)',
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      padding: '3px 8px',
                      borderRadius: '6px'
                    }}
                  >
                    {typeof evt.priceETB === 'number' ? `${evt.priceETB} ETB` : evt.priceETB}
                  </span>
                </div>
              </div>

              {/* Event Body */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.3 }}>
                  {evt.title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <MapPin size={13} color="var(--rose-400)" />
                  <span style={{ fontWeight: 600 }}>{evt.venue}</span>
                  <span style={{ color: 'var(--text-muted)' }}>• {evt.neighborhood}</span>
                </div>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {evt.description}
                </p>

                {/* Romantic Highlight Box */}
                <div
                  style={{
                    backgroundColor: 'rgba(244, 63, 94, 0.08)',
                    borderLeft: '3px solid var(--rose-400)',
                    padding: '8px 12px',
                    borderRadius: '0 8px 8px 0',
                    fontSize: '0.78rem',
                    color: '#fecdd3',
                    lineHeight: 1.4
                  }}
                >
                  <strong style={{ color: 'var(--rose-400)' }}>Couple Highlight: </strong>
                  {evt.romanticReason}
                </div>

                {/* Dress code & organizer */}
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 'auto', paddingTop: '6px' }}>
                  👔 Recommended Vibe: <span style={{ color: '#fff' }}>{evt.recommendedDressCode}</span>
                </div>

                {/* Action button */}
                <button
                  onClick={() => onPlanDateFromEvent(evt)}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '0.85rem',
                    marginTop: '8px'
                  }}
                >
                  <HeartHandshake size={16} /> Make Date From This Event
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
