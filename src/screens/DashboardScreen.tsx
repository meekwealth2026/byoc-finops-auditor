import React, { useState } from "react";
import { Play, AlertTriangle, DollarSign, TrendingDown, CheckCircle2 } from "lucide-react";
import { AuditSummary } from "../types/finops";

interface DashboardScreenProps {
  auditData: AuditSummary | null;
  onRunAudit: () => Promise<void>;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ auditData, onRunAudit }) => {
  const [scanning, setScanning] = useState(false);

  const handleScan = async () => {
    setScanning(true);
    try {
      await onRunAudit();
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Cloud & Shadow AI Waste Audit</h2>
          <p className="text-sm text-slate-400">
            Scans AWS Cost Explorer, OpenAI, and Anthropic endpoints directly from your hardware.
          </p>
        </div>
        <button
          onClick={handleScan}
          disabled={scanning}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition disabled:opacity-50"
        >
          <Play className="w-4 h-4 fill-current" />
          {scanning ? "Running Local Scan..." : "Run Local Audit Scan"}
        </button>
      </div>

      {!auditData ? (
        <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/40 p-12 text-center">
          <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white">No Local Audit Run Yet</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mt-1 mb-5">
            Configure your read-only keys in BYOC Connectors or run a local diagnostic scan to detect idle cloud assets and uncached LLM spend.
          </p>
          <button
            onClick={handleScan}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium"
          >
            Run Diagnostic Scan Now
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs uppercase font-semibold">
                <span>Monthly Tracked Spend</span>
                <DollarSign className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-3xl font-bold text-white mt-2">
                ${auditData.total_monthly_spend.toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 mt-1">Across connected AWS & AI keys</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-rose-500/30">
              <div className="flex items-center justify-between text-rose-400 text-xs uppercase font-semibold">
                <span>Detected Monthly Waste</span>
                <TrendingDown className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-3xl font-bold text-rose-400 mt-2">
                ${auditData.total_monthly_waste.toLocaleString()}/mo
              </div>
              <p className="text-xs text-slate-400 mt-1">Immediate recoverable margin</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-emerald-500/30">
              <div className="flex items-center justify-between text-emerald-400 text-xs uppercase font-semibold">
                <span>Projected Annual Savings</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-bold text-emerald-400 mt-2">
                ${auditData.total_annual_waste.toLocaleString()}/yr
              </div>
              <p className="text-xs text-slate-400 mt-1">Last scanned: {auditData.scanned_at}</p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-semibold text-white">Actionable Waste Findings ({auditData.findings.length})</h3>
              <span className="text-xs text-slate-400">Sorted by annual dollar impact</span>
            </div>
            <div className="divide-y divide-slate-800">
              {auditData.findings.map((item) => (
                <div key={item.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-xs font-semibold rounded bg-slate-800 text-slate-200">
                        {item.provider}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded ${
                          item.severity === "HIGH"
                            ? "bg-rose-500/20 text-rose-400"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {item.severity}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{item.resource_id}</span>
                    </div>
                    <h4 className="font-medium text-white">{item.category}</h4>
                    <p className="text-sm text-slate-400">{item.recommendation}</p>
                  </div>
                  <div className="text-left md:text-right shrink-0">
                    <div className="text-lg font-bold text-emerald-400">
                      +${item.annual_waste_usd.toLocaleString()}/yr
                    </div>
                    <div className="text-xs text-slate-500">${item.monthly_waste_usd.toLocaleString()}/mo waste</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
