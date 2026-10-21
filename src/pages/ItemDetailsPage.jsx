// src/pages/ItemDetailsPage.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Calendar, MessageSquare, CheckCheck, Sparkles, ArrowLeft, ShieldCheck, Bookmark, AlertCircle, Box, Eye } from 'lucide-react';
import { ProgressTimeline } from '../components/common/ProgressTimeline';
import confetti from 'canvas-confetti';

export const ItemDetailsPage = () => {
  const { activeItemId, reports, setCurrentView, setChatModal, markAsRecovered, setMatchComparisonModal, openVrInspector, addToast } = useApp();
  const [showRecoverConfirm, setShowRecoverConfirm] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const item = reports.find((r) => r.id === activeItemId) || reports[0];
  const potentialMatchFoundItem = reports.find((r) => r.id === item?.potentialMatchId);

  const handleMarkRecovered = () => {
    setShowRecoverConfirm(false);
    markAsRecovered(item.id);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
    addToast(isSaved ? 'Item removed from saved.' : 'Item saved to your bookmarks!', 'info');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Navigation Back */}
      <button onClick={() => setCurrentView('dashboard')} className="btn btn-secondary btn-sm" style={{ marginBottom: '1.25rem' }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      {/* Main Details Card */}
      <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className={`badge ${item.type === 'lost' ? 'badge-lost' : 'badge-found'}`}>
              {item.type}
            </span>
            <span style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--slate-500)' }}>
              Report #{item.id}
            </span>
          </div>

          {item.status === 'Potential Match' && (
            <span className="badge badge-match">
              <Sparkles size={14} /> Potential Match Detected
            </span>
          )}

          {item.status === 'Resolved' && (
            <span className="badge badge-resolved">
              ✓ Recovered & Closed
            </span>
          )}
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--slate-900)', marginBottom: '1rem' }}>
          {item.title}
        </h1>

        {/* Visual Progress Timeline */}
        <div style={{ backgroundColor: 'var(--slate-50)', padding: '1rem', borderRadius: 'var(--radius-lg)', marginBottom: '1.75rem' }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--slate-700)', marginBottom: '0.5rem' }}>
            RECOVERY TRACKING TIMELINE
          </div>
          <ProgressTimeline currentStep={item.statusStep} status={item.status} />
        </div>

        {/* Image Gallery & Attributes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <img
            src={item.imageUrl}
            alt={item.title}
            style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', fontSize: '0.9375rem' }}>
            <div>
              <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700', display: 'block' }}>Category</span>
              <strong style={{ color: 'var(--slate-800)' }}>{item.categoryLabel}</strong>
            </div>

            <div>
              <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700', display: 'block' }}>Location</span>
              <strong style={{ color: 'var(--slate-800)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={16} style={{ color: 'var(--primary-600)' }} /> {item.location} ({item.subLocation})
              </strong>
            </div>

            <div>
              <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700', display: 'block' }}>Date & Time</span>
              <strong style={{ color: 'var(--slate-800)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={16} style={{ color: 'var(--primary-600)' }} /> {item.date} at {item.time}
              </strong>
            </div>

            <div>
              <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700', display: 'block' }}>Primary Color</span>
              <strong style={{ color: 'var(--slate-800)' }}>{item.color}</strong>
            </div>

            {item.distinguishingFeatures && (
              <div>
                <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '700', display: 'block' }}>Distinguishing Marks</span>
                <strong style={{ color: 'var(--slate-800)' }}>{item.distinguishingFeatures}</strong>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Description */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
            Description
          </h3>
          <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', lineHeight: '1.6', backgroundColor: 'var(--slate-50)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            {item.description}
          </p>
        </div>

        {/* 3D VR Belongings Inspection Callout */}
        <div
          style={{
            marginBottom: '2rem',
            padding: '1.25rem',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(236, 72, 153, 0.2)',
                color: '#ec4899',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid rgba(236, 72, 153, 0.4)',
              }}
            >
              <Box size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.9375rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Interactive 3D VR Inspection Available
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#cbd5e1', marginTop: '2px' }}>
                Examine this item in 360° space or VR headset view to verify distinguishing marks, stickers & engravings.
              </p>
            </div>
          </div>

          <button
            onClick={() => openVrInspector(item.id)}
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              padding: '0.625rem 1.25rem',
              fontWeight: '800',
              fontSize: '0.875rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(236, 72, 153, 0.4)',
            }}
          >
            <Eye size={18} /> Inspect in 3D / VR
          </button>
        </div>

        {/* Action Controls Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', paddingTop: '1.25rem', borderTop: '1px solid var(--slate-200)' }}>
          <button
            onClick={() => openVrInspector(item.id)}
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
              color: 'white',
            }}
            className="btn"
          >
            <Box size={18} /> 3D VR View
          </button>

          {potentialMatchFoundItem && (
            <button
              onClick={() =>
                setMatchComparisonModal({
                  isOpen: true,
                  lostItem: item,
                  foundItem: potentialMatchFoundItem,
                })
              }
              className="btn btn-warning"
            >
              <Sparkles size={18} /> This Might Be Mine (Review Match)
            </button>
          )}

          <button
            onClick={() => setChatModal({ isOpen: true, reportId: item.id, finder: item.finder || { name: 'Rahul Sharma' } })}
            className="btn btn-primary"
          >
            <MessageSquare size={18} /> Contact Finder / Owner
          </button>

          <button onClick={toggleSave} className="btn btn-secondary">
            <Bookmark size={18} style={{ color: isSaved ? 'var(--primary-600)' : 'var(--slate-500)' }} />
            {isSaved ? 'Saved' : 'Save Item'}
          </button>

          {item.status !== 'Resolved' && (
            <button onClick={() => setShowRecoverConfirm(true)} className="btn btn-success" style={{ marginLeft: 'auto' }}>
              <CheckCheck size={18} /> Mark as Recovered
            </button>
          )}
        </div>
      </div>

      {/* Double Confirmation Modal */}
      {showRecoverConfirm && (
        <div className="modal-overlay" onClick={() => setShowRecoverConfirm(false)}>
          <div className="modal-content" style={{ maxWidth: '440px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--secondary-600)', marginBottom: '1rem' }}>
              <ShieldCheck size={28} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Are you sure you recovered this item?</h3>
            </div>
            <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Confirming recovery for <strong>{item.title}</strong> will close active campus discovery and mark the report resolved.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowRecoverConfirm(false)} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button onClick={handleMarkRecovered} className="btn btn-success btn-sm">
                Mark as Recovered 🎉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
