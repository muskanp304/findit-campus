// src/components/layout/Header.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Bell, PlusCircle, ShieldCheck, User } from 'lucide-react';

export const Header = () => {
  const {
    currentView,
    setCurrentView,
    isLoggedIn,
    user,
    notifications,
    searchQuery,
    setSearchQuery,
    handleLogout,
  } = useApp();

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--slate-200)',
        position: 'sticky',
        top: 0,
        zIndex: 900,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.25rem',
      }}
    >
      {/* Brand Logo & Tagline */}
      <div
        onClick={() => setCurrentView(isLoggedIn ? 'dashboard' : 'landing')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)',
          }}
        >
          <ShieldCheck size={22} />
        </div>
        <div>
          <div style={{ fontSize: '1.125rem', fontWeight: '800', letterSpacing: '-0.02em', color: 'var(--slate-900)' }}>
            FindIt <span style={{ color: 'var(--primary-600)' }}>Campus</span>
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--slate-500)', fontWeight: '500' }}>
            VCET Lost & Found Network
          </div>
        </div>
      </div>

      {/* Global Search Quick Access (Desktop) */}
      {isLoggedIn && currentView !== 'search' && (
        <div
          onClick={() => setCurrentView('search')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--slate-100)',
            border: '1px solid var(--slate-200)',
            borderRadius: 'var(--radius-full)',
            padding: '6px 14px',
            width: '260px',
            cursor: 'pointer',
            color: 'var(--slate-400)',
            fontSize: '0.8125rem',
          }}
        >
          <Search size={16} />
          <span>Search lost & found...</span>
        </div>
      )}

      {/* Right User Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {isLoggedIn ? (
          <>
            {/* Quick Report CTA */}
            <button
              onClick={() => setCurrentView('report-lost')}
              className="btn btn-primary btn-sm"
              style={{ display: 'flex', gap: '6px' }}
            >
              <PlusCircle size={16} />
              <span>Report Lost</span>
            </button>

            {/* Notifications Trigger */}
            <button
              onClick={() => setCurrentView('notifications')}
              style={{
                background: 'none',
                border: 'none',
                position: 'relative',
                padding: '8px',
                borderRadius: '50%',
                cursor: 'pointer',
                color: currentView === 'notifications' ? 'var(--primary-600)' : 'var(--slate-600)',
              }}
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadNotifCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    backgroundColor: 'var(--danger-500)',
                    color: 'white',
                    fontSize: '0.65rem',
                    fontWeight: '800',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid white',
                  }}
                >
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {/* Profile Avatar */}
            <div
              onClick={() => setCurrentView('profile')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: currentView === 'profile' ? 'var(--primary-50)' : 'transparent',
              }}
            >
              <img
                src={user.avatar}
                alt={user.name}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--primary-500)',
                }}
              />
              <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--slate-800)', display: 'none', lgDisplay: 'inline' }}>
                {user.name.split(' ')[0]}
              </span>
            </div>
          </>
        ) : (
          <button onClick={() => setCurrentView('login')} className="btn btn-primary btn-sm">
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};
