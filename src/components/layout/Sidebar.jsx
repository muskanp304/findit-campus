// src/components/layout/Sidebar.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, Search, PlusCircle, HandHeart, FileText, Bell, MessageSquare, User, LogOut, ShieldCheck, Box } from 'lucide-react';

export const Sidebar = () => {
  const { currentView, setCurrentView, notifications, handleLogout, reports } = useApp();

  const activeReportsCount = reports.filter(
    (r) => r.reporter?.isCurrentUser && r.status !== 'Resolved'
  ).length;

  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'search', label: 'Search Lost & Found', icon: Search },
    { id: 'vr-inspector', label: '3D VR Inspector', icon: Box, tag: '3D VR' },
    { id: 'report-lost', label: 'Report Lost Item', icon: PlusCircle, highlight: true },
    { id: 'report-found', label: 'Report Found Item', icon: HandHeart },
    { id: 'my-reports', label: 'My Reports', icon: FileText, badge: activeReportsCount },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifs },
    { id: 'profile', label: 'Profile & Settings', icon: User },
  ];

  return (
    <aside
      style={{
        width: '260px',
        backgroundColor: 'white',
        borderRight: '1px solid var(--slate-200)',
        position: 'fixed',
        top: '64px',
        bottom: 0,
        left: 0,
        zIndex: 800,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.25rem 1rem',
        overflowY: 'auto',
      }}
    >
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--slate-400)', letterSpacing: '0.05em', padding: '0 0.75rem 0.5rem 0.75rem' }}>
          Main Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.625rem 0.875rem',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                backgroundColor: isActive
                  ? 'var(--primary-50)'
                  : item.highlight
                  ? 'rgba(37, 99, 235, 0.05)'
                  : 'transparent',
                color: isActive ? 'var(--primary-600)' : 'var(--slate-700)',
                fontWeight: isActive ? '700' : '500',
                fontSize: '0.875rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon size={18} style={{ color: isActive ? 'var(--primary-600)' : 'var(--slate-500)' }} />
                <span>{item.label}</span>
              </div>
              {item.tag && (
                <span
                  style={{
                    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                    color: 'white',
                    fontSize: '0.65rem',
                    fontWeight: '800',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  {item.tag}
                </span>
              )}
              {item.badge > 0 && (
                <span
                  style={{
                    backgroundColor: isActive ? 'var(--primary-600)' : 'var(--slate-200)',
                    color: isActive ? 'white' : 'var(--slate-700)',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Trust Banner & Logout */}
      <div style={{ borderTop: '1px solid var(--slate-200)', paddingTop: '1rem' }}>
        <div
          style={{
            backgroundColor: 'var(--slate-50)',
            padding: '10px 12px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '10px',
            fontSize: '0.75rem',
            color: 'var(--slate-600)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
          }}
        >
          <ShieldCheck size={16} style={{ color: 'var(--primary-600)', flexShrink: 0, marginTop: '2px' }} />
          <span>Your contact details remain private until you decide to connect.</span>
        </div>

        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.5rem 0.75rem',
            background: 'none',
            border: 'none',
            color: 'var(--danger-600)',
            fontSize: '0.8125rem',
            fontWeight: '600',
            cursor: 'pointer',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </aside>
  );
};
