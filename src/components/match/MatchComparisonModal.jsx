import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, MapPin, Calendar, CheckCircle2, MessageSquare, ArrowRightLeft, Box, Eye } from 'lucide-react';

export const MatchComparisonModal = () => {
  const { matchComparisonModal, setMatchComparisonModal, setChatModal, openVrInspector, navigateToDetails } = useApp();

  if (!matchComparisonModal.isOpen || !matchComparisonModal.lostItem || !matchComparisonModal.foundItem) {
    return null;
  }

  const { lostItem, foundItem } = matchComparisonModal;

  const handleClose = () => {
    setMatchComparisonModal({ isOpen: false, lostItem: null, foundItem: null });
  };

  const handleConnectFinder = () => {
    handleClose();
    setChatModal({
      isOpen: true,
      reportId: lostItem.id,
      finder: foundItem.finder || { name: 'Finder' },
    });
  };

  const handleInspectInVr = () => {
    handleClose();
    openVrInspector(foundItem.id);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-content animate-fade-in"
        style={{ maxWidth: '820px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                backgroundColor: 'var(--warning-50)',
                color: 'var(--warning-600)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                border: '1px solid rgba(245, 158, 11, 0.3)',
              }}
            >
              <Sparkles size={14} /> 94% Potential Match
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--slate-900)' }}>
              Compare Item Details
            </h2>
          </div>
          <button
            onClick={handleClose}
            style={{ background: 'none', border: 'none', color: 'var(--slate-400)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', marginBottom: '1.5rem' }}>
          Review the comparison below between your lost report and the found item reported near <strong>{foundItem.location}</strong>.
        </p>

        {/* Side-by-Side Comparison Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          {/* Lost Item Side */}
          <div
            style={{
              backgroundColor: 'var(--danger-50)',
              border: '1.5px solid rgba(239, 68, 68, 0.2)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                backgroundColor: 'white',
                color: 'var(--danger-600)',
                fontWeight: '700',
                fontSize: '0.75rem',
                padding: '2px 8px',
                borderRadius: '4px',
                marginBottom: '0.75rem',
              }}
            >
              YOUR LOST REPORT (#{lostItem.id})
            </div>
            <img
              src={lostItem.imageUrl}
              alt={lostItem.title}
              style={{
                width: '100%',
                height: '140px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)',
                marginBottom: '0.75rem',
              }}
            />
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
              {lostItem.title}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8125rem', color: 'var(--slate-700)' }}>
              <div><strong>Category:</strong> {lostItem.categoryLabel}</div>
              <div><strong>Color:</strong> {lostItem.color}</div>
              <div><strong>Location:</strong> {lostItem.location} ({lostItem.subLocation})</div>
              <div><strong>Date Lost:</strong> {lostItem.date} ({lostItem.time})</div>
              <div style={{ marginTop: '4px', fontStyle: 'italic', color: 'var(--slate-600)' }}>
                "{lostItem.description}"
              </div>
            </div>
          </div>

          {/* Found Item Side */}
          <div
            style={{
              backgroundColor: 'var(--secondary-50)',
              border: '1.5px solid rgba(16, 185, 129, 0.2)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                backgroundColor: 'white',
                color: 'var(--secondary-600)',
                fontWeight: '700',
                fontSize: '0.75rem',
                padding: '2px 8px',
                borderRadius: '4px',
                marginBottom: '0.75rem',
              }}
            >
              FOUND REPORT (#{foundItem.id})
            </div>
            <img
              src={foundItem.imageUrl}
              alt={foundItem.title}
              style={{
                width: '100%',
                height: '140px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)',
                marginBottom: '0.75rem',
              }}
            />
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
              {foundItem.title}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8125rem', color: 'var(--slate-700)' }}>
              <div><strong>Category:</strong> {foundItem.categoryLabel}</div>
              <div><strong>Color:</strong> {foundItem.color}</div>
              <div><strong>Location Found:</strong> {foundItem.location} ({foundItem.subLocation})</div>
              <div><strong>Date Found:</strong> {foundItem.date} ({foundItem.time})</div>
              <div style={{ marginTop: '4px', fontStyle: 'italic', color: 'var(--slate-600)' }}>
                "{foundItem.description}"
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={handleInspectInVr}
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
              color: 'white',
              border: 'none',
            }}
            className="btn btn-sm"
          >
            <Box size={16} /> Inspect Marks in 3D VR
          </button>
          <button onClick={handleClose} className="btn btn-secondary btn-sm">
            Not My Item
          </button>
          <button onClick={handleConnectFinder} className="btn btn-primary btn-sm">
            <MessageSquare size={16} /> Contact Finder ({foundItem.finder?.name || 'Rahul Sharma'})
          </button>
        </div>
      </div>
    </div>
  );
};
