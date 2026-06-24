import React from "react";

interface DonutChartProps {
  pct: number;
  voted: number;
  total: number;
}

export function DonutChart({ pct, voted, total }: DonutChartProps) {
  const r = 68, cx = 90, cy = 90, sw = 22;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={180} height={180} viewBox="0 0 180 180" aria-hidden>
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#E2E8F0" strokeWidth={sw} />
        {/* Fill — starts at 12 o'clock */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#2563EB" strokeWidth={sw}
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeDashoffset={circ / 4}
          strokeLinecap="round"
        />
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize={22} fontWeight={800} fill="#0F172A">{pct}%</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize={11} fill="#94A3B8">Voted</text>
      </svg>
      <div className="flex gap-5">
        <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 block" />Voted ({voted})
        </span>
        <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-200 block" />Pending ({total - voted})
        </span>
      </div>
    </div>
  );
}
