import React from "react";

interface BtnProps {
  children: React.ReactNode;
  variant?: string;
  size?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const variants: Record<string, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm",
  secondary: "bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-400 shadow-sm",
  amber: "bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-400 shadow-sm",
  ghost: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-slate-300",
  danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 shadow-sm",
  outline: "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-400",
};

const sizes: Record<string, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Btn({
  children, variant = "primary", size = "md", onClick, className = "", disabled = false,
}: BtnProps) {
  const base = "inline-flex items-center gap-2 font-semibold rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer";
  return (
    <button
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      onClick={onClick} disabled={disabled}
    >{children}</button>
  );
}
