import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
}

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  red: "bg-red-100 text-red-700",
  purple: "bg-purple-100 text-purple-700",
  gray: "bg-slate-100 text-slate-600",
};

export function Badge({ children, color = "blue" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${colorMap[color] || colorMap.blue}`}>
      {children}
    </span>
  );
}
