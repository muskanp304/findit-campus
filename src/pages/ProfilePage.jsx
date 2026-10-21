// src/pages/ProfilePage.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, Award, ShieldCheck, Lock, RefreshCw, LogOut, Camera, Upload, X, Check } from 'lucide-react';

export const ProfilePage = () => {
  const { user, setUser, handleLogout, addToast } = useApp();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState(user.avatar);
  const [previewUrl, setPreviewUrl] = useState(user.avatar);

  // Handle local image file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast('File size must be under 5MB.', 'warning');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset avatar samples
  const presetAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
  ];

  const handleSaveAvatar = () => {
    setUser((prev) => ({
      ...prev,
      avatar: previewUrl,
    }));
    setShowAvatarModal(false);
    addToast('Profile picture updated successfully!', 'success');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--slate-900)', marginBottom: '0.25rem' }}>
          Student Profile & Settings
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>
          Manage your campus lost & found profile details and avatar picture
        </p>
      </div>

      {/* User Info Card with Interactive Avatar */}
      <div className="glass-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-xl)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
          {/* Avatar with Camera Overlay */}
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setShowAvatarModal(true)}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--primary-500)',
                boxShadow: 'var(--shadow-md)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: 'var(--primary-600)',
                color: 'white',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid white',
                boxShadow: 'var(--shadow-sm)',
              }}
              title="Change profile picture"
            >
              <Camera size={14} />
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--slate-900)' }}>
              {user.name}
            </h2>
            <div style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginTop: '2px' }}>
              {user.department} • {user.year}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '2px' }}>
              Student ID: {user.studentId}
            </div>
            <button
              onClick={() => setShowAvatarModal(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-600)',
                fontSize: '0.8125rem',
                fontWeight: '700',
                cursor: 'pointer',
                padding: 0,
                marginTop: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Camera size={14} /> Change Profile Picture
            </button>
          </div>
        </div>

        {/* Reputation Badge */}
        <div
          style={{
            backgroundColor: 'var(--secondary-50)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award size={24} style={{ color: 'var(--secondary-600)' }} />
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.875rem', color: 'var(--secondary-600)' }}>
                Campus Karma Score: {user.reputationScore}/100
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-600)' }}>
                Verified honest finder & active campus participant
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem', borderTop: '1px solid var(--slate-200)', paddingTop: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--slate-500)' }}>Institutional Email</span>
            <strong style={{ color: 'var(--slate-800)' }}>{user.email}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--slate-500)' }}>Phone Privacy Status</span>
            <strong style={{ color: 'var(--secondary-600)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Lock size={14} /> Masked ({user.phoneMasked})
            </strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--slate-500)' }}>Total Items Recovered</span>
            <strong style={{ color: 'var(--slate-800)' }}>{user.itemsRecoveredCount} items</strong>
          </div>
        </div>
      </div>

      {/* Account Controls */}
      <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--slate-900)' }}>
          Account & Privacy Settings
        </h3>

        <button
          onClick={handleLogout}
          className="btn btn-secondary"
          style={{ justifyContent: 'flex-start', color: 'var(--danger-600)', borderColor: 'var(--danger-500)' }}
        >
          <LogOut size={16} /> Sign Out of Account
        </button>
      </div>

      {/* Change Profile Picture Modal */}
      {showAvatarModal && (
        <div className="modal-overlay" onClick={() => setShowAvatarModal(false)}>
          <div className="modal-content animate-fade-in" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--slate-900)' }}>
                Change Profile Picture
              </h3>
              <button onClick={() => setShowAvatarModal(false)} style={{ background: 'none', border: 'none', color: 'var(--slate-400)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {/* Preview Area */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <img
                src={previewUrl}
                alt="Avatar preview"
                style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  margin: '0 auto 1rem auto',
                  border: '4px solid var(--primary-500)',
                  boxShadow: 'var(--shadow-md)',
                }}
              />
              <div style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
                Preview of your new profile avatar
              </div>
            </div>

            {/* Option 1: File Upload */}
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Option 1: Upload Image File</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="form-input"
                style={{ padding: '8px' }}
              />
            </div>

            {/* Option 2: Choose Presets */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Option 2: Choose Sample Avatar
              </label>
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
                {presetAvatars.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Preset ${idx + 1}`}
                    onClick={() => setPreviewUrl(url)}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: previewUrl === url ? '3px solid var(--primary-600)' : '2px solid transparent',
                      opacity: previewUrl === url ? 1 : 0.7,
                      transition: 'all 0.15s ease',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Option 3: Image URL */}
            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <label className="form-label">Option 3: Paste Image Web URL</label>
              <input
                type="url"
                className="form-input"
                value={customAvatarUrl}
                onChange={(e) => {
                  setCustomAvatarUrl(e.target.value);
                  setPreviewUrl(e.target.value);
                }}
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowAvatarModal(false)} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button onClick={handleSaveAvatar} className="btn btn-primary btn-sm">
                <Check size={16} /> Save Profile Picture
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
