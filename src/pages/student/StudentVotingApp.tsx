import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  GraduationCap, LogOut, Vote, Check, Shield, ArrowLeft,
  Users, CheckCircle2,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Badge } from "@/components/Badge";
import { Btn } from "@/components/Btn";
import { CandidateVoteCard } from "@/components/CandidateVoteCard";
import { useElectionContext } from "@/contexts/ElectionContext";
import { SuccessScreen } from "./SuccessScreen";
import type { VotingStep } from "@/types";

export function StudentVotingApp() {
  const navigate = useNavigate();
  const { chairs, leaders, castVote, election } = useElectionContext();
  const [step, setStep] = useState<VotingStep>("vote");
  const [selectedChair, setSelectedChair] = useState<number | null>(null);
  const [selectedLeader, setSelectedLeader] = useState<number | null>(null);
  const [voteRef, setVoteRef] = useState("");
  const [voteTimestamp, setVoteTimestamp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const chairPick = chairs.find(c => c.id === selectedChair) ?? null;
  const leaderPick = leaders.find(c => c.id === selectedLeader) ?? null;
  const canSubmit = selectedChair !== null && selectedLeader !== null;

  const handleExit = () => {
    navigate("/");
  };

  const handleConfirmVote = async () => {
    if (selectedChair !== null && selectedLeader !== null && !isSubmitting) {
      setIsSubmitting(true);
      try {
        const ref = await castVote(selectedChair, selectedLeader);
        setVoteRef(ref);
        setVoteTimestamp(new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
          month: "long",
          day: "numeric",
          year: "numeric",
        }));
        setStep("success");
      } catch (error) {
        console.error("Failed to cast vote:", error);
        alert("Failed to submit vote. Please try again. Error: " + (error instanceof Error ? error.message : String(error)));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReset = () => {
    navigate("/");
  };

  if (step === "success") {
    return <SuccessScreen onDone={handleReset} voteRef={voteRef} voteTimestamp={voteTimestamp} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm leading-tight">Silver Hills Higher Secondary School</p>
              <p className="text-slate-400 text-xs font-medium">2026 Student Parliament Elections</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-emerald-700 text-xs font-bold">Election Open</span>
            </div>
            <button onClick={handleExit} className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition" title="Exit">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        {/* Section 1 — Chairperson */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white text-sm font-extrabold flex-shrink-0">1</div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Vote for Chairperson</h2>
              <p className="text-slate-400 text-sm font-medium">Select one candidate</p>
            </div>
            {selectedChair !== null && <Badge color="blue"><Check className="w-3 h-3" />Selected</Badge>}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {chairs.map(c => (
              <CandidateVoteCard key={c.id} candidate={c}
                selected={selectedChair === c.id}
                onSelect={() => setSelectedChair(c.id === selectedChair ? null : c.id)}
                accent="blue" />
            ))}
          </div>
        </section>

        {/* Section 2 — School Leader */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-sm font-extrabold flex-shrink-0">2</div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Vote for School Leader</h2>
              <p className="text-slate-400 text-sm font-medium">Select one candidate</p>
            </div>
            {selectedLeader !== null && <Badge color="green"><Check className="w-3 h-3" />Selected</Badge>}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {leaders.map(c => (
              <CandidateVoteCard key={c.id} candidate={c}
                selected={selectedLeader === c.id}
                onSelect={() => setSelectedLeader(c.id === selectedLeader ? null : c.id)}
                accent="green" />
            ))}
          </div>
        </section>

        {/* Summary & submit */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-3 text-sm">Your Selection Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {[
              { label: "Chairperson", pick: chairPick, color: "blue" },
              { label: "School Leader", pick: leaderPick, color: "green" },
            ].map(({ label, pick, color }) => (
              <div key={label}
                className={`flex items-center gap-3 p-3 rounded-xl border ${pick ? (color === "blue" ? "bg-blue-50 border-blue-200" : "bg-emerald-50 border-emerald-200") : "bg-slate-50 border-slate-200"}`}>
                {pick ? (
                  <>
                    <ImageWithFallback src={pick.photo} alt={pick.name} className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-500 font-medium">{label}</p>
                      <p className="font-bold text-slate-900 text-sm truncate">{pick.name}</p>
                    </div>
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${color === "blue" ? "text-blue-600" : "text-emerald-600"}`} />
                  </>
                ) : (
                  <>
                    <div className="w-9 h-9 bg-slate-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-slate-400" />
                    </div>
                    <p className="text-slate-400 text-sm font-medium">No {label.toLowerCase()} selected</p>
                  </>
                )}
              </div>
            ))}
          </div>
          <Btn variant="primary" size="lg" className="w-full justify-center" disabled={!canSubmit} onClick={() => setStep("confirm")}>
            <Vote className="w-5 h-5" /> Submit My Vote
          </Btn>
          {!canSubmit && (
            <p className="text-center text-slate-400 text-xs mt-2 font-medium">Select one candidate for each position to continue</p>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      {step === "confirm" && chairPick && leaderPick && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Confirm Your Vote</h3>
              <p className="text-slate-500 text-sm mt-1 font-medium">This action cannot be undone. Review your selections carefully.</p>
            </div>
            <div className="space-y-3 mb-6">
              {[{ label: "Chairperson", candidate: chairPick }, { label: "School Leader", candidate: leaderPick }].map(({ label, candidate }) => (
                <div key={label} className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
                  <ImageWithFallback src={candidate?.photo ?? ""} alt={candidate?.name ?? "Candidate"} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-semibold">{label}</p>
                    <p className="font-extrabold text-slate-900 truncate">{candidate?.name ?? "No Candidate"}</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Btn variant="ghost" className="flex-1 justify-center" onClick={() => setStep("vote")} disabled={isSubmitting}>
                <ArrowLeft className="w-4 h-4" /> Change Selection
              </Btn>
              <Btn variant="primary" className="flex-1 justify-center" onClick={handleConfirmVote} disabled={isSubmitting}>
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" /> Confirm Vote
                  </>
                )}
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
