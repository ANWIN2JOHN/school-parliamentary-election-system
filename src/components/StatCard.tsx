import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}

const bgMap: Record<string, string> = {
  blue: "bg-blue-600",
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  purple: "bg-purple-500",
};

export function StatCard({ icon, label, value, sub, color = "blue" }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
      <div className={`${bgMap[color] || bgMap.blue} p-3 rounded-xl text-white flex-shrink-0`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <p className="text-slate-900 text-2xl font-bold leading-tight">{value}</p>
        {sub && <p className="text-slate-400 text-xs mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
