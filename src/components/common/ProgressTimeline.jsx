// src/components/common/ProgressTimeline.jsx
import React from 'react';
import { CheckCircle2, Clock, Search, Sparkles, CheckCheck } from 'lucide-react';

export const ProgressTimeline = ({ currentStep = 1, status = 'Searching' }) => {
  const steps = [
    { num: 1, label: 'Reported', desc: 'Report submitted to community' },
    { num: 2, label: 'Searching', desc: 'Scanning for campus matches' },
    { num: 3, label: 'Potential Match', desc: 'Similar item found' },
    { num: 4, label: 'Contacting Finder', desc: 'Secure communication active' },
    { num: 5, label: 'Recovered', desc: 'Item successfully returned' },
  ];

  return (
    <div style={{ width: '100%', padding: '1rem 0' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
          marginBottom: '0.75rem',
        }}
      >
        {/* Background Connecting Line */}
        <div
          style={{
            position: 'absolute',
            top: '18px',
            left: '5%',
            right: '5%',
            height: '3px',
            backgroundColor: 'var(--slate-200)',
            zIndex: 1,
          }}
        />
        {/* Progress Connecting Line */}
        <div
          style={{
            position: 'absolute',
            top: '18px',
            left: '5%',
            width: `${((Math.min(currentStep, 5) - 1) / 4) * 90}%`,
            height: '3px',
            backgroundColor: currentStep === 5 ? 'var(--secondary-500)' : 'var(--primary-600)',
            zIndex: 1,
            transition: 'width 0.4s ease',
          }}
        />

        {steps.map((step) => {
          const isCompleted = currentStep > step.num;
          const isCurrent = currentStep === step.num;
          const isUpcoming = currentStep < step.num;

          let bg = 'white';
          let border = '2px solid var(--slate-300)';
          let color = 'var(--slate-500)';

          if (isCompleted) {
            bg = 'var(--primary-600)';
            border = '2px solid var(--primary-600)';
            color = 'white';
          } else if (isCurrent) {
            bg = currentStep === 5 ? 'var(--secondary-500)' : 'var(--primary-500)';
            border = `4px solid ${currentStep === 5 ? 'var(--secondary-50)' : 'var(--primary-100)'}`;
            color = 'white';
          }

          return (
            <div
              key={step.num}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 2,
                flex: 1,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: bg,
                  border: border,
                  color: color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  boxShadow: isCurrent ? 'var(--shadow-md)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                {isCompleted ? (
                  <CheckCircle2 size={20} />
                ) : isCurrent && currentStep === 5 ? (
                  <CheckCheck size={20} />
                ) : (
                  step.num
                )}
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: isCurrent ? '700' : '600',
                  color: isCurrent ? 'var(--slate-900)' : isCompleted ? 'var(--slate-700)' : 'var(--slate-400)',
                  marginTop: '0.5rem',
                  maxWidth: '80px',
                  lineHeight: '1.2',
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
