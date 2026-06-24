import React from "react";
import { Calendar, X, Zap, Check, RefreshCw } from "lucide-react";
import { Field } from "@/components/Field";
import { Btn } from "@/components/Btn";
import { SectionHeader } from "@/components/SectionHeader";
import { useElectionContext } from "@/contexts/ElectionContext";

export function ElectionsView() {
  const { election, toggleElection, updateElection } = useElectionContext();
  const electionOpen = election.isOpen;

  const handleSave = () => {
    // Currently saves to context state — will save to Supabase in future
  };

  const handleReset = () => {
    updateElection({
      name: "2026 Student Parliament Elections",
      date: "",
      startTime: "",
      endTime: "",
      school: "Silver Hills Higher Secondary School",
    });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className={`rounded-2xl p-6 ${electionOpen ? "bg-gradient-to-r from-emerald-500 to-emerald-600" : "bg-gradient-to-r from-slate-600 to-slate-700"} text-white shadow-sm`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${electionOpen ? "bg-white animate-pulse" : "bg-slate-400"}`} />
              <span className="text-sm font-bold opacity-90">{electionOpen ? "Election Active" : "Election Closed"}</span>
            </div>
            <h2 className="text-xl font-extrabold">{election.name}</h2>
            <p className="opacity-75 text-sm mt-1 font-medium">{election.school}</p>
          </div>
          <Calendar className="w-12 h-12 opacity-20 hidden sm:block" />
        </div>
        <div className="flex flex-wrap gap-3 mt-5">
          <button onClick={toggleElection}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-sm font-bold transition flex items-center gap-2">
            {electionOpen ? <><X className="w-4 h-4" /> Close Voting</> : <><Zap className="w-4 h-4" /> Open Voting</>}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <SectionHeader title="Election Settings" subtitle="Configure election parameters" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Field label="Election Name" placeholder="2026 Student Parliament Elections" value={election.name} onChange={e => updateElection({ name: e.target.value })} />
          </div>
          <Field label="Election Date" type="date" value={election.date} onChange={e => updateElection({ date: e.target.value })} />
          <Field label="School / Organiser" placeholder="Silver Hills Higher Secondary School" value={election.school} onChange={e => updateElection({ school: e.target.value })} />
          <Field label="Start Time" type="time" value={election.startTime} onChange={e => updateElection({ startTime: e.target.value })} />
          <Field label="End Time" type="time" value={election.endTime} onChange={e => updateElection({ endTime: e.target.value })} />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm font-semibold text-slate-700">Positions</label>
          <div className="flex flex-wrap gap-2">
            {["Chairperson", "School Leader"].map(p => (
              <label key={p} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 text-sm font-medium text-slate-700">
                <input type="checkbox" defaultChecked className="accent-blue-600" /> {p}
              </label>
            ))}
          </div>
        </div>
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap gap-3">
          <Btn variant="primary" onClick={handleSave}><Check className="w-4 h-4" />Save Settings</Btn>
          <Btn variant="ghost" onClick={handleReset}><RefreshCw className="w-4 h-4" />Reset</Btn>
        </div>
      </div>
    </div>
  );
}
