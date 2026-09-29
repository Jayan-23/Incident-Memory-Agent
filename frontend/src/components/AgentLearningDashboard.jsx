import React, { useState } from 'react';
import { 
  TrendingUp, 
  BrainCircuit, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Clock, 
  Cpu, 
  Activity,
  AlertTriangle
} from 'lucide-react';

export default function AgentLearningDashboard({ onRunDemoIncident }) {
  const [selectedInteraction, setSelectedInteraction] = useState(20);

  const interactions = [
    {
      step: 1,
      name: "Interaction #1 — Cold Start",
      subtitle: "Generic AI (0 Memories)",
      confidence: "61%",
      diagnosisTime: "42 mins",
      agentOutput: "Possible causes include network issues, database availability, authentication, or connection pool exhaustion.",
      evidence: "None (Cold Start). Agent suggests standard generic SRE runbook steps.",
      action: "Manual inspection of 5 different potential failure points.",
      learningFeedback: "Engineer manually investigates, discovers pool exhaustion, increases pool to 100, and retains experience in Hindsight."
    },
    {
      step: 2,
      name: "Interaction #2 — First Recall",
      subtitle: "Recognizes Precedent (1 Memory)",
      confidence: "74%",
      diagnosisTime: "18 mins",
      agentOutput: "Something similar happened in Incident #104. In that case, the Payment API had connection pool exhaustion resolved by expanding the pool.",
      evidence: "1 matching historical incident (#104 with 94% similarity).",
      action: "Check pool metrics first before debugging code.",
      learningFeedback: "Engineer verifies pool utilization, applies fix in half the time, and commits outcome."
    },
    {
      step: 10,
      name: "Interaction #10 — Pattern Convergence",
      subtitle: "Recurring Pattern Recognition (10+ Memories)",
      confidence: "82%",
      diagnosisTime: "8 mins",
      agentOutput: "Encountered this failure pattern 3 times following v2.x deployments. In each case, checkout concurrency spikes saturated the MongoDB connection pool.",
      evidence: "3 corroborating incidents + 1 known failed anti-pattern (Incident #099 hot restart failure).",
      action: "Direct pool scale to 100 and warns: DO NOT blindly restart pods without scaling pool.",
      learningFeedback: "Anti-pattern avoided. Team saved from catastrophic outage."
    },
    {
      step: 20,
      name: "Interaction #20+ — Institutional Knowledge",
      subtitle: "Experienced Enterprise AI (40+ Memories)",
      confidence: "87%",
      diagnosisTime: "4.2 mins",
      agentOutput: "I've encountered this pattern 4 times before. In 3 cases involving the Payment API, the root cause was connection pool exhaustion. The previous fix—raising the pool from 50 to 100—resolved two of those incidents. I recommend checking connection pool utilization before investigating network configuration.",
      evidence: "Deep organizational memory across Database, Auth, Gateway, and Deployment pipelines.",
      action: "Precise, evidence-backed remediation executed in under 5 minutes.",
      learningFeedback: "Institutional SRE knowledge preserved forever across engineering shifts."
    }
  ];

  const current = interactions.find(i => i.step === selectedInteraction) || interactions[3];

  return (
    <div style={{ margin: '0 24px 24px 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Hero: The Core Transformation */}
      <div className="glass-panel-violet" style={{ padding: '26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="badge badge-similarity" style={{ fontSize: '0.78rem', marginBottom: '8px' }}>
              <Sparkles size={13} style={{ marginRight: '4px' }} /> THE CORE VALUE PROPOSITION
            </span>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#f8fafc' }}>
              The Transformation: Generic AI → Experienced AI
            </h2>
            <p style={{ fontSize: '0.86rem', color: '#cbd5e1', marginTop: '4px', maxWidth: '800px' }}>
              A generic LLM gives a textbook list of 5 vague possibilities. The <strong>Incident Memory Agent</strong> leverages
              accumulated organizational experience to pinpoint the exact failure mode and proven resolution.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 18px', borderRadius: '10px', border: '1px solid rgba(244, 63, 94, 0.3)', textAlign: 'center' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fb7185', display: 'block' }}>42 mins</span>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>MTTR Before Memory</span>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 18px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.3)', textAlign: 'center' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399', display: 'block' }}>4.2 mins</span>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>MTTR After 20 Cases (10x)</span>
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Box */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
          
          {/* BEFORE MEMORY */}
          <div style={{
            background: 'rgba(244, 63, 94, 0.05)',
            border: '1px solid rgba(244, 63, 94, 0.25)',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fb7185', letterSpacing: '0.05em' }}>
                ❌ BEFORE MEMORY (INTERACTION #1)
              </span>
              <span className="badge" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#fb7185', fontSize: '0.7rem' }}>
                GENERIC AI
              </span>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Input Error:</span>
              <div className="mono-text" style={{ fontSize: '0.82rem', color: '#f8fafc', fontWeight: 600 }}>
                MongoServerSelectionError: Server selection timeout
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Agent Output:</span>
              <p style={{ fontSize: '0.88rem', color: '#e2e8f0', fontStyle: 'italic', marginTop: '4px', lineHeight: 1.5 }}>
                "Possible causes include network issues, database availability, authentication, or connection pool exhaustion."
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.78rem', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
              <div>Confidence: <strong style={{ color: '#fbbf24' }}>61%</strong></div>
              <div>Historical Evidence: <strong style={{ color: '#fb7185' }}>0 records</strong></div>
            </div>
          </div>

          {/* AFTER MEMORY */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.06)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#34d399', letterSpacing: '0.05em' }}>
                ✅ AFTER MEMORY (INTERACTION #20+)
              </span>
              <span className="badge badge-worked" style={{ fontSize: '0.7rem' }}>
                EXPERIENCED SRE AI
              </span>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Input Error:</span>
              <div className="mono-text" style={{ fontSize: '0.82rem', color: '#f8fafc', fontWeight: 600 }}>
                MongoServerSelectionError: Server selection timeout
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.72rem', color: '#34d399', textTransform: 'uppercase', fontWeight: 700 }}>Agent Output:</span>
              <p style={{ fontSize: '0.88rem', color: '#f8fafc', fontWeight: 500, marginTop: '4px', lineHeight: 1.5 }}>
                "I've encountered this pattern 4 times before. In 3 cases involving the Payment API, the root cause was connection pool exhaustion. The previous fix—raising the pool from 50 to 100—resolved two of those incidents. I recommend checking connection pool utilization before investigating network configuration."
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.78rem', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
              <div>Confidence: <strong style={{ color: '#34d399' }}>87% (High)</strong></div>
              <div>Historical Evidence: <strong style={{ color: '#38bdf8' }}>4 corroborating cases</strong></div>
            </div>
          </div>

        </div>
      </div>

      {/* The 4 Outputs Breakdown Card */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', color: '#f8fafc', fontWeight: 800, marginBottom: '6px' }}>
          The 4 Outputs Delivered on Every Incident
        </h3>
        <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '16px' }}>
          We don't just output an AI guess. We output evidence-backed diagnosis, actionable checks, and an automated learning feedback loop.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38bdf8', marginBottom: '6px' }}>
              1️⃣ DIAGNOSIS
            </div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600 }}>
              What is probably happening?
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '4px', margin: 0 }}>
              Likely root cause: <strong>Connection pool exhaustion</strong>
            </p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#c084fc', marginBottom: '6px' }}>
              2️⃣ EVIDENCE
            </div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600 }}>
              Why does the agent think that?
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '4px', margin: 0 }}>
              3 historical cases found; 2 had identical cause resolved with pool adjustments.
            </p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fbbf24', marginBottom: '6px' }}>
              3️⃣ ACTION
            </div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600 }}>
              What should the SRE do next?
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '4px', margin: 0 }}>
              1. Check pool metrics.<br/>
              2. Compare v2.4.1 config.<br/>
              3. Increase pool size to 100.
            </p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#34d399', marginBottom: '6px' }}>
              4️⃣ LEARNING
            </div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600 }}>
              What did we learn?
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '4px', margin: 0 }}>
              Root cause + resolution + outcome saved into Hindsight. Changes future incident diagnosis!
            </p>
          </div>

        </div>
      </div>

      {/* Concrete Agent Learning Metrics Dashboard (From Prompt Spec) */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#f8fafc', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} color="#34d399" /> AGENT LEARNING METRICS
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              Benchmark measurements compiled from simulated SRE incident runs
            </span>
          </div>
          <span className="badge badge-worked">VERIFIED DATASET</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Incidents Remembered</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', marginTop: '4px' }}>47</div>
            <span style={{ fontSize: '0.72rem', color: '#38bdf8' }}>Across 5 microservices</span>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Successful Resolutions</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>38</div>
            <span style={{ fontSize: '0.72rem', color: '#34d399' }}>Verified fixes on record</span>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Historical Matches</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#c084fc', marginTop: '4px' }}>31</div>
            <span style={{ fontSize: '0.72rem', color: '#c084fc' }}>High-similarity retrievals</span>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Recurring Patterns</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24', marginTop: '4px' }}>12</div>
            <span style={{ fontSize: '0.72rem', color: '#fbbf24' }}>Multi-cluster failure modes</span>
          </div>
        </div>

        {/* Confidence & Accuracy Comparison */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          
          <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
              Average Recommendation Confidence:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#fb7185', display: 'block' }}>Before memory:</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fb7185' }}>61%</span>
              </div>
              <ArrowRight size={20} color="#64748b" />
              <div>
                <span style={{ fontSize: '0.72rem', color: '#34d399', display: 'block' }}>After 20 incidents:</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34d399' }}>87%</span>
              </div>
            </div>
            <div style={{ marginTop: '10px', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '87%', height: '100%', background: 'linear-gradient(90deg, #fbbf24, #10b981)', borderRadius: '3px' }} />
            </div>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
              Successful Historical Recommendations:
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '12px' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399' }}>82%</span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>First-attempt resolution success rate</span>
            </div>
            <p style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '8px', margin: 0 }}>
              Engineers accepted and successfully resolved 82% of incidents using the recommended historical fix.
            </p>
          </div>

        </div>
      </div>

      {/* Interactive Progression Stepper: Interaction 1 → 2 → 10 → 20 */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', color: '#f8fafc', fontWeight: 800, marginBottom: '6px' }}>
          Interactive Learning Curve Stepper
        </h3>
        <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '16px' }}>
          Click through the interactions to see how the agent's diagnosis evolves as Hindsight accumulates production experience:
        </p>

        {/* Stepper Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
          {interactions.map(item => (
            <button
              key={item.step}
              onClick={() => setSelectedInteraction(item.step)}
              style={{
                background: selectedInteraction === item.step ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                border: selectedInteraction === item.step ? '1px solid #a855f7' : '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '12px',
                color: selectedInteraction === item.step ? '#ffffff' : '#94a3b8',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: selectedInteraction === item.step ? '#c084fc' : '#cbd5e1' }}>
                {item.name}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
                {item.subtitle}
              </div>
            </button>
          ))}
        </div>

        {/* Stepper Active Detail Card */}
        <div style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid var(--border-violet)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '1.05rem', color: '#f8fafc', fontWeight: 800 }}>
              {current.name} &bull; <span style={{ color: '#c084fc' }}>{current.subtitle}</span>
            </h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="badge badge-similarity">Confidence: {current.confidence}</span>
              <span className="badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>MTTR: {current.diagnosisTime}</span>
            </div>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Agent Output:</span>
            <p style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 500, marginTop: '4px', lineHeight: 1.5, background: 'rgba(255,255,255,0.02)', padding: '12px 14px', borderRadius: '8px', borderLeft: '3px solid #a855f7' }}>
              "{current.agentOutput}"
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.82rem' }}>
            <div>
              <span style={{ color: '#38bdf8', fontWeight: 700 }}>Evidence Retrieved:</span>
              <p style={{ color: '#cbd5e1', marginTop: '2px', margin: 0 }}>{current.evidence}</p>
            </div>
            <div>
              <span style={{ color: '#34d399', fontWeight: 700 }}>Learning Loop:</span>
              <p style={{ color: '#cbd5e1', marginTop: '2px', margin: 0 }}>{current.learningFeedback}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
