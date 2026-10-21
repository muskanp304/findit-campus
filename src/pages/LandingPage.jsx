// src/pages/LandingPage.jsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { PlusCircle, HeartHandshake, Search, Sparkles, MapPin, ShieldCheck, ArrowRight, CheckCircle2, Lock, Bell, CreditCard, Wallet, Headphones } from 'lucide-react';

export const LandingPage = () => {
  const { setCurrentView, setIsLoggedIn, reports, navigateToDetails } = useApp();

  const recentFoundItems = reports.filter((r) => r.type === 'found' && r.status !== 'Resolved').slice(0, 6);

  const handleStartReportLost = () => {
    setIsLoggedIn(true);
    setCurrentView('report-lost');
  };

  const handleStartReportFound = () => {
    setIsLoggedIn(true);
    setCurrentView('report-found');
  };

  const handleBrowseSearch = () => {
    setIsLoggedIn(true);
    setCurrentView('search');
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '3.5rem' }}>
      {/* Dynamic Animated Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '4rem 1rem 3rem 1rem',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center',
        }}
      >
        {/* Left Hero Content */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--primary-50)',
              color: 'var(--primary-700)',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8125rem',
              fontWeight: '700',
              marginBottom: '1.25rem',
              border: '1px solid var(--primary-200)',
            }}
          >
            <Sparkles size={16} /> Campus Belonging Recovery Platform
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: '900',
              color: 'var(--slate-900)',
              lineHeight: '1.1',
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem',
            }}
          >
            Lost something? <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Let’s find it.
            </span>
          </h1>

          <p style={{ fontSize: '1.125rem', color: 'var(--slate-600)', marginBottom: '2rem', lineHeight: '1.6', maxWidth: '520px' }}>
            Find, report and return belongings across your campus — without the endless searching and disorganized notice boards.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <button onClick={handleStartReportLost} className="btn btn-primary btn-lg">
              <PlusCircle size={20} /> Report Lost Item
            </button>
            <button onClick={handleStartReportFound} className="btn btn-secondary btn-lg">
              <HeartHandshake size={20} style={{ color: 'var(--secondary-600)' }} /> I Found Something
            </button>
            <button onClick={handleBrowseSearch} className="btn btn-secondary btn-lg" style={{ border: 'none', backgroundColor: 'transparent' }}>
              <Search size={18} /> Browse Lost & Found
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} style={{ color: 'var(--secondary-600)' }} /> Verified Campus Accounts
            </span>
            <span>•</span>
            <span>Private Contact Details</span>
          </div>
        </div>

        {/* Right Interactive Floating Hero Visual */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '340px' }}>
          {/* Main Card */}
          <div
            className="glass-card"
            style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius-xl)',
              width: '100%',
              maxWidth: '360px',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative',
              zIndex: 2,
              border: '1px solid rgba(37, 99, 235, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span className="badge badge-match">
                <Sparkles size={12} /> 94% Potential Match
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: '600' }}>Central Library</span>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '1rem' }}>
              <img
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=250"
                alt="Student ID"
                style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
              />
              <div>
                <h4 style={{ fontSize: '0.9375rem', fontWeight: '800', color: 'var(--slate-900)' }}>
                  VCET Student ID Card
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', marginTop: '2px' }}>
                  Anushka Mali • SE AI&DS
                </p>
              </div>
            </div>

            <button
              onClick={() => { setIsLoggedIn(true); navigateToDetails('LI-1024'); }}
              className="btn btn-primary btn-sm"
              style={{ width: '100%', fontSize: '0.8125rem' }}
            >
              Review Match Details <ArrowRight size={14} />
            </button>
          </div>

          {/* Floating Sub-Card 1 (AirPods) */}
          <div
            className="glass-card"
            style={{
              position: 'absolute',
              top: '-15px',
              right: '-10px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              zIndex: 3,
              boxShadow: 'var(--shadow-lg)',
              animation: 'floatSlow 4s ease-in-out infinite',
            }}
          >
            <Headphones size={20} style={{ color: '#ec4899' }} />
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: '700' }}>AirPods Case</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--slate-400)' }}>Found @ Canteen</div>
            </div>
          </div>

          {/* Floating Sub-Card 2 (Wallet) */}
          <div
            className="glass-card"
            style={{
              position: 'absolute',
              bottom: '-15px',
              left: '-10px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              zIndex: 3,
              boxShadow: 'var(--shadow-lg)',
              animation: 'floatSlow 4s ease-in-out infinite 2s',
            }}
          >
            <Wallet size={20} style={{ color: '#d97706' }} />
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: '700' }}>Black Leather Wallet</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--slate-400)' }}>Found @ Main Gate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual How It Works Sequence */}
      <section style={{ maxWidth: '1100px', margin: '3.5rem auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
            How FindIt Campus Returns Belongings Fast
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--slate-500)' }}>
            A streamlined 3-step experience built for busy college students and staff
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {/* Stage 1 */}
          <div className="glass-card glass-card-interactive" style={{ padding: '2rem', textAlign: 'center' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--primary-50)',
                color: 'var(--primary-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                fontSize: '1.25rem',
                fontWeight: '800',
              }}
            >
              1
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
              Report Item
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: '1.5' }}>
              Report a lost or found item in under 60 seconds using visual category tiles, campus locations, and photo upload.
            </p>
          </div>

          {/* Stage 2 */}
          <div className="glass-card glass-card-interactive" style={{ padding: '2rem', textAlign: 'center' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--warning-50)',
                color: 'var(--warning-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                fontSize: '1.25rem',
                fontWeight: '800',
              }}
            >
              2
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
              Discover Matches
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: '1.5' }}>
              Our matching engine cross-references item category, location, and date to notify both parties of potential matches.
            </p>
          </div>

          {/* Stage 3 */}
          <div className="glass-card glass-card-interactive" style={{ padding: '2rem', textAlign: 'center' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--secondary-50)',
                color: 'var(--secondary-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                fontSize: '1.25rem',
                fontWeight: '800',
              }}
            >
              3
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
              Secure Recovery
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: '1.5' }}>
              Communicate inside FindIt Campus without sharing personal numbers, arrange pickup at security or library desks, and mark recovered.
            </p>
          </div>
        </div>
      </section>

      {/* Campus Discovery: Recently Found Items */}
      <section style={{ maxWidth: '1200px', margin: '3.5rem auto 0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--slate-900)' }}>
              Recently Found on Campus
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>
              Items turned in by students, faculty, and security desks
            </p>
          </div>
          <button onClick={handleBrowseSearch} className="btn btn-secondary btn-sm">
            Browse All Lost & Found <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {recentFoundItems.map((item) => (
            <div
              key={item.id}
              onClick={() => { setIsLoggedIn(true); navigateToDetails(item.id); }}
              className="glass-card glass-card-interactive"
              style={{ padding: '1.25rem', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                />
                <span className="badge badge-found" style={{ position: 'absolute', top: '8px', left: '8px' }}>
                  Found Item
                </span>
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '0.35rem' }}>
                {item.title}
              </h3>

              <div style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '1rem' }}>
                <MapPin size={14} style={{ color: 'var(--primary-600)' }} /> {item.location} ({item.subLocation})
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--slate-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: '600' }}>{item.date}</span>
                <span style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--primary-600)' }}>View Details →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section style={{ maxWidth: '1000px', margin: '4rem auto 0 auto', padding: '0 1rem' }}>
        <div
          style={{
            backgroundColor: 'var(--slate-900)',
            color: 'white',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              Built specifically for campus communities
            </h3>
            <p style={{ fontSize: '0.9375rem', color: '#94a3b8' }}>
              FindIt Campus protects user privacy while facilitating effortless item recovery.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Lock size={24} style={{ color: '#60a5fa', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.9375rem', fontWeight: '700' }}>Private Contact Details</h4>
                <p style={{ fontSize: '0.8125rem', color: '#94a3b8', marginTop: '2px' }}>
                  Phone numbers are never published publicly.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <ShieldCheck size={24} style={{ color: '#34d399', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.9375rem', fontWeight: '700' }}>Verified Accounts</h4>
                <p style={{ fontSize: '0.8125rem', color: '#94a3b8', marginTop: '2px' }}>
                  Institutional campus login ensures accountability.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Bell size={24} style={{ color: '#fbbf24', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '0.9375rem', fontWeight: '700' }}>Real-time Notifications</h4>
                <p style={{ fontSize: '0.8125rem', color: '#94a3b8', marginTop: '2px' }}>
                  Immediate alerts when a match or reply is filed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
