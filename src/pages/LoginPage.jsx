// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Mail, Lock, User, GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LoginPage = () => {
  const { handleLogin } = useApp();
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  
  // Sign In Form State
  const [email, setEmail] = useState('anushka.mali@vcet.edu.in');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up Form State
  const [fullName, setFullName] = useState('');
  const [dept, setDept] = useState('AI & Data Science');
  const [year, setYear] = useState('2nd Year');

  const onSignInSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const onSignUpSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div
      className="animate-fade-in"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 120px)',
        padding: '1.5rem',
      }}
    >
      <div
        className="glass-card"
        style={{
          maxWidth: '460px',
          width: '100%',
          padding: '2.25rem',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem auto',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
            }}
          >
            <ShieldCheck size={26} />
          </div>
          <h1 style={{ fontSize: '1.375rem', fontWeight: '900', color: 'var(--slate-900)' }}>
            FindIt Campus
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', marginTop: '2px' }}>
            Official VCET Belongings Network Portal
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            backgroundColor: 'var(--slate-100)',
            borderRadius: 'var(--radius-md)',
            padding: '4px',
            marginBottom: '1.5rem',
          }}
        >
          <button
            type="button"
            onClick={() => setMode('signin')}
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: mode === 'signin' ? 'white' : 'transparent',
              color: mode === 'signin' ? 'var(--slate-900)' : 'var(--slate-600)',
              fontWeight: mode === 'signin' ? '700' : '500',
              fontSize: '0.875rem',
              cursor: 'pointer',
              boxShadow: mode === 'signin' ? 'var(--shadow-sm)' : 'none',
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: mode === 'signup' ? 'white' : 'transparent',
              color: mode === 'signup' ? 'var(--slate-900)' : 'var(--slate-600)',
              fontWeight: mode === 'signup' ? '700' : '500',
              fontSize: '0.875rem',
              cursor: 'pointer',
              boxShadow: mode === 'signup' ? 'var(--shadow-sm)' : 'none',
            }}
          >
            Create Account
          </button>
        </div>

        {/* Sign In Form */}
        {mode === 'signin' ? (
          <form onSubmit={onSignInSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                College Email ID
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }} />
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="anushka.mali@vcet.edu.in"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: '0.75rem', color: 'var(--primary-600)', textDecoration: 'none', fontWeight: '600' }}>
                  Forgot password?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }} />
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.25rem', fontSize: '0.8125rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--slate-700)' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: 'var(--primary-600)' }}
                />
                Remember me on this browser
              </label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.9375rem' }}>
              Sign In to Campus Network <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          /* Create Account Form */
          <form onSubmit={onSignUpSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }} />
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Anushka Mali"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Institutional Email ID</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }} />
                <input
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  placeholder="student@vcet.edu.in"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Department</label>
                <select className="form-select" value={dept} onChange={(e) => setDept(e.target.value)}>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="Computer Engineering">Computer Eng.</option>
                  <option value="EXTC Engineering">EXTC Eng.</option>
                  <option value="IT Engineering">IT Eng.</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Academic Year</label>
                <select className="form-select" value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="1st Year">1st Year (FE)</option>
                  <option value="2nd Year">2nd Year (SE)</option>
                  <option value="3rd Year">3rd Year (TE)</option>
                  <option value="4th Year">4th Year (BE)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }} />
                <input
                  type="password"
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  placeholder="At least 8 characters"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.9375rem' }}>
              Create Account <CheckCircle2 size={18} />
            </button>
          </form>
        )}

        {/* Footer */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--slate-500)', lineHeight: '1.4' }}>
          🛡️ Private contact masking is active. Your email and phone details remain private until you connect.
        </div>
      </div>
    </div>
  );
};
