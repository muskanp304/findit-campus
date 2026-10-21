// src/components/layout/BottomNav.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, Search, PlusCircle, Bell, User, Box } from 'lucide-react';

export const BottomNav = () => {
  const { currentView, setCurrentView, notifications } = useApp();
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const items = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'vr-inspector', label: '3D VR', icon: Box },
    { id: 'report-lost', label: 'Report', icon: PlusCircle, isMain: true },
    { id: 'notifications', label: 'Alerts', icon: Bell, badge: unreadNotifs },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid var(--slate-200)',
        zIndex: 900,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 8px',
      }}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;

        if (item.isMain) {
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-600)',
                color: 'white',
                border: 'none',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                marginTop: '-16px',
                transition: 'transform 0.15s ease',
              }}
              aria-label="Report lost item"
            >
              <PlusCircle size={26} />
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              color: isActive ? 'var(--primary-600)' : 'var(--slate-500)',
              cursor: 'pointer',
              flex: 1,
              position: 'relative',
            }}
          >
            <Icon size={20} />
            <span style={{ fontSize: '0.65rem', fontWeight: isActive ? '700' : '500' }}>
              {item.label}
            </span>
            {item.badge > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '0',
                  right: 'calc(50% - 16px)',
                  backgroundColor: 'var(--danger-500)',
                  color: 'white',
                  fontSize: '0.6rem',
                  fontWeight: '800',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
