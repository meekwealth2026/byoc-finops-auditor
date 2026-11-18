export interface RiskMetric {
  latency_ms?: number;
  rate_limit_429_count?: number;
  throughput_tpm?: number;
}

export interface AuditFinding {
  id: string;
  provider: "AWS" | "Azure" | "GCP" | "OpenAI" | "Anthropic" | "SaaS";
  category: string;
  resource_id: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  monthly_waste_usd: number;
  annual_waste_usd: number;
  recommendation: string;
  risk_metric?: RiskMetric;
}

export interface AuditSummary {
  total_monthly_spend: number;
  total_monthly_waste: number;
  total_annual_waste: number;
  findings: AuditFinding[];
  scanned_at: string;
}

export interface ConnectorConfig {
  // AWS Credentials
  aws_access_key_id: string;
  aws_secret_access_key: string;
  aws_region: string;

  // Azure Credentials
  azure_subscription_id: string;
  azure_tenant_id: string;
  azure_client_id: string;
  azure_client_secret: string;

  // GCP Credentials
  gcp_project_id: string;
  gcp_service_account_json: string;

  // AI Gateway Keys
  openai_admin_key: string;
  anthropic_admin_key: string;
}