/**
 * Module 2 — Incident Understanding
 * Parses raw incident reports, logs, and deployment details into structured telemetry.
 */

export function understandIncident(incident) {
  const { title = '', service = '', severity = 'HIGH', error = '', logs = '', deploymentInfo = '', additionalContext = '' } = incident;

  const rawText = `${title} ${error} ${logs} ${deploymentInfo} ${additionalContext}`.toLowerCase();

  // Extract error type
  let errorType = "UnknownError";
  const errorMatch = error.match(/^([A-Za-z0-9_]+Error|[A-Za-z0-9_]+Exception|[A-Za-z0-9_]+Timeout)/i);
  if (errorMatch) {
    errorType = errorMatch[1];
  } else if (rawText.includes("mongoserverselectionerror")) {
    errorType = "MongoServerSelectionError";
  } else if (rawText.includes("jsonwebtokenerror") || rawText.includes("jwt")) {
    errorType = "JsonWebTokenError";
  } else if (rawText.includes("redisconnection") || rawText.includes("econnreset")) {
    errorType = "RedisConnectionClosed";
  } else if (rawText.includes("gateway timeout") || rawText.includes("504")) {
    errorType = "PaymentGatewayTimeout";
  } else if (rawText.includes("rebalance") || rawText.includes("commitfailedexception")) {
    errorType = "KafkaConsumerRebalanceError";
  } else if (rawText.includes("elasticsearch") || rawText.includes("circuit_breaking_exception")) {
    errorType = "ElasticsearchClusterHealthRed";
  } else if (rawText.includes("oom") || rawText.includes("out of memory")) {
    errorType = "OutOfMemoryKilled";
  }

  // Detect symptoms
  const symptoms = [];
  if (rawText.includes("timeout") || rawText.includes("timed out") || rawText.includes("30000ms")) {
    symptoms.push("database / network timeout exceeding threshold");
  }
  if (rawText.includes("pool size") || rawText.includes("in use") || rawText.includes("queued wait")) {
    symptoms.push("connection pool saturation / queued worker threads");
  }
  if (rawText.includes("500 internal") || rawText.includes("returned 500")) {
    symptoms.push("high HTTP 500 error rate on critical write endpoints");
  }
  if (rawText.includes("signature") || rawText.includes("unauthorized") || rawText.includes("401")) {
    symptoms.push("token validation failure / unauthorized customer sessions");
  }
  if (rawText.includes("lag") || rawText.includes("backlog")) {
    symptoms.push("message queue consumer lag accumulation");
  }
  if (rawText.includes("no primary") || rawText.includes("election")) {
    symptoms.push("replica set primary node unavailable");
  }
  if (symptoms.length === 0) {
    symptoms.push("degraded service availability and elevated error logs");
  }

  // Candidate possible causes before Hindsight memory retrieval
  const candidateCauses = [];
  if (rawText.includes("mongo") || rawText.includes("pool") || rawText.includes("connection")) {
    candidateCauses.push("Connection pool exhaustion");
    candidateCauses.push("Database primary node unavailable");
    candidateCauses.push("Database network configuration mismatch");
    candidateCauses.push("Authentication / credential expiry");
  } else if (rawText.includes("jwt") || rawText.includes("vault") || rawText.includes("secret")) {
    candidateCauses.push("JWT secret mismatch following deployment / rotation");
    candidateCauses.push("Token expiration clock skew");
    candidateCauses.push("Vault integration communication failure");
  } else if (rawText.includes("gateway") || rawText.includes("504") || rawText.includes("timeout")) {
    candidateCauses.push("Upstream rate limiting / backoff saturation");
    candidateCauses.push("Downstream partner network latency");
  } else {
    candidateCauses.push("Infrastructure resource exhaustion");
    candidateCauses.push("Bad configuration deployment");
    candidateCauses.push("Upstream dependency outage");
  }

  // Telemetry signals
  const telemetry = {
    hasRecentDeployment: !!incident.recentDeployment || rawText.includes("deploy") || rawText.includes("v2.") || rawText.includes("v1."),
    deploymentVersion: deploymentInfo.match(/v\d+\.\d+(\.\d+)?/)?.[0] || "Unknown",
    affectedService: service || "Core Service",
    detectedStatusCode: rawText.match(/\b(500|502|503|504|401|403|429)\b/)?.[0] || "500",
    trafficSurgeDetected: rawText.includes("spike") || rawText.includes("surge") || rawText.includes("peak") || rawText.includes("promo")
  };

  return {
    service: service || "Payment API",
    errorType,
    symptoms,
    candidateCauses,
    telemetry,
    structuredSummary: `${errorType} on ${service} with ${symptoms.length} detected symptoms. Recent deployment: ${telemetry.hasRecentDeployment ? telemetry.deploymentVersion : 'No'}.`
  };
}
