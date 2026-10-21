// src/pages/DashboardPage.jsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { PlusCircle, Search, Sparkles, MapPin, Calendar, ArrowRight, ShieldCheck, CheckCircle2, Clock, Bell, HandHeart, ChevronRight, Box } from 'lucide-react';
import { ProgressTimeline } from '../components/common/ProgressTimeline';

export const DashboardPage = () => {
  const { user, reports, setCurrentView, navigateToDetails, openVrInspector, setMatchComparisonModal } = useApp();

  const userReports = reports.filter((r) => r.reporter?.isCurrentUser || r.reporter?.id === user.id);
  const activeLostCount = userReports.filter((r) => r.type === 'lost' && r.status !== 'Resolved').length;

  const potentialMatchItem = userReports.find((r) => r.status === 'Potential Match');
  const foundMatchItem = reports.find((r) => r.id === potentialMatchItem?.potentialMatchId);

  const recentFoundItems = reports.filter((r) => r.type === 'found' && r.status !== 'Resolved').slice(0, 4);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Personalized Welcome Header */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, var(--slate-900) 0%, #1e3a8a 100%)',
          color: 'white',
          padding: '1.75rem',
          borderRadius: 'var(--radius-xl)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#93c5fd', fontSize: '0.8125rem', fontWeight: '600', marginBottom: '0.35rem' }}>
            <span>VCET Engineering Campus</span> • <span>Tuesday, 29 September 2026</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '0.35rem' }}>
            Good evening, {user.name.split(' ')[0]} 👋
          </h1>
          <p style={{ fontSize: '0.9375rem', color: '#cbd5e1', maxWidth: '550px' }}>
            Hope your day gets easier from here. You have{' '}
            <strong>{activeLostCount} active lost item report</strong> under campus discovery.
          </p>

          {/* Quick Actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button
              onClick={() => setCurrentView('report-lost')}
              className="btn btn-primary btn-sm"
              style={{ backgroundColor: '#2563eb', color: 'white' }}
            >
              <PlusCircle size={16} /> Report Lost
            </button>
            <button
              onClick={() => setCurrentView('report-found')}
              className="btn btn-sm"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <HandHeart size={16} /> Report Found
            </button>
            <button
              onClick={() => setCurrentView('search')}
              className="btn btn-sm"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <Search size={16} /> Search Items
            </button>
            <button
              onClick={() => openVrInspector()}
              className="btn btn-sm"
              style={{ background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', color: 'white', border: 'none', fontWeight: '800' }}
            >
              <Box size={16} /> 3D VR Inspector
            </button>
          </div>
        </div>
      </div>

      {/* Potential Match Card */}
      {potentialMatchItem && foundMatchItem && (
        <div
          className="glass-card animate-fade-in"
          style={{
            border: '2px solid #f59e0b',
            backgroundColor: '#fffbeb',
            padding: '1.25rem 1.5rem',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#fef3c7',
                  color: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Sparkles size={24} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge badge-match">94% Potential Match</span>
                  <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#92400e' }}>
                    We found something that looks similar!
                  </h3>
                </div>
                <p style={{ fontSize: '0.875rem', color: '#b45309', marginTop: '4px', lineHeight: '1.4' }}>
                  A found item matching your <strong>{potentialMatchItem.title}</strong> was turned in at{' '}
                  <strong>{foundMatchItem.location}</strong> ({foundMatchItem.subLocation}).
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                setMatchComparisonModal({
                  isOpen: true,
                  lostItem: potentialMatchItem,
                  foundItem: foundMatchItem,
                })
              }
              className="btn btn-warning btn-sm"
              style={{ fontWeight: '700', alignSelf: 'center' }}
            >
              Review Match <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Active Reports Section with Progress Timeline */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--slate-900)' }}>
            Your Active Reports
          </h2>
          <button
            onClick={() => setCurrentView('my-reports')}
            style={{ background: 'none', border: 'none', color: 'var(--primary-600)', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            Manage Reports ({userReports.length}) <ChevronRight size={16} />
          </button>
        </div>

        {userReports.length === 0 ? (
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--slate-500)' }}>
            No active reports right now.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {userReports.map((item) => (
              <div
                key={item.id}
                className="glass-card glass-card-interactive"
                style={{ padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}
              >
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span className={`badge ${item.type === 'lost' ? 'badge-lost' : 'badge-found'}`}>
                        {item.type}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: '600' }}>
                        #{item.id}
                      </span>
                    </div>
                    <h3
                      onClick={() => navigateToDetails(item.id)}
                      style={{ fontSize: '1.0625rem', fontWeight: '800', color: 'var(--slate-900)', cursor: 'pointer' }}
                    >
                      {item.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '0.8125rem', color: 'var(--slate-500)', marginTop: '4px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={14} /> {item.location}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} /> {item.date}
                      </span>
                    </div>
                  </div>

                  <button onClick={() => navigateToDetails(item.id)} className="btn btn-secondary btn-sm">
                    Track Report
                  </button>
                </div>

                <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--slate-100)' }}>
                  <ProgressTimeline currentStep={item.statusStep} status={item.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recently Found Feed */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--slate-900)' }}>
              Recently Found on Campus
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
              Items turned in by fellow students and college security staff
            </p>
          </div>
          <button
            onClick={() => setCurrentView('search')}
            style={{ background: 'none', border: 'none', color: 'var(--primary-600)', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer' }}
          >
            View All
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {recentFoundItems.map((item) => (
            <div
              key={item.id}
              onClick={() => navigateToDetails(item.id)}
              className="glass-card glass-card-interactive"
              style={{ padding: '1rem', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{ width: '100%', height: '140px', borderRadius: 'var(--radius-md)', objectFit: 'cover', marginBottom: '0.75rem' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="badge badge-found">Found</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>{item.date}</span>
              </div>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: '700', color: 'var(--slate-900)', marginBottom: '4px' }}>
                {item.title}
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: 'auto', paddingTop: '8px' }}>
                <MapPin size={12} /> {item.location} ({item.subLocation})
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
