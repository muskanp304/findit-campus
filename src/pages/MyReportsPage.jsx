// src/pages/MyReportsPage.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, MapPin, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

export const MyReportsPage = () => {
  const { reports, user, navigateToDetails } = useApp();
  const [activeTab, setActiveTab] = useState('all'); // all, lost, found, resolved

  const userReports = reports.filter((r) => r.reporter?.isCurrentUser || r.reporter?.id === user.id);

  const filtered = userReports.filter((r) => {
    if (activeTab === 'lost') return r.type === 'lost' && r.status !== 'Resolved';
    if (activeTab === 'found') return r.type === 'found' && r.status !== 'Resolved';
    if (activeTab === 'resolved') return r.status === 'Resolved';
    return true;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '0.25rem' }}>
          My Lost & Found Reports
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>
          Track recovery progress and manage active campus postings
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--slate-200)', gap: '1.5rem' }}>
        {[
          { id: 'all', label: 'All Reports', count: userReports.length },
          { id: 'lost', label: 'Active Lost', count: userReports.filter((r) => r.type === 'lost' && r.status !== 'Resolved').length },
          { id: 'found', label: 'Active Found', count: userReports.filter((r) => r.type === 'found' && r.status !== 'Resolved').length },
          { id: 'resolved', label: 'Resolved', count: userReports.filter((r) => r.status === 'Resolved').length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.75rem 0',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid var(--primary-600)' : '2px solid transparent',
              color: activeTab === tab.id ? 'var(--primary-600)' : 'var(--slate-600)',
              fontWeight: activeTab === tab.id ? '700' : '500',
              fontSize: '0.875rem',
              cursor: 'pointer',
              background: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>{tab.label}</span>
            <span
              style={{
                backgroundColor: activeTab === tab.id ? 'var(--primary-50)' : 'var(--slate-100)',
                color: activeTab === tab.id ? 'var(--primary-700)' : 'var(--slate-600)',
                padding: '2px 6px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.7rem',
                fontWeight: '700',
              }}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Report List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No reports found"
          description="You don't have any reports under this tab category."
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map((item) => (
            <div
              key={item.id}
              className="glass-card glass-card-interactive"
              style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}
            >
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                />
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className={`badge ${item.type === 'lost' ? 'badge-lost' : 'badge-found'}`}>
                      {item.type}
                    </span>
                    <span className="badge badge-resolved" style={{ backgroundColor: 'var(--slate-100)' }}>
                      Status: {item.status}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>#{item.id}</span>
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--slate-900)' }}>
                    {item.title}
                  </h3>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', marginTop: '2px', display: 'flex', gap: '12px' }}>
                    <span>
                      <MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} /> {item.location}
                    </span>
                    <span>
                      <Calendar size={12} style={{ display: 'inline', marginRight: '3px' }} /> {item.date}
                    </span>
                  </div>
                </div>

                <button onClick={() => navigateToDetails(item.id)} className="btn btn-secondary btn-sm">
                  Track Details <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
