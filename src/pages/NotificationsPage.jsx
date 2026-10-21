// src/pages/NotificationsPage.jsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Sparkles, MessageSquare, Info, CheckCircle2, ArrowRight } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

export const NotificationsPage = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setMatchComparisonModal,
    reports,
    setChatModal,
    navigateToDetails,
  } = useApp();

  const handleAction = (notif) => {
    markNotificationRead(notif.id);

    if (notif.type === 'match' && notif.reportId && notif.targetMatchId) {
      const lost = reports.find((r) => r.id === notif.reportId);
      const found = reports.find((r) => r.id === notif.targetMatchId);
      if (lost && found) {
        setMatchComparisonModal({ isOpen: true, lostItem: lost, foundItem: found });
      }
    } else if (notif.type === 'message' && notif.reportId) {
      setChatModal({ isOpen: true, reportId: notif.reportId, finder: { name: 'Rahul Sharma' } });
    } else if (notif.reportId) {
      navigateToDetails(notif.reportId);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '0.25rem' }}>
            Campus Notifications Center
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>
            Real-time alerts regarding potential item matches and finder messages
          </p>
        </div>

        {notifications.some((n) => !n.read) && (
          <button onClick={markAllNotificationsRead} className="btn btn-secondary btn-sm">
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="You're all caught up 🎉"
          description="No new notifications. We will alert you when a match or message arrives!"
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {notifications.map((n) => {
            let Icon = Info;
            let iconBg = 'var(--primary-50)';
            let iconColor = 'var(--primary-600)';

            if (n.type === 'match') {
              Icon = Sparkles;
              iconBg = 'var(--warning-50)';
              iconColor = 'var(--warning-600)';
            } else if (n.type === 'message') {
              Icon = MessageSquare;
              iconBg = 'var(--primary-50)';
              iconColor = 'var(--primary-600)';
            } else if (n.type === 'status') {
              Icon = CheckCircle2;
              iconBg = 'var(--secondary-50)';
              iconColor = 'var(--secondary-600)';
            }

            return (
              <div
                key={n.id}
                className="glass-card"
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  borderLeft: !n.read ? '4px solid var(--primary-600)' : '1px solid var(--slate-200)',
                  backgroundColor: !n.read ? 'white' : 'var(--slate-50)',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: iconBg,
                    color: iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <h3 style={{ fontSize: '0.9375rem', fontWeight: !n.read ? '800' : '600', color: 'var(--slate-900)' }}>
                      {n.title}
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>{n.timestamp}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginBottom: n.actionText ? '0.75rem' : '0' }}>
                    {n.message}
                  </p>

                  {n.actionText && (
                    <button onClick={() => handleAction(n)} className="btn btn-primary btn-sm">
                      {n.actionText} <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
