import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  Search, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  History, 
  Cpu, 
  Wrench, 
  Target, 
  Sparkles,
  ArrowRight,
  Database,
  Filter
} from 'lucide-react';

export default function HindsightExplorer({ onInspectIncident }) {
  const [memories, setMemories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL'); // ALL, HISTORY, ROOT_CAUSES, SOLUTIONS, OUTCOMES
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive Simulator
  const [simService, setSimService] = useState('Payment API');
  const [simError, setSimError] = useState('MongoServerSelectionError: Server selection timeout');
  const [simResult, setSimResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const fetchMemories = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/memory');
      const data = await res.json();
      setMemories(data);
    } catch (err) {
      console.error('Failed to fetch memories:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  const runSimulation = async () => {
    try {
      setIsSimulating(true);
      const res = await fetch('/api/memory/recall', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: simService,
          error: simError,
          title: simError
        })
      });
      const data = await res.json();
      setSimResult(data);
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  // Filtered memory list
  const filteredMemories = memories.filter(m => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = m.id.toLowerCase().includes(q) ||
        m.service.toLowerCase().includes(q) ||
        m.errorType.toLowerCase().includes(q) ||
        m.rootCause.toLowerCase().includes(q) ||
        m.resolution.toLowerCase().includes(q) ||
        m.lessonsLearned.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (activeCategory === 'ROOT_CAUSES') return true;
    if (activeCategory === 'SOLUTIONS') return true;
    if (activeCategory === 'OUTCOMES') return true;
    return true;
  });

  // Calculate category aggregates
  const rootCauses = {};
  const solutions = {};
  const outcomes = { WORKED: 0, FAILED: 0, PARTIAL: 0 };

  memories.forEach(m => {
    rootCauses[m.rootCause] = (rootCauses[m.rootCause] || 0) + 1;
    solutions[m.resolutionAction || 'Mitigation'] = (solutions[m.resolutionAction || 'Mitigation'] || 0) + 1;
    if (outcomes[m.outcome] !== undefined) {
      outcomes[m.outcome]++;
    } else {
      outcomes[m.outcome] = 1;
    }
  });

  return (
    <div style={{ margin: '0 24px 24px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Hero Header spotlighting 25% Hindsight weight */}
      <div className="glass-panel-violet" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="badge badge-similarity" style={{ padding: '4px 12px', fontSize: '0.8rem' }}>
              <BrainCircuit size={14} style={{ marginRight: '4px' }} /> 25% JUDGING WEIGHT SPOTLIGHT
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Autonomous Experience Knowledge Base
            </span>
          </div>
          <h1 style={{ fontSize: '1.45rem', color: '#f8fafc', fontWeight: 800 }}>
            Hindsight Institutional Memory Engine
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '4px', maxWidth: '750px' }}>
            Unlike generic chatbots that only retain chat history, Hindsight retains <strong>Production Incident Experience</strong>:
            the error signatures, root cause taxonomy, solutions tested, and crucially, <em>which fixes worked vs which failed</em>.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 18px', borderRadius: '10px', border: '1px solid var(--border-violet)', textAlign: 'center' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c084fc', display: 'block', lineHeight: 1 }}>
              {memories.length}
            </span>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
              Retained Memories
            </span>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 18px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.3)', textAlign: 'center' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', display: 'block', lineHeight: 1 }}>
              {outcomes.WORKED}
            </span>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
              Verified Fixes
            </span>
          </div>
        </div>
      </div>

      {/* The 4 Core Memory Pillars (From Hackathon Specification) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        
        {/* Pillar 1 */}
        <div 
          onClick={() => setActiveCategory('HISTORY')}
          className="glass-panel" 
          style={{ 
            padding: '16px', 
            cursor: 'pointer',
            border: activeCategory === 'HISTORY' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
            background: activeCategory === 'HISTORY' ? 'rgba(56, 189, 248, 0.08)' : 'var(--bg-card)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <History size={16} color="#38bdf8" />
            <h4 style={{ fontSize: '0.85rem', color: '#f8fafc' }}>Memory 1: History</h4>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
            Incident ID, service, error signature, timestamp, and severity timeline.
          </p>
          <div style={{ marginTop: '10px', fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>
            {memories.length} Incident Profiles
          </div>
        </div>

        {/* Pillar 2 */}
        <div 
          onClick={() => setActiveCategory('ROOT_CAUSES')}
          className="glass-panel" 
          style={{ 
            padding: '16px', 
            cursor: 'pointer',
            border: activeCategory === 'ROOT_CAUSES' ? '1px solid var(--accent-amber)' : '1px solid var(--border-subtle)',
            background: activeCategory === 'ROOT_CAUSES' ? 'rgba(245, 158, 11, 0.08)' : 'var(--bg-card)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Cpu size={16} color="#fbbf24" />
            <h4 style={{ fontSize: '0.85rem', color: '#f8fafc' }}>Memory 2: Root Causes</h4>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
            Pool exhaustion, configuration errors, bad rollouts, credential drift.
          </p>
          <div style={{ marginTop: '10px', fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24' }}>
            {Object.keys(rootCauses).length} Root Cause Patterns
          </div>
        </div>

        {/* Pillar 3 */}
        <div 
          onClick={() => setActiveCategory('SOLUTIONS')}
          className="glass-panel" 
          style={{ 
            padding: '16px', 
            cursor: 'pointer',
            border: activeCategory === 'SOLUTIONS' ? '1px solid var(--accent-violet)' : '1px solid var(--border-subtle)',
            background: activeCategory === 'SOLUTIONS' ? 'rgba(139, 92, 246, 0.08)' : 'var(--bg-card)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Wrench size={16} color="#c084fc" />
            <h4 style={{ fontSize: '0.85rem', color: '#f8fafc' }}>Memory 3: Solutions</h4>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
            Scale connection pool, rollback deployment, update config, rotate keys.
          </p>
          <div style={{ marginTop: '10px', fontSize: '0.85rem', fontWeight: 700, color: '#c084fc' }}>
            {Object.keys(solutions).length} Action Playbooks
          </div>
        </div>

        {/* Pillar 4 */}
        <div 
          onClick={() => setActiveCategory('OUTCOMES')}
          className="glass-panel" 
          style={{ 
            padding: '16px', 
            cursor: 'pointer',
            border: activeCategory === 'OUTCOMES' ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
            background: activeCategory === 'OUTCOMES' ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-card)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Target size={16} color="#34d399" />
            <h4 style={{ fontSize: '0.85rem', color: '#f8fafc' }}>Memory 4: Outcomes</h4>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
            Critical distinction: Remembers which fix Worked vs Failed!
          </p>
          <div style={{ marginTop: '10px', fontSize: '0.85rem', fontWeight: 700, color: '#34d399' }}>
            {outcomes.WORKED} Worked &bull; {outcomes.FAILED} Failed
          </div>
        </div>

      </div>

      {/* Interactive Live Recall Simulator */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={17} color="#38bdf8" /> Interactive Hindsight Recall Playground
            </h3>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
              Test how Hindsight calculates similarity and recalls proven institutional playbooks for any query.
            </p>
          </div>
          <button 
            onClick={runSimulation}
            disabled={isSimulating}
            className="btn-primary"
            style={{ padding: '8px 16px' }}
          >
            <Search size={14} /> {isSimulating ? 'Searching Memories...' : 'Test Recall'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '14px', marginBottom: '14px' }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Service:
            </label>
            <select
              value={simService}
              onChange={e => setSimService(e.target.value)}
            >
              <option value="Payment API">Payment API</option>
              <option value="Auth Service">Auth Service</option>
              <option value="Checkout Service">Checkout Service</option>
              <option value="Order Processor">Order Processor</option>
              <option value="Search Service">Search Service</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Error Signature or Symptom Query:
            </label>
            <input
              type="text"
              value={simError}
              onChange={e => setSimError(e.target.value)}
              placeholder="e.g. MongoServerSelectionError or JsonWebTokenError"
            />
          </div>
        </div>

        {/* Quick query presets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>PRESETS:</span>
          <button 
            type="button" 
            className="btn-secondary" 
            style={{ padding: '3px 8px', fontSize: '0.72rem' }}
            onClick={() => {
              setSimService("Payment API");
              setSimError("MongoServerSelectionError: Server selection timeout after 30000ms");
            }}
          >
            MongoDB Pool Spike
          </button>
          <button 
            type="button" 
            className="btn-secondary" 
            style={{ padding: '3px 8px', fontSize: '0.72rem' }}
            onClick={() => {
              setSimService("Auth Service");
              setSimError("JsonWebTokenError: invalid signature on secret rotation");
            }}
          >
            JWT Secret Rotation
          </button>
          <button 
            type="button" 
            className="btn-secondary" 
            style={{ padding: '3px 8px', fontSize: '0.72rem' }}
            onClick={() => {
              setSimService("Order Processor");
              setSimError("KafkaConsumerRebalanceError: max poll interval exceeded");
            }}
          >
            Kafka Rebalance Lag
          </button>
        </div>

        {/* Simulation Output Card */}
        {simResult && (
          <div style={{ background: 'rgba(0, 0, 0, 0.4)', borderRadius: '10px', border: '1px solid var(--border-glow)', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700 }}>
                HINDSIGHT SEARCH RESULT ({simResult.matches?.length || 0} MATCHES FOUND)
              </span>
              <span className="badge badge-similarity">
                SEARCHED {simResult.querySummary?.totalMemoryEntriesSearched} RECORDS
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              {simResult.matches?.map((m, idx) => (
                <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span className="mono-text" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>
                      {m.id} &bull; {m.service}
                    </span>
                    <span className="badge badge-similarity" style={{ fontSize: '0.72rem' }}>
                      {m.similarity}% MATCH
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#fbbf24', fontWeight: 600 }}>
                    Cause: {m.rootCause}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#34d399', marginTop: '4px' }}>
                    Fix: {m.resolution}
                  </div>
                  <div style={{ marginTop: '6px' }}>
                    {m.outcome === 'WORKED' ? (
                      <span className="badge badge-worked" style={{ fontSize: '0.65rem' }}>WORKED</span>
                    ) : (
                      <span className="badge badge-failed" style={{ fontSize: '0.65rem' }}>FAILED</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Memory Catalog Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={16} color="#c084fc" /> Persistent Experience Catalog
            </h3>
            <span style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
              Showing {filteredMemories.length} historical experiences retained in Hindsight
            </span>
          </div>

          <div style={{ width: '280px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search memories, root causes, fixes..."
              style={{ padding: '8px 12px', fontSize: '0.82rem' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredMemories.map(mem => (
            <div 
              key={mem.id}
              style={{
                background: 'rgba(0, 0, 0, 0.25)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '14px 16px',
                display: 'grid',
                gridTemplateColumns: '100px 140px 1.5fr 1.5fr 100px',
                gap: '14px',
                alignItems: 'center'
              }}
            >
              <div>
                <span className="mono-text" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>
                  {mem.id}
                </span>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>
                  {new Date(mem.timestamp).toLocaleDateString()}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 600 }}>
                  {mem.service}
                </span>
                <span className="mono-text" style={{ fontSize: '0.72rem', color: '#fb7185', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {mem.errorType}
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Root Cause:</span>
                <div style={{ fontSize: '0.82rem', color: '#f8fafc', fontWeight: 600 }}>
                  {mem.rootCause}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                  {mem.rootCauseCategory}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Resolution / Outcome:</span>
                <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                  {mem.resolution}
                </div>
                {mem.lessonsLearned && (
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontStyle: 'italic', marginTop: '2px' }}>
                    💡 {mem.lessonsLearned}
                  </div>
                )}
              </div>

              <div style={{ textAlign: 'right' }}>
                {mem.outcome === 'WORKED' ? (
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
          ))}
        </div>
      </div>

    </div>
  );
}
