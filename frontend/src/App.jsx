import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsOverview from './components/StatsOverview';
import IncidentList from './components/IncidentList';
import IncidentInvestigation from './components/IncidentInvestigation';
import IncidentIntelligenceReport from './components/IncidentIntelligenceReport';
import AgentLearningDashboard from './components/AgentLearningDashboard';
import HindsightExplorer from './components/HindsightExplorer';
import ReportIncidentModal from './components/ReportIncidentModal';
import OutcomeCaptureModal from './components/OutcomeCaptureModal';
import DemoStoryModal from './components/DemoStoryModal';
import { ShieldAlert, BrainCircuit, Sparkles, Activity, FileText, TrendingUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('report'); // Default to 'report' (Target Output) or 'dashboard'
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isResolveOpen, setIsResolveOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [resolveInitialData, setResolveInitialData] = useState({});

  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchData = async () => {
    try {
      const [incRes, statsRes] = await Promise.all([
        fetch('/api/incidents'),
        fetch('/api/stats')
      ]);
      const incData = await incRes.json();
      const statsData = await statsRes.json();
      
      setIncidents(incData);
      setStats(statsData);

      // Default select INC-501 or first incident
      if (!selectedIncident && incData.length > 0) {
        setSelectedIncident(incData[0]);
      } else if (selectedIncident) {
        const updated = incData.find(i => i.id === selectedIncident.id);
        if (updated) setSelectedIncident(updated);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectIncident = (inc) => {
    setSelectedIncident(inc);
    setActiveTab('report');
  };

  const handleReportSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const res = await fetch('/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newInc = await res.json();
      
      setIsReportOpen(false);
      await fetchData();
      setSelectedIncident(newInc);
      setActiveTab('report');
      showToast(`🚨 Incident ${newInc.id} ingested & auto-diagnosed with Hindsight memory!`);
    } catch (err) {
      console.error('Failed to report incident:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenResolve = (customData = {}) => {
    setResolveInitialData(customData);
    setIsResolveOpen(true);
  };

  const handleResolveSubmit = async (resolvePayload) => {
    if (!selectedIncident) return;
    try {
      setIsSubmitting(true);
      const res = await fetch(`/api/incidents/${selectedIncident.id}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resolvePayload)
      });
      const result = await res.json();

      setIsResolveOpen(false);
      await fetchData();
      setSelectedIncident(result.incident);
      showToast(`🧠 Experience retained! Hindsight now contains ${result.totalMemoriesNow} memories.`);
    } catch (err) {
      console.error('Failed to resolve incident:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReDiagnose = async (incidentId) => {
    try {
      setIsDiagnosing(true);
      const res = await fetch(`/api/incidents/${incidentId}/diagnose`, {
        method: 'POST'
      });
      const data = await res.json();
      setSelectedIncident(data.incident);
      await fetchData();
      showToast('🧠 Re-scanned Hindsight persistent memory and updated reasoning.');
    } catch (err) {
      console.error('Failed to re-diagnose:', err);
    } finally {
      setIsDiagnosing(false);
    }
  };

  const handleResetDemo = async () => {
    try {
      setIsResetting(true);
      await fetch('/api/demo/reset', { method: 'POST' });
      await fetchData();
      showToast('🔄 Demo environment successfully reset to seed baseline.');
    } catch (err) {
      console.error('Failed to reset demo:', err);
    } finally {
      setIsResetting(false);
    }
  };

  const handleDemoStepExecuted = async (stepData) => {
    await fetchData();
    if (stepData.incident) {
      setSelectedIncident(stepData.incident);
      setActiveTab('report');
    } else if (stepData.step === 3) {
      setActiveTab('learning');
    }
    showToast(`🚀 ${stepData.name} executed successfully!`);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '24px',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid #38bdf8',
          boxShadow: '0 0 25px rgba(56, 189, 248, 0.3)',
          color: '#f8fafc',
          padding: '12px 20px',
          borderRadius: '10px',
          zIndex: 9999,
          fontSize: '0.85rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backdropFilter: 'blur(10px)',
          animation: 'fade-in 0.3s ease'
        }}>
          <Sparkles size={16} color="#38bdf8" />
          {toastMessage}
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenDemo={() => setIsDemoOpen(true)}
        onResetDemo={handleResetDemo}
        isResetting={isResetting}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, paddingBottom: '30px' }}>
        
        {/* TAB 1: Target Output Report */}
        {activeTab === 'report' && (
          <div style={{ padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <span className="badge badge-similarity" style={{ fontSize: '0.78rem' }}>
                🎯 TARGET DELIVERABLE OUTPUT
              </span>
              <p style={{ fontSize: '0.84rem', color: '#94a3b8', marginTop: '6px' }}>
                When an engineer submits an incident, our agent produces this exact evidence-backed intelligence report:
              </p>
            </div>
            
            <IncidentIntelligenceReport
              incident={selectedIncident}
              onSaveExperience={handleResolveSubmit}
              onFixFeedback={(type) => {
                showToast(type === 'WORKED' ? '✅ Fix worked! Saving to Hindsight.' : '❌ Fix failed! Recorded as anti-pattern.');
              }}
            />
          </div>
        )}

        {/* TAB 2: Before vs After Memory & Agent Learning */}
        {activeTab === 'learning' && (
          <AgentLearningDashboard />
        )}

        {/* TAB 3: Command Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <StatsOverview stats={stats} />
            <IncidentList
              incidents={incidents}
              onSelectIncident={handleSelectIncident}
              selectedIncidentId={selectedIncident?.id}
            />
          </div>
        )}

        {/* TAB 4: Incident Studio (Deep Dive Logs & Signals) */}
        {activeTab === 'investigation' && (
          <IncidentInvestigation
            incident={selectedIncident}
            onOpenResolve={handleOpenResolve}
            onReDiagnose={handleReDiagnose}
            isDiagnosing={isDiagnosing}
          />
        )}

        {/* TAB 5: Hindsight Memory Explorer (25% Weight Spotlight) */}
        {activeTab === 'memory' && (
          <HindsightExplorer
            onInspectIncident={handleSelectIncident}
          />
        )}
      </main>

      {/* Modals */}
      <ReportIncidentModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onSubmit={handleReportSubmit}
        isSubmitting={isSubmitting}
      />

      <OutcomeCaptureModal
        isOpen={isResolveOpen}
        onClose={() => setIsResolveOpen(false)}
        incident={selectedIncident}
        initialData={resolveInitialData}
        onSubmit={handleResolveSubmit}
        isSubmitting={isSubmitting}
      />

      <DemoStoryModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onStepExecuted={handleDemoStepExecuted}
      />

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '16px 24px', textAlign: 'center', fontSize: '0.78rem', color: '#64748b' }}>
        <span>🚨 <strong>Incident Memory Agent</strong> &bull; Powered by Hindsight Persistent SRE Experience &bull; Hack with Hyderabad 2026</span>
      </footer>
    </div>
  );
}
