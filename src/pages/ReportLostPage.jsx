// src/pages/ReportLostPage.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ITEM_CATEGORIES, CAMPUS_LOCATIONS } from '../data/mockData';
import {
  CreditCard,
  Smartphone,
  Headphones,
  Wallet,
  Key,
  ShoppingBag,
  BookOpen,
  Watch,
  FileText,
  Package,
  ArrowRight,
  ArrowLeft,
  Upload,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Calendar,
  X,
} from 'lucide-react';

const iconMap = {
  CreditCard,
  Smartphone,
  Headphones,
  Wallet,
  Key,
  ShoppingBag,
  BookOpen,
  Watch,
  FileText,
  Package,
};

export const ReportLostPage = () => {
  const { createReport, setCurrentView, navigateToDetails, addToast } = useApp();

  const [step, setStep] = useState(1);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [submittedReport, setSubmittedReport] = useState(null);

  const [formData, setFormData] = useState({
    category: 'idcard',
    categoryLabel: 'College ID Card',
    title: 'VCET Student ID Card - Anushka Mali',
    brand: 'VCET Official',
    color: 'Navy Blue & White',
    distinguishingFeatures: 'Navy blue lanyard with AI&DS department logo sticker.',
    description: 'Lost my ID card while studying for AI mid-term exams near Table 4 in reading room.',
    location: 'Central Library',
    subLocation: '2nd Floor Reading Room Table 4',
    date: '2026-09-29',
    time: '11:30 AM',
    imageUrl: '/id-card-demo.svg',
  });

  const [errors, setErrors] = useState({});

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

  const handleCategorySelect = (cat) => {
    setFormData((prev) => ({
      ...prev,
      category: cat.id,
      categoryLabel: cat.name,
      title: cat.id === 'idcard' ? 'VCET Student ID Card - Anushka Mali' : `Lost ${cat.name}`,
    }));
  };

  const validateStep = () => {
    const errs = {};
    if (step === 2) {
      if (!formData.title.trim()) errs.title = 'Please enter item title.';
      if (!formData.color.trim()) errs.color = 'Please enter primary color.';
    } else if (step === 3) {
      if (!formData.location) errs.location = 'Please select location.';
      if (!formData.date) errs.date = 'Please select date.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const created = createReport({
      type: 'lost',
      ...formData,
    });
    setSubmittedReport(created);
  };

  const handleAttemptExit = () => {
    if (step > 1 && !submittedReport) {
      setShowExitConfirm(true);
    } else {
      setCurrentView('dashboard');
    }
  };

  if (submittedReport) {
    return (
      <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '3rem auto', textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: '3rem 2rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)' }}>
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
            <CheckCircle2 size={44} />
          </div>

          <span className="badge badge-lost" style={{ marginBottom: '1rem' }}>
            Report Published • #{submittedReport.id}
          </span>

          <h1 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
            Your lost item has been reported.
          </h1>
          <p style={{ fontSize: '0.9375rem', color: 'var(--slate-600)', marginBottom: '2rem', lineHeight: '1.5' }}>
            We'll let you know if a potential match is found for your <strong>{submittedReport.categoryLabel}</strong> near <strong>{submittedReport.location}</strong>.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={() => navigateToDetails(submittedReport.id)} className="btn btn-primary">
              Track Report <ArrowRight size={16} />
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
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--slate-900)' }}>
            Report a Lost Item
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>
            Step {step} of 5 — Fill details to notify campus network
          </p>
        </div>
        <button onClick={handleAttemptExit} style={{ background: 'none', border: 'none', color: 'var(--slate-400)', cursor: 'pointer' }}>
          <X size={20} />
        </button>
      </div>

      <div style={{ height: '6px', backgroundColor: 'var(--slate-200)', borderRadius: 'var(--radius-full)', overflow: 'hidden', marginBottom: '2rem' }}>
        <div style={{ height: '100%', width: `${(step / 5) * 100}%`, backgroundColor: 'var(--primary-600)', transition: 'width 0.3s ease' }} />
      </div>

      <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.125rem', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
              Step 1: What did you lose?
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', marginBottom: '1.5rem' }}>
              Select a category to customize item attributes.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
              {ITEM_CATEGORIES.map((cat) => {
                const IconComponent = iconMap[cat.icon] || Package;
                const isSelected = formData.category === cat.id;

                return (
                  <div
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat)}
                    style={{
                      padding: '1.25rem 1rem',
                      borderRadius: 'var(--radius-lg)',
                      border: isSelected ? `2px solid ${cat.color}` : '1.5px solid var(--slate-200)',
                      backgroundColor: isSelected ? cat.bg : 'white',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: cat.bg, color: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem auto' }}>
                      <IconComponent size={22} />
                    </div>
                    <div style={{ fontSize: '0.875rem', fontWeight: isSelected ? '800' : '600', color: 'var(--slate-800)' }}>
                      {cat.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.125rem', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
              Step 2: Tell us about it
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', marginBottom: '1.5rem' }}>
              Provide distinguishing features to make matching easier.
            </p>

            <div className="form-group">
              <label className="form-label" htmlFor="title">Item Name *</label>
              <input
                id="title"
                type="text"
                className="form-input"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              {errors.title && <span className="form-error">{errors.title}</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Brand / Make</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Color *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
                {errors.color && <span className="form-error">{errors.color}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Distinguishing Marks</label>
              <input
                type="text"
                className="form-input"
                value={formData.distinguishingFeatures}
                onChange={(e) => setFormData({ ...formData, distinguishingFeatures: e.target.value })}
                placeholder="Stickers, keychains, scratches..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                rows={3}
                className="form-textarea"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.125rem', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
              Step 3: Where did you last see it?
            </h2>

            <div className="form-group">
              <label className="form-label">Campus Location *</label>
              <select
                className="form-select"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              >
                {CAMPUS_LOCATIONS.map((l) => (
                  <option key={l.id} value={l.name}>{l.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Specific Area / Desk</label>
              <input
                type="text"
                className="form-input"
                value={formData.subLocation}
                onChange={(e) => setFormData({ ...formData, subLocation: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Date Lost</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Approximate Time</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.125rem', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
              Step 4: Add a photo
            </h2>
            <div
              style={{
                border: '2px dashed var(--slate-300)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                textAlign: 'center',
                backgroundColor: 'var(--slate-50)',
              }}
            >
              {formData.imageUrl ? (
                <div>
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    style={{ maxHeight: '180px', borderRadius: 'var(--radius-md)', margin: '0 auto 1rem auto' }}
                  />
                  <div style={{ fontSize: '0.8125rem', color: 'var(--secondary-600)', fontWeight: '700' }}>
                    ✓ Photo uploaded
                  </div>
                </div>
              ) : (
                <div>
                  <Upload size={36} style={{ color: 'var(--primary-600)', marginBottom: '0.5rem' }} />
                  <div style={{ fontWeight: '600' }}>Upload item photo</div>
                </div>
              )}
              <label className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', marginTop: '1rem', cursor: 'pointer' }}>
                <Upload size={15} /> {formData.imageUrl ? 'Replace photo' : 'Choose photo'}
                <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
              </label>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '1.125rem', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
              Step 5: Review your report
            </h2>

            <div style={{ backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
              <div><strong>Category:</strong> {formData.categoryLabel}</div>
              <div><strong>Name:</strong> {formData.title}</div>
              <div><strong>Color:</strong> {formData.color}</div>
              <div><strong>Location:</strong> {formData.location} ({formData.subLocation})</div>
              <div><strong>Date & Time:</strong> {formData.date} at {formData.time}</div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--slate-100)' }}>
          {step > 1 ? (
            <button onClick={prevStep} className="btn btn-secondary btn-sm">
              <ArrowLeft size={16} /> Back
            </button>
          ) : <div />}

          {step < 5 ? (
            <button onClick={nextStep} className="btn btn-primary btn-sm">
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn btn-success btn-lg">
              <CheckCircle2 size={20} /> Submit Lost Item
            </button>
          )}
        </div>
      </div>

      {showExitConfirm && (
        <div className="modal-overlay" onClick={() => setShowExitConfirm(false)}>
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--warning-600)', marginBottom: '1rem' }}>
              <AlertTriangle size={24} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: '800' }}>Incomplete Report</h3>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginBottom: '1.5rem' }}>
              Your entered report details will not be saved if you exit now.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setCurrentView('dashboard')} className="btn btn-secondary btn-sm">
                Exit
              </button>
              <button onClick={() => setShowExitConfirm(false)} className="btn btn-primary btn-sm">
                Continue Editing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
