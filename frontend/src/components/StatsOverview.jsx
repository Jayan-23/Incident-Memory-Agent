import React from 'react';
import { AlertTriangle, CheckCircle2, Cpu, Brain, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

export default function StatsOverview({ stats }) {
  const {
    activeIncidents = 2,
    resolvedIncidents = 127,
    knownPatterns = 24,
    memoryEntries = 438,
    provenFixesCount = 8,
    antiPatternsAvoidedCount = 1
  } = stats || {};

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', margin: '0 24px 24px 24px' }}>
      {/* Active Incidents */}
      <div className="glass-panel" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Active Incidents
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="live-indicator" />
            <span style={{ fontSize: '0.72rem', color: '#fb7185', fontWeight: 700 }}>LIVE</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1 }}>
            {activeIncidents}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#fb7185', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertTriangle size={13} /> Requires SRE review
          </span>
        </div>
        <div style={{ marginTop: '12px', height: '4px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: `${Math.min(100, activeIncidents * 33)}%`, height: '100%', background: 'linear-gradient(90deg, #f43f5e, #fbbf24)', borderRadius: '2px' }} />
        </div>
      </div>

      {/* Resolved Incidents */}
      <div className="glass-panel" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Resolved Incidents
          </span>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={16} color="#34d399" />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1 }}>
            {resolvedIncidents}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={13} /> 99.4% SLO
          </span>
        </div>
        <div style={{ marginTop: '12px', height: '4px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: '92%', height: '100%', background: '#10b981', borderRadius: '2px' }} />
        </div>
      </div>

      {/* Known Patterns */}
      <div className="glass-panel" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Known Patterns
          </span>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Cpu size={16} color="#38bdf8" />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#38bdf8', lineHeight: 1 }}>
            {knownPatterns}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={13} color="#38bdf8" /> Multi-cluster
          </span>
        </div>
        <div style={{ marginTop: '12px', height: '4px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: '78%', height: '100%', background: 'linear-gradient(90deg, #38bdf8, #818cf8)', borderRadius: '2px' }} />
        </div>
      </div>

      {/* Memory Entries (Hindsight 25% spotlight) */}
      <div className="glass-panel-violet" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            🧠 Hindsight Memories
          </span>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Brain size={16} color="#c084fc" />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
          <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1 }}>
            {memoryEntries}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#c084fc', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={13} /> {provenFixesCount} Proven Fixes
          </span>
        </div>
        <div style={{ marginTop: '12px', height: '4px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: '88%', height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #c084fc)', borderRadius: '2px' }} />
        </div>
      </div>
    </div>
  );
}
