'use client';

import React, { useState } from 'react';
import { DateSpot } from '@/lib/types';
import { InteractiveGoogleMap } from './InteractiveGoogleMap';
import { SpotDetailModal } from './SpotDetailModal';
import { 
  MapPin, 
  Star, 
  Navigation, 
  Plus, 
  Sparkles, 
  Camera, 
  Compass,
  Check
} from 'lucide-react';

interface SpotsDirectoryProps {
  spots: DateSpot[];
  onAddSpotToDate: (spot: DateSpot) => void;
}

export const SpotsDirectory: React.FC<SpotsDirectoryProps> = ({
  spots,
  onAddSpotToDate
}) => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [focusedSpot, setFocusedSpot] = useState<DateSpot | null>(spots[0] || null);
  
  // Place Detail Modal State (Photos, Interior, Menu)
  const [detailSpot, setDetailSpot] = useState<DateSpot | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  const handleOpenSpotDetails = (spot: DateSpot) => {
    setDetailSpot(spot);
    setIsDetailOpen(true);
  };

  // When clicking a place box, immediately focus and pin on the page map, and scroll up to the map
  const handleSpotBoxClick = (spot: DateSpot) => {
    setFocusedSpot(spot);
    const mapElement = document.getElementById('interactive-page-map');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Check if a spot is an authentic dessert house / gelateria / chocolatier
  const isSpotDessert = (spot: DateSpot) => {
    return spot.category === 'dessert' || 
           spot.knownCategory === 'dessert' || 
           spot.id.includes('dessert') ||
           spot.id.includes('chocolux') ||
           spot.id.includes('cupcake') ||
           spot.id.includes('gelato');
  };

  // Unified Filter (Neighborhood + Type)
  const matchesFilter = (spot: DateSpot) => {
    // Type Filter (e.g. Dessert Houses)
    if (selectedType !== 'all') {
      if (selectedType === 'dessert' && !isSpotDessert(spot)) return false;
      if (selectedType === 'coffee' && !(spot.category === 'coffee' || spot.knownCategory === 'coffee' || spot.tags.includes('coffee'))) return false;
      if (selectedType === 'dining' && !(spot.category === 'restaurant' || spot.knownCategory === 'dinner' || spot.knownCategory === 'italian' || spot.knownCategory === 'breakfast')) return false;
      if (selectedType === 'bakery' && !(spot.knownCategory === 'bakery' || spot.tags.includes('bakery') || spot.tags.includes('patisserie'))) return false;
      if (selectedType === 'cocktail' && !(spot.category === 'cocktail' || spot.knownCategory === 'cocktail' || spot.tags.includes('cocktail') || spot.tags.includes('lounge'))) return false;
    }

    // Neighborhood filter
    if (selectedNeighborhood === 'all') return true;
    const hood = spot.neighborhood.toLowerCase();
    const tags = spot.tags.map(t => t.toLowerCase());
    const addr = spot.address.toLowerCase();

    if (selectedNeighborhood === 'gerji-jackros') {
      return hood.includes('gerji') || hood.includes('jackros') || tags.includes('gerji') || tags.includes('jackros') || tags.includes('jacros') || addr.includes('gerji');
    }
    if (selectedNeighborhood === 'bulbula') {
      return hood.includes('bulbula') || tags.includes('bulbula') || addr.includes('bulbula');
    }
    if (selectedNeighborhood === 'bole') {
      return (hood.includes('bole') || tags.includes('bole') || addr.includes('bole')) && !hood.includes('bulbula');
    }
    if (selectedNeighborhood === 'piassa') {
      return hood.includes('piassa') || tags.includes('piassa') || addr.includes('piassa');
    }
    if (selectedNeighborhood === 'kazanchis') {
      return hood.includes('kazanchis') || tags.includes('kazanchis') || addr.includes('kazanchis');
    }
    if (selectedNeighborhood === 'sarbet') {
      return hood.includes('sarbet') || hood.includes('old airport') || tags.includes('sarbet') || tags.includes('old airport') || addr.includes('sarbet') || addr.includes('old airport');
    }
    if (selectedNeighborhood === 'entoto') {
      return hood.includes('entoto') || tags.includes('entoto') || addr.includes('entoto');
    }
    if (selectedNeighborhood === 'kirkos') {
      return hood.includes('kirkos') || hood.includes('arat kilo') || tags.includes('kirkos') || tags.includes('arat kilo') || addr.includes('kirkos');
    }
    return true;
  };

  const filteredSpots = spots.filter(matchesFilter);

  const dessertSpotsCount = spots.filter(isSpotDessert).length;
  const coffeeSpotsCount = spots.filter(s => s.category === 'coffee' || s.knownCategory === 'coffee').length;
  const diningSpotsCount = spots.filter(s => s.category === 'restaurant' || s.knownCategory === 'dinner' || s.knownCategory === 'italian').length;
  const bakerySpotsCount = spots.filter(s => s.knownCategory === 'bakery' || s.tags.includes('bakery')).length;

  const TYPE_PILLS = [
    { id: 'all', label: `🌟 All Places (${spots.length})` },
    { id: 'dessert', label: `🍰 Dessert Houses (${dessertSpotsCount})` },
    { id: 'coffee', label: `☕ Coffee Houses (${coffeeSpotsCount})` },
    { id: 'dining', label: `🍷 Dining & Italian (${diningSpotsCount})` },
    { id: 'bakery', label: `🥐 Bakeries & Pastries (${bakerySpotsCount})` },
    { id: 'cocktail', label: `🍸 Cocktail Lounges` }
  ];

  const NEIGHBORHOOD_PILLS = [
    { id: 'all', label: `All Areas` },
    { id: 'bole', label: '📍 Bole' },
    { id: 'bulbula', label: '📍 Bole Bulbula' },
    { id: 'gerji-jackros', label: '📍 Gerji & Jackros' },
    { id: 'piassa', label: '📍 Piassa' },
    { id: 'kazanchis', label: '📍 Kazanchis' },
    { id: 'sarbet', label: '📍 Old Airport / Sarbet' },
    { id: 'entoto', label: '📍 Entoto Hills' },
    { id: 'kirkos', label: '📍 Arat Kilo / Kirkos' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: '#fff' }}>
          Romantic Date Spots in Addis Ababa
        </h2>
      </div>

      {/* Interactive Google Map Section */}
      <InteractiveGoogleMap
        spots={spots}
        selectedSpot={focusedSpot}
        onSelectSpot={spot => setFocusedSpot(spot)}
        onAddSpotToDate={onAddSpotToDate}
      />

      {/* 1-Click Spot Type Filters (Dessert Houses, Coffee, Dining, etc.) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Filter by Vibe / Type:
          </div>
          {selectedType !== 'all' && (
            <button
              onClick={() => setSelectedType('all')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--rose-400)',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Show All Types
            </button>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '2px'
          }}
        >
          {TYPE_PILLS.map(t => {
            const isSelected = selectedType === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? 'var(--rose-600)' : 'rgba(255, 255, 255, 0.05)',
                  color: isSelected ? '#fff' : 'var(--text-secondary)',
                  border: isSelected ? '1px solid var(--rose-400)' : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isSelected ? '0 4px 12px var(--rose-glow)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Simple Neighborhood Filter Pills Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Filter by Area:
          </div>
          {selectedNeighborhood !== 'all' && (
            <button
              onClick={() => setSelectedNeighborhood('all')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--rose-400)',
                fontSize: '0.74rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Show All Areas ({spots.length})
            </button>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}
        >
          {NEIGHBORHOOD_PILLS.map(n => {
            const isSelected = selectedNeighborhood === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setSelectedNeighborhood(n.id)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? 'var(--rose-600)' : 'rgba(255, 255, 255, 0.05)',
                  color: isSelected ? '#fff' : 'var(--text-secondary)',
                  border: isSelected ? '1px solid var(--rose-400)' : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isSelected ? '0 4px 12px var(--rose-glow)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {n.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary Indicator */}
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '10px 14px',
          borderRadius: '12px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
          <Sparkles size={14} color="var(--gold-400)" />
          <span style={{ color: '#fff', fontWeight: 600 }}>
            Showing {filteredSpots.length} real accredited spots:
          </span>
          {focusedSpot && (
            <span style={{ color: 'var(--text-muted)', fontSize: '0.76rem' }}>
              • Currently Pinned: <strong style={{ color: '#fde68a' }}>{focusedSpot.name}</strong>
            </span>
          )}
        </div>

        <div style={{ fontSize: '0.76rem', color: 'var(--rose-400)', fontWeight: 600 }}>
          💡 Click any box to pin and center on the map
        </div>
      </div>

      {/* ALL SPOTS GRID (Compact, Smaller boxes like front page) */}
      {filteredSpots.length === 0 ? (
        <div
          className="glass-panel"
          style={{
            padding: '40px 20px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            No spots found in this area.
          </p>
          <button
            onClick={() => setSelectedNeighborhood('all')}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.8rem' }}
          >
            Show All Addis Spots
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '14px'
          }}
        >
          {filteredSpots.map(spot => {
            const isCurrentlyFocused = focusedSpot?.id === spot.id;

            return (
              <article
                key={spot.id}
                className="glass-panel"
                onClick={() => handleSpotBoxClick(spot)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  border: isCurrentlyFocused 
                    ? '2px solid var(--rose-500)' 
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isCurrentlyFocused 
                    ? '0 0 18px rgba(244, 63, 94, 0.4)' 
                    : 'none',
                  backgroundColor: isCurrentlyFocused 
                    ? 'rgba(30, 20, 36, 0.85)' 
                    : 'rgba(255, 255, 255, 0.03)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  if (!isCurrentlyFocused) {
                    e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.4)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.4)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  if (!isCurrentlyFocused) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {/* Image Banner (110px height like Front Page) */}
                <div
                  style={{
                    position: 'relative',
                    height: '110px',
                    backgroundImage: `url(${spot.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(12, 15, 28, 0.9) 0%, rgba(0, 0, 0, 0.2) 60%)'
                    }}
                  />

                  {/* Top Badges */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      right: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    {isCurrentlyFocused ? (
                      <span 
                        style={{ 
                          fontSize: '0.66rem', 
                          fontWeight: 800,
                          padding: '2px 8px', 
                          borderRadius: '999px',
                          backgroundColor: 'var(--rose-600)',
                          color: '#fff',
                          boxShadow: '0 2px 8px rgba(244, 63, 94, 0.6)'
                        }}
                      >
                        📍 PINNED ON MAP
                      </span>
                    ) : (
                      <span 
                        className={
                          spot.category === 'coffee' ? 'badge-gold' :
                          spot.category === 'dessert' ? 'badge-rose' :
                          spot.category === 'cocktail' ? 'badge-purple' :
                          spot.category === 'scenic' ? 'badge-emerald' : 'badge-rose'
                        } 
                        style={{ fontSize: '0.66rem', padding: '2px 7px' }}
                      >
                        {spot.category === 'coffee' ? '☕ Coffee' :
                         spot.category === 'dessert' ? '🍰 Dessert' :
                         spot.category === 'cocktail' ? '🍸 Cocktail' :
                         spot.category === 'scenic' ? '🌲 Scenic' : '🍷 Dining'}
                      </span>
                    )}

                    <div
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(4px)',
                        padding: '2px 6px',
                        borderRadius: '6px',
                        fontSize: '0.65rem',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                        border: '1px solid rgba(255,255,255,0.15)'
                      }}
                    >
                      <Camera size={10} color="var(--rose-400)" />
                      {1 + (spot.interiorPhotos?.length || 0)} Photos
                    </div>
                  </div>

                  {/* Bottom Rating & Price */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '6px',
                      left: '8px',
                      right: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--gold-400)', fontSize: '0.74rem', fontWeight: 700 }}>
                      <Star size={12} fill="currentColor" /> {spot.rating}
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>({spot.reviewCount})</span>
                    </div>

                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#fff',
                        backgroundColor: 'rgba(0,0,0,0.65)',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}
                    >
                      {spot.priceLevel}
                    </span>
                  </div>
                </div>

                {/* Compact Card Content Body - Clean & Simple */}
                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                  <div>
                    <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>
                      {spot.name}
                    </h4>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      <MapPin size={12} color="var(--rose-400)" style={{ flexShrink: 0 }} />
                      <span>{spot.neighborhood}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '6px', marginTop: 'auto', paddingTop: '8px' }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpotBoxClick(spot);
                      }}
                      className="btn-secondary"
                      style={{
                        padding: '6px 8px',
                        fontSize: '0.74rem',
                        color: isCurrentlyFocused ? 'var(--rose-400)' : 'var(--text-secondary)',
                        borderColor: isCurrentlyFocused ? 'var(--rose-400)' : 'rgba(255,255,255,0.1)',
                        gap: '3px',
                        flex: 1
                      }}
                      title="Pin and center this spot on the map"
                    >
                      <Navigation size={11} color="var(--rose-400)" />
                      {isCurrentlyFocused ? 'Pinned' : '📍 Pin Map'}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSpotDetails(spot);
                      }}
                      className="btn-secondary"
                      style={{
                        padding: '6px 8px',
                        fontSize: '0.74rem',
                        flex: 1,
                        gap: '3px'
                      }}
                    >
                      <Sparkles size={11} color="var(--gold-400)" /> Menu
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddSpotToDate(spot);
                      }}
                      className="btn-primary"
                      style={{
                        padding: '6px 8px',
                        fontSize: '0.74rem',
                        flex: 1,
                        gap: '3px'
                      }}
                    >
                      <Plus size={11} /> Plan
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Spot Detail Modal */}
      <SpotDetailModal
        spot={detailSpot}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setDetailSpot(null);
        }}
        onAddToDatePlan={onAddSpotToDate}
        onFocusOnMap={(spot) => {
          handleSpotBoxClick(spot);
        }}
      />
    </div>
  );
};
