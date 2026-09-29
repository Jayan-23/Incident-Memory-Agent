import React, { useState } from 'react';
import { 
  ShieldAlert, 
  BrainCircuit, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Zap, 
  Check, 
  Sparkles, 
  ChevronRight,
  ArrowRight,
  Send,
  HelpCircle,
  TrendingUp,
  Clock,
  Layers,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function IncidentIntelligenceReport({ 
  incident, 
  onSaveExperience, 
  onFixFeedback 
}) {
  if (!incident) return null;

  const diagnosis = incident.diagnosis || {};
  const matches = diagnosis.similarIncidents || incident.recallResult?.matches || [];
  
  // Feedback and Learn inline state
  const [inlineRootCause, setInlineRootCause] = useState(diagnosis.likelyCause || "Connection pool exhaustion");
  const [inlineResolution, setInlineResolution] = useState(diagnosis.previousSuccessfulFix || "Increase connection pool from 50 → 100");
  const [inlineOutcome, setInlineOutcome] = useState("SUCCESS");
  const [isSaved, setIsSaved] = useState(incident.status === 'RESOLVED');
  const [feedbackGiven, setFeedbackGiven] = useState(null);

  const handleSaveToHindsight = (e) => {
    e.preventDefault();
    confetti({ particleCount: 75, spread: 60 });
    onSaveExperience({
      rootCause: inlineRootCause,
      actionTaken: inlineResolution,
      outcome: inlineOutcome === 'SUCCESS' ? 'WORKED' : 'FAILED',
      outcomeNotes: `Recorded directly via Incident Intelligence Report. Result: ${inlineOutcome}.`,
      lessonsLearned: `${incident.service} failure resolved via ${inlineResolution}.`
    });
    setIsSaved(true);
  };

  const handleFeedback = (type) => {
    setFeedbackGiven(type);
    if (type === 'WORKED') {
      setInlineOutcome('SUCCESS');
      onFixFeedback && onFixFeedback('WORKED');
    } else {
      setInlineOutcome('FAILED');
      onFixFeedback && onFixFeedback('FAILED');
    }
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', fontFamily: 'var(--font-sans)' }}>
      
      {/* Target Output Box Container */}
      <div 
        className="glass-panel" 
        style={{ 
          background: 'rgba(10, 15, 26, 0.92)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          borderRadius: '14px',
          boxShadow: '0 0 35px rgba(56, 189, 248, 0.12), 0 20px 40px rgba(0,0,0,0.6)',
          overflow: 'hidden'
        }}
      >
        
        {/* Terminal Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.25) 0%, rgba(124, 58, 237, 0.25) 100%)',
          borderBottom: '1px solid rgba(56, 189, 248, 0.3)',
          padding: '18px 24px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.72rem', letterSpacing: '0.18em', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
            AUTONOMOUS SRE AGENT &bull; HINDSIGHT INTELLIGENCE SYSTEM
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em', margin: 0 }}>
            INCIDENT INTELLIGENCE REPORT
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '10px', fontSize: '0.85rem' }}>
            <span style={{ color: '#cbd5e1' }}>
              <strong>Incident:</strong> {incident.title}
            </span>
            <span style={{ color: '#64748b' }}>•</span>
            <span>
              <strong>Severity:</strong> <span className={`badge ${incident.severity === 'CRITICAL' ? 'badge-critical' : 'badge-high'}`}>{incident.severity}</span>
            </span>
            <span style={{ color: '#64748b' }}>•</span>
            <span style={{ color: '#38bdf8' }}>
              <strong>Service:</strong> {incident.service}
            </span>
          </div>
        </div>

        <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '26px' }}>

          {/* 1. INCIDENT UNDERSTANDING */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '1rem' }}>🔍</span>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                INCIDENT UNDERSTANDING
              </h3>
            </div>
            
            <p style={{ fontSize: '0.92rem', color: '#e2e8f0', fontWeight: 600, marginBottom: '10px' }}>
              {diagnosis.understandingSummary || "MongoDB connection requests are timing out."}
            </p>

            <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '4px', fontWeight: 600 }}>Symptoms:</div>
            <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {(diagnosis.symptoms || [
                "Payment requests failing",
                "Database connection timeout",
                `Started after deployment ${incident.deploymentInfo || 'v2.4.1'}`
              ]).map((sym, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#cbd5e1' }}>
                  <span style={{ color: '#38bdf8' }}>•</span> {sym}
                </li>
              ))}
            </ul>
          </section>

          {/* 2. HINDSIGHT MEMORY */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1rem' }}>🧠</span>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#c084fc', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  HINDSIGHT MEMORY
                </h3>
              </div>
              <span className="badge badge-similarity" style={{ fontSize: '0.7rem' }}>
                PERSISTENT OPERATIONAL MEMORY
              </span>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#cbd5e1', marginBottom: '12px' }}>
              <strong>{matches.length} similar incidents found</strong> in team memory:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {matches.map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '10px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="mono-text" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>
                      Incident #{item.incidentNumber || item.id?.replace('INC-', '')}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {item.service || incident.service}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="badge badge-similarity" style={{ fontSize: '0.78rem', fontWeight: 700 }}>
                      {item.similarity || 90}% similarity
                    </span>
                    {item.outcome === 'WORKED' ? (
                      <span className="badge badge-worked" style={{ fontSize: '0.7rem' }}>
                        <CheckCircle2 size={11} /> Resolved
                      </span>
                    ) : (
                      <span className="badge badge-failed" style={{ fontSize: '0.7rem' }}>
                        Failed fix
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. HISTORICAL EVIDENCE */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px', marginBottom: '14px' }}>
              <span style={{ fontSize: '1rem' }}>🔎</span>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                HISTORICAL EVIDENCE
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: matches.length > 1 ? '1fr 1fr' : '1fr', gap: '12px' }}>
              {matches.slice(0, 2).map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span className="mono-text" style={{ fontSize: '0.9rem', fontWeight: 800, color: '#38bdf8' }}>
                      Incident #{item.incidentNumber || item.id?.replace('INC-', '')}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 600 }}>
                      ✅ Successfully resolved
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                      Root Cause:
                    </span>
                    <p style={{ fontSize: '0.86rem', color: '#f8fafc', fontWeight: 600, margin: '2px 0 0 0' }}>
                      {item.rootCause}
                    </p>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>
                      Resolution:
                    </span>
                    <p style={{ fontSize: '0.84rem', color: '#34d399', fontWeight: 600, margin: '2px 0 0 0' }}>
                      {item.resolution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. AGENT ANALYSIS */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '1rem' }}>🤖</span>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                AGENT ANALYSIS
              </h3>
            </div>

            <div style={{ background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '10px', padding: '14px 16px', marginBottom: '12px' }}>
              <div style={{ fontSize: '0.74rem', color: '#c084fc', fontWeight: 700, textTransform: 'uppercase' }}>
                Most likely cause:
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                {diagnosis.likelyCause || "Connection pool exhaustion"}
              </div>
            </div>

            <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 600, marginBottom: '6px' }}>
              Why?
            </div>
            <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {(diagnosis.whyBullets || [
                "Same service (Payment API)",
                "Same MongoDB timeout pattern",
                "Similar deployment context",
                "Two historical incidents had the same pattern"
              ]).map((bullet, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#cbd5e1' }}>
                  <span style={{ color: '#8b5cf6' }}>•</span> {bullet}
                </li>
              ))}
            </ul>
          </section>

          {/* 5. RECOMMENDED ACTION */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '1rem' }}>💡</span>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                RECOMMENDED ACTION
              </h3>
            </div>

            <ol style={{ listStyle: 'none', paddingLeft: 0, margin: '0 0 14px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {(diagnosis.recommendedActions || [
                "1. Check MongoDB connection pool utilization.",
                "2. Compare current pool configuration with v2.4.1.",
                "3. If exhausted, increase pool size."
              ]).map((action, idx) => (
                <li key={idx} style={{ fontSize: '0.88rem', color: '#f8fafc', fontWeight: 500 }}>
                  {action}
                </li>
              ))}
            </ol>

            <div style={{ background: 'rgba(16, 185, 129, 0.08)', borderLeft: '3px solid #10b981', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '8px', padding: '12px 16px' }}>
              <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 700, textTransform: 'uppercase' }}>
                Previously successful fix:
              </span>
              <p style={{ fontSize: '0.92rem', color: '#ffffff', fontWeight: 700, margin: '2px 0 0 0' }}>
                {diagnosis.previousSuccessfulFix || "Increase connection pool from 50 → 100."}
              </p>
            </div>
          </section>

          {/* 6. CONFIDENCE */}
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                CONFIDENCE
              </h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.2rem', color: '#10b981' }}>🟢</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399' }}>
                HIGH
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                (Backed by {matches.length} corroborating incidents in persistent memory)
              </span>
            </div>
          </section>

          {/* 7. ENGINEER FEEDBACK */}
          <section style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '18px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '1rem' }}>👨‍💻</span>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                ENGINEER FEEDBACK
              </h3>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => handleFeedback('WORKED')}
                className="btn-emerald"
                style={{
                  background: feedbackGiven === 'WORKED' ? '#059669' : undefined,
                  padding: '10px 20px',
                  fontSize: '0.88rem'
                }}
              >
                <CheckCircle2 size={16} /> [ Fix Worked ]
              </button>

              <button
                type="button"
                onClick={() => handleFeedback('FAILED')}
                className="btn-danger"
                style={{
                  background: feedbackGiven === 'FAILED' ? 'rgba(244, 63, 94, 0.4)' : undefined,
                  padding: '10px 20px',
                  fontSize: '0.88rem'
                }}
              >
                <XCircle size={16} /> [ Fix Failed ]
              </button>

              {feedbackGiven && (
                <span style={{ fontSize: '0.82rem', color: feedbackGiven === 'WORKED' ? '#34d399' : '#fb7185', fontWeight: 600 }}>
                  ✓ Feedback noted: {feedbackGiven === 'WORKED' ? 'Fix resolved the issue' : 'Fix failed (anti-pattern captured)'}
                </span>
              )}
            </div>
          </section>

          {/* 8. LEARN FROM THIS INCIDENT (The Heart of the Feedback Loop) */}
          <section style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.35)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.1rem' }}>🧠</span>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#c084fc', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  LEARN FROM THIS INCIDENT
                </h3>
              </div>
              <span className="badge badge-similarity" style={{ fontSize: '0.7rem' }}>
                FEEDBACK LOOP → HINDSIGHT
              </span>
            </div>

            <form onSubmit={handleSaveToHindsight} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 700 }}>Root Cause:</span>
                <input
                  type="text"
                  value={inlineRootCause}
                  onChange={e => setInlineRootCause(e.target.value)}
                  placeholder="e.g. Connection pool exhaustion"
                  required
                  style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 700 }}>Resolution:</span>
                <input
                  type="text"
                  value={inlineResolution}
                  onChange={e => setInlineResolution(e.target.value)}
                  placeholder="e.g. Increased pool size from 50 → 100"
                  required
                  style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 700 }}>Outcome:</span>
                <select
                  value={inlineOutcome}
                  onChange={e => setInlineOutcome(e.target.value)}
                  style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                >
                  <option value="SUCCESS">SUCCESS (Worked as expected)</option>
                  <option value="FAILED">FAILED (Anti-pattern to avoid)</option>
                  <option value="PARTIAL">PARTIALLY WORKED</option>
                </select>
              </div>

              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="submit"
                  disabled={isSaved}
                  className="btn-violet"
                  style={{ padding: '12px 24px', fontSize: '0.92rem', fontWeight: 700 }}
                >
                  <BrainCircuit size={17} /> {isSaved ? 'SAVED IN HINDSIGHT MEMORY ✅' : '[ SAVE TO HINDSIGHT ]'}
                </button>
              </div>
            </form>
          </section>

        </div>

      </div>

    </div>
  );
}
