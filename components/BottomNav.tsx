'use client';

import React from 'react';
import { Calendar, Compass, MapPin, Bell, Sparkles } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'overview' | 'planner' | 'events' | 'spots' | 'reminders';
  setActiveTab: (tab: 'overview' | 'planner' | 'events' | 'spots' | 'reminders') => void;
  dateCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, dateCount = 0 }) => {
  return (
    <nav
      aria-label="Mobile Navigation"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        backgroundColor: 'rgba(11, 13, 20, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingBottom: 'max(env(safe-area-inset-bottom, 12px), 12px)',
        paddingTop: '8px',
        paddingLeft: '16px',
        paddingRight: '16px'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          maxWidth: '500px',
          margin: '0 auto'
        }}
      >
        <button
          onClick={() => setActiveTab('overview')}
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          aria-label="This Weekend overview"
        >
          <Sparkles size={20} />
          <span>Weekend</span>
        </button>

        <button
          onClick={() => setActiveTab('planner')}
          className={`tab-button ${activeTab === 'planner' ? 'active' : ''}`}
          aria-label="Weekend Date Planner"
          style={{ position: 'relative' }}
        >
          <Calendar size={20} />
          <span>Planner</span>
          {dateCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '4px',
                right: '10px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--rose-500)',
                boxShadow: '0 0 6px var(--rose-500)'
              }}
            />
          )}
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
          aria-label="Addis Ababa Events"
        >
          <Compass size={20} />
          <span>Events</span>
        </button>

        <button
          onClick={() => setActiveTab('spots')}
          className={`tab-button ${activeTab === 'spots' ? 'active' : ''}`}
          aria-label="Date Spots and Map"
        >
          <MapPin size={20} />
          <span>Spots & Map</span>
        </button>

        <button
          onClick={() => setActiveTab('reminders')}
          className={`tab-button ${activeTab === 'reminders' ? 'active' : ''}`}
          aria-label="Date Reminders"
        >
          <Bell size={20} />
          <span>Reminders</span>
        </button>
      </div>
    </nav>
  );
};
