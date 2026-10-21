// src/components/layout/DemoBar.jsx
import React from 'react';
import { useDemo, DEMO_STEPS } from '../../context/DemoContext';
import { Play, ChevronRight, ChevronLeft, Sparkles, ChevronUp, ChevronDown, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoBar = () => {
  const {
    currentStep,
    currentStepIndex,
    totalSteps,
    executeStep,
    nextStep,
    prevStep,
    isDemoBarExpanded,
    setIsDemoBarExpanded,
  } = useDemo();

  const { resetDataToDefault } = useApp();

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#0f172a',
        color: 'white',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        fontSize: '0.8125rem',
      }}
    >
      <div
        style={{
          maxHeight: isDemoBarExpanded ? '120px' : '40px',
          transition: 'max-height 0.3s ease',
          overflow: 'hidden',
          padding: '8px 16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          {/* Title & Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                backgroundColor: 'var(--primary-600)',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: '700',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Sparkles size={12} /> UX Evaluator Mode
            </span>
            <span style={{ fontWeight: '600', color: 'var(--slate-200)', display: 'none', mdDisplay: 'inline' }}>
              Step {currentStepIndex + 1} of {totalSteps}:
            </span>
            <span style={{ fontWeight: '700', color: '#60a5fa' }}>{currentStep?.title}</span>
          </div>

          {/* Quick Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer',
                opacity: currentStepIndex === 0 ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <ChevronLeft size={14} /> Prev
            </button>

            {/* Jump Dropdown */}
            <select
              value={currentStepIndex + 1}
              onChange={(e) => executeStep(Number(e.target.value))}
              style={{
                backgroundColor: '#1e293b',
                color: 'white',
                border: '1px solid var(--slate-700)',
                borderRadius: '4px',
                padding: '4px 8px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                maxWidth: '180px',
              }}
            >
              {DEMO_STEPS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id}. {s.title}
                </option>
              ))}
            </select>

            <button
              onClick={nextStep}
              disabled={currentStepIndex === totalSteps - 1}
              style={{
                background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 12px',
                fontWeight: '600',
                cursor: currentStepIndex === totalSteps - 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Next Step <ChevronRight size={14} />
            </button>

            <button
              onClick={resetDataToDefault}
              title="Reset Demo Data"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'var(--slate-300)',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <RefreshCw size={12} />
            </button>

            <button
              onClick={() => setIsDemoBarExpanded(!isDemoBarExpanded)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--slate-400)',
                cursor: 'pointer',
                padding: '4px',
              }}
              title={isDemoBarExpanded ? 'Collapse Bar' : 'Expand Bar'}
            >
              {isDemoBarExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        {/* Extended Description */}
        {isDemoBarExpanded && (
          <div
            style={{
              marginTop: '6px',
              paddingTop: '6px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              color: 'var(--slate-300)',
              fontSize: '0.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <span style={{ color: 'var(--slate-400)' }}>UX Goal: </span>
              {currentStep?.desc}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--slate-400)' }}>
              Scenario: <strong>Anushka Mali's ID Recovery Journey</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
