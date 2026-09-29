# 🚨 Incident Memory Agent — Autonomous AI SRE with Hindsight

> **An AI SRE agent that learns from every production incident, remembers how similar incidents were solved, and uses that accumulated experience to diagnose and resolve future incidents faster.**

---

## 🏗️ Architecture & Core Workflow

```text
              INCIDENT OCCURS
                    │
                    ▼
             INGEST INCIDENT (Title, Service, Severity, Logs, Deployment)
                    │
                    ▼
             UNDERSTAND ERROR (Structured Telemetry, Symptoms, Hypotheses)
                    │
                    ▼
          ┌─────────────────────┐
          │  HINDSIGHT RECALL   │
          │                     │
          │ "Have we seen this  │
          │  before?"           │
          └──────────┬──────────┘
                     │
                     ▼
          RETRIEVE PAST EXPERIENCE (Similarity %, Past Fixes, Outcomes)
                     │
                     ▼
             HISTORICAL REASONING (Current error + History + Outcomes)
                     │
                     ▼
          ROOT CAUSE + EVIDENCE + RECOMMENDED FIX
                     │
                     ▼
             HUMAN-IN-THE-LOOP SRE (Review, Apply, or Reject)
                     │
                     ▼
              FIX APPLIED & OUTCOME CONFIRMED
                     │
                     ▼
          ┌─────────────────────┐
          │  HINDSIGHT RETAIN   │
          │                     │
          │ New experience      │
          │ becomes memory      │
          └──────────┬──────────┘
                     │
                     ▼
          NEXT INCIDENT IS SMARTER TO DIAGNOSE!
```

---

## 🧠 The 4 Memory Pillars of Hindsight (25% Judging Spotlight)

Unlike basic chatbots that only retain ephemeral chat messages, Hindsight preserves **Operational Production Experience**:

1. **Incident History**: Incident ID, Service, Severity, Error signature, Timestamp, Deployment context.
2. **Root Causes**: Taxonomy of failures (Connection pool exhaustion, Vault key drift, Consumer rebalance storms, Replica set elections).
3. **Solutions & Playbooks**: Concrete mitigations (Scale pool from 50 → 100, roll back secret, update consumer poll timeouts).
4. **Outcomes & Anti-Patterns**: Crucially records **which fixes WORKED ✅ vs which fixes FAILED ❌**. 
   *(e.g., Incident #099 records that blindly restarting pods without increasing pool size failed and crushed the MongoDB router).*

---

## ⚡ The 6 Operational Modules

| Module | Purpose | Features |
|---|---|---|
| **Module 1: Ingestion** | Ingest incident alerts | Title, Service, Severity, Error signature, Diagnostic Logs, Recent Deployment details, Additional Context. Includes quick presets for MongoDB, JWT, and Kafka. |
| **Module 2: Understanding** | Extract telemetry | Error classification (`MongoServerSelectionError`, `JsonWebTokenError`, etc.), symptoms extraction, pre-memory candidate hypotheses. |
| **Module 3: Hindsight Recall** | Semantic & Token Search | Hybrid similarity scoring (`#104: 94%`, `#152: 89%`), ranks past cases, retrieves proven fixes and anti-patterns. |
| **Module 4: Historical Reasoning** | SRE synthesis engine | Compares current error + environment + historical outcomes. Computes **Likely Root Cause**, **Evidence Base**, **Recommended Action**, and **Confidence**. |
| **Module 5: Human-in-the-Loop** | SRE control interface | "Apply Recommendation", "Mark as Resolved", "Fix Failed". Engineers stay in control. |
| **Module 6 & 7: Outcome Capture & Retain** | The Learning Loop | SRE records root cause, resolution action, outcome (`WORKED` / `FAILED` / `PARTIAL`), and prevention rules. Saves experience into Hindsight! |

---

## 🚀 60-Second Hackathon Demo Pitch

Judges can open the **Demo Story** modal via the top navbar button or click through manually:

- **0–10 sec (The Problem)**:
  > *"When production breaks, engineers don't just need an AI that understands the current error. They need an AI that remembers how their team solved similar incidents before."*
- **10–25 sec (Incident #1 — Cold Start)**:
  Ingest `INC-601` on Payment API. Agent performs generic investigation. Engineer increases pool from 50 → 100. Outcome saved into Hindsight.
- **25–40 sec (Incident #2 — Agent Remembers)**:
  A new incident `INC-602` occurs on Payment API during a flash sale. The Agent recognizes the failure mode: *"I have seen this before in #104 and #601 with 94% similarity!"* Instantly recommends the proven pool resize.
- **40–60 sec (Interaction #10+ — Institutional Knowledge)**:
  Hindsight aggregates patterns across Database, Auth, and Kafka services. Triage time drops from 45 minutes to under 60 seconds.

---

## 🛠️ Quick Start Guide

### Prerequisites
- Node.js v18+

### 1. Install Dependencies
```bash
npm.cmd run install:all
```
*(Or `cd backend && npm.cmd install` and `cd frontend && npm.cmd install`)*

### 2. Start Backend Service
```bash
npm.cmd run dev:backend
```
Backend runs on: `http://localhost:5000`

### 3. Start Frontend Dashboard
```bash
npm.cmd run dev:frontend
```
Frontend runs on: `http://localhost:5173`
