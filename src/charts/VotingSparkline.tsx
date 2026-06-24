import React from "react";
import type { VotingProgressEntry } from "@/types";

interface VotingSparklineProps {
  data: VotingProgressEntry[];
}

export function VotingSparkline({ data }: VotingSparklineProps) {
  const W = 600, H = 180;
  const PAD = { top: 12, right: 16, bottom: 32, left: 36 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const rawMax = Math.max(...data.map(d => d.votes));
  const maxV = rawMax > 0 ? rawMax : 1; // guard division by zero

  const xs = data.map((_, i) => PAD.left + (i / (data.length - 1)) * innerW);
  const ys = data.map(d => PAD.top + (1 - d.votes / maxV) * innerH);
  const baseline = PAD.top + innerH;

  const line = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const area = `${line} L${xs[xs.length - 1].toFixed(1)},${baseline} L${xs[0].toFixed(1)},${baseline} Z`;

  // Build unique y-axis ticks (deduplicated)
  const rawTicks = rawMax > 0
    ? Array.from(new Set([0, Math.round(rawMax / 2), rawMax]))
    : [0];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[210px]" aria-hidden>
      {rawTicks.map((v, idx) => {
        const y = PAD.top + (1 - v / maxV) * innerH;
        return (
          <g key={`grid-${idx}`}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y.toFixed(1)} y2={y.toFixed(1)}
              stroke="#F1F5F9" strokeWidth={1} strokeDasharray="4 3" />
            <text x={PAD.left - 6} y={(y + 4).toFixed(1)} textAnchor="end" fontSize={10} fill="#94A3B8">{v}</text>
          </g>
        );
      })}
      <path d={area} fill="#2563EB" opacity={0.08} />
      <path d={line} fill="none" stroke="#2563EB" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <g key={`pt-${d.time}`}>
          <circle cx={xs[i].toFixed(1)} cy={ys[i].toFixed(1)} r={4} fill="#2563EB" />
          <text x={xs[i].toFixed(1)} y={H - PAD.bottom + 16} textAnchor="middle" fontSize={10} fill="#94A3B8">{d.time}</text>
        </g>
      ))}
      {rawMax === 0 && (
        <text x={W / 2} y={H / 2} textAnchor="middle" fontSize={12} fill="#CBD5E1">No votes recorded yet</text>
      )}
    </svg>
  );
}
