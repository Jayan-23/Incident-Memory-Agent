import React, { useState } from 'react';
import { X, Brain, CheckCircle2, AlertTriangle, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OutcomeCaptureModal({ 
  isOpen, 
  onClose, 
  incident, 
  initialData = {}, 
  onSubmit, 
  isSubmitting 
}) {
  if (!isOpen || !incident) return null;

  const [rootCause, setRootCause] = useState(
    initialData.rootCause || incident.diagnosis?.likelyCause || "Connection pool exhaustion"
  );
  const [actionTaken, setActionTaken] = useState(
    initialData.actionTaken || incident.diagnosis?.previousSuccessfulFix || "Increased connection pool size from 50 to 100"
  );
  const [outcome, setOutcome] = useState(initialData.outcome || "WORKED");
  const [outcomeNotes, setOutcomeNotes] = useState(
    "Connection wait times normalized to <15ms. Checkout 500 error rate dropped to 0%."
  );
  const [lessonsLearned, setLessonsLearned] = useState(
    `Default connection pool configuration is insufficient during post-deployment traffic surges on ${incident.service}.`
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Trigger celebratory particle animation
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    await onSubmit({
      rootCause,
      actionTaken,
      outcome,
      outcomeNotes,
      lessonsLearned,
      resolutionAction: actionTaken.includes('pool') ? 'Increase connection pool' : 'Update configuration'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel-violet" 
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '640px',
          padding: '28px',
          borderRadius: '16px',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={20} color="#34d399" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', color: '#f8fafc', fontWeight: 800 }}>
                Incident Resolved ✅
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: 600 }}>
                MODULE 6 &amp; 7 — Outcome Capture &amp; Hindsight Learning Loop
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="btn-secondary" 
            style={{ padding: '6px', borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.84rem', color: '#94a3b8', marginBottom: '20px', lineHeight: 1.5 }}>
          Record the confirmed root cause and outcome. This experience will be committed to Hindsight's persistent memory so the agent diagnoses future incidents faster.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Confirmed Root Cause */}
          <div>
            <label style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Confirmed Root Cause:
            </label>
            <input
              type="text"
              value={rootCause}
              onChange={e => setRootCause(e.target.value)}
              placeholder="e.g. Connection pool exhaustion"
              required
            />
          </div>

          {/* Action Taken */}
          <div>
            <label style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Action Taken (Resolution):
            </label>
            <input
              type="text"
              value={actionTaken}
              onChange={e => setActionTaken(e.target.value)}
              placeholder="e.g. Increased connection pool from 50 to 100 and restarted worker pods"
              required
            />
          </div>

          {/* Outcome Selector */}
          <div>
            <label style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Resolution Result / Outcome:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setOutcome('WORKED')}
                style={{
                  background: outcome === 'WORKED' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                  border: outcome === 'WORKED' ? '1px solid #10b981' : '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '10px',
                  color: outcome === 'WORKED' ? '#34d399' : '#94a3b8',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <CheckCircle2 size={15} /> WORKED
              </button>

              <button
                type="button"
                onClick={() => setOutcome('FAILED')}
                style={{
                  background: outcome === 'FAILED' ? 'rgba(244, 63, 94, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                  border: outcome === 'FAILED' ? '1px solid #f43f5e' : '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '10px',
                  color: outcome === 'FAILED' ? '#fb7185' : '#94a3b8',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <AlertTriangle size={15} /> FAILED
              </button>

              <button
                type="button"
                onClick={() => setOutcome('PARTIAL')}
                style={{
                  background: outcome === 'PARTIAL' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                  border: outcome === 'PARTIAL' ? '1px solid #f59e0b' : '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '10px',
                  color: outcome === 'PARTIAL' ? '#fbbf24' : '#94a3b8',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                PARTIAL FIX
              </button>
            </div>
          </div>

          {/* Outcome Notes */}
          <div>
            <label style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Observed Metrics &amp; Telemetry Result:
            </label>
            <input
              type="text"
              value={outcomeNotes}
              onChange={e => setOutcomeNotes(e.target.value)}
              placeholder="e.g. Wait times dropped to 12ms. Zero 500 errors for 72h."
            />
          </div>

          {/* Lessons Learned */}
          <div>
            <label style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Lessons Learned &amp; Prevention Rule:
            </label>
            <textarea
              rows={2}
              value={lessonsLearned}
              onChange={e => setLessonsLearned(e.target.value)}
              placeholder="What should future SREs remember when this alert fires?"
            />
          </div>

          {/* Memory Commit Checklist (from prompt spec) */}
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '10px', padding: '12px 16px' }}>
            <span style={{ fontSize: '0.76rem', color: '#c084fc', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Brain size={14} /> COMMITTING 4 MEMORY PILLARS TO HINDSIGHT:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '0.78rem', color: '#cbd5e1' }}>
              <div>✓ Root cause: <strong>{rootCause || 'Specified'}</strong></div>
              <div>✓ Resolution: <strong>{actionTaken.slice(0, 25)}...</strong></div>
              <div>✓ Outcome: <strong>{outcome}</strong></div>
              <div>✓ Prevention rule &amp; lessons</div>
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-violet"
              style={{ flex: 2, justifyContent: 'center', fontSize: '0.94rem', padding: '12px' }}
            >
              <Brain size={17} /> {isSubmitting ? 'Saving Memory...' : 'SAVE EXPERIENCE TO HINDSIGHT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
