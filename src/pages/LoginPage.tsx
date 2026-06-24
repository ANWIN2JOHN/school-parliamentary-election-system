import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  GraduationCap, Vote, Shield, X, RefreshCw,
} from "lucide-react";
import { Field } from "@/components/Field";
import { Btn } from "@/components/Btn";
import { useAuth } from "@/contexts/AuthContext";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await login(username, password);
    setLoading(false);
    setShowAdminModal(false);
    navigate("/admin");
  };

  const handleStudentEntry = () => {
    navigate("/vote");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">

          {/* Left — brand panel */}
          <div className="lg:w-[55%] bg-gradient-to-br from-blue-600 to-blue-800 p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/5 rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
                  <GraduationCap className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg leading-tight">Silver Hills Higher Secondary</p>
                  <p className="text-blue-200 text-xs font-medium">School · Est. 1975</p>
                </div>
              </div>

              {/* SVG illustration */}
              <div className="my-6 flex justify-center">
                <svg viewBox="0 0 300 230" className="w-full max-w-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="50" y="155" width="200" height="55" rx="14" fill="rgba(255,255,255,0.12)" />
                  <rect x="80" y="90" width="140" height="90" rx="14" fill="rgba(255,255,255,0.18)" />
                  <rect x="80" y="90" width="140" height="28" rx="14" fill="rgba(255,255,255,0.25)" />
                  <rect x="120" y="101" width="60" height="7" rx="3.5" fill="rgba(147,197,253,0.7)" />
                  <rect x="112" y="38" width="76" height="60" rx="10" fill="white" />
                  <rect x="122" y="50" width="56" height="4" rx="2" fill="#BFDBFE" />
                  <rect x="122" y="60" width="40" height="4" rx="2" fill="#BFDBFE" />
                  <rect x="122" y="70" width="48" height="4" rx="2" fill="#BFDBFE" />
                  <circle cx="148" cy="85" r="8" fill="#10B981" />
                  <path d="M144 85l3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="230" cy="55" r="7" fill="#F59E0B" opacity="0.85" />
                  <circle cx="60" cy="75" r="5" fill="#F59E0B" opacity="0.6" />
                  <circle cx="248" cy="148" r="5" fill="#10B981" opacity="0.75" />
                  <circle cx="42" cy="140" r="4" fill="#93C5FD" opacity="0.7" />
                  <circle cx="150" cy="188" r="22" fill="#10B981" />
                  <path d="M140 188l7 7 13-14" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h1 className="text-white text-3xl font-extrabold leading-snug">
                School Parliamentary<br />Election System
              </h1>
              <p className="text-blue-200 mt-3 text-sm leading-relaxed max-w-xs">
                Secure, transparent, and fair elections for your school community. Every vote counts.
              </p>
            </div>

            <div className="relative z-10 mt-8 flex gap-2 flex-wrap">
              {["Unity Panel", "Progress Panel", "Horizon Panel", "Future Panel"].map(p => (
                <span key={p} className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-blue-100 font-semibold">{p}</span>
              ))}
            </div>
          </div>

          {/* Right — actions panel */}
          <div className="lg:w-[45%] p-10 flex flex-col justify-center">
            <div className="max-w-sm mx-auto w-full space-y-6">
              <div className="text-center mb-2">
                <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Welcome</h2>
                <p className="text-slate-500 text-sm">Select how you would like to proceed</p>
              </div>

              {/* ── Primary: Student Voting Portal ── */}
              <div className="relative">
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-2xl bg-emerald-400 opacity-20 animate-ping" style={{ animationDuration: "2s" }} />
                <button
                  onClick={handleStudentEntry}
                  className="relative w-full py-6 px-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-extrabold text-lg shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 flex flex-col items-center gap-2 border-2 border-emerald-400/30"
                >
                  <div className="flex items-center gap-3">
                    <Vote className="w-7 h-7" />
                    <span className="text-xl tracking-wide">STUDENT VOTING PORTAL</span>
                  </div>
                  <span className="text-emerald-100 text-sm font-medium">Click here to cast your vote</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-slate-400 text-xs font-medium px-1">or</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* ── Secondary: Admin login ── */}
              <button
                onClick={() => setShowAdminModal(true)}
                className="w-full py-3.5 px-6 rounded-xl bg-slate-800 text-white font-bold text-sm hover:bg-slate-700 active:bg-slate-900 transition-all duration-150 flex items-center justify-center gap-2.5 shadow-sm"
              >
                <Shield className="w-4 h-4 text-slate-300" />
                Sign In as Administrator
              </button>

              <p className="text-center text-slate-400 text-xs">Silver Hills Higher Secondary School © 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Admin Modal ── */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowAdminModal(false)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />

          {/* Glass card */}
          <div
            className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.6)" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Blue top accent */}
            <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-700" />

            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-tight">Administrator Login</h3>
                    <p className="text-slate-500 text-xs font-medium">Restricted access — authorised staff only</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAdminModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <Field label="Username" placeholder="admin@greenfield.edu" value={username} onChange={e => setUsername(e.target.value)} />
                <Field label="Password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
              </div>

              <Btn variant="primary" size="lg" className="w-full mt-5 justify-center" onClick={handleLogin} disabled={loading}>
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                {loading ? "Signing in…" : "Sign In"}
              </Btn>

              <p className="text-center text-slate-400 text-xs mt-4">
                Students — use the <span className="text-emerald-600 font-semibold">Voting Portal</span> on the previous screen
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
