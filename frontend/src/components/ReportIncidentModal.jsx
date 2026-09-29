import React, { useState } from 'react';
import { X, ShieldAlert, Sparkles, Send, FileText, GitBranch, Server } from 'lucide-react';

export default function ReportIncidentModal({ isOpen, onClose, onSubmit, isSubmitting }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState("Payment API MongoServerSelectionError");
  const [service, setService] = useState("Payment API");
  const [severity, setSeverity] = useState("HIGH");
  const [error, setError] = useState("MongoServerSelectionError: Server selection timeout after 30000ms");
  const [logs, setLogs] = useState(`2026-09-29T16:04:12.112Z [ERROR] [PaymentService] MongoServerSelectionError: Server selection timeout after 30000ms
  at Timeout._onTimeout (/app/node_modules/mongodb/lib/sdam/topology.js:298:38)
2026-09-29T16:04:13.402Z [WARN] [ConnectionPool] Pool size: 50/50 in use. Queued wait requests: 142. Max wait timeout exceeded.
2026-09-29T16:04:14.004Z [ERROR] [HTTP] POST /v1/payments/charge returned 500 Internal Server Error`);
  const [recentDeployment, setRecentDeployment] = useState(true);
  const [deploymentInfo, setDeploymentInfo] = useState("v2.4.1 deployment (concurrency bump)");
  const [additionalContext, setAdditionalContext] = useState("Started after deployment v2.4.1. Traffic spike observed on payment gateway.");

  const applyPreset = (presetType) => {
    if (presetType === 'MONGO') {
      setTitle("Payment API MongoServerSelectionError");
      setService("Payment API");
      setSeverity("HIGH");
      setError("MongoServerSelectionError: Server selection timeout after 30000ms");
      setLogs(`2026-09-29T16:04:12.112Z [ERROR] MongoServerSelectionError: Server selection timeout after 30000ms
2026-09-29T16:04:13.402Z [WARN] Pool size: 50/50 in use. Queued wait requests: 142. Max wait timeout exceeded.
2026-09-29T16:04:14.004Z [ERROR] POST /v1/payments/charge returned 500`);
      setRecentDeployment(true);
      setDeploymentInfo("v2.4.1 deployment");
      setAdditionalContext("Started immediately after deployment v2.4.1.");
    } else if (presetType === 'AUTH') {
      setTitle("Auth Service JWT Signature Verification Failure");
      setService("Auth Service");
      setSeverity("CRITICAL");
      setError("JsonWebTokenError: invalid signature on customer authentication");
      setLogs(`2026-09-29T15:40:02.019Z [ERROR] JsonWebTokenError: invalid signature
  at authenticateToken (/app/src/middlewares/auth.js:44:8)
2026-09-29T15:40:03.110Z [WARN] [VaultClient] Secret refreshed from production/jwt-keys v4`);
      setRecentDeployment(true);
      setDeploymentInfo("v1.9.0 secret rotation deployment");
      setAdditionalContext("Vault key auto-rotation triggered. Mobile clients failing.");
    } else if (presetType === 'KAFKA') {
      setTitle("Order Processor Kafka consumer group rebalance lag");
      setService("Order Processor");
      setSeverity("HIGH");
      setError("CommitFailedException: Consumer group rebalance in progress");
      setLogs(`2026-09-29T14:30:10Z [ERROR] CommitFailedException: max poll interval exceeded
2026-09-29T14:30:11Z [WARN] Consumer lag spiked to 240,000 messages in orders-stream topic`);
      setRecentDeployment(true);
      setDeploymentInfo("v2.0.4 with new PDF generation module");
      setAdditionalContext("Synchronous invoice generator blocking poll loop.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      service,
      severity,
      error,
      logs,
      recentDeployment,
      deploymentInfo,
      additionalContext
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel" 
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          padding: '28px',
          borderRadius: '16px',
          maxHeight: '92vh',
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(2, 132, 199, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldAlert size={20} color="#38bdf8" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', color: '#f8fafc', fontWeight: 800 }}>
                Report Production Incident
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#38bdf8' }}>
                MODULE 1 — Incident Ingestion &amp; Automated Pipeline
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

        {/* Quick Presets */}
        <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '10px 14px', borderRadius: '8px', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>DEMO PRESETS:</span>
          <button 
            type="button" 
            className="btn-secondary" 
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            onClick={() => applyPreset('MONGO')}
          >
            MongoDB Pool (Payment API)
          </button>
          <button 
            type="button" 
            className="btn-secondary" 
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            onClick={() => applyPreset('AUTH')}
          >
            JWT Secret Drift (Auth)
          </button>
          <button 
            type="button" 
            className="btn-secondary" 
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            onClick={() => applyPreset('KAFKA')}
          >
            Kafka Rebalance (Orders)
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* Incident Title */}
          <div>
            <label style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Incident Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Payment API MongoServerSelectionError"
              required
            />
          </div>

          {/* Service & Severity */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Affected Service:
              </label>
              <select
                value={service}
                onChange={e => setService(e.target.value)}
              >
                <option value="Payment API">Payment API</option>
                <option value="Auth Service">Auth Service</option>
                <option value="Checkout Service">Checkout Service</option>
                <option value="Order Processor">Order Processor</option>
                <option value="Search Service">Search Service</option>
                <option value="Notification Worker">Notification Worker</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Severity Level:
              </label>
              <select
                value={severity}
                onChange={e => setSeverity(e.target.value)}
              >
                <option value="CRITICAL">CRITICAL (P1)</option>
                <option value="HIGH">HIGH (P2)</option>
                <option value="MEDIUM">MEDIUM (P3)</option>
                <option value="LOW">LOW (P4)</option>
              </select>
            </div>
          </div>

          {/* Error Message */}
          <div>
            <label style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Primary Error / Exception Signature:
            </label>
            <input
              type="text"
              value={error}
              onChange={e => setError(e.target.value)}
              placeholder="e.g. MongoServerSelectionError: Server selection timeout"
              required
            />
          </div>

          {/* Production Diagnostic Logs */}
          <div>
            <label style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Diagnostic Logs &amp; Stack Trace:
            </label>
            <textarea
              rows={4}
              value={logs}
              onChange={e => setLogs(e.target.value)}
              placeholder="Paste relevant error logs here..."
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}
            />
          </div>

          {/* Deployment info */}
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '12px', alignItems: 'center' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Recent Deploy:
              </label>
              <select
                value={recentDeployment ? 'YES' : 'NO'}
                onChange={e => setRecentDeployment(e.target.value === 'YES')}
              >
                <option value="YES">Yes</option>
                <option value="NO">No</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Deployment / Version Details:
              </label>
              <input
                type="text"
                value={deploymentInfo}
                onChange={e => setDeploymentInfo(e.target.value)}
                placeholder="e.g. v2.4.1 deployed 20 minutes ago"
              />
            </div>
          </div>

          {/* Additional context */}
          <div>
            <label style={{ fontSize: '0.8rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Additional Context:
            </label>
            <input
              type="text"
              value={additionalContext}
              onChange={e => setAdditionalContext(e.target.value)}
              placeholder="e.g. Started after deployment v2.4.1. Traffic spike observed."
            />
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
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
              className="btn-primary"
              style={{ flex: 2, justifyContent: 'center', fontSize: '0.94rem', padding: '12px' }}
            >
              <Sparkles size={16} /> {isSubmitting ? 'Analyzing Incident...' : 'ANALYZE INCIDENT WITH HINDSIGHT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
