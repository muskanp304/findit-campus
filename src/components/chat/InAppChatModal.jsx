// src/components/chat/InAppChatModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, ShieldAlert, Lock, CheckCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const InAppChatModal = () => {
  const { chatModal, setChatModal, messages, sendMessage, user, reports, markAsRecovered } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const reportId = chatModal.reportId;
  const finder = chatModal.finder;
  const thread = messages[reportId] || [];

  const currentReport = reports.find((r) => r.id === reportId);
  const isResolved = currentReport?.status === 'Resolved';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thread]);

  if (!chatModal.isOpen || !reportId) {
    return null;
  }

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(reportId, inputText.trim());
    setInputText('');
  };

  const handleQuickReply = (text) => {
    sendMessage(reportId, text);
  };

  const handleConfirmRetrieved = () => {
    markAsRecovered(reportId);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const quickReplies = [
    'Hi, I think this may be my ID card.',
    'Could you confirm where you left it?',
    'Can we meet near the library front counter?',
    'Thank you so much for your help!',
  ];

  return (
    <div className="modal-overlay" onClick={() => setChatModal({ isOpen: false, reportId: null, finder: null })}>
      <div
        className="modal-content animate-fade-in"
        style={{ maxWidth: '620px', display: 'flex', flexDirection: 'column', height: '680px', padding: 0, overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--slate-900)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={finder?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250'}
                alt={finder?.name || 'Finder'}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #60a5fa' }}
              />
              <span style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#34d399', border: '2px solid #0f172a' }} />
            </div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '0.9375rem' }}>{finder?.name || 'Rahul Sharma'}</div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Lock size={12} /> Secure Campus Chat • Report #{reportId}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {!isResolved ? (
              <button
                onClick={handleConfirmRetrieved}
                className="btn btn-success btn-sm"
                style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                title="Confirm you have received your lost item"
              >
                <CheckCheck size={14} /> Confirm Item Retrieved
              </button>
            ) : (
              <span className="badge badge-resolved" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#34d399', border: 'none' }}>
                ✓ Recovered
              </span>
            )}
            <button
              onClick={() => setChatModal({ isOpen: false, reportId: null, finder: null })}
              style={{ background: 'none', border: 'none', color: 'var(--slate-400)', cursor: 'pointer', padding: '4px' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Privacy & Recovery Action Banner */}
        <div
          style={{
            backgroundColor: isResolved ? '#ecfdf5' : '#fffbeb',
            borderBottom: isResolved ? '1px solid #a7f3d0' : '1px solid #fef3c7',
            padding: '8px 16px',
            fontSize: '0.75rem',
            color: isResolved ? '#047857' : '#b45309',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={16} style={{ flexShrink: 0 }} />
            <span>
              {isResolved
                ? 'This report has been marked as recovered and resolved.'
                : 'For your safety, meet at campus spots like the Library Desk. Avoid sharing passwords.'}
            </span>
          </div>

          {!isResolved && (
            <button
              onClick={handleConfirmRetrieved}
              style={{
                backgroundColor: 'var(--secondary-600)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                padding: '2px 8px',
                fontSize: '0.7rem',
                fontWeight: '700',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Confirm Retrieved 🎉
            </button>
          )}
        </div>

        {/* Chat Messages List */}
        <div
          style={{
            flex: 1,
            padding: '1.25rem',
            overflowY: 'auto',
            backgroundColor: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {thread.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--slate-400)', margin: 'auto', fontSize: '0.875rem' }}>
              No messages yet. Click a quick reply below to start conversing!
            </div>
          ) : (
            thread.map((msg) => {
              if (msg.isSystem) {
                return (
                  <div
                    key={msg.id}
                    style={{
                      alignSelf: 'center',
                      backgroundColor: '#ecfdf5',
                      color: '#047857',
                      border: '1px solid #a7f3d0',
                      borderRadius: 'var(--radius-full)',
                      padding: '6px 16px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      textAlign: 'center',
                      margin: '6px 0',
                    }}
                  >
                    {msg.text}
                  </div>
                );
              }

              const isUser = msg.senderId === user.id;

              return (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: isUser ? 'flex-end' : 'flex-start',
                    maxWidth: '82%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isUser ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: isUser ? 'var(--primary-600)' : 'white',
                      color: isUser ? 'white' : 'var(--slate-800)',
                      padding: '10px 14px',
                      borderRadius: isUser ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                      boxShadow: 'var(--shadow-sm)',
                      fontSize: '0.875rem',
                      lineHeight: '1.45',
                      border: isUser ? 'none' : '1px solid var(--slate-200)',
                    }}
                  >
                    {msg.text}
                  </div>
                  <span style={{ fontSize: '0.65rem', color: 'var(--slate-400)', marginTop: '4px', padding: '0 4px' }}>
                    {msg.senderName} • {msg.timestamp}
                  </span>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        {!isResolved && (
          <div style={{ padding: '8px 12px', backgroundColor: 'white', borderTop: '1px solid var(--slate-200)', overflowX: 'auto', whiteSpace: 'nowrap', display: 'flex', gap: '6px' }}>
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleQuickReply(reply)}
                style={{
                  backgroundColor: 'var(--slate-100)',
                  color: 'var(--slate-700)',
                  border: '1px solid var(--slate-300)',
                  borderRadius: 'var(--radius-full)',
                  padding: '4px 12px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                "{reply}"
              </button>
            ))}
          </div>
        )}

        {/* Input Footer */}
        <form
          onSubmit={handleSend}
          style={{
            padding: '12px',
            backgroundColor: 'white',
            borderTop: '1px solid var(--slate-200)',
            display: 'flex',
            gap: '8px',
          }}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isResolved ? "This report is marked as recovered." : "Type your message securely..."}
            disabled={isResolved}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--slate-200)',
              fontSize: '0.875rem',
              outline: 'none',
            }}
          />
          <button type="submit" disabled={isResolved} className="btn btn-primary btn-sm" style={{ padding: '0 16px' }}>
            <Send size={16} /> Send
          </button>
        </form>
      </div>
    </div>
  );
};
