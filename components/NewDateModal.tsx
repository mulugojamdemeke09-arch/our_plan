'use client';

import React, { useState, useEffect } from 'react';
import { DatePlan, DateSpot, AddisEvent } from '@/lib/types';
import { X, Calendar, Clock, DollarSign, Shirt, MapPin, Sparkles, Check, Plus, Trash2, Heart } from 'lucide-react';

interface NewDateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  spots: DateSpot[];
  events: AddisEvent[];
  initialData?: DatePlan | null;
  preselectedSpot?: DateSpot | null;
  preselectedEvent?: AddisEvent | null;
}

export const NewDateModal: React.FC<NewDateModalProps> = ({
  isOpen,
  onClose,
  onSave,
  spots,
  events,
  initialData,
  preselectedSpot,
  preselectedEvent
}) => {
  const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [dayLabel, setDayLabel] = useState<'Saturday' | 'Sunday' | 'Friday Night'>('Saturday');
  const [time, setTime] = useState('16:00');
  const [timeSlot, setTimeSlot] = useState<'morning' | 'afternoon' | 'sunset' | 'dinner' | 'night'>('sunset');
  const [proposedBy, setProposedBy] = useState('Me');
  const [selectedSpotIds, setSelectedSpotIds] = useState<string[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [budgetETB, setBudgetETB] = useState<number>(2000);
  const [dressCode, setDressCode] = useState('Smart Casual');
  const [notes, setNotes] = useState('');
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderNotice, setReminderNotice] = useState<'1h' | '2h' | '1d' | 'friday_evening'>('2h');
  const [checklist, setChecklist] = useState<{ id: string; text: string; done: boolean }[]>([
    { id: '1', text: 'Confirm reservation / spot opening hours', done: false },
    { id: '2', text: 'Pick matching outfits', done: false }
  ]);
  const [newChecklistText, setNewChecklistText] = useState('');
  const [customPlaceInput, setCustomPlaceInput] = useState('');
  const [customSpotsList, setCustomSpotsList] = useState<DateSpot[]>([]);
  const [saving, setSaving] = useState(false);

  // Initialize helper dates
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setTargetDate(initialData.targetDate);
      setDayLabel((initialData.dayLabel as any) || 'Saturday');
      setTime(initialData.time || '18:00');
      setTimeSlot(initialData.timeSlot || 'dinner');
      setProposedBy(initialData.proposedBy || 'Me');
      setSelectedSpotIds(initialData.spots.map(s => s.id));
      setSelectedEventId(initialData.event?.id || '');
      setBudgetETB(initialData.budgetETB || 2000);
      setDressCode(initialData.dressCode || 'Smart Casual');
      setNotes(initialData.notes || '');
      setReminderEnabled(initialData.reminderEnabled ?? true);
      setReminderNotice(initialData.reminderNotice || '2h');
      setChecklist(initialData.checklist || []);
    } else {
      // Calculate next Saturday
      const now = new Date();
      const currentDay = now.getDay();
      const daysUntilSat = (6 - currentDay + 7) % 7 || 7;
      const nextSat = new Date(now);
      nextSat.setDate(now.getDate() + daysUntilSat);
      const satIso = nextSat.toISOString().split('T')[0];

      setTargetDate(satIso);
      setDayLabel('Saturday');
      setTime('16:00');
      setTimeSlot('sunset');
      setProposedBy('Me');

      if (preselectedSpot) {
        setTitle(`Date at ${preselectedSpot.name}`);
        setSelectedSpotIds([preselectedSpot.id]);
        setBudgetETB(preselectedSpot.avgCostForTwoETB);
        setDressCode(preselectedSpot.category === 'restaurant' ? 'Smart Casual' : 'Casual Cozy');
      } else if (preselectedEvent) {
        setTitle(preselectedEvent.title);
        setSelectedEventId(preselectedEvent.id);
        setDressCode(preselectedEvent.recommendedDressCode);
        setDayLabel(preselectedEvent.dayOfWeek.includes('Sunday') ? 'Sunday' : 'Saturday');
        if (typeof preselectedEvent.priceETB === 'number') {
          setBudgetETB(preselectedEvent.priceETB * 2 + 1000);
        }
      } else {
        setTitle('Cozy Weekend Date in Addis');
        setSelectedSpotIds([]);
        setSelectedEventId('');
      }
    }
  }, [initialData, preselectedSpot, preselectedEvent, isOpen]);

  if (!isOpen) return null;

  const handleAddChecklistItem = () => {
    if (!newChecklistText.trim()) return;
    setChecklist([...checklist, { id: `item-${Date.now()}`, text: newChecklistText.trim(), done: false }]);
    setNewChecklistText('');
  };

  const handleRemoveChecklistItem = (id: string) => {
    setChecklist(checklist.filter(c => c.id !== id));
  };

  const toggleSpotSelection = (id: string) => {
    if (selectedSpotIds.includes(id)) {
      setSelectedSpotIds(selectedSpotIds.filter(sId => sId !== id));
    } else {
      setSelectedSpotIds([...selectedSpotIds, id]);
    }
  };

  const handleAddCustomPlace = () => {
    if (!customPlaceInput.trim()) return;
    const placeName = customPlaceInput.trim();
    const newSpot: DateSpot = {
      id: `custom-spot-${Date.now()}`,
      name: placeName,
      category: 'restaurant',
      neighborhood: 'Addis Ababa',
      address: `${placeName}, Addis Ababa`,
      lat: 9.0192,
      lng: 38.7525,
      priceLevel: 'ETB $$',
      avgCostForTwoETB: 1500,
      vibe: 'Custom Picked Spot',
      romanticHighlight: 'Personal date location chosen by you and your partner.',
      signatureOrder: 'Chef Special',
      openingHours: 'Open daily',
      rating: 5.0,
      reviewCount: 1,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      tags: ['Custom Place'],
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName + ' Addis Ababa')}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(placeName + ' Addis Ababa')}`
    };

    setCustomSpotsList(prev => [...prev, newSpot]);
    setSelectedSpotIds(prev => [...prev, newSpot.id]);
    setCustomPlaceInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const allSpots = [...spots, ...customSpotsList];
    const chosenSpots = allSpots.filter(s => selectedSpotIds.includes(s.id));
    const chosenEvent = events.find(ev => ev.id === selectedEventId);

    const payload = {
      ...(initialData ? { id: initialData.id } : {}),
      title: title || 'Our Weekend Date',
      targetDate,
      dayLabel,
      time,
      timeSlot,
      proposedBy,
      spots: chosenSpots,
      event: chosenEvent,
      budgetETB: Number(budgetETB) || 0,
      dressCode,
      notes,
      checklist,
      reminderEnabled,
      reminderNotice
    };

    try {
      const res = await fetch('/api/dates', {
        method: initialData ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        onSave();
        onClose();
      }
    } catch (err) {
      console.error('Error saving date:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content" style={{ padding: '24px' }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(244, 63, 94, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--rose-400)'
              }}
            >
              <Heart size={18} fill="currentColor" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              {initialData ? 'Edit Date Plan' : 'Plan Our Weekend Date'}
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '6px',
              color: 'var(--text-muted)',
              borderRadius: '8px'
            }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Title */}
          <div>
            <label className="form-label">Date Title / Idea</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Sunset Coffee at Entoto + Dinner at Gusto"
              className="form-input"
            />
          </div>

          {/* Weekend Day & Date */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label className="form-label">Weekend Day</label>
              <select
                value={dayLabel}
                onChange={e => setDayLabel(e.target.value as any)}
                className="form-select"
                style={{ backgroundColor: '#141828', color: '#ffffff' }}
              >
                <option value="Saturday" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Saturday</option>
                <option value="Sunday" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Sunday</option>
                <option value="Friday Night" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Friday Night</option>
              </select>
            </div>

            <div>
              <label className="form-label">Date</label>
              <input
                type="date"
                required
                value={targetDate}
                onChange={e => setTargetDate(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          {/* Time & Time Slot */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label className="form-label">Time</label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Time Slot</label>
              <select
                value={timeSlot}
                onChange={e => setTimeSlot(e.target.value as any)}
                className="form-select"
                style={{ backgroundColor: '#141828', color: '#ffffff' }}
              >
                <option value="morning" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Morning (Coffee & Walk)</option>
                <option value="afternoon" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Afternoon (Art / Lunch)</option>
                <option value="sunset" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Sunset (Views & Escapes)</option>
                <option value="dinner" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Dinner (Candlelit Feast)</option>
                <option value="night" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Night (Live Jazz / Lounge)</option>
              </select>
            </div>
          </div>

          {/* Proposed By & Budget */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label className="form-label">Proposed By</label>
              <select
                value={proposedBy}
                onChange={e => setProposedBy(e.target.value)}
                className="form-select"
                style={{ backgroundColor: '#141828', color: '#ffffff' }}
              >
                <option value="Me" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Me 🙋‍♀️</option>
                <option value="Babe" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Babe 🙋‍♂️</option>
                <option value="Both of Us" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Both of Us ❤️</option>
              </select>
            </div>

            <div>
              <label className="form-label">Est. Budget (ETB)</label>
              <input
                type="number"
                step="100"
                value={budgetETB}
                onChange={e => setBudgetETB(Number(e.target.value))}
                placeholder="2000"
                className="form-input"
              />
            </div>
          </div>

          {/* Select Spots */}
          <div>
            <label className="form-label">Addis Spots to Visit (Select multiple)</label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '8px',
                maxHeight: '140px',
                overflowY: 'auto',
                padding: '6px',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px'
              }}
            >
              {[...spots, ...customSpotsList].map(s => {
                const isSelected = selectedSpotIds.includes(s.id);
                return (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => toggleSpotSelection(s.id)}
                    style={{
                      textAlign: 'left',
                      padding: '6px 8px',
                      borderRadius: '8px',
                      fontSize: '0.74rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      backgroundColor: isSelected ? 'rgba(244, 63, 94, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? '1px solid var(--rose-400)' : '1px solid transparent',
                      color: isSelected ? '#fff' : 'var(--text-secondary)'
                    }}
                  >
                    <span>{isSelected ? '✓' : '+'}</span>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {s.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom place input */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <input
                type="text"
                value={customPlaceInput}
                onChange={e => setCustomPlaceInput(e.target.value)}
                placeholder="Want to go elsewhere? Type any place in Addis…"
                className="form-input"
                style={{ padding: '8px 12px', fontSize: '0.82rem', backgroundColor: '#141828', color: '#ffffff' }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomPlace();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddCustomPlace}
                className="btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
              >
                + Add Place
              </button>
            </div>
          </div>

          {/* Select Event (Optional) */}
          <div>
            <label className="form-label">Link an Addis Event (Optional)</label>
            <select
              value={selectedEventId}
              onChange={e => setSelectedEventId(e.target.value)}
              className="form-select"
              style={{ backgroundColor: '#141828', color: '#ffffff' }}
            >
              <option value="" style={{ backgroundColor: '#141828', color: '#ffffff' }}>No special event (Just our date)</option>
              {events.map(ev => (
                <option key={ev.id} value={ev.id} style={{ backgroundColor: '#141828', color: '#ffffff' }}>
                  {ev.title} ({ev.neighborhood})
                </option>
              ))}
            </select>
          </div>

          {/* Dress Code */}
          <div>
            <label className="form-label">Dress Code & Vibe</label>
            <input
              type="text"
              value={dressCode}
              onChange={e => setDressCode(e.target.value)}
              placeholder="e.g. Smart Casual, Warm Sweaters for Entoto, Dress to Impress"
              className="form-input"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="form-label">Sweet Notes / Romantic Plans</label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="What to look forward to, surprise plans, or details…"
              className="form-textarea"
            />
          </div>

          {/* Checklist */}
          <div>
            <label className="form-label">Preparation Checklist</label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input
                type="text"
                value={newChecklistText}
                onChange={e => setNewChecklistText(e.target.value)}
                placeholder="Add checklist item (e.g. charge camera)…"
                className="form-input"
                style={{ padding: '8px 12px', fontSize: '0.84rem' }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddChecklistItem();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddChecklistItem}
                className="btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.8rem' }}
              >
                <Plus size={14} /> Add
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {checklist.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    fontSize: '0.8rem'
                  }}
                >
                  <span>• {item.text}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveChecklistItem(item.id)}
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Reminder Settings */}
          <div
            style={{
              padding: '12px',
              borderRadius: '12px',
              backgroundColor: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--gold-400)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} /> Date Reminders
              </label>
              <input
                type="checkbox"
                checked={reminderEnabled}
                onChange={e => setReminderEnabled(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--rose-500)', cursor: 'pointer' }}
              />
            </div>

            {reminderEnabled && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Remind us:</span>
                <select
                  value={reminderNotice}
                  onChange={e => setReminderNotice(e.target.value as any)}
                  className="form-select"
                  style={{ padding: '6px 10px', fontSize: '0.78rem', backgroundColor: '#141828', color: '#ffffff' }}
                >
                  <option value="1h" style={{ backgroundColor: '#141828', color: '#ffffff' }}>1 hour before date</option>
                  <option value="2h" style={{ backgroundColor: '#141828', color: '#ffffff' }}>2 hours before date</option>
                  <option value="1d" style={{ backgroundColor: '#141828', color: '#ffffff' }}>1 day before (Friday)</option>
                  <option value="friday_evening" style={{ backgroundColor: '#141828', color: '#ffffff' }}>Friday Evening at 6:00 PM</option>
                </select>
              </div>
            )}
          </div>

          {/* Submit Actions */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary"
              style={{ flex: 2 }}
            >
              {saving ? 'Saving Date…' : initialData ? 'Save Changes' : 'Confirm Date Plan ❤️'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
