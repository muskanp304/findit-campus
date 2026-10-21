// src/pages/VrInspectorPage.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Item3DViewer } from '../components/vr/Item3DViewer';
import { Box, Sparkles, MapPin, Calendar, CheckCircle2, MessageSquare, ArrowLeft, ShieldCheck, Eye, Layers, Filter } from 'lucide-react';

export const VrInspectorPage = () => {
  const { reports, activeItemId, setActiveItemId, setCurrentView, setChatModal, setMatchComparisonModal, addToast } = useApp();

  const [selectedFilter, setSelectedFilter] = useState('found'); // 'found', 'lost', 'all'
  const [selectedMarkIndex, setSelectedMarkIndex] = useState(null);

  // Filter items available for 3D inspection
  const availableItems = reports.filter((r) => {
    if (selectedFilter === 'found') return r.type === 'found';
    if (selectedFilter === 'lost') return r.type === 'lost';
    return true;
  });

  // Active item being rendered in 3D VR
  const activeItem = availableItems.find((r) => r.id === activeItemId) || availableItems[0] || reports[0];
  const potentialMatchItem = reports.find((r) => r.id === activeItem?.potentialMatchId);

  const handleSelectMark = (hotspot) => {
    addToast(`Zoomed in on 3D Mark: ${hotspot.title}`, 'info');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner & Header */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)',
          color: 'white',
          padding: '1.75rem',
          borderRadius: 'var(--radius-xl)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
              <span
                style={{
                  backgroundColor: 'rgba(236, 72, 153, 0.2)',
                  color: '#f472b6',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(236, 72, 153, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Eye size={14} /> 3D WebGL & WebXR Interactive Feature
              </span>
            </div>

            <h1 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'white', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Box size={28} style={{ color: '#818cf8' }} /> 3D VR Belongings Inspector
            </h1>
            <p style={{ fontSize: '0.9375rem', color: '#cbd5e1', maxWidth: '650px' }}>
              Inspect campus lost & found items in 3D 360° space or full VR view. Examine distinguishing marks, engraved names, stickers, and keychains to confirm item ownership with complete certainty.
            </p>
          </div>

          <button onClick={() => setCurrentView('dashboard')} className="btn btn-secondary btn-sm" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
        </div>
      </div>

      {/* Main Grid: Item Selector Sidebar & 3D VR Viewport */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Left Column: Item Selector & Catalog */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--slate-900)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Filter size={16} style={{ color: 'var(--primary-600)' }} /> Select Item to Inspect
              </h2>

              {/* Type Filter Buttons */}
              <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--slate-100)', padding: '2px', borderRadius: 'var(--radius-md)' }}>
                {['found', 'lost', 'all'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFilter(f)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      backgroundColor: selectedFilter === f ? 'white' : 'transparent',
                      color: selectedFilter === f ? 'var(--slate-900)' : 'var(--slate-600)',
                      fontWeight: selectedFilter === f ? '700' : '500',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* List of selectable items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '480px', overflowY: 'auto', paddingRight: '4px' }}>
              {availableItems.map((item) => {
                const isSelected = item.id === activeItem?.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveItemId(item.id)}
                    style={{
                      padding: '0.875rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isSelected ? 'var(--primary-50)' : 'white',
                      border: isSelected ? '2px solid var(--primary-600)' : '1px solid var(--slate-200)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? 'var(--shadow-md)' : 'none',
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{ width: '54px', height: '54px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                    />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                        <span className={`badge ${item.type === 'lost' ? 'badge-lost' : 'badge-found'}`} style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                          {item.type}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--slate-400)', fontWeight: '600' }}>#{item.id}</span>
                      </div>

                      <h3 style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--slate-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.title}
                      </h3>

                      <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <MapPin size={12} /> {item.location}
                      </div>
                    </div>

                    {isSelected && (
                      <span style={{ backgroundColor: 'var(--primary-600)', color: 'white', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '800', flexShrink: 0 }}>
                        ✓
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: 3D VR Viewport Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <span className={`badge ${activeItem.type === 'lost' ? 'badge-lost' : 'badge-found'}`}>
                  {activeItem.type}
                </span>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--slate-900)', marginTop: '4px' }}>
                  {activeItem.title}
                </h2>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', display: 'block', fontWeight: '700' }}>ITEM ID</span>
                <strong style={{ color: 'var(--primary-600)', fontSize: '0.9375rem' }}>#{activeItem.id}</strong>
              </div>
            </div>

            {/* Render 3D Canvas */}
            <Item3DViewer item={activeItem} height="480px" onSelectMark={handleSelectMark} />

            {/* Distinguishing Marks Verification Panel */}
            <div style={{ marginTop: '1.25rem', padding: '1rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: '800', color: 'var(--slate-800)', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} style={{ color: '#ec4899' }} /> Distinguishing Identification Marks
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--slate-700)', lineHeight: '1.5', fontWeight: '500' }}>
                {activeItem.distinguishingFeatures || activeItem.description}
              </p>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--slate-200)' }}>
              {potentialMatchItem && (
                <button
                  onClick={() =>
                    setMatchComparisonModal({
                      isOpen: true,
                      lostItem: activeItem.type === 'lost' ? activeItem : potentialMatchItem,
                      foundItem: activeItem.type === 'found' ? activeItem : potentialMatchItem,
                    })
                  }
                  className="btn btn-warning btn-sm"
                >
                  <Sparkles size={16} /> Compare Match Side-by-Side
                </button>
              )}

              <button
                onClick={() =>
                  setChatModal({
                    isOpen: true,
                    reportId: activeItem.id,
                    finder: activeItem.finder || { name: 'Rahul Sharma' },
                  })
                }
                className="btn btn-primary btn-sm"
              >
                <MessageSquare size={16} /> Contact Finder / Reporter
              </button>

              <button
                onClick={() => {
                  setCurrentView('item-details');
                }}
                className="btn btn-secondary btn-sm"
                style={{ marginLeft: 'auto' }}
              >
                View Full Item Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
