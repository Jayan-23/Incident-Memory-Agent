import React, { useState } from 'react';
import { 
  ShieldAlert, 
  BrainCircuit, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  GitBranch, 
  Clock, 
  Terminal, 
  Zap, 
  Search, 
  Layers, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Copy,
  RotateCw
} from 'lucide-react';

export default function IncidentInvestigation({ 
  incident, 
  onOpenResolve, 
  onReDiagnose, 
  isDiagnosing 
}) {
  const [copiedLog, setCopiedLog] = useState(false);
  const [appliedAction, setAppliedAction] = useState(null);

  if (!incident) {
    return (
      <div className="glass-panel" style={{ margin: '0 24px 24px 24px', padding: '60px 20px', textAlign: 'center' }}>
        <ShieldAlert size={48} color="#64748b" style={{ margin: '0 auto 16px auto', display: 'block' }} />
        <h3 style={{ fontSize: '1.2rem', color: '#f8fafc', marginBottom: '8px' }}>No Incident Selected</h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Please pick an incident from the Command Dashboard or Report a new one.</p>
      </div>
    );
  }

  const diagnosis = incident.diagnosis || {};
  const understanding = incident.understanding || {};
  const recallResult = incident.recallResult || {};
  const matches = recallResult.matches || diagnosis.similarIncidents || [];
  const topFix = diagnosis.previousSuccessfulFix;
  const isResolved = incident.status === 'RESOLVED';

  const copyLogs = () => {
    navigator.clipboard.writeText(incident.logs || incident.error);
    setCopiedLog(true);
    setTimeout(() => setCopiedLog(false), 2000);
  };

  const handleApplyRecommendation = () => {
    setAppliedAction("Applying recommendation: " + (diagnosis.suggestedResolutionAction || "Pool scale adjustment"));
    setTimeout(() => {
      onOpenResolve({
        rootCause: diagnosis.likelyCause || "Connection pool exhaustion",
        actionTaken: diagnosis.suggestedResolutionAction ? `${diagnosis.suggestedResolutionAction} applied per Incident Memory recommendation` : diagnosis.previousSuccessfulFix,
        resolutionAction: diagnosis.suggestedResolutionAction || "Increase connection pool"
      });
      setAppliedAction(null);
    }, 600);
  };

  return (
    <div style={{ margin: '0 24px 24px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Incident Header Card */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ flex: 1, minWidth: '320px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="mono-text" style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
              {incident.id}
            </span>
            <span className={`badge ${
              incident.severity === 'CRITICAL' ? 'badge-critical' :
              incident.severity === 'HIGH' ? 'badge-high' : 'badge-medium'
            }`}>
              {incident.severity} SEVERITY
            </span>
            <span style={{ fontSize: '0.8rem', color: '#38bdf8', background: 'rgba(56,189,248,0.1)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
              {incident.service}
            </span>
            {isResolved ? (
              <span className="badge badge-worked">
                <CheckCircle2 size={12} /> RESOLVED &amp; RETAINED
              </span>
            ) : (
              <span className="badge" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#fb7185', border: '1px solid rgba(244,63,94,0.35)' }}>
                <span className="live-indicator" style={{ width: '6px', height: '6px' }} /> LIVE INCIDENT
              </span>
            )}
          </div>
          <h1 style={{ fontSize: '1.45rem', color: '#f8fafc', fontWeight: 800 }}>
            {incident.title}
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '6px' }}>
            Reported at {new Date(incident.createdAt).toLocaleTimeString()} &bull; Context: {incident.additionalContext || 'Standard alert pipeline'}
          </p>
        </div>

        {/* Top Action Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            className="btn-secondary" 
            onClick={() => onReDiagnose(incident.id)}
            disabled={isDiagnosing}
            title="Re-run Hindsight search and reasoning engine"
          >
            <RotateCw size={15} className={isDiagnosing ? 'animate-spin' : ''} /> 
            {isDiagnosing ? 'Analyzing...' : 'Re-diagnose'}
          </button>
          
          {!isResolved && (
            <button 
              className="btn-emerald"
              onClick={() => onOpenResolve()}
            >
              <CheckCircle2 size={16} /> Mark as Resolved &amp; Retain
            </button>
          )}
        </div>
      </div>

      {/* Main 2-Column Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1.35fr', gap: '20px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: Ingestion Telemetry, Logs & Extracted Understanding */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Module 2: Extracted Understanding Card */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={17} color="#38bdf8" /> MODULE 2 — Incident Understanding
              </h3>
              <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', fontSize: '0.7rem' }}>
                STRUCTURED TELEMETRY
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Detected Error Type</span>
                <p className="mono-text" style={{ fontSize: '0.88rem', color: '#f43f5e', fontWeight: 600, marginTop: '2px' }}>
                  {understanding.errorType || 'MongoServerSelectionError'}
                </p>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Deployment Context</span>
                <p style={{ fontSize: '0.86rem', color: incident.recentDeployment ? '#fbbf24' : '#94a3b8', fontWeight: 600, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <GitBranch size={13} /> {incident.deploymentInfo || 'No recent deployment'}
                </p>
              </div>
            </div>

            {/* Extracted Symptoms */}
            <div style={{ marginBottom: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Extracted Symptoms:
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {(understanding.symptoms || [
                  "database connection timeout exceeding 30000ms",
                  "connection pool saturation (50/50 connections occupied)",
                  "high HTTP 500 error rate on checkout write endpoints"
                ]).map((sym, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#38bdf8' }} />
                    {sym}
                  </div>
                ))}
              </div>
            </div>

            {/* Candidate hypotheses before Hindsight */}
            <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '10px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Initial Hypotheses (Pre-Memory):
              </span>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
                {(understanding.candidateCauses || [
                  "Database unavailable", "Connection pool exhaustion", "Network configuration", "Credentials"
                ]).join(" • ")}
              </p>
            </div>
          </div>

          {/* Raw Error & Terminal Logs Viewer */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={17} color="#38bdf8" />
                <h3 style={{ fontSize: '0.95rem', color: '#f8fafc' }}>Production Diagnostic Logs</h3>
              </div>
              <button 
                onClick={copyLogs}
                className="btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              >
                {copiedLog ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                {copiedLog ? 'Copied' : 'Copy Logs'}
              </button>
            </div>

            <div style={{
              background: '#04070d',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: '#cbd5e1',
              maxHeight: '340px',
              overflowY: 'auto',
              lineHeight: 1.6
            }}>
              <div style={{ color: '#fb7185', fontWeight: 600, marginBottom: '6px' }}>
                [FATAL] {incident.error}
              </div>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: '#94a3b8' }}>
                {incident.logs || "No stack trace provided in incident ingestion payload."}
              </pre>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: 🧠 HINDSIGHT MEMORY RECALL & HISTORICAL REASONING (Star of the show!) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Historical Reasoning Synthesis Box */}
          <div className="glass-panel-violet" style={{ padding: '24px', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BrainCircuit size={18} color="#c084fc" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', fontWeight: 700 }}>
                    MODULE 4 — Historical LLM Reasoning
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#c084fc' }}>
                    Comparing current error + historical evidence + outcomes
                  </span>
                </div>
              </div>

              {/* Confidence Meter */}
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
                  Confidence
                </span>
                <span className={`badge ${diagnosis.confidence?.includes('HIGH') ? 'badge-worked' : 'badge-medium'}`} style={{ fontSize: '0.75rem' }}>
                  <Sparkles size={11} /> {diagnosis.confidence || 'HIGH'}
                </span>
              </div>
            </div>

            {/* Narrative synthesis */}
            <div style={{ background: 'rgba(0, 0, 0, 0.35)', border: '1px solid rgba(139, 92, 246, 0.25)', padding: '14px 16px', borderRadius: '10px', marginBottom: '18px' }}>
              <p style={{ fontSize: '0.86rem', color: '#e2e8f0', lineHeight: 1.55, margin: 0 }}>
                "{diagnosis.evidenceNarrative || `Two previous Payment API incidents produced the same MongoDB error. Both occurred after configuration/deployment changes. Incident #104 was caused by connection pool exhaustion and was successfully resolved by increasing the pool size.`}"
              </p>
            </div>

            {/* 4 Pillars of Recommendation */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
              
              {/* Likely Root Cause */}
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '12px 14px', borderRadius: '8px', borderLeft: '3px solid #38bdf8' }}>
                <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>
                  🔍 LIKELY ROOT CAUSE
                </div>
                <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>
                  {diagnosis.likelyCause || "Connection pool exhaustion"}
                </div>
              </div>

              {/* Recommended Investigation */}
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '12px 14px', borderRadius: '8px', borderLeft: '3px solid #fbbf24' }}>
                <div style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: 700, textTransform: 'uppercase' }}>
                  💡 RECOMMENDED INVESTIGATION
                </div>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '4px', whiteSpace: 'pre-line', lineHeight: 1.5 }}>
                  {diagnosis.recommendedInvestigation || "Check current MongoDB connection pool utilization in Grafana. Verify queued wait requests > 100."}
                </div>
              </div>

              {/* Previous Successful Fix */}
              <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '14px', borderRadius: '8px', borderLeft: '3px solid #10b981', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <div style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <ShieldCheck size={14} /> PREVIOUS SUCCESSFUL RESOLUTION
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f8fafc', marginTop: '4px' }}>
                  {topFix || "Increase connection pool from 50 → 100"}
                </div>
                <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '4px' }}>
                  Proven fix backed by institutional memory.
                </div>
              </div>

              {/* Caution Warnings / Anti-patterns */}
              {diagnosis.cautionWarnings && diagnosis.cautionWarnings.length > 0 && (
                <div style={{ background: 'rgba(244, 63, 94, 0.08)', padding: '12px 14px', borderRadius: '8px', borderLeft: '3px solid #f43f5e', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                  <div style={{ fontSize: '0.72rem', color: '#fb7185', fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <AlertTriangle size={13} /> KNOWN ANTI-PATTERN TO AVOID
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '4px' }}>
                    {diagnosis.cautionWarnings[0]}
                  </div>
                </div>
              )}
            </div>

            {/* Human in the loop action controls */}
            {!isResolved && (
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button 
                  className="btn-violet"
                  onClick={handleApplyRecommendation}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <Zap size={15} /> Apply Recommendation
                </button>

                <button 
                  className="btn-emerald"
                  onClick={() => onOpenResolve()}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <CheckCircle2 size={15} /> Mark as Resolved
                </button>

                <button 
                  className="btn-danger"
                  onClick={() => onOpenResolve({ outcome: 'FAILED' })}
                  style={{ padding: '9px 12px' }}
                  title="Record that this fix failed so Hindsight learns not to suggest it"
                >
                  <XCircle size={15} /> Fix Failed
                </button>
              </div>
            )}

            {isResolved && incident.resolvedFix && (
              <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 700, textTransform: 'uppercase' }}>
                    RESOLVED INCIDENT RECORD
                  </span>
                  <p style={{ fontSize: '0.85rem', color: '#f8fafc', margin: '2px 0 0 0' }}>
                    Action taken: {incident.resolvedFix}
                  </p>
                </div>
                <span className="badge badge-worked">RETAINED IN MEMORY</span>
              </div>
            )}
          </div>

          {/* MODULE 3: HINDSIGHT MEMORY RECALL EVIDENCE CARDS */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Search size={16} color="#c084fc" /> MODULE 3 — Hindsight Memory Retrieval
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Persistent incident repository: {matches.length} similar cases recalled
                </span>
              </div>
              <span className="badge badge-similarity">
                PERSISTENT MEMORY
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {matches.map((item, idx) => (
                <div 
                  key={item.id || idx}
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="mono-text" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                        #{item.id?.replace('INC-', '') || item.incidentNumber}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        {item.service || incident.service}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {/* Similarity Badge */}
                      <span className="badge badge-similarity" style={{ fontSize: '0.75rem' }}>
                        {item.similarity || 90}% SIMILARITY
                      </span>

                      {/* Outcome Badge */}
                      {item.outcome === 'WORKED' ? (
                        <span className="badge badge-worked" style={{ fontSize: '0.7rem' }}>
                          <CheckCircle2 size={11} /> WORKED
                        </span>
                      ) : (
                        <span className="badge badge-failed" style={{ fontSize: '0.7rem' }}>
                          <XCircle size={11} /> FAILED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Similarity Factors */}
                  {item.similarityFactors && item.similarityFactors.length > 0 && (
                    <div style={{ fontSize: '0.73rem', color: '#38bdf8', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {item.similarityFactors.map((f, i) => (
                        <span key={i} style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.8rem', marginTop: '2px' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Root Cause:</span>
                      <p style={{ color: '#f8fafc', fontWeight: 600, margin: '1px 0 0 0' }}>
                        {item.rootCause}
                      </p>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Resolution Applied:</span>
                      <p style={{ color: '#34d399', fontWeight: 600, margin: '1px 0 0 0' }}>
                        {item.resolution}
                      </p>
                    </div>
                  </div>

                  {item.lessonsLearned && (
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.03)', padding: '6px 10px', borderRadius: '6px', fontStyle: 'italic' }}>
                      💡 Lesson: {item.lessonsLearned}
                    </div>
                  )}
                </div>
              ))}

              {matches.length === 0 && (
                <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
                  <BrainCircuit size={28} color="#64748b" style={{ margin: '0 auto 8px auto', display: 'block' }} />
                  <p style={{ fontSize: '0.85rem' }}>No direct historical match found yet (Interaction #1: Cold Start).</p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Resolve this incident to train Hindsight memory for future automated diagnosis.</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
