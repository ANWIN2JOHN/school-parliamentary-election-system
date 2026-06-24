import React from "react";
import type { SymbolDef } from "@/types";

export const SYMBOL_DEFS: Record<string, SymbolDef> = {
  torch: {
    label: "TORCH", color: "#EA580C", bg: "#FFF7ED",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <path d="M24 6 C22 10 18 14 20 20 C16 18 16 12 18 9 C14 14 14 22 18 26 C15 24 14 18 16 15 C12 22 14 32 20 36 L28 36 C34 32 36 22 32 15 C34 18 33 24 30 26 C34 22 34 14 30 9 C32 12 32 18 28 20 C30 14 26 10 24 6Z" fill="#EA580C"/>
        <path d="M24 6 C23 9 21 11 22 15 C24 12 25 9 24 6Z" fill="#FCD34D"/>
        <rect x="19" y="36" width="10" height="6" rx="2" fill="#92400E"/>
        <rect x="21" y="36" width="6" height="2" fill="#78350F"/>
      </svg>
    ),
  },
  star: {
    label: "STAR", color: "#D97706", bg: "#FFFBEB",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <path d="M24 5L28.5 17H42L31.5 24.5L35.5 37L24 30L12.5 37L16.5 24.5L6 17H19.5L24 5Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1"/>
      </svg>
    ),
  },
  book: {
    label: "BOOK", color: "#4338CA", bg: "#EEF2FF",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="6" y="10" width="16" height="28" rx="2" fill="#6366F1"/>
        <rect x="26" y="10" width="16" height="28" rx="2" fill="#4338CA"/>
        <path d="M22 10 L24 8 L26 10" fill="#E0E7FF"/>
        <rect x="9" y="15" width="10" height="1.5" rx="0.75" fill="white" opacity="0.7"/>
        <rect x="9" y="19" width="10" height="1.5" rx="0.75" fill="white" opacity="0.7"/>
        <rect x="9" y="23" width="7" height="1.5" rx="0.75" fill="white" opacity="0.7"/>
        <rect x="29" y="15" width="10" height="1.5" rx="0.75" fill="white" opacity="0.7"/>
        <rect x="29" y="19" width="10" height="1.5" rx="0.75" fill="white" opacity="0.7"/>
        <rect x="29" y="23" width="7" height="1.5" rx="0.75" fill="white" opacity="0.7"/>
        <line x1="22" y1="10" x2="22" y2="38" stroke="#C7D2FE" strokeWidth="2"/>
      </svg>
    ),
  },
  hand: {
    label: "HAND", color: "#059669", bg: "#ECFDF5",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="21" y="8" width="5" height="18" rx="2.5" fill="#10B981"/>
        <rect x="27" y="11" width="5" height="15" rx="2.5" fill="#10B981"/>
        <rect x="15" y="11" width="5" height="15" rx="2.5" fill="#10B981"/>
        <rect x="9" y="15" width="5" height="11" rx="2.5" fill="#10B981"/>
        <path d="M9 26 C9 26 9 32 14 36 L34 36 C39 32 39 26 39 26 L9 26Z" fill="#10B981"/>
        <path d="M9 26 C9 26 10 30 14 33" stroke="#059669" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  dove: {
    label: "DOVE", color: "#0891B2", bg: "#ECFEFF",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <path d="M24 20 C20 16 12 14 8 18 C12 18 16 20 18 24 C14 22 10 24 8 28 C12 26 16 26 20 28 C18 32 18 36 22 38 C22 34 24 30 28 28 C32 28 38 30 40 26 C36 24 32 22 30 20 C34 18 38 14 36 10 C32 12 28 16 24 20Z" fill="#22D3EE"/>
        <path d="M22 38 C22 34 23 30 24 28" stroke="#0891B2" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="34" cy="14" r="2" fill="#0E7490"/>
        <path d="M36 12 L42 8" stroke="#0891B2" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  shield: {
    label: "SHIELD", color: "#1D4ED8", bg: "#EFF6FF",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <path d="M24 6 L38 12 L38 26 C38 34 30 40 24 42 C18 40 10 34 10 26 L10 12 Z" fill="#3B82F6"/>
        <path d="M24 6 L38 12 L38 26 C38 34 30 40 24 42 C18 40 10 34 10 26 L10 12 Z" stroke="#1D4ED8" strokeWidth="1.5"/>
        <path d="M18 24 L22 28 L30 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  sun: {
    label: "SUN", color: "#B45309", bg: "#FFFBEB",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <circle cx="24" cy="24" r="9" fill="#FBBF24"/>
        {[0,45,90,135,180,225,270,315].map((deg, i) => (
          <line key={i}
            x1={24 + 12 * Math.cos(deg * Math.PI / 180)}
            y1={24 + 12 * Math.sin(deg * Math.PI / 180)}
            x2={24 + 18 * Math.cos(deg * Math.PI / 180)}
            y2={24 + 18 * Math.sin(deg * Math.PI / 180)}
            stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"
          />
        ))}
      </svg>
    ),
  },
  whistle: {
    label: "WHISTLE", color: "#0369A1", bg: "#F0F9FF",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        {/* Body */}
        <rect x="8" y="18" width="22" height="13" rx="6.5" fill="#38BDF8" stroke="#0369A1" strokeWidth="1.2"/>
        {/* Mouthpiece */}
        <rect x="30" y="21" width="10" height="7" rx="2" fill="#0284C7" stroke="#0369A1" strokeWidth="1"/>
        {/* Window slot */}
        <rect x="14" y="22" width="8" height="5" rx="1.5" fill="#E0F2FE" stroke="#0369A1" strokeWidth="0.8"/>
        {/* Ball inside */}
        <circle cx="18" cy="24.5" r="2" fill="#FCD34D"/>
        {/* Sound lines */}
        <path d="M6 14 Q4 12 6 10" stroke="#0369A1" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
        <path d="M9 12 Q7 10 9 8" stroke="#0369A1" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
        <path d="M12 11 Q10 9 12 7" stroke="#0369A1" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        {/* Ring */}
        <circle cx="8" cy="18" r="2.5" stroke="#0369A1" strokeWidth="1.2" fill="none"/>
      </svg>
    ),
  },
  pen: {
    label: "PEN", color: "#334155", bg: "#F8FAFC",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        {/* Barrel */}
        <rect x="18" y="6" width="12" height="26" rx="3" fill="#94A3B8" stroke="#475569" strokeWidth="1"/>
        {/* Grip section */}
        <rect x="19" y="26" width="10" height="6" rx="1.5" fill="#64748B"/>
        {/* Nib */}
        <path d="M21 32 L24 42 L27 32 Z" fill="#1E293B"/>
        <path d="M24 36 L24 42" stroke="#CBD5E1" strokeWidth="0.8" strokeLinecap="round"/>
        {/* Clip */}
        <rect x="28" y="8" width="2.5" height="18" rx="1.25" fill="#475569"/>
        <circle cx="29.25" cy="27" r="1.5" fill="#475569"/>
        {/* Cap band */}
        <rect x="18" y="22" width="12" height="2.5" rx="0.5" fill="#475569"/>
        {/* Ink window */}
        <rect x="20" y="12" width="8" height="8" rx="1" fill="#BAE6FD" opacity="0.8"/>
        {/* Scribble line */}
        <path d="M10 44 Q14 40 18 44 Q22 48 26 44" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  mouse: {
    label: "MOUSE", color: "#374151", bg: "#F9FAFB",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        {/* Mouse body */}
        <path d="M14 22 C14 14 20 10 24 10 C28 10 34 14 34 22 L34 32 C34 38 30 40 24 40 C18 40 14 38 14 32 Z" fill="#9CA3AF" stroke="#374151" strokeWidth="1.2"/>
        {/* Left button */}
        <path d="M14 22 L24 22 L24 14 C20 14 14 17 14 22Z" fill="#D1D5DB" stroke="#374151" strokeWidth="0.8"/>
        {/* Right button */}
        <path d="M34 22 L24 22 L24 14 C28 14 34 17 34 22Z" fill="#E5E7EB" stroke="#374151" strokeWidth="0.8"/>
        {/* Center divider line */}
        <line x1="24" y1="14" x2="24" y2="22" stroke="#374151" strokeWidth="0.8"/>
        {/* Scroll wheel */}
        <rect x="21" y="18" width="6" height="9" rx="3" fill="#6B7280" stroke="#374151" strokeWidth="0.8"/>
        <rect x="22.5" y="19.5" width="3" height="6" rx="1.5" fill="#9CA3AF"/>
        {/* Cord */}
        <path d="M24 40 Q24 44 20 44 Q16 44 14 42" stroke="#4B5563" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
  keys: {
    label: "KEYS", color: "#92400E", bg: "#FFFBEB",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        {/* Key ring */}
        <circle cx="20" cy="16" r="7" stroke="#D97706" strokeWidth="2" fill="none"/>
        <circle cx="20" cy="16" r="4" stroke="#D97706" strokeWidth="1.2" fill="none"/>
        {/* Key 1 shaft */}
        <line x1="25" y1="20" x2="38" y2="33" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Key 1 teeth */}
        <line x1="31" y1="27" x2="34" y2="24" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="34" y1="30" x2="37" y2="27" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Key 2 shaft */}
        <line x1="22" y1="22" x2="30" y2="38" stroke="#92400E" strokeWidth="2" strokeLinecap="round"/>
        {/* Key 2 teeth */}
        <line x1="25" y1="28" x2="28" y2="26" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="27" y1="33" x2="30" y2="31" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round"/>
        {/* Key bow highlight */}
        <circle cx="20" cy="16" r="2.5" fill="#FCD34D"/>
      </svg>
    ),
  },
  telescope: {
    label: "TELESCOPE", color: "#374151", bg: "#F9FAFB",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        {/* Tube */}
        <rect x="8" y="20" width="28" height="8" rx="3" transform="rotate(-35 8 20)" fill="#9CA3AF"/>
        {/* Eyepiece end */}
        <rect x="6" y="18" width="7" height="12" rx="2" transform="rotate(-35 6 18)" fill="#374151"/>
        {/* Lens end circle */}
        <ellipse cx="36" cy="13" rx="5" ry="4" transform="rotate(-35 36 13)" fill="#93C5FD" stroke="#374151" strokeWidth="1.2"/>
        {/* Tripod legs */}
        <line x1="22" y1="32" x2="12" y2="44" stroke="#4B5563" strokeWidth="2" strokeLinecap="round"/>
        <line x1="22" y1="32" x2="22" y2="44" stroke="#4B5563" strokeWidth="2" strokeLinecap="round"/>
        <line x1="22" y1="32" x2="32" y2="44" stroke="#4B5563" strokeWidth="2" strokeLinecap="round"/>
        {/* Base crossbar */}
        <line x1="14" y1="42" x2="30" y2="42" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  lotus: {
    label: "LOTUS", color: "#BE185D", bg: "#FDF2F8",
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <ellipse cx="24" cy="30" rx="5" ry="8" fill="#F472B6"/>
        <ellipse cx="16" cy="28" rx="4" ry="7" transform="rotate(-20 16 28)" fill="#EC4899"/>
        <ellipse cx="32" cy="28" rx="4" ry="7" transform="rotate(20 32 28)" fill="#EC4899"/>
        <ellipse cx="10" cy="30" rx="3.5" ry="6" transform="rotate(-40 10 30)" fill="#F9A8D4"/>
        <ellipse cx="38" cy="30" rx="3.5" ry="6" transform="rotate(40 38 30)" fill="#F9A8D4"/>
        <path d="M18 36 Q24 34 30 36" stroke="#BE185D" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <ellipse cx="24" cy="36" rx="6" ry="3" fill="#FDE68A"/>
      </svg>
    ),
  },
};
