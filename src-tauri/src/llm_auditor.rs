use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Deserialize, Serialize)]
pub struct LlmApiCallRecord {
    pub endpoint_name: String,
    pub model_tier: String,
    pub total_requests_mo: u64,
    pub avg_prompt_tokens: u64,
    pub avg_completion_tokens: u64,
    pub prompt_caching_enabled: bool,
}

#[derive(Debug, Serialize)]
pub struct LlmAuditFinding {
    pub endpoint_name: String,
    pub model_tier: String,
    pub inefficiency_detected: String,
    pub monthly_waste_usd: f64,
    pub recommended_action: String,
}

pub fn analyze_shadow_ai_usage(records: Vec<LlmApiCallRecord>) -> Vec<LlmAuditFinding> {
    let mut findings = Vec::new();
    let mut input_pricing: HashMap<&str, f64> = HashMap::new();
    input_pricing.insert("gpt-4o", 5.00);
    input_pricing.insert("claude-3-5-sonnet", 3.00);

    for record in records {
        let base_rate = input_pricing.get(record.model_tier.as_str()).unwrap_or(&5.00);
        if record.avg_prompt_tokens > 2000 && !record.prompt_caching_enabled {
            let monthly_cost = (record.total_requests_mo as f64 * record.avg_prompt_tokens as f64 * base_rate) / 1_000_000.0;
            let estimated_waste = monthly_cost * 0.75;

            findings.push(LlmAuditFinding {
                endpoint_name: record.endpoint_name,
                model_tier: record.model_tier.clone(),
                inefficiency_detected: format!("Uncached {}token static system prompt sent per call", record.avg_prompt_tokens),
                monthly_waste_usd: estimated_waste,
                recommended_action: "Enable prompt caching headers / evaluate route to efficient tier".to_string(),
            });
        }
    }
    findings
}
