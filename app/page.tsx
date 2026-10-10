'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { DatePlan, DateSpot, AddisEvent, CoupleProfile } from '@/lib/types';
import { filterActiveUpcomingEvents, getLiveEventTimingBadge } from '@/lib/event-timing';
import { Navbar } from '@/components/Navbar';
import { BottomNav } from '@/components/BottomNav';
import { WeekendCountdown } from '@/components/WeekendCountdown';
import { DatePlanner } from '@/components/DatePlanner';
import { EventsExplorer } from '@/components/EventsExplorer';
import { SpotsDirectory } from '@/components/SpotsDirectory';
import { SpotDetailModal } from '@/components/SpotDetailModal';
import { NewDateModal } from '@/components/NewDateModal';
import { ReminderModal } from '@/components/ReminderModal';
import { CustomEventModal } from '@/components/CustomEventModal';
import { SexyHeroSplit } from '@/components/SexyHeroSplit';
import { NotificationDrawer, NotificationItem } from '@/components/NotificationDrawer';
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  Compass, 
  Heart, 
  Coffee, 
  Utensils, 
  ArrowRight, 
  Bell, 
  Download,
  CheckCircle2,
  Clock,
  X
} from 'lucide-react';

export default function HomePage() {
  const [dates, setDates] = useState<DatePlan[]>([]);
  const [spots, setSpots] = useState<DateSpot[]>([]);
  const [events, setEvents] = useState<AddisEvent[]>([]);
  const [profile, setProfile] = useState<CoupleProfile | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Filter out past events in real-time (e.g. Friday 3:00 drops at 3:01)
  const activeEvents = useMemo(() => {
    return filterActiveUpcomingEvents(events, currentTime);
  }, [events, currentTime]);

  // Couple Auth & Shared Space state
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [partner, setPartner] = useState<any | null>(null);
  const [coupleSpace, setCoupleSpace] = useState<any | null>(null);

  // Real-time Couple Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState<number>(0);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [partnerToast, setPartnerToast] = useState<{ title: string; message: string } | null>(null);
  const lastNotifIdRef = React.useRef<string | null>(null);

  const [activeTab, setActiveTab] = useState<'overview' | 'planner' | 'events' | 'spots' | 'reminders'>('overview');

  // Modals
  const [isNewDateModalOpen, setIsNewDateModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isCustomEventModalOpen, setIsCustomEventModalOpen] = useState(false);
  const [selectedSpotForDetail, setSelectedSpotForDetail] = useState<DateSpot | null>(null);
  const [isSpotDetailModalOpen, setIsSpotDetailModalOpen] = useState(false);

  const [editingDate, setEditingDate] = useState<DatePlan | null>(null);
  const [preselectedSpot, setPreselectedSpot] = useState<DateSpot | null>(null);
  const [preselectedEvent, setPreselectedEvent] = useState<AddisEvent | null>(null);

  const [loading, setLoading] = useState(true);

  // Fetch initial data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [datesRes, spotsRes, eventsRes] = await Promise.all([
        fetch('/api/dates'),
        fetch('/api/spots'),
        fetch('/api/events')
      ]);

      const datesData = await datesRes.json();
      const spotsData = await spotsRes.json();
      const eventsData = await eventsRes.json();

      setDates(datesData.dates || []);
      setProfile(datesData.profile || null);
      setSpots(spotsData.spots || []);
      setEvents(eventsData.events || []);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch couple session and notifications
  const fetchAuthAndNotifications = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();

      if (data.user) {
        setCurrentUser(data.user);
        setPartner(data.partner || null);
        setCoupleSpace(data.coupleSpace || null);
      } else {
        setCurrentUser(null);
        setPartner(null);
        setCoupleSpace(data.coupleSpace || null);
      }

      if (data.notifications) {
        const notifs: NotificationItem[] = data.notifications;
        // If a new unread notification arrived from partner, show toast and auto-refresh dates
        if (lastNotifIdRef.current && notifs.length > 0) {
          const latest = notifs[0];
          if (latest.id !== lastNotifIdRef.current && !latest.read) {
            setPartnerToast({ title: latest.title, message: latest.message });
            fetchData();
            setTimeout(() => setPartnerToast(null), 5500);
          }
        }
        if (notifs.length > 0) {
          lastNotifIdRef.current = notifs[0].id;
        }
        setNotifications(notifs);
        setUnreadNotificationsCount(data.unreadCount || 0);
      }
    } catch (err) {
      console.error('Error fetching auth & notifications:', err);
    }
  };

  // Real-time synchronization for dates, events and notifications
  const syncRealtime = async () => {
    try {
      await fetchAuthAndNotifications();
      const [datesRes, eventsRes] = await Promise.all([
        fetch('/api/dates'),
        fetch('/api/events')
      ]);
      const datesData = await datesRes.json();
      const eventsData = await eventsRes.json();
      if (datesData.dates) setDates(datesData.dates);
      if (eventsData.events) setEvents(eventsData.events);
    } catch (err) {
      console.error('Real-time sync error:', err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAuthAndNotifications();

    // Polling interval (every 5 seconds for live real-time couple events & dates updates)
    const interval = setInterval(() => {
      syncRealtime();
    }, 5000);

    // Live clock ticker (every 1 second to expire past events in real-time)
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(clockInterval);
    };
  }, []);

  // Quick actions
  const handleOpenNewDate = () => {
    setEditingDate(null);
    setPreselectedSpot(null);
    setPreselectedEvent(null);
    setIsNewDateModalOpen(true);
  };

  const handleEditDate = (date: DatePlan) => {
    setEditingDate(date);
    setPreselectedSpot(null);
    setPreselectedEvent(null);
    setIsNewDateModalOpen(true);
  };

  const handlePlanFromSpot = (spot: DateSpot) => {
    setEditingDate(null);
    setPreselectedSpot(spot);
    setPreselectedEvent(null);
    setIsNewDateModalOpen(true);
  };

  const handleOpenSpotDetail = (spot: DateSpot) => {
    setSelectedSpotForDetail(spot);
    setIsSpotDetailModalOpen(true);
  };

  const handlePlanFromEvent = (evt: AddisEvent) => {
    setEditingDate(null);
    setPreselectedSpot(null);
    setPreselectedEvent(evt);
    setIsNewDateModalOpen(true);
  };

  const handleUpdateCoupleNames = async (p1: string, p2: string) => {
    setProfile(prev => ({
      partner1Name: p1,
      partner2Name: p2,
      favoriteVibe: prev?.favoriteVibe,
      reminderChannel: prev?.reminderChannel,
      anniversaryDate: prev?.anniversaryDate
    }));

    try {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partner1Name: p1, partner2Name: p2 })
      });
    } catch (err) {
      console.error('Failed to update couple profile:', err);
    }
  };

  const upcomingDate = dates.find(d => d.status !== 'completed') || dates[0];

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-base)',
        color: 'var(--text-main)',
        paddingBottom: '88px' // Clearance for bottom navigation
      }}
    >
      {/* Header / Navbar */}
      <Navbar
        onOpenNewDate={handleOpenNewDate}
        onOpenReminders={() => setIsReminderModalOpen(true)}
        hasUpcomingReminder={dates.some(d => d.reminderEnabled && d.status !== 'completed')}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        partner1Name={currentUser ? currentUser.name : (profile?.partner1Name || 'Me')}
        partner2Name={partner ? partner.name : (profile?.partner2Name || 'Partner')}
        onUpdateCoupleNames={handleUpdateCoupleNames}
        currentUser={currentUser}
        partner={partner}
        coupleSpace={coupleSpace}
        onAuthChange={() => {
          fetchAuthAndNotifications();
          fetchData();
        }}
        unreadNotificationsCount={unreadNotificationsCount}
        onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
      />

      {/* Real-time Partner Activity Floating Toast Alert */}
      {partnerToast && (
        <div
          style={{
            position: 'fixed',
            top: '72px',
            right: '18px',
            zIndex: 9990,
            maxWidth: '380px',
            backgroundColor: 'rgba(17, 21, 34, 0.95)',
            border: '1px solid rgba(244, 63, 94, 0.45)',
            borderRadius: '16px',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.7), 0 0 20px rgba(244, 63, 94, 0.3)',
            padding: '14px 18px',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            animation: 'fadeInDown 0.3s ease-out'
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(244, 63, 94, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Heart size={16} color="var(--rose-400)" fill="var(--rose-400)" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff', marginBottom: '2px' }}>
              {partnerToast.title}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.35 }}>
              {partnerToast.message}
            </div>
          </div>
          <button
            onClick={() => setPartnerToast(null)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              padding: '2px'
            }}
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main
          style={{
            maxWidth: '1200px',
            width: '100%',
            margin: '0 auto',
            padding: '18px 16px',
            flex: 1
          }}
        >
          {loading ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '80px 20px',
                gap: '16px'
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '3px solid rgba(244, 63, 94, 0.2)',
                  borderTopColor: 'var(--rose-500)',
                  animation: 'spin 0.8s linear infinite'
                }}
              />
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                Loading romantic Addis dates…
              </p>
              <style jsx>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          ) : (
            <>
              {/* TAB 1: OVERVIEW (THIS WEEKEND) */}
              {activeTab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  {/* Seductive Side-by-Side Hero for M-F busy couples */}
                  <SexyHeroSplit
                    upcomingDate={upcomingDate}
                    onOpenNewDate={handleOpenNewDate}
                    onExploreEvents={() => setActiveTab('events')}
                    onExploreSpots={() => setActiveTab('spots')}
                  />

                  {/* Quick Shortcut Tiles */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                      gap: '12px'
                    }}
                  >
                    <button
                      onClick={() => setActiveTab('planner')}
                      className="glass-panel"
                      style={{
                        padding: '16px',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                    >
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(244, 63, 94, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--rose-400)'
                        }}
                      >
                        <Calendar size={18} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>Weekend Planner</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                          {dates.length} scheduled dates
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveTab('events')}
                      className="glass-panel"
                      style={{
                        padding: '16px',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                    >
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(168, 85, 247, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--purple-400)'
                        }}
                      >
                        <Compass size={18} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>Addis Events</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                          {events.length} upcoming weekend gigs
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setActiveTab('spots')}
                      className="glass-panel"
                      style={{
                        padding: '16px',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                    >
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(245, 158, 11, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--gold-400)'
                        }}
                      >
                        <MapPin size={18} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>Spots & Map</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                          {spots.length} restaurants & cafés
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setIsReminderModalOpen(true)}
                      className="glass-panel"
                      style={{
                        padding: '16px',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                    >
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          backgroundColor: 'rgba(16, 185, 129, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--emerald-400)'
                        }}
                      >
                        <Bell size={18} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>Reminders</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                          Active alerts & .ics
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Section: Trending Weekend Events in Addis */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Top Events This Weekend</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          Live Ethio-jazz, outdoor art, and romantic evening screenings
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('events')}
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--rose-400)',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        See All <ArrowRight size={14} />
                      </button>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '14px'
                      }}
                    >
                      {activeEvents.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '24px', gridColumn: '1 / -1', textAlign: 'center' }}>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
                            All events for this time have concluded. Next upcoming Addis experiences sync dynamically!
                          </p>
                        </div>
                      ) : (
                        activeEvents.slice(0, 3).map(evt => {
                          const timingBadge = getLiveEventTimingBadge(evt, currentTime);
                          return (
                            <div
                              key={evt.id}
                              className="glass-panel"
                              style={{
                                borderRadius: '14px',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column'
                              }}
                            >
                              <div
                                style={{
                                  height: '110px',
                                  backgroundImage: `url(${evt.image})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  position: 'relative'
                                }}
                              >
                                <span
                                  className="badge-rose"
                                  style={{
                                    position: 'absolute',
                                    bottom: '8px',
                                    left: '10px',
                                    fontSize: '0.68rem',
                                    backgroundColor: timingBadge.isSoon ? 'rgba(244, 63, 94, 0.4)' : undefined,
                                    border: timingBadge.isSoon ? '1px solid #f43f5e' : undefined
                                  }}
                                >
                                  <Clock size={11} style={{ display: 'inline', marginRight: '3px' }} />
                                  {timingBadge.label}
                                </span>
                              </div>
                              <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                                <div style={{ fontWeight: 700, fontSize: '0.94rem' }}>{evt.title}</div>
                                <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <MapPin size={12} color="var(--rose-400)" />
                                  {evt.venue} ({evt.neighborhood})
                                </div>
                                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                                  {evt.description.slice(0, 85)}…
                                </p>
                                <button
                                  onClick={() => handlePlanFromEvent(evt)}
                                  className="btn-secondary"
                                  style={{
                                    marginTop: 'auto',
                                    padding: '7px',
                                    fontSize: '0.76rem',
                                    width: '100%'
                                  }}
                                >
                                  Plan Date For This
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Section: Best Romantic Spots Sneak Peek */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Iconic Date Spots</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          Coffee sanctuaries & candlelit restaurants in Addis
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('spots')}
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--rose-400)',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        Explore All Spots <ArrowRight size={14} />
                      </button>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '14px'
                      }}
                    >
                      {spots.slice(0, 3).map(spot => (
                        <div
                          key={spot.id}
                          className="glass-panel"
                          onClick={() => handleOpenSpotDetail(spot)}
                          style={{
                            borderRadius: '14px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            cursor: 'pointer',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            transition: 'transform 0.2s ease, border-color 0.2s ease'
                          }}
                        >
                          <div
                            style={{
                              height: '110px',
                              backgroundImage: `url(${spot.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              position: 'relative'
                            }}
                          >
                            <span
                              className={spot.category === 'coffee' ? 'badge-gold' : 'badge-rose'}
                              style={{ position: 'absolute', bottom: '8px', left: '10px', fontSize: '0.68rem' }}
                            >
                              {spot.category === 'coffee' ? '☕ Coffee House' : '🍷 Restaurant'}
                            </span>
                            <span
                              style={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                backgroundColor: 'rgba(0,0,0,0.65)',
                                color: '#fff',
                                fontSize: '0.66rem',
                                padding: '2px 6px',
                                borderRadius: '6px'
                              }}
                            >
                              📸 Interior & Menu
                            </span>
                          </div>
                          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: '0.94rem' }}>{spot.name}</div>
                            <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                              📍 {spot.neighborhood} • {spot.priceLevel}
                            </div>
                            <div style={{ display: 'flex', gap: '6px', marginTop: 'auto', paddingTop: '4px' }}>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenSpotDetail(spot);
                                }}
                                className="btn-secondary"
                                style={{
                                  padding: '6px 8px',
                                  fontSize: '0.74rem',
                                  flex: 1
                                }}
                              >
                                🔍 Details & Menu
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePlanFromSpot(spot);
                                }}
                                className="btn-primary"
                                style={{
                                  padding: '6px 8px',
                                  fontSize: '0.74rem',
                                  flex: 1
                                }}
                              >
                                + Add Date
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: DATE PLANNER */}
              {activeTab === 'planner' && (
                <DatePlanner
                  dates={dates}
                  onRefresh={() => {
                    fetchData();
                    fetchAuthAndNotifications();
                  }}
                  onOpenNewDate={handleOpenNewDate}
                  onEditDate={handleEditDate}
                  onViewSpotDetail={handleOpenSpotDetail}
                />
              )}

              {/* TAB 3: ADDIS EVENTS */}
              {activeTab === 'events' && (
                <EventsExplorer
                  events={activeEvents}
                  onPlanDateFromEvent={handlePlanFromEvent}
                  onOpenNewCustomEvent={() => setIsCustomEventModalOpen(true)}
                />
              )}

              {/* TAB 4: SPOTS & MAP */}
              {activeTab === 'spots' && (
                <SpotsDirectory
                  spots={spots}
                  onAddSpotToDate={handlePlanFromSpot}
                />
              )}

              {/* TAB 5: REMINDERS */}
              {activeTab === 'reminders' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Bell size={22} color="var(--gold-400)" />
                      Weekend Date Reminders
                    </h2>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                      Keep your dates organized with automatic alarms, iOS calendar sync, and push notifications
                    </p>
                  </div>

                  <div
                    className="glass-panel"
                    style={{
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Clock size={20} color="var(--rose-400)" />
                      <h3 style={{ fontSize: '1.1rem' }}>Never Forget Your Saturday / Sunday Date</h3>
                    </div>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      Since you are both busy with work from Monday to Friday, Our Weekend ensures you never forget reservations, outfit preparations, or departure times.
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      <button
                        onClick={() => setIsReminderModalOpen(true)}
                        className="btn-gold"
                        style={{ padding: '10px 18px', fontSize: '0.86rem' }}
                      >
                        <Bell size={16} /> Manage Push Alerts & Settings
                      </button>
                    </div>
                  </div>

                  {/* Dates list with export buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Upcoming Scheduled Dates</h3>
                    {dates.length === 0 ? (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>No dates scheduled yet.</p>
                    ) : (
                      dates.map(date => (
                        <div
                          key={date.id}
                          className="glass-panel"
                          style={{
                            padding: '16px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '12px'
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>{date.title}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                              <span>📅 {date.targetDate} ({date.dayLabel || 'Saturday'})</span>
                              <span>• ⏰ {date.time}</span>
                              <span>• Notice: {date.reminderNotice} before</span>
                            </div>
                          </div>

                          <a
                            href={`/api/export-ics?id=${date.id}`}
                            download={`addis-date-${date.id}.ics`}
                            className="btn-primary"
                            style={{
                              padding: '8px 14px',
                              fontSize: '0.8rem',
                              textDecoration: 'none',
                              gap: '6px'
                            }}
                          >
                            <Download size={14} /> Add to iPhone Calendar
                          </a>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </main>

        {/* Bottom Navigation for Mobile & iPhone 12 */}
        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          dateCount={dates.length}
        />

        {/* Modals */}
        <NewDateModal
          isOpen={isNewDateModalOpen}
          onClose={() => {
            setIsNewDateModalOpen(false);
            setEditingDate(null);
            setPreselectedSpot(null);
            setPreselectedEvent(null);
          }}
          onSave={() => {
            fetchData();
            fetchAuthAndNotifications();
          }}
          spots={spots}
          events={events}
          initialData={editingDate}
          preselectedSpot={preselectedSpot}
          preselectedEvent={preselectedEvent}
        />

        <ReminderModal
          isOpen={isReminderModalOpen}
          onClose={() => setIsReminderModalOpen(false)}
          dates={dates}
        />

        <CustomEventModal
          isOpen={isCustomEventModalOpen}
          onClose={() => setIsCustomEventModalOpen(false)}
          onCreated={() => {
            fetchData();
            fetchAuthAndNotifications();
          }}
        />

        {/* Global Spot Detail Modal (Photos, Interior, Menu) */}
        <SpotDetailModal
          spot={selectedSpotForDetail}
          isOpen={isSpotDetailModalOpen}
          onClose={() => {
            setIsSpotDetailModalOpen(false);
            setSelectedSpotForDetail(null);
          }}
          onAddToDatePlan={handlePlanFromSpot}
        />

        {/* Real-time Couple Notifications Drawer */}
        <NotificationDrawer
          isOpen={isNotificationDrawerOpen}
          onClose={() => setIsNotificationDrawerOpen(false)}
          notifications={notifications}
          onMarkAllRead={async () => {
            try {
              await fetch('/api/notifications', { method: 'POST' });
              setNotifications(prev => prev.map(n => ({ ...n, read: true })));
              setUnreadNotificationsCount(0);
            } catch (err) {
              console.error(err);
            }
          }}
          onMarkSingleRead={async (id: string) => {
            try {
              await fetch('/api/notifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ notificationId: id })
              });
              setNotifications(prev => prev.map(n => n.id === id ? ({ ...n, read: true }) : n));
              setUnreadNotificationsCount(prev => Math.max(0, prev - 1));
            } catch (err) {
              console.error(err);
            }
          }}
          onSelectDatePlan={(datePlanId: string) => {
            setActiveTab('planner');
            setIsNotificationDrawerOpen(false);
          }}
          partnerName={partner ? partner.name : (profile?.partner2Name || 'Partner')}
        />
    </div>
  );
}
