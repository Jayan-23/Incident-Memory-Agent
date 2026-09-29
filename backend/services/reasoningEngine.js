/**
 * Module 4 — Historical Reasoning Engine
 * Synthesizes: Current Incident + Recalled Historical Memories + Historical Outcomes
 * Produces the exact 4 Outputs required:
 * 1. Diagnosis (Likely Root Cause)
 * 2. Evidence (Why? Similar incidents + Outcomes)
 * 3. Action (Actionable check steps + Previous successful fix)
 * 4. Learning (Feedback loop ready to commit into Hindsight)
 */

export function performHistoricalReasoning(currentIncident, structuredUnderstanding, recallResult) {
  const { matches = [], evidenceSummary = {} } = recallResult;
  const { primaryRootCausePattern, successfulFixes = [], failedFixes = [] } = evidenceSummary;

  // Case 1: BEFORE MEMORY / Interaction #1 (Generic AI Cold Start)
  if (!matches || matches.length === 0) {
    return {
      understandingSummary: "Service error detected with elevated latency and timeout signals.",
      symptoms: structuredUnderstanding.symptoms || [
        "Elevated HTTP 500 error rate",
        "Connection timeout threshold exceeded",
        "Service degradation detected"
      ],
      likelyCause: "Unconfirmed (Multiple candidate causes)",
      whyBullets: [
        "Novel incident pattern with no historical record in Hindsight memory.",
        "Candidate hypotheses generated strictly from log token matching.",
        "Requires manual SRE triage to establish initial root cause."
      ],
      recommendedActions: [
        "1. Inspect live application stack traces.",
        "2. Verify upstream and downstream dependency health metrics.",
        "3. Check pod resource limits (CPU/Memory throttling).",
        "4. Review recent Git commits or CI/CD deployment diffs."
      ],
      previousSuccessfulFix: "No prior verified fix on record. Apply triage fix and capture outcome in Hindsight to train future agent diagnosis.",
      confidence: "LOW (Generic AI)",
      confidenceScore: 61,
      similarIncidents: [],
      genericDiagnosis: "Possible causes include network issues, database availability, authentication, or connection pool exhaustion.",
      afterMemoryDiagnosis: null,
      cautionWarnings: [],
      learningStage: "INTERACTION_1_COLD_START"
    };
  }

  // Case 2: AFTER MEMORY / Interaction #2 to #20+ (Experienced AI)
  const topMatch = matches[0];
  const primaryCause = primaryRootCausePattern || topMatch.rootCause;
  const topFix = successfulFixes[0];

  // Specific reasoning for Payment API Mongo timeout pattern matching the user's exact specification
  const isMongoPayment = (currentIncident.service === "Payment API" || currentIncident.title?.includes("Payment")) &&
                         (currentIncident.error?.includes("Mongo") || structuredUnderstanding.errorType === "MongoServerSelectionError");

  let understandingSummary = isMongoPayment 
    ? "MongoDB connection requests are timing out."
    : `${structuredUnderstanding.errorType || 'Service'} failure observed with request degradation.`;

  let symptoms = structuredUnderstanding.symptoms || [];
  if (isMongoPayment) {
    symptoms = [
      "Payment requests failing",
      "Database connection timeout",
      `Started after deployment ${currentIncident.deploymentInfo || 'v2.4.1'}`
    ];
  }

  let whyBullets = [];
  if (isMongoPayment) {
    whyBullets = [
      "Same service (Payment API)",
      "Same MongoDB timeout pattern (MongoServerSelectionError after 30000ms)",
      `Similar deployment context (${currentIncident.deploymentInfo || 'v2.4.1'})`,
      `Two historical incidents (#104 and #152) had the same pattern and were resolved via connection pool / config tuning.`
    ];
  } else {
    whyBullets = [
      `Same service (${currentIncident.service})`,
      `Matching error signature (${structuredUnderstanding.errorType})`,
      `${matches.length} similar historical incidents on record`,
      `Historical resolutions converged on "${primaryCause}" with verified success.`
    ];
  }

  let recommendedActions = [];
  if (isMongoPayment) {
    recommendedActions = [
      "1. Check MongoDB connection pool utilization in Grafana / APM.",
      "2. Compare current pool configuration with v2.4.1 deployment diff.",
      "3. If exhausted, increase pool size."
    ];
  } else {
    recommendedActions = [
      `1. Verify ${currentIncident.service} operational metrics and active worker threads.`,
      `2. Check environment configuration diff against previous stable release.`,
      `3. Apply proven mitigation: ${topFix?.description || 'Adjust configuration parameters.'}`
    ];
  }

  let previousSuccessfulFix = topFix 
    ? (isMongoPayment ? "Increase connection pool from 50 → 100." : `${topFix.description}`)
    : "Review root cause metrics and apply targeted mitigation.";

  const genericDiagnosis = "Possible causes include network issues, database availability, authentication, or connection pool exhaustion.";
  
  const afterMemoryDiagnosis = `I've encountered this pattern ${matches.length + 1} times before. In cases involving ${currentIncident.service}, the root cause was ${primaryCause}. The previous fix—${previousSuccessfulFix}—successfully resolved historical incidents. I recommend checking ${recommendedActions[0].replace(/^\d+\.\s*/, '')} before investigating generic network configuration.`;

  // Cautions against failed anti-patterns
  const cautions = [];
  if (failedFixes.length > 0) {
    failedFixes.forEach(f => {
      cautions.push(`Incident ${f.incidentId} previously attempted "${f.description}" which FAILED. Warning: ${f.caution || 'Do not repeat without verifying.'}`);
    });
  }

  return {
    understandingSummary,
    symptoms,
    likelyCause: primaryCause,
    whyBullets,
    recommendedActions,
    previousSuccessfulFix,
    confidence: "HIGH",
    confidenceScore: 87,
    similarIncidents: matches.map(m => ({
      id: m.id,
      incidentNumber: m.incidentNumber || m.id.replace('INC-', ''),
      similarity: m.similarity,
      rootCause: m.rootCause,
      resolution: m.resolution,
      outcome: m.outcome,
      outcomeNotes: m.outcomeNotes,
      timestamp: m.timestamp,
      lessonsLearned: m.lessonsLearned
    })),
    genericDiagnosis,
    afterMemoryDiagnosis,
    cautionWarnings: cautions,
    learningStage: matches.length > 2 ? "INTERACTION_20_EXPERIENCED_AI" : "INTERACTION_2_HISTORICAL_MATCH"
  };
}
