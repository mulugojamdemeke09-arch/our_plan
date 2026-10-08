'use client';

import React, { useState, useEffect } from 'react';
import { DatePlan } from '@/lib/types';
import { X, Bell, BellRing, Calendar, Download, Sparkles, CheckCircle2, AlertCircle, Smartphone } from 'lucide-react';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  dates: DatePlan[];
}

export const ReminderModal: React.FC<ReminderModalProps> = ({
  isOpen,
  onClose,
  dates
}) => {
  const [notificationPermission, setNotificationPermission] = useState<string>('default');
  const [testSent, setTestSent] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const requestPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      alert('Browser notifications are not supported on this browser.');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') {
        new Notification('💌 Our Weekend Date Reminder', {
          body: 'Reminders enabled! You will be alerted before your weekend dates.',
          icon: '/favicon.ico'
        });
      }
    } catch (err) {
      console.error('Error requesting notification permission:', err);
    }
  };

  const triggerTestNotification = () => {
    if (notificationPermission === 'granted') {
      new Notification('❤️ Romantic Date Reminder', {
        body: 'Get excited! Your weekend escape at Entoto Mountain is scheduled for tomorrow at 3:30 PM!',
        icon: '/favicon.ico'
      });
      setTestSent(true);
      setTimeout(() => setTestSent(false), 3000);
    } else {
      requestPermission();
    }
  };

  const downloadICS = (dateId: string) => {
    window.open(`/api/export-ics?id=${dateId}`, '_blank');
  };

  const upcomingDatesWithReminders = dates.filter(d => d.reminderEnabled && d.status !== 'completed');

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content" style={{ padding: '24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold-400)'
              }}
            >
              <BellRing size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Date Reminders</h3>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                Never miss your planned weekend escape
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ padding: '6px', color: 'var(--text-muted)', borderRadius: '8px' }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* iOS / iPhone 12 Quick Calendar Tip */}
          <div
            style={{
              backgroundColor: 'rgba(244, 63, 94, 0.08)',
              border: '1px solid rgba(244, 63, 94, 0.25)',
              borderRadius: '12px',
              padding: '14px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}
          >
            <Smartphone size={22} color="var(--rose-400)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                iPhone 12 Calendar & Reminders Sync
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Tap <strong>"Add to iPhone Calendar"</strong> on any date. iOS Safari opens your native Apple Calendar app with location and 2-hour notification alarms set automatically!
              </p>
            </div>
          </div>

          {/* Browser Notification Switch */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '12px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700 }}>Web Push Alerts</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Status: {notificationPermission === 'granted' ? 'Active 🟢' : 'Not enabled'}
                </div>
              </div>

              {notificationPermission !== 'granted' ? (
                <button
                  onClick={requestPermission}
                  className="btn-gold"
                  style={{ padding: '7px 14px', fontSize: '0.78rem' }}
                >
                  Enable Alerts
                </button>
              ) : (
                <button
                  onClick={triggerTestNotification}
                  className="btn-secondary"
                  style={{ padding: '7px 12px', fontSize: '0.78rem' }}
                >
                  {testSent ? 'Sent! 🎉' : 'Test Alert'}
                </button>
              )}
            </div>
          </div>

          {/* Active Date Reminders List */}
          <div>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.04em' }}>
              Scheduled Weekend Reminders ({upcomingDatesWithReminders.length})
            </div>

            {upcomingDatesWithReminders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
                No active date reminders. Turn on reminders when creating or editing a date!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {upcomingDatesWithReminders.map(date => (
                  <div
                    key={date.id}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      padding: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>{date.title}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <span>📅 {date.targetDate} ({date.time})</span>
                        <span>• Notice: {date.reminderNotice} before</span>
                      </div>
                    </div>

                    <button
                      onClick={() => downloadICS(date.id)}
                      className="btn-secondary"
                      style={{ padding: '6px 10px', fontSize: '0.74rem', flexShrink: 0 }}
                      title="Download .ics for Apple Calendar"
                    >
                      <Download size={13} /> .ics
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Close button */}
          <button onClick={onClose} className="btn-secondary" style={{ width: '100%', marginTop: '6px' }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
