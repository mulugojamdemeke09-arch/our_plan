'use client';

import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { EventCategory } from '@/lib/types';

interface CustomEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export const CustomEventModal: React.FC<CustomEventModalProps> = ({
  isOpen,
  onClose,
  onCreated
}) => {
  const [title, setTitle] = useState('');
  const [venue, setVenue] = useState('');
  const [neighborhood, setNeighborhood] = useState('Bole');
  const [category, setCategory] = useState<EventCategory>('music');
  const [dayOfWeek, setDayOfWeek] = useState<'Friday Evening' | 'Saturday' | 'Sunday'>('Saturday');
  const [dateStr, setDateStr] = useState('This Saturday • 7:00 PM');
  const [time, setTime] = useState('19:00');
  const [priceETB, setPriceETB] = useState<string>('300');
  const [description, setDescription] = useState('');
  const [romanticReason, setRomanticReason] = useState('');
  const [dressCode, setDressCode] = useState('Smart Casual');
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          venue,
          neighborhood,
          category,
          dayOfWeek,
          dateStr,
          time,
          priceETB: priceETB.toLowerCase() === 'free' ? 'Free' : Number(priceETB) || 0,
          description,
          romanticReason: romanticReason || 'A wonderful Addis weekend date experience.',
          recommendedDressCode: dressCode
        })
      });

      if (res.ok) {
        onCreated();
        onClose();
      }
    } catch (err) {
      console.error('Error creating custom event:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="var(--rose-400)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Add Addis Ababa Event</h3>
          </div>
          <button onClick={onClose} style={{ padding: '6px', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label className="form-label">Event Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Acoustic Jazz Night at Villa Verde"
              className="form-input"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label className="form-label">Venue</label>
              <input
                type="text"
                required
                value={venue}
                onChange={e => setVenue(e.target.value)}
                placeholder="e.g. Villa Verde Addis"
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Neighborhood</label>
              <input
                type="text"
                required
                value={neighborhood}
                onChange={e => setNeighborhood(e.target.value)}
                placeholder="e.g. Bole / Olympia"
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label className="form-label">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="form-select"
                style={{ backgroundColor: '#141828', color: '#ffffff' }}
              >
                <option value="music" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Live Music & Jazz</option>
                <option value="outdoor" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Outdoor & Nature</option>
                <option value="art" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Art & Exhibitions</option>
                <option value="food" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Food & Markets</option>
                <option value="cinema" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Cinema & Movies</option>
                <option value="party" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Party & Lounge</option>
              </select>
            </div>
            <div>
              <label className="form-label">Day</label>
              <select
                value={dayOfWeek}
                onChange={e => setDayOfWeek(e.target.value as any)}
                className="form-select"
                style={{ backgroundColor: '#141828', color: '#ffffff' }}
              >
                <option value="Friday Evening" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Friday Evening</option>
                <option value="Saturday" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Saturday</option>
                <option value="Sunday" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Sunday</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label className="form-label">Time & Label</label>
              <input
                type="text"
                value={dateStr}
                onChange={e => setDateStr(e.target.value)}
                placeholder="This Saturday • 7:00 PM"
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Price (ETB or "Free")</label>
              <input
                type="text"
                value={priceETB}
                onChange={e => setPriceETB(e.target.value)}
                placeholder="300 or Free"
                className="form-input"
              />
            </div>
          </div>

          <div>
            <label className="form-label">Event Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What happens at the event…"
              className="form-textarea"
            />
          </div>

          <div>
            <label className="form-label">Why it's great for couples</label>
            <input
              type="text"
              value={romanticReason}
              onChange={e => setRomanticReason(e.target.value)}
              placeholder="e.g. Candlelit outdoor courtyard with romantic music"
              className="form-input"
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn-primary" style={{ flex: 2 }}>
              {saving ? 'Adding Event…' : 'Add Addis Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
