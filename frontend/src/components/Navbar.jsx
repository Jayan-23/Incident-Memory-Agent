import React from 'react';
import { ShieldAlert, BrainCircuit, PlayCircle, Plus, RotateCcw, Activity, FileText, TrendingUp } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenReport, onOpenDemo, onResetDemo, isResetting }) {
  return (
    <header className="glass-panel" style={{ margin: '16px 24px', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 50 }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #0284c7 0%, #7c3aed 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)'
        }}>
          <ShieldAlert size={24} color="#ffffff" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#f8fafc' }}>
              Incident Memory Agent
            </span>
            <span className="badge badge-similarity" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
              <BrainCircuit size={11} style={{ marginRight: '3px' }} /> HINDSIGHT ENGINE
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
            AI SRE that learns from every production incident &amp; recalls proven fixes
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav style={{ display: 'flex', gap: '6px', background: 'rgba(0, 0, 0, 0.25)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
        <button
          onClick={() => setActiveTab('dashboard')}
          className="btn-secondary"
          style={{
            border: 'none',
            background: activeTab === 'dashboard' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
            color: activeTab === 'dashboard' ? '#38bdf8' : '#94a3b8',
            fontWeight: activeTab === 'dashboard' ? 600 : 500,
            padding: '7px 12px',
            fontSize: '0.82rem'
          }}
        >
          <Activity size={15} /> Dashboard
        </button>

        <button
          onClick={() => setActiveTab('report')}
          className="btn-secondary"
          style={{
            border: 'none',
            background: activeTab === 'report' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
            color: activeTab === 'report' ? '#38bdf8' : '#94a3b8',
            fontWeight: activeTab === 'report' ? 700 : 500,
            padding: '7px 12px',
            fontSize: '0.82rem'
          }}
        >
          <FileText size={15} /> Target Output Report
        </button>

        <button
          onClick={() => setActiveTab('learning')}
          className="btn-secondary"
          style={{
            border: 'none',
            background: activeTab === 'learning' ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
            color: activeTab === 'learning' ? '#34d399' : '#94a3b8',
            fontWeight: activeTab === 'learning' ? 700 : 500,
            padding: '7px 12px',
            fontSize: '0.82rem'
          }}
        >
          <TrendingUp size={15} /> Before vs After Memory
        </button>

        <button
          onClick={() => setActiveTab('investigation')}
          className="btn-secondary"
          style={{
            border: 'none',
            background: activeTab === 'investigation' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
            color: activeTab === 'investigation' ? '#38bdf8' : '#94a3b8',
            fontWeight: activeTab === 'investigation' ? 600 : 500,
            padding: '7px 12px',
            fontSize: '0.82rem'
          }}
        >
          <ShieldAlert size={15} /> Incident Studio
        </button>

        <button
          onClick={() => setActiveTab('memory')}
          className="btn-secondary"
          style={{
            border: 'none',
            background: activeTab === 'memory' ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
            color: activeTab === 'memory' ? '#c084fc' : '#94a3b8',
            fontWeight: activeTab === 'memory' ? 600 : 500,
            padding: '7px 12px',
            fontSize: '0.82rem'
          }}
        >
          <BrainCircuit size={15} /> Hindsight Memory (25%)
        </button>
      </nav>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button 
          onClick={onOpenDemo}
          className="btn-violet"
          title="Step-by-step hackathon presentation story"
          style={{ padding: '8px 14px', fontSize: '0.82rem' }}
        >
          <PlayCircle size={15} /> 60s Demo Pitch
        </button>

        <button 
          onClick={onOpenReport}
          className="btn-primary"
          style={{ padding: '8px 14px', fontSize: '0.82rem' }}
        >
          <Plus size={15} /> Report Incident
        </button>

        <button 
          onClick={onResetDemo}
          className="btn-secondary"
          disabled={isResetting}
          title="Reset to clean baseline dataset"
          style={{ padding: '8px 10px' }}
        >
          <RotateCcw size={14} className={isResetting ? 'animate-spin' : ''} />
        </button>
      </div>
    </header>
  );
}
