// src/pages/ReportFoundPage.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ITEM_CATEGORIES, CAMPUS_LOCATIONS } from '../data/mockData';
import { HeartHandshake, CheckCircle2, ArrowRight, Upload } from 'lucide-react';

export const ReportFoundPage = () => {
  const { createReport, setCurrentView, navigateToDetails, addToast } = useApp();
  const [submittedReport, setSubmittedReport] = useState(null);

  const [formData, setFormData] = useState({
    category: 'idcard',
    categoryLabel: 'College ID Card',
    title: 'VCET Student ID Card (AI & DS)',
    color: 'Navy Blue & White',
    brand: 'VCET',
    location: 'Central Library',
    subLocation: 'Front Issue Counter Desk 2',
    date: '2026-09-29',
    time: '02:15 PM',
    distinguishingFeatures: 'Name reads Anushka Mali, SE AI&DS department.',
    description: 'Found an ID card sitting on the reading room desk after 11 AM slot. Handed over to Mr. Patil at the front help counter.',
    imageUrl: '/id-card-demo.svg',
  });

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      addToast('Photo must be under 5MB.', 'warning');
      event.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const created = createReport({
      type: 'found',
      ...formData,
      status: 'Waiting for owner',
    });
    setSubmittedReport(created);
  };

  if (submittedReport) {
    return (
      <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '3rem auto', textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: '3rem 2rem', borderRadius: 'var(--radius-xl)' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'var(--secondary-50)',
              color: 'var(--secondary-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto',
            }}
          >
            <HeartHandshake size={44} />
          </div>

          <span className="badge badge-found" style={{ marginBottom: '1rem' }}>
            Found Report #{submittedReport.id}
          </span>

          <h1 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
            Thanks for helping someone find their way back to their belongings. 🎉
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', marginBottom: '2rem', lineHeight: '1.5' }}>
            Your found report is active. The potential owner will be notified to compare details and connect securely.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={() => navigateToDetails(submittedReport.id)} className="btn btn-primary">
              View Report <ArrowRight size={16} />
            </button>
            <button onClick={() => setCurrentView('dashboard')} className="btn btn-secondary">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '720px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--slate-900)' }}>
          You found something? Let’s help get it home.
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>
          Fill out quick details so the owner can recognize and recover their belonging
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
        <div className="form-group">
          <label className="form-label">Item Category *</label>
          <select
            className="form-select"
            value={formData.category}
            onChange={(e) => {
              const cat = ITEM_CATEGORIES.find((c) => c.id === e.target.value);
              setFormData({ ...formData, category: e.target.value, categoryLabel: cat ? cat.name : 'Item' });
            }}
          >
            {ITEM_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Item Name / Title *</label>
          <input
            type="text"
            className="form-input"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Campus Location Found *</label>
            <select
              className="form-select"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            >
              {CAMPUS_LOCATIONS.map((l) => (
                <option key={l.id} value={l.name}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Sub-Location / Counter</label>
            <input
              type="text"
              className="form-input"
              value={formData.subLocation}
              onChange={(e) => setFormData({ ...formData, subLocation: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description & Where Handed Over</label>
          <textarea
            rows={3}
            className="form-textarea"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="found-item-photo">Item Photo</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <img src={formData.imageUrl} alt="Found item preview" style={{ width: '160px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }} />
            <label className="btn btn-secondary btn-sm" htmlFor="found-item-photo" style={{ cursor: 'pointer' }}>
              <Upload size={15} /> Upload photo
            </label>
            <input id="found-item-photo" type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
          </div>
        </div>

        <button type="submit" className="btn btn-success btn-lg" style={{ width: '100%', marginTop: '1rem' }}>
          <HeartHandshake size={20} /> Submit Found Item
        </button>
      </form>
    </div>
  );
};
