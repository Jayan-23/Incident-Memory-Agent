import React, { useState } from 'react';
import { X, PlayCircle, ArrowRight, BrainCircuit, CheckCircle2, Sparkles, Clock, Target, Layers, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DemoStoryModal({ isOpen, onClose, onStepExecuted }) {
  if (!isOpen) return null;

  const [currentStep, setCurrentStep] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [stepData, setStepData] = useState(null);

  const steps = [
    {
      num: 1,
      title: "Step 1: Incident #1 — Novel Failure & Cold Start",
      time: "0:10 - 0:25",
      description: "Payment API encounters MongoServerSelectionError on v2.4.1. Hindsight has no direct record for this exact case yet. Agent performs structured understanding and guides generic triage. Engineer resolves by increasing pool from 50 → 100, then commits experience to Hindsight.",
      btnText: "Run Step 1 (Trigger Incident #1)"
    },
    {
      num: 2,
      title: "Step 2: Incident #2 — Agent Remembers & Recalls Proven Fix",
      time: "0:25 - 0:45",
      description: "A flash sale triggers another MongoServerSelectionError. This time, the Agent immediately says: 'I have seen this before!' Hindsight retrieves Incident #104 and #601 with 94% similarity, points to Connection Pool Exhaustion, and recommends the proven fix in <60 seconds!",
      btnText: "Run Step 2 (Trigger Incident #2 & Recall)"
    },
    {
      num: 3,
      title: "Step 3: Interaction #10+ — Institutional Knowledge",
      time: "0:45 - 1:00",
      description: "As the team resolves more incidents, Hindsight forms an enterprise knowledge base across Database, Auth, Gateway, and Kafka services. The agent synthesizes multiple historical experiences and warns against known failed anti-patterns.",
      btnText: "Run Step 3 (View Institutional Knowledge)"
    }
  ];

  const handleExecute = async (stepNum) => {
    try {
      setIsRunning(true);
      const res = await fetch(`/api/demo/step/${stepNum}`, { method: 'POST' });
      const data = await res.json();
      setStepData(data);
      setCurrentStep(stepNum);

      if (stepNum === 2) {
        confetti({ particleCount: 70, spread: 60 });
      }

      if (onStepExecuted) {
        onStepExecuted(data);
      }
    } catch (err) {
      console.error('Demo step failed:', err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel-violet"
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '750px',
          padding: '28px',
          borderRadius: '16px',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #7c3aed, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PlayCircle size={22} color="#ffffff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', color: '#f8fafc', fontWeight: 800 }}>
                60-Second Hackathon Demo Pitch
              </h2>
              <span style={{ fontSize: '0.76rem', color: '#c084fc', fontWeight: 600 }}>
                "This isn't an AI that remembers conversations. It's an AI that remembers experience."
              </span>
            </div>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '6px', borderRadius: '50%' }}>
            <X size={18} />
          </button>
        </div>

        {/* Story Intro Pitch Quote */}
        <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-violet)', borderRadius: '10px', padding: '14px 18px', marginBottom: '20px' }}>
          <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>
            "When production breaks, engineers don't just need an AI that understands the current error. They need an AI that remembers how their team solved similar incidents before."
          </p>
        </div>

        {/* 3 Step Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
          {steps.map(step => (
            <div
              key={step.num}
              style={{
                background: currentStep === step.num ? 'rgba(139, 92, 246, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                border: currentStep === step.num ? '1px solid #a855f7' : '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '16px 20px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-similarity" style={{ fontSize: '0.72rem' }}>
                    {step.time}
                  </span>
                  <h4 style={{ fontSize: '0.98rem', color: '#f8fafc', fontWeight: 700 }}>
                    {step.title}
                  </h4>
                </div>
                {currentStep === step.num && (
                  <span className="badge badge-worked" style={{ fontSize: '0.68rem' }}>
                    CURRENT FOCUS
                  </span>
                )}
              </div>

              <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '12px' }}>
                {step.description}
              </p>

              <button
                className={currentStep === step.num ? 'btn-violet' : 'btn-secondary'}
                onClick={() => handleExecute(step.num)}
                disabled={isRunning}
                style={{ padding: '8px 16px', fontSize: '0.82rem' }}
              >
                <Sparkles size={14} /> {isRunning && currentStep === step.num ? 'Executing...' : step.btnText}
              </button>
            </div>
          ))}
        </div>

        {/* Step Response Narrative Box */}
        {stepData && (
          <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px', padding: '14px 18px', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 700, textTransform: 'uppercase' }}>
              ✓ LIVE ACTION RESULT: {stepData.name}
            </span>
            <p style={{ fontSize: '0.86rem', color: '#f8fafc', marginTop: '4px', margin: 0 }}>
              {stepData.narrative}
            </p>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={onClose}>
            Close Demo Guide
          </button>
        </div>
      </div>
    </div>
  );
}
