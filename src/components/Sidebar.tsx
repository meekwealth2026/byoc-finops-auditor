import React from "react";
import { LayoutDashboard, KeyRound, FileSpreadsheet, ShieldCheck } from "lucide-react";

interface SidebarProps {
  activeTab: "dashboard" | "connectors" | "reports" | "license";
  setActiveTab: (tab: "dashboard" | "connectors" | "reports" | "license") => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: "dashboard", label: "Audit Dashboard", icon: LayoutDashboard },
    { id: "connectors", label: "BYOC Connectors", icon: KeyRound },
    { id: "reports", label: "Executive Reports", icon: FileSpreadsheet },
    { id: "license", label: "License & Privacy", icon: ShieldCheck },
  ] as const;

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4">
      <div>
        <div className="flex items-center gap-3 px-2 py-4 mb-6 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
            $
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-wide text-white">ZERO-HOST FINOPS</h1>
            <p className="text-xs text-slate-400">Local Cloud & AI Auditor</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          100% Local Execution
        </div>
        Zero cloud telemetry. Keys encrypted in native OS Keychain.
      </div>
    </aside>
  );
};
