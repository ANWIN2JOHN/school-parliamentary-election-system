import React from "react";
import { Check } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import type { Candidate } from "@/types";

interface CandidateVoteCardProps {
  candidate: Candidate;
  selected: boolean;
  onSelect: () => void;
  accent: string;
}

export function CandidateVoteCard({ candidate, selected, onSelect, accent }: CandidateVoteCardProps) {
  if (!candidate) return null;

  const isBlue = accent === "blue";
  const selBorder = isBlue ? "border-blue-500" : "border-emerald-500";
  const selShadow = isBlue ? "shadow-blue-100" : "shadow-emerald-100";
  const topBar   = isBlue ? "bg-blue-600" : "bg-emerald-500";
  const btnSel   = isBlue ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-emerald-500 hover:bg-emerald-600 text-white";

  return (
    <div onClick={onSelect}
      className={`bg-white rounded-2xl border-2 cursor-pointer transition-all duration-200 overflow-hidden group
        ${selected
          ? `${selBorder} ${selShadow} shadow-xl scale-[1.02]`
          : "border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5"
        }`}
    >
      {/* Top accent bar */}
      <div className={`h-1.5 transition-all ${selected ? topBar : "bg-slate-200 group-hover:bg-slate-300"}`} />

      <div className="p-4">
        {/* Photo */}
        <div className="relative w-full aspect-square max-w-[120px] mx-auto rounded-xl overflow-hidden bg-slate-200 mb-3">
          <ImageWithFallback src={candidate?.photo ?? ""} alt={candidate?.name ?? "Candidate"} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          {selected && (
            <div className={`absolute inset-0 ${isBlue ? "bg-blue-600/15" : "bg-emerald-600/15"} flex items-end justify-end p-1.5`}>
              <div className={`w-6 h-6 rounded-full ${isBlue ? "bg-blue-600" : "bg-emerald-500"} flex items-center justify-center shadow`}>
                <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="text-center space-y-1.5">
          <h3 className="font-extrabold text-slate-900 text-sm leading-tight">{candidate?.name ?? ""}</h3>
        </div>

        {/* Button */}
        <button className={`w-full mt-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 flex items-center justify-center gap-1.5
          ${selected ? btnSel : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
          {selected ? <><Check className="w-3 h-3" />Selected</> : "Select"}
        </button>
      </div>
    </div>
  );
}
