import React from "react";
import { SYMBOL_DEFS } from "@/data/symbols";

interface ElectionSymbolProps {
  symbolKey: string;
  size?: "sm" | "md" | "lg";
}

export function ElectionSymbol({ symbolKey, size = "md" }: ElectionSymbolProps) {
  const def = SYMBOL_DEFS[symbolKey];
  if (!def) return null;
  const dim = size === "sm" ? "w-10 h-10" : size === "lg" ? "w-16 h-16" : "w-12 h-12";
  const pad = size === "sm" ? "p-1.5" : size === "lg" ? "p-2.5" : "p-2";
  const lbl = size === "sm" ? "text-[7px]" : "text-[8px]";
  return (
    <div className={`${dim} flex flex-col items-center gap-0.5 flex-shrink-0`}>
      <div
        className={`flex-1 w-full rounded-xl border-2 flex items-center justify-center ${pad} transition-all`}
        style={{ backgroundColor: def.bg, borderColor: def.color + "44" }}
      >
        <div className="w-full h-full">{def.svg}</div>
      </div>
      <span className={`${lbl} font-extrabold uppercase tracking-wider`} style={{ color: def.color }}>
        {def.label}
      </span>
    </div>
  );
}
