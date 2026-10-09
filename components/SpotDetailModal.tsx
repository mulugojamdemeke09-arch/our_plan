'use client';

import React, { useState } from 'react';
import { DateSpot, MenuItem } from '@/lib/types';
import { 
  X, 
  MapPin, 
  Star, 
  Clock, 
  Phone, 
  Navigation, 
  Plus, 
  Sparkles, 
  Coffee, 
  Utensils, 
  Wine, 
  Cake, 
  Camera, 
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SpotDetailModalProps {
  spot: DateSpot | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToDatePlan: (spot: DateSpot) => void;
  onFocusOnMap?: (spot: DateSpot) => void;
}

export const SpotDetailModal: React.FC<SpotDetailModalProps> = ({
  spot,
  isOpen,
  onClose,
  onAddToDatePlan,
  onFocusOnMap
}) => {
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number>(0);
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<'All' | 'Food' | 'Coffee' | 'Cocktail' | 'Dessert'>('All');

  if (!isOpen || !spot) return null;

  // Combine hero photo with interior photos
  const allPhotos = [
    { url: spot.image, label: 'Front & Venue View' },
    ...(spot.interiorPhotos || []).map((url, i) => ({
      url,
      label: `Interior Ambiance ${i + 1}`
    }))
  ];

  const currentPhoto = allPhotos[selectedPhotoIdx] || allPhotos[0];

  const menuList: MenuItem[] = spot.menuHighlights || [
    {
      name: spot.signatureOrder,
      category: spot.category === 'coffee' ? 'Coffee' : spot.category === 'dessert' ? 'Dessert' : spot.category === 'cocktail' ? 'Cocktail' : 'Food',
      priceETB: Math.round(spot.avgCostForTwoETB * 0.4),
      description: 'Signature romantic recommendation freshly prepared for two.',
      isPopular: true
    }
  ];

  const filteredMenuItems = selectedMenuCategory === 'All' 
    ? menuList 
    : menuList.filter(item => item.category === selectedMenuCategory);

  const isItalian = spot.knownCategory === 'italian';
  const isBakery = spot.knownCategory === 'bakery';
  const isBreakfast = spot.knownCategory === 'breakfast';
  const isDinner = spot.knownCategory === 'dinner';
  const isCoffee = spot.knownCategory === 'coffee' || spot.category === 'coffee';
  const isDessert = spot.knownCategory === 'dessert' || spot.category === 'dessert';
  const isCocktail = spot.knownCategory === 'cocktail' || spot.category === 'cocktail';

  const categoryLabel = isItalian
    ? '🍝 Italian Restaurant'
    : isBakery
    ? '🥐 Bakery & Patisserie'
    : isBreakfast
    ? '🥞 Breakfast & Brunch House'
    : isDinner
    ? '🍷 Romantic Dinner House'
    : isDessert 
    ? '🍰 Sweet & Dessert House' 
    : isCoffee 
    ? '☕ Specialty Coffee House' 
    : isCocktail 
    ? '🍸 Cocktail House & Lounge' 
    : '🌲 Scenic Escape';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 7, 15, 0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '92vh',
          backgroundColor: '#0c0f1c',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          animation: 'fadeInUp 0.25s ease-out'
        }}
      >
        {/* Sticky Header with Title & Close button */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(12, 15, 28, 0.95)',
            zIndex: 10
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              className={
                isDessert ? 'badge-rose' : isCoffee ? 'badge-gold' : isCocktail ? 'badge-purple' : 'badge-emerald'
              }
              style={{ fontSize: '0.74rem' }}
            >
              {categoryLabel}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              📍 {spot.neighborhood}
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: '#fff',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div
          style={{
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {/* Photo Gallery & Hero Showcase */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div
              style={{
                position: 'relative',
                height: '280px',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundImage: `url(${currentPhoto.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 'inset 0 0 80px rgba(0,0,0,0.4)'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(12, 15, 28, 0.9) 0%, transparent 60%)'
                }}
              />

              {/* Photo Navigator Buttons */}
              {allPhotos.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedPhotoIdx((prev) => (prev > 0 ? prev - 1 : allPhotos.length - 1))}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(0, 0, 0, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    onClick={() => setSelectedPhotoIdx((prev) => (prev < allPhotos.length - 1 ? prev + 1 : 0))}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(0, 0, 0, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Photo Label Pill */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                  backdropFilter: 'blur(4px)',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '0.74rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                <Camera size={13} color="var(--rose-400)" />
                {currentPhoto.label} ({selectedPhotoIdx + 1}/{allPhotos.length})
              </div>

              {/* Name & Quick Rating on Bottom of Hero */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '14px',
                  left: '16px',
                  right: '16px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: '8px'
                }}
              >
                <div>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                    {spot.name}
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#e2e8f0', marginTop: '2px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--gold-400)', fontWeight: 700 }}>
                      <Star size={14} fill="currentColor" /> {spot.rating}
                    </span>
                    <span>({spot.reviewCount} reviews)</span>
                    <span>• {spot.priceLevel}</span>
                    <span>• ~{spot.avgCostForTwoETB} ETB for 2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Thumbnails */}
            {allPhotos.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                {allPhotos.map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhotoIdx(idx)}
                    style={{
                      height: '56px',
                      width: '76px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundImage: `url(${photo.url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      flexShrink: 0,
                      cursor: 'pointer',
                      border: selectedPhotoIdx === idx ? '2px solid var(--rose-500)' : '1px solid rgba(255, 255, 255, 0.15)',
                      opacity: selectedPhotoIdx === idx ? 1 : 0.65,
                      transition: 'all 0.2s ease'
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Menu Highlights Section with Category Filters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>
                  Featured Date Menu & Prices
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Handpicked favorites with prices in Ethiopian Birr (ETB)
                </p>
              </div>

              {/* Menu Filter Tabs */}
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
                {(['All', 'Food', 'Coffee', 'Cocktail', 'Dessert'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedMenuCategory(cat)}
                    style={{
                      padding: '5px 11px',
                      borderRadius: '8px',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      backgroundColor: selectedMenuCategory === cat ? 'var(--rose-600)' : 'rgba(255, 255, 255, 0.05)',
                      color: selectedMenuCategory === cat ? '#fff' : 'var(--text-secondary)',
                      border: selectedMenuCategory === cat ? '1px solid var(--rose-400)' : '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    {cat === 'All' ? 'All' : cat === 'Food' ? '🍽️ Food' : cat === 'Coffee' ? '☕ Coffee' : cat === 'Cocktail' ? '🍸 Cocktails' : '🍰 Desserts'}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredMenuItems.map((item, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#fff' }}>
                        {item.name}
                      </span>
                      {item.isPopular && (
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '2px 7px',
                            borderRadius: '999px',
                            backgroundColor: 'rgba(245, 158, 11, 0.2)',
                            color: 'var(--gold-400)',
                            border: '1px solid rgba(245, 158, 11, 0.3)'
                          }}
                        >
                          ⭐ Popular
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                      {item.description}
                    </p>
                  </div>

                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: '0.92rem',
                      color: 'var(--gold-400)',
                      whiteSpace: 'nowrap',
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      padding: '4px 8px',
                      borderRadius: '8px'
                    }}
                  >
                    {item.priceETB} ETB
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exact Location, GPS Coordinates & Mini-Map */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '16px',
              padding: '16px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--rose-400)', fontWeight: 700, fontSize: '0.92rem' }}>
                <MapPin size={16} /> Exact Location & GPS Coordinates
              </div>

              {onFocusOnMap && (
                <button
                  type="button"
                  onClick={() => {
                    onFocusOnMap(spot);
                    onClose();
                  }}
                  className="btn-secondary"
                  style={{
                    padding: '4px 10px',
                    fontSize: '0.74rem',
                    color: 'var(--gold-400)',
                    gap: '4px'
                  }}
                >
                  <Navigation size={12} /> Focus on Page Map
                </button>
              )}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '10px',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: '#fff' }}>Exact Street / Landmark</div>
                <div style={{ color: '#e2e8f0', marginTop: '2px' }}>{spot.address}</div>
              </div>

              <div>
                <div style={{ fontWeight: 700, color: '#fff' }}>Neighborhood & Coordinates</div>
                <div style={{ color: '#e2e8f0', marginTop: '2px' }}>
                  {spot.neighborhood} • 📍 {spot.lat.toFixed(4)}° N, {spot.lng.toFixed(4)}° E
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 700, color: '#fff' }}>Opening Hours</div>
                <div style={{ color: '#e2e8f0', marginTop: '2px' }}>{spot.openingHours}</div>
              </div>
            </div>

            {/* Embedded Mini-Map Pin */}
            <div
              style={{
                height: '160px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginTop: '4px'
              }}
            >
              <iframe
                title={`Exact Map Location for ${spot.name}`}
                src={`https://maps.google.com/maps?q=${spot.lat},${spot.lng}&z=16&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(12, 15, 28, 0.98)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            alignItems: 'center'
          }}
        >
          {onFocusOnMap && (
            <button
              onClick={() => {
                onFocusOnMap(spot);
                onClose();
              }}
              className="btn-secondary"
              style={{
                padding: '12px 14px',
                fontSize: '0.82rem',
                gap: '5px',
                color: 'var(--gold-400)'
              }}
            >
              <Navigation size={14} /> Center on Map
            </button>
          )}

          <button
            onClick={() => {
              onAddToDatePlan(spot);
              onClose();
            }}
            className="btn-primary"
            style={{
              flex: 2,
              minWidth: '180px',
              padding: '12px 18px',
              fontSize: '0.88rem',
              fontWeight: 700,
              gap: '8px'
            }}
          >
            <Plus size={18} /> Add to Our Weekend Date Plan
          </button>

          <a
            href={spot.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{
              padding: '12px 14px',
              fontSize: '0.84rem',
              textDecoration: 'none',
              gap: '6px',
              color: '#fff'
            }}
          >
            <Navigation size={15} color="var(--rose-400)" /> Open App
          </a>
        </div>
      </div>
    </div>
  );
};
