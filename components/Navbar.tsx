'use client';

import { Heart, Bell, Plus, Clock, Sparkles, Calendar, Ticket, Compass } from 'lucide-react';
import { CoupleAuthHeader } from './CoupleAuthHeader';

interface NavbarProps {
  onOpenNewDate: () => void;
  onOpenReminders: () => void;
  hasUpcomingReminder?: boolean;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  partner1Name?: string;
  partner2Name?: string;
  onUpdateCoupleNames?: (p1: string, p2: string) => void;
  currentUser?: any;
  partner?: any;
  coupleSpace?: any;
  onAuthChange?: () => void;
  unreadNotificationsCount?: number;
  onOpenNotifications?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenNewDate,
  onOpenReminders,
  hasUpcomingReminder = true,
  activeTab,
  setActiveTab,
  partner1Name = 'Me',
  partner2Name = 'My Partner',
  onUpdateCoupleNames,
  currentUser,
  partner,
  coupleSpace,
  onAuthChange = () => {},
  unreadNotificationsCount = 0,
  onOpenNotifications = () => {}
}) => {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 800,
        backgroundColor: 'rgba(10, 12, 19, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '12px 20px',
        paddingTop: 'max(env(safe-area-inset-top, 12px), 12px)'
      }}
    >
      {/* Top Bar: Brand (Logo) on Left, Action Tools on Right */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f43f5e, #be123c)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(244, 63, 94, 0.35)',
              flexShrink: 0
            }}
          >
            <Heart size={20} color="#fff" fill="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 800, fontSize: '1.18rem', color: '#fff', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                Our Weekend
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: 'var(--rose-400)',
                  backgroundColor: 'rgba(244, 63, 94, 0.15)',
                  padding: '1px 6px',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap'
                }}
              >
                Addis
              </span>
            </div>
            <div className="brand-subtitle" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
              Romantic Dates in Addis Ababa
            </div>
          </div>
        </div>

        {/* Right Actions: Compact & Mobile-Compatible */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Couple Account & Sync Badge */}
          <div className="couple-badge-container">
            <CoupleAuthHeader
              currentUser={currentUser}
              partner={partner}
              coupleSpace={coupleSpace}
              onAuthChange={onAuthChange}
            />
          </div>

          {/* Couple Notifications Bell with unread badge */}
          <button
            onClick={onOpenNotifications}
            style={{
              position: 'relative',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: unreadNotificationsCount > 0 ? 'rgba(244, 63, 94, 0.15)' : 'rgba(255, 255, 255, 0.06)',
              border: unreadNotificationsCount > 0 ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: unreadNotificationsCount > 0 ? 'var(--rose-400)' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            title={`Couple Notifications ${unreadNotificationsCount > 0 ? `(${unreadNotificationsCount} unread)` : ''}`}
            aria-label="View Couple Notifications"
          >
            <Bell size={18} />
            {unreadNotificationsCount > 0 ? (
              <span
                style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  minWidth: '18px',
                  height: '18px',
                  borderRadius: '999px',
                  backgroundColor: '#f43f5e',
                  color: '#fff',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px',
                  boxShadow: '0 0 10px rgba(244, 63, 94, 0.8)'
                }}
              >
                {unreadNotificationsCount}
              </span>
            ) : hasUpcomingReminder ? (
              <span
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--gold-400)',
                  boxShadow: '0 0 8px var(--gold-400)'
                }}
              />
            ) : null}
          </button>

          {/* New Date Button (+ Sign Only) */}
          <button
            onClick={onOpenNewDate}
            className="btn-primary"
            style={{
              width: '38px',
              height: '38px',
              minHeight: '38px',
              borderRadius: '10px',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(244, 63, 94, 0.4)',
              cursor: 'pointer',
              flexShrink: 0
            }}
            title="Plan a new date"
            aria-label="Plan a new date"
          >
            <Plus size={20} strokeWidth={2.5} color="#fff" />
          </button>
        </div>
      </div>

      {/* Row Under the Logo: Navigation Header Tabs (Attractive Glassmorphism Island) */}
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '8px'
        }}
      >
        <div className="header-nav-pill-bar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`header-nav-pill-btn ${activeTab === 'overview' ? 'active' : ''}`}
          >
            <Sparkles size={14} strokeWidth={2.3} className="tab-icon" />
            <span>Weekend</span>
          </button>
          <button
            onClick={() => setActiveTab('planner')}
            className={`header-nav-pill-btn ${activeTab === 'planner' ? 'active' : ''}`}
          >
            <Calendar size={14} strokeWidth={2.3} className="tab-icon" />
            <span>Planner</span>
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`header-nav-pill-btn ${activeTab === 'events' ? 'active' : ''}`}
          >
            <Ticket size={14} strokeWidth={2.3} className="tab-icon" />
            <span>Events</span>
          </button>
          <button
            onClick={() => setActiveTab('spots')}
            className={`header-nav-pill-btn ${activeTab === 'spots' ? 'active' : ''}`}
          >
            <Compass size={14} strokeWidth={2.3} className="tab-icon" />
            <span>Spots</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .header-nav-pill-bar {
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 480px;
          background: rgba(18, 22, 34, 0.78);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 4px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 8px 30px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          gap: 4px;
        }
        .header-nav-pill-btn {
          flex: 1 1 0;
          min-width: 0;
          padding: 7px 10px;
          border-radius: 999px;
          font-size: 0.80rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          white-space: nowrap;
          color: rgba(255, 255, 255, 0.65);
          background-color: transparent;
          border: none;
          outline: none;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          user-select: none;
        }
        .header-nav-pill-btn:hover:not(.active) {
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.08);
          transform: translateY(-0.5px);
        }
        .header-nav-pill-btn.active {
          color: #ffffff;
          background: linear-gradient(135deg, #fb7185 0%, #f43f5e 45%, #be123c 100%);
          box-shadow: 0 4px 18px rgba(244, 63, 94, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.35);
          font-weight: 700;
          transform: scale(1.02);
        }
        :global(.tab-icon) {
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }
        .header-nav-pill-btn.active :global(.tab-icon) {
          filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3));
        }
        @media (max-width: 600px) {
          .header-nav-pill-bar {
            max-width: 100%;
            padding: 3px;
            gap: 2px;
          }
          .header-nav-pill-btn {
            padding: 6px 4px;
            font-size: 0.74rem;
            gap: 4px;
          }
        }
        @media (max-width: 480px) {
          .brand-subtitle {
            display: none !important;
          }
          .header-nav-pill-btn {
            font-size: 0.70rem;
            padding: 6px 2px;
            gap: 3px;
          }
        }
      `}</style>
    </header>
  );
};
