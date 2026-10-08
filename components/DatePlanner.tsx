'use client';

import React, { useState } from 'react';
import { DatePlan, ChecklistItem, DateSpot } from '@/lib/types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckSquare, 
  Square, 
  Sparkles, 
  Download, 
  Trash2, 
  Edit3, 
  Heart, 
  DollarSign, 
  Shirt, 
  Plus, 
  CheckCircle2, 
  Navigation,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DatePlannerProps {
  dates: DatePlan[];
  onRefresh: () => void;
  onOpenNewDate: () => void;
  onEditDate: (date: DatePlan) => void;
  onViewSpotDetail?: (spot: DateSpot) => void;
}

export const DatePlanner: React.FC<DatePlannerProps> = ({
  dates,
  onRefresh,
  onOpenNewDate,
  onEditDate,
  onViewSpotDetail
}) => {
  const [filterDay, setFilterDay] = useState<string>('all');
  const [expandedChecklistId, setExpandedChecklistId] = useState<string | null>(null);

  const filteredDates = dates.filter(date => {
    if (filterDay === 'all') return true;
    if (filterDay === 'saturday') return date.dayLabel?.toLowerCase().includes('sat');
    if (filterDay === 'sunday') return date.dayLabel?.toLowerCase().includes('sun');
    if (filterDay === 'friday') return date.dayLabel?.toLowerCase().includes('fri');
    return true;
  });

  const toggleChecklistItem = async (date: DatePlan, itemIndex: number) => {
    const updatedChecklist = date.checklist.map((c, idx) => 
      idx === itemIndex ? { ...c, done: !c.done } : c
    );

    try {
      await fetch('/api/dates', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: date.id,
          checklist: updatedChecklist
        })
      });
      onRefresh();
    } catch (err) {
      console.error('Error updating checklist:', err);
    }
  };

  const markCompleted = async (date: DatePlan) => {
    try {
      await fetch('/api/dates', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: date.id,
          status: date.status === 'completed' ? 'confirmed' : 'completed'
        })
      });

      if (date.status !== 'completed') {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#fb7185', '#fbbf24', '#c084fc']
        });
      }

      onRefresh();
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  };

  const deleteDate = async (id: string) => {
    if (!window.confirm('Remove this weekend date plan?')) return;
    try {
      await fetch(`/api/dates?id=${id}`, { method: 'DELETE' });
      onRefresh();
    } catch (err) {
      console.error('Error deleting date:', err);
    }
  };

  const downloadICS = (id: string) => {
    window.open(`/api/export-ics?id=${id}`, '_blank');
  };

  const getGoogleMapsDirectionsUrl = (spots: DateSpot[]) => {
    if (spots.length === 0) return 'https://www.google.com/maps/search/?api=1&query=Addis+Ababa';
    if (spots.length === 1) return spots[0].googleMapsUrl;
    const origin = encodeURIComponent(`${spots[0].name}, Addis Ababa`);
    const destination = encodeURIComponent(`${spots[spots.length - 1].name}, Addis Ababa`);
    const waypoints = spots.slice(1, -1).map(s => encodeURIComponent(`${s.name}, Addis Ababa`)).join('|');
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${waypoints}` : ''}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-rose" style={{ fontSize: '0.74rem' }}>
              <Heart size={12} fill="currentColor" /> Couple Itinerary
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Addis Ababa Weekend Escapes
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: '#fff' }}>
            Our Date Itinerary
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            Simple, romantic plans for your upcoming Saturday & Sunday together
          </p>
        </div>

        <button
          onClick={onOpenNewDate}
          className="btn-primary"
          style={{ padding: '11px 22px', fontSize: '0.9rem', gap: '8px' }}
        >
          <Plus size={18} /> Plan a Weekend Date
        </button>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px'
        }}
      >
        {[
          { id: 'all', label: 'All Weekend Dates' },
          { id: 'saturday', label: '✨ Saturday Escapes' },
          { id: 'sunday', label: '☕ Sunday Leisure' },
          { id: 'friday', label: '🍷 Friday Evenings' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterDay(tab.id)}
            style={{
              padding: '8px 18px',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              backgroundColor: filterDay === tab.id ? 'var(--rose-500)' : 'rgba(255, 255, 255, 0.05)',
              color: filterDay === tab.id ? '#fff' : 'var(--text-secondary)',
              border: filterDay === tab.id ? '1px solid var(--rose-400)' : '1px solid var(--border-subtle)',
              boxShadow: filterDay === tab.id ? '0 4px 14px var(--rose-glow)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Date Cards List */}
      {filteredDates.length === 0 ? (
        <div
          className="glass-panel"
          style={{
            padding: '50px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            background: 'linear-gradient(135deg, rgba(24, 18, 30, 0.8), rgba(14, 16, 26, 0.8))'
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'rgba(244, 63, 94, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--rose-400)'
            }}
          >
            <Calendar size={28} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#fff' }}>
            No dates scheduled yet
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '380px', lineHeight: 1.5 }}>
            Pick from the best coffee houses, dessert parlors, or live jazz events in Addis and plan your weekend escape!
          </p>
          <button onClick={onOpenNewDate} className="btn-primary" style={{ marginTop: '8px' }}>
            <Plus size={16} /> Create Date Plan
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '22px' }}>
          {filteredDates.map(date => {
            const isCompleted = date.status === 'completed';
            const coverImage = date.spots[0]?.image || date.event?.image || '/hero-romantic.jpg';
            const isChecklistOpen = expandedChecklistId === date.id;
            const completedChecklistCount = date.checklist.filter(c => c.done).length;

            return (
              <article
                key={date.id}
                className="glass-panel"
                style={{
                  borderRadius: '22px',
                  overflow: 'hidden',
                  border: isCompleted 
                    ? '1px solid rgba(16, 185, 129, 0.45)' 
                    : '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease'
                }}
              >
                {/* Visual Header Banner */}
                <div
                  style={{
                    position: 'relative',
                    height: '140px',
                    backgroundImage: `url(${coverImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(14, 16, 26, 0.96) 10%, rgba(14, 16, 26, 0.4) 60%, rgba(0, 0, 0, 0.6) 100%)'
                    }}
                  />

                  {/* Top Badges */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      right: '12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '8px',
                      flexWrap: 'wrap'
                    }}
                  >
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '999px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(10px)',
                        color: 'var(--rose-400)',
                        border: '1px solid rgba(244, 63, 94, 0.35)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}
                    >
                      <Calendar size={12} />
                      <span>{date.dayLabel || 'Weekend'} • {date.targetDate}</span>
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                      <button
                        onClick={() => markCompleted(date)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          backgroundColor: isCompleted ? 'rgba(16, 185, 129, 0.9)' : 'rgba(0, 0, 0, 0.75)',
                          backdropFilter: 'blur(10px)',
                          color: '#fff',
                          border: isCompleted ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <CheckCircle2 size={12} /> {isCompleted ? 'Loved it! ❤️' : 'Mark Done'}
                      </button>

                      <button
                        onClick={() => onEditDate(date)}
                        style={{
                          padding: '5px',
                          backgroundColor: 'rgba(0,0,0,0.75)',
                          backdropFilter: 'blur(8px)',
                          borderRadius: '8px',
                          color: '#fff',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Edit date"
                        aria-label="Edit date"
                      >
                        <Edit3 size={13} />
                      </button>

                      <button
                        onClick={() => deleteDate(date.id)}
                        style={{
                          padding: '5px',
                          backgroundColor: 'rgba(0,0,0,0.75)',
                          backdropFilter: 'blur(8px)',
                          borderRadius: '8px',
                          color: 'var(--rose-400)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Delete date"
                        aria-label="Delete date"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Image Details */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        color: 'var(--gold-400)',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        padding: '3px 10px',
                        borderRadius: '6px'
                      }}
                    >
                      ⏰ {date.time} ({date.timeSlot})
                    </span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        color: '#fff',
                        backgroundColor: 'rgba(255, 255, 255, 0.12)',
                        padding: '3px 9px',
                        borderRadius: '6px'
                      }}
                    >
                      Proposed by: <strong>{date.proposedBy}</strong>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: isCompleted ? 'var(--text-secondary)' : '#fff',
                      textDecoration: isCompleted ? 'line-through' : 'none',
                      lineHeight: 1.25
                    }}
                  >
                    {date.title}
                  </h3>

                  {/* Notes / Romance Quote */}
                  {date.notes && (
                    <div
                      style={{
                        backgroundColor: 'rgba(244, 63, 94, 0.06)',
                        borderLeft: '3px solid var(--rose-400)',
                        padding: '8px 14px',
                        borderRadius: '0 10px 10px 0',
                        fontSize: '0.86rem',
                        color: '#fecdd3',
                        fontStyle: 'italic',
                        lineHeight: 1.45
                      }}
                    >
                      "{date.notes}"
                    </div>
                  )}

                  {/* Planned Spots Timeline Flow */}
                  {date.spots.length > 0 && (
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                        Addis Date Itinerary:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                        {date.spots.map((spot, sIdx) => (
                          <React.Fragment key={spot.id || sIdx}>
                            <div
                              onClick={() => onViewSpotDetail && onViewSpotDetail(spot)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '6px 12px',
                                borderRadius: '10px',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                fontSize: '0.82rem',
                                cursor: onViewSpotDetail ? 'pointer' : 'default',
                                transition: 'all 0.2s ease'
                              }}
                              title="Click to view place photos, interior & menu"
                            >
                              <MapPin size={13} color="var(--rose-400)" />
                              <span style={{ fontWeight: 600 }}>{spot.name}</span>
                              <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>({spot.neighborhood})</span>
                              {onViewSpotDetail && (
                                <span style={{ fontSize: '0.7rem', color: 'var(--gold-400)' }}>🔍</span>
                              )}
                            </div>
                            {sIdx < date.spots.length - 1 && (
                              <span style={{ color: 'var(--gold-400)', fontWeight: 700, fontSize: '0.85rem' }}>➔</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Linked Event info if present */}
                  {date.event && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: 'rgba(168, 85, 247, 0.12)',
                        border: '1px solid rgba(168, 85, 247, 0.25)',
                        borderRadius: '10px',
                        padding: '9px 12px',
                        fontSize: '0.82rem'
                      }}
                    >
                      <Sparkles size={15} color="var(--purple-400)" />
                      <div>
                        <span style={{ color: 'var(--purple-400)', fontWeight: 600 }}>Weekend Event: </span>
                        <strong style={{ color: '#fff' }}>{date.event.title}</strong>
                        <span style={{ color: 'var(--text-secondary)' }}> ({date.event.venue})</span>
                      </div>
                    </div>
                  )}

                  {/* Vibe Details: Budget & Dress Code */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '16px',
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <DollarSign size={14} color="var(--gold-400)" />
                      <span>Budget: <strong style={{ color: 'var(--gold-400)' }}>{date.budgetETB > 0 ? `${date.budgetETB.toLocaleString()} ETB` : 'Flexible'}</strong></span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Shirt size={14} color="var(--rose-400)" />
                      <span>Dress Code: <strong style={{ color: '#fff' }}>{date.dressCode}</strong></span>
                    </div>
                  </div>

                  {/* Expandable Preparation Drawer */}
                  {date.checklist && date.checklist.length > 0 && (
                    <div
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.06)'
                      }}
                    >
                      <button
                        onClick={() => setExpandedChecklistId(isChecklistOpen ? null : date.id)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: 'var(--text-secondary)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <CheckCircle2 size={14} color="var(--emerald-400)" />
                          <span>Preparation Checklist ({completedChecklistCount}/{date.checklist.length} ready)</span>
                        </div>
                        {isChecklistOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      {isChecklistOpen && (
                        <div style={{ padding: '4px 14px 12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {date.checklist.map((item, idx) => (
                            <div
                              key={item.id || idx}
                              onClick={() => toggleChecklistItem(date, idx)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                fontSize: '0.82rem',
                                color: item.done ? 'var(--text-muted)' : 'var(--text-main)',
                                textDecoration: item.done ? 'line-through' : 'none'
                              }}
                            >
                              {item.done ? (
                                <CheckSquare size={16} color="var(--emerald-400)" />
                              ) : (
                                <Square size={16} color="var(--text-secondary)" />
                              )}
                              <span>{item.text}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                      paddingTop: '14px',
                      marginTop: '4px'
                    }}
                  >
                    <button
                      onClick={() => downloadICS(date.id)}
                      className="btn-gold"
                      style={{
                        padding: '9px 16px',
                        fontSize: '0.82rem',
                        gap: '6px'
                      }}
                      title="Sync into iPhone Calendar & iOS Reminders"
                    >
                      <Download size={14} /> Add to iPhone Calendar
                    </button>

                    {date.spots.length > 0 && (
                      <a
                        href={getGoogleMapsDirectionsUrl(date.spots)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        style={{
                          padding: '9px 14px',
                          fontSize: '0.82rem',
                          textDecoration: 'none',
                          gap: '6px',
                          color: '#fff'
                        }}
                        title="Open full date route in Google Maps"
                      >
                        <Navigation size={14} color="var(--rose-400)" /> Google Maps Route
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
