// src/components/common/Toast.jsx
import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X, Bell } from 'lucide-react';

export const Toast = () => {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
        width: 'calc(100vw - 48px)',
      }}
    >
      {toasts.map((toast) => {
        let bg = 'var(--slate-800)';
        let Icon = Info;
        let iconColor = '#60a5fa';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          iconColor = '#34d399';
        } else if (toast.type === 'warning') {
          Icon = AlertCircle;
          iconColor = '#fbbf24';
        } else if (toast.type === 'match') {
          Icon = Bell;
          iconColor = '#a78bfa';
        }

        return (
          <div
            key={toast.id}
            className="animate-slide-in"
            style={{
              background: bg,
              color: 'white',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-xl)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              fontSize: '0.875rem',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Icon size={20} style={{ color: iconColor, flexShrink: 0, marginTop: '2px' }} />
            <div style={{ flex: 1 }}>{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--slate-400)',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
              }}
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
