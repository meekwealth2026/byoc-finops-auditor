import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

interface LlmApiCallRecord {
  endpoint_name: string;
  model_tier: string;
  total_requests_mo: number;
  avg_prompt_tokens: number;
  avg_completion_tokens: number;
  prompt_caching_enabled: boolean;
}

interface LlmAuditFinding {
  endpoint_name: string;
  model_tier: string;
  inefficiency_detected: string;
  monthly_waste_usd: number;
  recommended_action: string;
}

export const LlmAuditCard: React.FC = () => {
  const [findings, setFindings] = useState<LlmAuditFinding[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalWaste, setTotalWaste] = useState<number>(0);

  const runAudit = async () => {
    setLoading(true);
    try {
      const sampleRecords: LlmApiCallRecord[] = [
        {
          endpoint_name: "Doc Summarizer Worker",
          model_tier: "gpt-4o",
          total_requests_mo: 45000,
          avg_prompt_tokens: 12500,
          avg_completion_tokens: 400,
          prompt_caching_enabled: false,
        },
        {
          endpoint_name: "Support Triage Bot",
          model_tier: "claude-3-5-sonnet",
          total_requests_mo: 28000,
          avg_prompt_tokens: 4200,
          avg_completion_tokens: 150,
          prompt_caching_enabled: false,
        },
      ];

      const result: LlmAuditFinding[] = await invoke("run_shadow_ai_audit_cmd", {
        records: sampleRecords,
      });

      setFindings(result);
      const sum = result.reduce((acc, curr) => acc + curr.monthly_waste_usd, 0);
      setTotalWaste(sum);
    } catch (error) {
      console.error("Failed to run Shadow AI audit:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 text-slate-100 shadow-xl my-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-sky-400">Shadow AI & LLM Token Analytics</h3>
          <p className="text-xs text-slate-400">Local-first analysis of uncached system prompts and token bloat.</p>
        </div>
        <button
          onClick={runAudit}
          disabled={loading}
          className="bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold px-4 py-2 rounded transition disabled:opacity-50"
        >
          {loading ? "Scanning..." : "Run LLM Token Audit"}
        </button>
      </div>

      {findings.length > 0 && (
        <div className="mt-4">
          <div className="bg-slate-800 border border-slate-700 rounded p-3 mb-4 flex justify-between items-center">
            <span className="text-sm font-medium text-slate-300">Total Identifiable AI Waste:</span>
            <span className="text-lg font-bold text-red-400">${totalWaste.toFixed(2)} / mo</span>
          </div>

          <div className="space-y-3">
            {findings.map((finding, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded p-3 text-sm">
                <div className="flex justify-between font-semibold text-slate-200">
                  <span>{finding.endpoint_name}</span>
                  <span className="text-sky-300 uppercase text-xs px-2 py-0.5 bg-sky-950 rounded border border-sky-800">
                    {finding.model_tier}
                  </span>
                </div>
                <p className="text-xs text-red-300 mt-1">?? {finding.inefficiency_detected}</p>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-900 text-xs text-slate-400">
                  <span>Action: {finding.recommended_action}</span>
                  <span className="font-bold text-red-400">${finding.monthly_waste_usd.toFixed(2)}/mo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default LlmAuditCard;
