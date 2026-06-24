import React, { useEffect, useState } from "react";
import { Check, Shield, Clock, CheckCircle2 } from "lucide-react";

interface SuccessScreenProps {
  onDone: () => void;
  voteRef: string;
  voteTimestamp: string;
}

export function SuccessScreen({ onDone, voteRef, voteTimestamp }: SuccessScreenProps) {
  const [countdown, setCountdown] = useState(5);

  // Auto-reset countdown
  useEffect(() => {
    if (countdown <= 0) {
      onDone();
      return;
    }
    const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, onDone]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md w-full border border-slate-100">
        <div className="w-24 h-24 mx-auto mb-6 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-emerald-100 rounded-full" />
          <div className="absolute inset-3 bg-emerald-500 rounded-full flex items-center justify-center">
            <Check className="w-9 h-9 text-white" strokeWidth={3} />
          </div>
          <div className="absolute inset-0 border-4 border-emerald-300 rounded-full opacity-30 animate-ping" />
        </div>

        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Vote Successfully Submitted!</h2>
        <p className="text-slate-600 font-medium mb-1">
          Thank you for voting!
        </p>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          Your vote has been recorded securely and anonymously. Thank you for participating in your school democracy — every voice matters.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-left space-y-2">
          <div className="flex items-center gap-2 text-slate-600 text-xs">
            <Shield className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>Vote reference: <span className="font-mono font-bold text-slate-800">{voteRef}</span></span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-xs">
            <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span>Submitted at {voteTimestamp}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>Your vote is encrypted and tamper-proof</span>
          </div>
        </div>

        <button onClick={onDone}
          className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition text-sm">
          Ready for Next Student ({countdown}s)
        </button>
      </div>
    </div>
  );
}
