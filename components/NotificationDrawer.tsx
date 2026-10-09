'use client';

import React from 'react';
import { Heart, Bell, CheckCheck, X, Calendar, CheckSquare, Sparkles, Trash2, UserPlus, Clock } from 'lucide-react';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  actorName: string;
  read: boolean;
  createdAt: string;
  datePlanId?: string | null;
}

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onMarkSingleRead: (id: string) => void;
  onSelectDatePlan?: (datePlanId: string) => void;
  partnerName?: string;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onMarkSingleRead,
  onSelectDatePlan,
  partnerName = 'Your Partner'
}) => {
  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'date_created':
        return <Heart size={18} color="#f43f5e" fill="#f43f5e" />;
      case 'checklist_toggle':
        return <CheckSquare size={18} color="#34d399" />;
      case 'date_updated':
        return <Sparkles size={18} color="#fbbf24" />;
      case 'date_deleted':
        return <Trash2 size={18} color="#94a3b8" />;
      case 'partner_joined':
        return <UserPlus size={18} color="#ec4899" />;
      default:
        return <Bell size={18} color="#f43f5e" />;
    }
  };

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMin = Math.floor(diffMs / (1000 * 60));
      const diffHr = Math.floor(diffMin / 60);
      const diffDays = Math.floor(diffHr / 24);

      if (diffMin < 1) return 'Just now';
      if (diffMin < 60) return `${diffMin}m ago`;
      if (diffHr < 24) return `${diffHr}h ago`;
      if (diffDays === 1) return 'Yesterday';
      return `${date.getMonth() + 1}/${date.getDate()}`;
    } catch {
      return '';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(5, 7, 13, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'all 0.25s ease'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100%',
          backgroundColor: '#0f131f',
          borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '-10px 0 35px rgba(0, 0, 0, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          color: '#fff',
          animation: 'slideInRight 0.25s ease-out'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, rgba(244, 63, 94, 0.08) 0%, transparent 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #f43f5e, #be123c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(244, 63, 94, 0.4)'
              }}
            >
              <Bell size={18} color="#fff" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>
                Couple Alerts
              </h3>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.55)' }}>
                {unreadCount > 0 ? `${unreadCount} new update${unreadCount > 1 ? 's' : ''}` : 'All caught up with ' + partnerName}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                title="Mark all as read"
              >
                <CheckCheck size={14} color="#34d399" />
                Read All
              </button>
            )}

            <button
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          {notifications.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px 20px',
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.5)',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(244, 63, 94, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Heart size={26} color="var(--rose-400)" />
              </div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>
                No partner updates yet
              </p>
              <p style={{ margin: 0, fontSize: '0.8rem', lineHeight: 1.4, maxWidth: '280px' }}>
                Whenever you or your partner schedule a date, modify plans, or check items off, real-time alerts will appear here!
              </p>
            </div>
          ) : (
            notifications.map(item => (
              <div
                key={item.id}
                onClick={() => {
                  if (!item.read) onMarkSingleRead(item.id);
                  if (item.datePlanId && onSelectDatePlan) onSelectDatePlan(item.datePlanId);
                }}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  backgroundColor: item.read ? 'rgba(255, 255, 255, 0.03)' : 'rgba(244, 63, 94, 0.08)',
                  border: item.read ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(244, 63, 94, 0.25)',
                  cursor: 'pointer',
                  display: 'flex',
                  gap: '12px',
                  position: 'relative',
                  transition: 'all 0.2s ease'
                }}
              >
                {!item.read && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#f43f5e',
                      boxShadow: '0 0 8px #f43f5e'
                    }}
                  />
                )}

                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {getIcon(item.type)}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#fff' }}>
                      {item.title}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.45)', marginLeft: '8px' }}>
                      {formatTime(item.createdAt)}
                    </span>
                  </div>

                  <p style={{ margin: '0 0 6px 0', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.35 }}>
                    {item.message}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.45)' }}>
                    <span>By {item.actorName}</span>
                    {item.datePlanId && (
                      <>
                        <span>•</span>
                        <span style={{ color: 'var(--rose-400)', fontWeight: 600 }}>Tap to view date</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '14px 20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span>Live Couple Sync</span>
          <span style={{ color: '#34d399', fontWeight: 600 }}>● Online</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
