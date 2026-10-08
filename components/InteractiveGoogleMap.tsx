'use client';

import React, { useState } from 'react';
import { DateSpot } from '@/lib/types';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Star,
  Lock,
  Unlock,
  Search,
  Plus,
  Sparkles,
  Check
} from 'lucide-react';

interface InteractiveGoogleMapProps {
  spots: DateSpot[];
  selectedSpot?: DateSpot | null;
  onSelectSpot: (spot: DateSpot) => void;
  onAddSpotToDate?: (spot: DateSpot) => void;
}

export const InteractiveGoogleMap: React.FC<InteractiveGoogleMapProps> = ({
  spots,
  selectedSpot,
  onSelectSpot,
  onAddSpotToDate
}) => {
  const [mapType, setMapType] = useState<'m' | 'k'>('m'); // m = normal roadmap, k = satellite
  const [isMapInteractive, setIsMapInteractive] = useState<boolean>(false);
  
  // Custom search state
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchedCustomPlace, setSearchedCustomPlace] = useState<{
    name: string;
    query: string;
    isCustom: boolean;
  } | null>(null);
  const [savingPlace, setSavingPlace] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const currentSpot = selectedSpot || spots[0];

  // Exact location pin formula:
  // If custom search is active, use the exact place query with Addis Ababa
  // If a spot is selected, use exact lat,lng with the spot name to guarantee a precise red pin marker!
  const pinQuery = searchedCustomPlace
    ? `${searchedCustomPlace.name}, Addis Ababa, Ethiopia`
    : currentSpot
      ? `${currentSpot.lat},${currentSpot.lng}+(${currentSpot.name})`
      : 'Addis Ababa, Ethiopia';

  const googleEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(pinQuery)}&t=${mapType}&z=16&ie=UTF8&iwloc=B&output=embed`;

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchInput.trim()) return;

    const term = searchInput.trim();
    setSearchedCustomPlace({
      name: term,
      query: `${term}, Addis Ababa, Ethiopia`,
      isCustom: true
    });
    setAddedSuccess(false);
  };

  const handleAddSearchedPlaceToPlan = async () => {
    if (!searchedCustomPlace) return;

    setSavingPlace(true);
    const newSpot: DateSpot = {
      id: `spot-custom-${Date.now()}`,
      name: searchedCustomPlace.name,
      category: 'restaurant',
      neighborhood: 'Addis Ababa',
      address: `${searchedCustomPlace.name}, Addis Ababa`,
      lat: 9.0192,
      lng: 38.7525,
      priceLevel: 'ETB $$',
      avgCostForTwoETB: 1600,
      vibe: 'Custom Picked Spot',
      romanticHighlight: 'Custom date venue chosen by you and your partner.',
      signatureOrder: 'Couple Special',
      openingHours: 'Open Daily',
      rating: 5.0,
      reviewCount: 1,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      tags: ['Custom Date Spot'],
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchedCustomPlace.name + ' Addis Ababa')}`,
      appleMapsUrl: `https://maps.apple.com/?q=${encodeURIComponent(searchedCustomPlace.name + ' Addis Ababa')}`
    };

    try {
      // Save to backend database so it persists
      await fetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSpot)
      });
    } catch (err) {
      console.error('Error saving custom spot:', err);
    }

    if (onAddSpotToDate) {
      onAddSpotToDate(newSpot);
    }
    onSelectSpot(newSpot);
    setAddedSuccess(true);
    setSavingPlace(false);
    setTimeout(() => setAddedSuccess(false), 4000);
  };

  // When a spot is clicked/selected externally, reset any custom search so the map instantly focuses on that spot
  React.useEffect(() => {
    if (selectedSpot) {
      setSearchedCustomPlace(null);
    }
  }, [selectedSpot]);

  return (
    <div id="interactive-page-map" style={{ display: 'flex', flexDirection: 'column', gap: '14px', scrollMarginTop: '80px' }}>
      {/* Sleek, Minimized Search & Map Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}
      >
        {/* Minimized Clean Search Form */}
        <form
          onSubmit={handleSearchSubmit}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            width: '100%',
            maxWidth: '380px'
          }}
        >
          <div
            style={{
              position: 'relative',
              flex: 1,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Search
              size={14}
              color="var(--rose-400)"
              style={{
                position: 'absolute',
                left: '11px',
                pointerEvents: 'none'
              }}
            />
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search any place in Addis..."
              style={{
                width: '100%',
                padding: '7px 28px 7px 32px',
                borderRadius: '999px',
                fontSize: '0.8rem',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.5)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(244, 63, 94, 0.12)';
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput('');
                  setSearchedCustomPlace(null);
                }}
                style={{
                  position: 'absolute',
                  right: '9px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.75rem'
                }}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 600,
              backgroundColor: 'var(--rose-600)',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(244, 63, 94, 0.3)',
              transition: 'all 0.15s ease'
            }}
          >
            <MapPin size={12} />
            <span>Find & Pin</span>
          </button>
        </form>

        {/* Map Controls: Lock Zoom toggle & Map type */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => setIsMapInteractive(!isMapInteractive)}
            style={{
              padding: '5px 11px',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: 600,
              backgroundColor: isMapInteractive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              color: isMapInteractive ? 'var(--emerald-400)' : 'var(--text-muted)',
              border: isMapInteractive ? '1px solid var(--emerald-400)' : '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer'
            }}
            title={isMapInteractive ? 'Click to lock zoom and scroll page smoothly' : 'Click to enable map zoom and dragging'}
          >
            {isMapInteractive ? <Unlock size={11} /> : <Lock size={11} />}
            <span>{isMapInteractive ? 'Zoom Active' : 'Zoom Locked'}</span>
          </button>

          <button
            onClick={() => setMapType(mapType === 'm' ? 'k' : 'm')}
            style={{
              padding: '5px 11px',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: 600,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-secondary)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer'
            }}
          >
            {mapType === 'm' ? '🗺️ Street' : '🛰️ Satellite'}
          </button>
        </div>
      </div>

      {/* Compact Google Map Container (Height 240px) */}
      <div
        style={{
          position: 'relative',
          height: '240px',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
          backgroundColor: '#121624'
        }}
      >
        <iframe
          title="Google Map with Exact Location Pin"
          src={googleEmbedUrl}
          width="100%"
          height="100%"
          style={{
            border: 0,
            display: 'block',
            pointerEvents: isMapInteractive ? 'auto' : 'none'
          }}
          loading="lazy"
        />

        {/* Pin Indicator Badge */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'rgba(10, 12, 20, 0.88)',
            backdropFilter: 'blur(8px)',
            padding: '5px 12px',
            borderRadius: '8px',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#fff',
            border: '1px solid rgba(244, 63, 94, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}
        >
          <span style={{ color: '#f43f5e' }}>📍</span>
          <span>
            {searchedCustomPlace ? `Pinned: ${searchedCustomPlace.name}` : `Exact Pin: ${currentSpot.name}`}
          </span>
        </div>

        {/* Lock Zoom Indicator */}
        {!isMapInteractive && (
          <div
            onClick={() => setIsMapInteractive(true)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'rgba(10, 12, 20, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '4px 10px',
              borderRadius: '8px',
              fontSize: '0.68rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Lock size={11} color="var(--gold-400)" />
            <span>Tap to interact</span>
          </div>
        )}
      </div>

      {/* Searched Custom Place Card (With 1-Click Add to Plan!) */}
      {searchedCustomPlace ? (
        <div
          style={{
            backgroundColor: 'rgba(25, 20, 36, 0.95)',
            border: '1px solid rgba(244, 63, 94, 0.4)',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span className="badge-rose" style={{ fontSize: '0.7rem' }}>
                <Sparkles size={11} /> Custom Searched Spot
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginTop: '4px' }}>
                {searchedCustomPlace.name}
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                📍 Addis Ababa, Ethiopia • Exact Location Pinned on Google Map
              </p>
            </div>

            <button
              onClick={() => setSearchedCustomPlace(null)}
              style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}
            >
              Close
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
            <button
              onClick={handleAddSearchedPlaceToPlan}
              disabled={savingPlace}
              className="btn-primary"
              style={{
                flex: 1,
                padding: '10px 16px',
                fontSize: '0.84rem',
                gap: '6px'
              }}
            >
              {addedSuccess ? <Check size={16} /> : <Plus size={16} />}
              {addedSuccess ? 'Added to Your Date Plan! ❤️' : savingPlace ? 'Saving…' : 'Add to Our Weekend Date Plan'}
            </button>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchedCustomPlace.name + ' Addis Ababa')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{
                padding: '10px 16px',
                fontSize: '0.84rem',
                textDecoration: 'none',
                gap: '6px'
              }}
            >
              <Navigation size={15} color="var(--gold-400)" /> Open in Google Maps App
            </a>
          </div>
        </div>
      ) : (
        /* Selected Curated Venue Details Card */
        currentSpot && (
          <div
            style={{
              backgroundColor: 'rgba(20, 24, 38, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '14px',
              padding: '12px 16px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: currentSpot.category === 'dessert' ? '#f472b6' : currentSpot.category === 'coffee' ? '#fbbf24' : '#fb7185',
                    textTransform: 'uppercase'
                  }}
                >
                  {currentSpot.category === 'dessert' ? '🍰 Dessert Spot' : currentSpot.category === 'coffee' ? '☕ Coffee House' : '🍷 Dining'}
                </span>
                <span style={{ fontSize: '0.74rem', color: 'var(--gold-400)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Star size={12} fill="currentColor" /> {currentSpot.rating}
                </span>
              </div>

              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
                {currentSpot.name}
              </h4>

              {/* Exact Location & Address */}
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} color="var(--rose-400)" />
                  <strong style={{ color: '#fff' }}>Exact Location:</strong>
                  <span>{currentSpot.address}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  <span>📍 GPS: {currentSpot.lat.toFixed(4)}° N, {currentSpot.lng.toFixed(4)}° E</span>
                  <span>• Order: <strong style={{ color: '#fde68a' }}>{currentSpot.signatureOrder}</strong></span>
                  <span>• {currentSpot.priceLevel} (~{currentSpot.avgCostForTwoETB} ETB for 2)</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <a
                href={currentSpot.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  padding: '7px 14px',
                  fontSize: '0.76rem',
                  textDecoration: 'none',
                  gap: '5px'
                }}
              >
                <Navigation size={12} /> Google Maps
              </a>

              {onAddSpotToDate && (
                <button
                  onClick={() => onAddSpotToDate(currentSpot)}
                  className="btn-gold"
                  style={{
                    padding: '7px 12px',
                    fontSize: '0.76rem'
                  }}
                >
                  + Add to Plan
                </button>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};
