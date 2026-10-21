// src/components/common/EmptyState.jsx
import React from 'react';
import { SearchX, Sparkles, FolderOpen, BellOff } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = FolderOpen,
  title = "Nothing here yet",
  description = "Once you report a lost or found item, it will appear here.",
  actionText,
  onAction,
}) => {
  return (
    <div
      className="glass-card"
      style={{
        padding: '3rem 1.5rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '1.5rem 0',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary-50)',
          color: 'var(--primary-600)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        <Icon size={32} />
      </div>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--slate-800)', marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', maxWidth: '400px', marginBottom: '1.5rem' }}>
        {description}
      </p>
      {actionText && onAction && (
        <button onClick={onAction} className="btn btn-primary btn-sm">
          {actionText}
        </button>
      )}
    </div>
  );
};
