import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, Clock, ArrowRight, BrainCircuit, Filter, Layers, Server } from 'lucide-react';

export default function IncidentList({ incidents, onSelectIncident, selectedIncidentId }) {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [serviceFilter, setServiceFilter] = useState('ALL');

  const filtered = incidents.filter(inc => {
    if (statusFilter === 'ACTIVE' && inc.status === 'RESOLVED') return false;
    if (statusFilter === 'RESOLVED' && inc.status !== 'RESOLVED') return false;
    if (serviceFilter !== 'ALL' && inc.service !== serviceFilter) return false;
    return true;
  });

  const services = Array.from(new Set(incidents.map(i => i.service)));

  return (
    <div className="glass-panel" style={{ margin: '0 24px 24px 24px', padding: '24px' }}>
      {/* Header & Filters */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={20} color="#38bdf8" /> Incident Management Queue
          </h2>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
            Select any incident to inspect its live logs, automated understanding, and Hindsight historical reasoning.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Status Filter */}
          <div style={{ display: 'flex', background: 'rgba(0, 0, 0, 0.3)', padding: '3px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => setStatusFilter('ALL')}
              style={{
                background: statusFilter === 'ALL' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                color: statusFilter === 'ALL' ? '#38bdf8' : '#94a3b8',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              All ({incidents.length})
            </button>
            <button
              onClick={() => setStatusFilter('ACTIVE')}
              style={{
                background: statusFilter === 'ACTIVE' ? 'rgba(244, 63, 94, 0.2)' : 'transparent',
                color: statusFilter === 'ACTIVE' ? '#fb7185' : '#94a3b8',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span className="live-indicator" style={{ width: '6px', height: '6px' }} /> Active
            </button>
            <button
              onClick={() => setStatusFilter('RESOLVED')}
              style={{
                background: statusFilter === 'RESOLVED' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                color: statusFilter === 'RESOLVED' ? '#34d399' : '#94a3b8',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Resolved
            </button>
          </div>

          {/* Service Filter */}
          <select
            value={serviceFilter}
            onChange={e => setServiceFilter(e.target.value)}
            style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem', background: 'rgba(0,0,0,0.3)' }}
          >
            <option value="ALL">All Services</option>
            {services.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Incident Cards / Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.map(inc => {
          const isSelected = inc.id === selectedIncidentId;
          const isResolved = inc.status === 'RESOLVED';
          const matchCount = inc.diagnosis?.similarIncidents?.length || inc.recallResult?.matches?.length || 0;

          return (
            <div
              key={inc.id}
              onClick={() => onSelectIncident(inc)}
              style={{
                background: isSelected ? 'rgba(56, 189, 248, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                gap: '20px'
              }}
              onMouseEnter={e => {
                if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={e => {
                if (!isSelected) e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
            >
              {/* Left: Info */}
              <div style={{ flex: 1, minWidth: '300px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span className="mono-text" style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                    {inc.id}
                  </span>
                  
                  {/* Severity Badge */}
                  <span className={`badge ${
                    inc.severity === 'CRITICAL' ? 'badge-critical' :
                    inc.severity === 'HIGH' ? 'badge-high' :
                    inc.severity === 'MEDIUM' ? 'badge-medium' : 'badge-low'
                  }`}>
                    {inc.severity}
                  </span>

                  {/* Service Badge */}
                  <span style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px' }}>
                    <Server size={12} color="#38bdf8" /> {inc.service}
                  </span>

                  {/* Status Indicator */}
                  {isResolved ? (
                    <span className="badge badge-worked" style={{ fontSize: '0.7rem' }}>
                      <CheckCircle2 size={11} /> RESOLVED
                    </span>
                  ) : (
                    <span className="badge" style={{ background: 'rgba(244, 63, 94, 0.12)', color: '#fb7185', border: '1px solid rgba(244,63,94,0.3)', fontSize: '0.7rem' }}>
                      <span className="live-indicator" style={{ width: '6px', height: '6px' }} /> INVESTIGATING
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '0.98rem', color: '#f8fafc', fontWeight: 600, marginBottom: '6px' }}>
                  {inc.title}
                </h3>

                <p className="mono-text" style={{ fontSize: '0.8rem', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '700px' }}>
                  {inc.error}
                </p>
              </div>

              {/* Middle: Hindsight Memory Badge */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: '220px' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(139, 92, 246, 0.12)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  padding: '6px 12px',
                  borderRadius: '8px'
                }}>
                  <BrainCircuit size={15} color="#c084fc" />
                  <span style={{ fontSize: '0.78rem', color: '#c084fc', fontWeight: 600 }}>
                    {matchCount > 0 
                      ? `${matchCount} Similar Historical Cases`
                      : 'Novel Incident (Interaction #1)'}
                  </span>
                </div>
                {inc.diagnosis?.likelyCause && (
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                    Likely: <strong style={{ color: '#f8fafc' }}>{inc.diagnosis.likelyCause}</strong>
                  </span>
                )}
              </div>

              {/* Right: CTA */}
              <div>
                <button
                  className={isSelected ? 'btn-primary' : 'btn-secondary'}
                  style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                >
                  Inspect Studio <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
            No incidents found matching current filter.
          </div>
        )}
      </div>
    </div>
  );
}
