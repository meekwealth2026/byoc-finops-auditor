import React, { useState } from "react";
import { Lock, Save, Check } from "lucide-react";

interface ConnectorsScreenProps {
  onSaveSecret: (service: string, account: string, secret: string) => Promise<void>;
}

export const ConnectorsScreen: React.FC<ConnectorsScreenProps> = ({ onSaveSecret }) => {
  // AWS State
  const [awsKeyId, setAwsKeyId] = useState("");
  const [awsSecret, setAwsSecret] = useState("");
  const [awsRegion, setAwsRegion] = useState("us-east-1");

  // Azure State
  const [azureSubId, setAzureSubId] = useState("");
  const [azureTenantId, setAzureTenantId] = useState("");
  const [azureClientId, setAzureClientId] = useState("");
  const [azureClientSecret, setAzureClientSecret] = useState("");

  // GCP State
  const [gcpProjectId, setGcpProjectId] = useState("");
  const [gcpServiceAccountJson, setGcpServiceAccountJson] = useState("");

  // AI Gateways State
  const [openaiKey, setOpenaiKey] = useState("");
  const [anthropicKey, setAnthropicKey] = useState("");

  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();

    // Save AWS Credentials
    if (awsKeyId) await onSaveSecret("byoc-finops", "aws_access_key_id", awsKeyId);
    if (awsSecret) await onSaveSecret("byoc-finops", "aws_secret_access_key", awsSecret);
    if (awsRegion) await onSaveSecret("byoc-finops", "aws_region", awsRegion);

    // Save Azure Credentials
    if (azureSubId) await onSaveSecret("byoc-finops", "azure_subscription_id", azureSubId);
    if (azureTenantId) await onSaveSecret("byoc-finops", "azure_tenant_id", azureTenantId);
    if (azureClientId) await onSaveSecret("byoc-finops", "azure_client_id", azureClientId);
    if (azureClientSecret) await onSaveSecret("byoc-finops", "azure_client_secret", azureClientSecret);

    // Save GCP Credentials
    if (gcpProjectId) await onSaveSecret("byoc-finops", "gcp_project_id", gcpProjectId);
    if (gcpServiceAccountJson) await onSaveSecret("byoc-finops", "gcp_service_account_json", gcpServiceAccountJson);

    // Save AI Gateway Keys
    if (openaiKey) await onSaveSecret("byoc-finops", "openai_admin_key", openaiKey);
    if (anthropicKey) await onSaveSecret("byoc-finops", "anthropic_admin_key", anthropicKey);

    setSavedNotice("All multi-cloud & AI credentials encrypted & stored in native OS Keychain.");
    setTimeout(() => setSavedNotice(null), 4000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Bring-Your-Own-Cloud Connectors</h2>
        <p className="text-sm text-slate-400 mt-1">
          Enter read-only billing & usage keys across AWS, Azure, GCP, and AI Gateways. Credentials are written directly to your OS Keychain and never transmitted to any third-party server.
        </p>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6 bg-slate-900 border border-slate-800 rounded-xl p-6">
        {/* 1. AWS */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
            1. AWS Cost Explorer & EC2 (Read-Only IAM)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">AWS Access Key ID</label>
              <input
                type="text"
                value={awsKeyId}
                onChange={(e) => setAwsKeyId(e.target.value)}
                placeholder="AKIAIOSFODNN7EXAMPLE"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">AWS Secret Access Key</label>
              <input
                type="password"
                value={awsSecret}
                onChange={(e) => setAwsSecret(e.target.value)}
                placeholder="••••••••••••••••••••"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-slate-400 mb-1">Default AWS Region</label>
              <input
                type="text"
                value={awsRegion}
                onChange={(e) => setAwsRegion(e.target.value)}
                placeholder="us-east-1"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* 2. Microsoft Azure */}
        <div className="border-t border-slate-800 pt-5 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
            2. Microsoft Azure Cost Management (Reader Service Principal)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Subscription ID</label>
              <input
                type="text"
                value={azureSubId}
                onChange={(e) => setAzureSubId(e.target.value)}
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Tenant ID</label>
              <input
                type="text"
                value={azureTenantId}
                onChange={(e) => setAzureTenantId(e.target.value)}
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Client ID (App ID)</label>
              <input
                type="text"
                value={azureClientId}
                onChange={(e) => setAzureClientId(e.target.value)}
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Client Secret</label>
              <input
                type="password"
                value={azureClientSecret}
                onChange={(e) => setAzureClientSecret(e.target.value)}
                placeholder="••••••••••••••••••••"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* 3. Google Cloud Platform */}
        <div className="border-t border-slate-800 pt-5 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
            3. Google Cloud Platform Billing & Recommender
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">GCP Project ID</label>
              <input
                type="text"
                value={gcpProjectId}
                onChange={(e) => setGcpProjectId(e.target.value)}
                placeholder="my-prod-project-123"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Service Account JSON Key</label>
              <textarea
                rows={3}
                value={gcpServiceAccountJson}
                onChange={(e) => setGcpServiceAccountJson(e.target.value)}
                placeholder='{ "type": "service_account", "project_id": "..." }'
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* 4. Shadow AI & LLM Gateways */}
        <div className="border-t border-slate-800 pt-5 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
            4. Shadow AI & LLM Usage Endpoints
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">OpenAI Admin / Usage API Key</label>
              <input
                type="password"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                placeholder="sk-admin-..."
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Anthropic Admin API Key</label>
              <input
                type="password"
                value={anthropicKey}
                onChange={(e) => setAnthropicKey(e.target.value)}
                placeholder="sk-ant-admin-..."
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Stored via Rust OS Keyring</span>
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition"
          >
            <Save className="w-4 h-4" />
            Save to OS Keychain
          </button>
        </div>

        {savedNotice && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
            <Check className="w-4 h-4" />
            {savedNotice}
          </div>
        )}
      </form>
    </div>
  );
};