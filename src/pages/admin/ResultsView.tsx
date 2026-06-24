import React from "react";
import { Trophy, Download, Printer } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { SectionHeader } from "@/components/SectionHeader";
import { Btn } from "@/components/Btn";
import { useElectionContext } from "@/contexts/ElectionContext";
import { buildChartData, COLORS } from "@/data/candidates";
import { exportToExcel, exportToPDF, printPage } from "@/utils/exportUtils";

// ─── Safe winner helper ──────────────────────────────────────────────────────
// Only returns a winner if at least one vote has been cast for that position.
function getSafeWinner(candidates: { name: string; votes: number; pct: number; photo?: string; id: number }[]) {
  if (candidates.length === 0) return null;
  const top = candidates.reduce((best, c) => (c.votes > best.votes ? c : best), candidates[0]);
  return top.votes > 0 ? top : null;
}

export function ResultsView() {
  const {
    chairs,
    leaders,
    votes,
    votingProgress,
    schoolSettings,
  } = useElectionContext();

  const chairChart = buildChartData(chairs);
  const leaderChart = buildChartData(leaders);

  const hasVotes = votes.length > 0;

  const chairWinner = getSafeWinner(chairs);
  const leaderWinner = getSafeWinner(leaders);

  const winnerCards = [
    { label: "Chairperson", winner: chairWinner },
    { label: "School Leader", winner: leaderWinner },
  ];

  return (
    <div className="space-y-6 max-w-7xl">

      {/* Winners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {winnerCards.map(({ label, winner }) => (
          <div
            key={label}
            className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white relative overflow-hidden shadow-sm"
          >
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
              <Trophy className="w-28 h-28 translate-x-6 -translate-y-6" />
            </div>

            <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-3">
              Winner — {label}
            </p>

            {winner ? (
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/20 flex-shrink-0 border-2 border-white/30">
                  <ImageWithFallback
                    src={winner.photo ?? ""}
                    alt={winner.name ?? "Candidate"}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold">
                    {winner.name ?? "Unknown"}
                  </h3>

                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-white font-bold text-lg">
                      {winner.votes} {winner.votes === 1 ? "vote" : "votes"}
                    </span>

                    <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-bold">
                      {winner.pct}%
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-4">
                <p className="text-blue-200 text-sm font-semibold">
                  {chairs.length === 0 && leaders.length === 0
                    ? "Loading candidates…"
                    : "No votes recorded yet"}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Vote Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { title: "Chairperson Votes", data: chairChart },
          { title: "School Leader Votes", data: leaderChart },
        ].map(({ title, data }) => {
          const maxVotes = Math.max(...data.map((d) => d.votes), 1);

          return (
            <div
              key={title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
            >
              <SectionHeader title={title} />

              {data.length === 0 ? (
                <p className="text-center text-slate-400 text-sm py-6">
                  No candidates loaded
                </p>
              ) : (
                <div className="space-y-3">
                  {data.map((entry, i) => (
                    <div
                      key={entry.name}
                      className="flex items-center gap-3"
                    >
                      <span className="text-xs text-slate-600 font-semibold w-24 truncate flex-shrink-0">
                        {entry.name}
                      </span>

                      <div className="flex-1 bg-slate-100 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all duration-500"
                          style={{
                            width: `${(entry.votes / maxVotes) * 100}%`,
                            backgroundColor: COLORS[i] ?? "#94a3b8",
                          }}
                        />
                      </div>

                      <span className="text-xs font-bold text-slate-700 w-8 text-right flex-shrink-0">
                        {entry.votes}
                      </span>
                    </div>
                  ))}

                  {!hasVotes && (
                    <p className="text-center text-slate-400 text-sm py-2">
                      No votes recorded yet
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[
          { title: "Chairperson Leaderboard", data: chairs },
          { title: "School Leader Leaderboard", data: leaders },
        ].map(({ title, data }) => (
          <div
            key={title}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <SectionHeader title={title} />

            {data.length === 0 ? (
              <p className="text-center text-slate-400 text-sm py-6">
                No candidates loaded
              </p>
            ) : (
              <div className="space-y-3">
                {[...data]
                  .sort((a, b) => b.votes - a.votes)
                  .map((c, i) => (
                    <div
                      key={c.id}
                      className="flex items-center gap-3"
                    >
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm font-extrabold flex-shrink-0
                        ${i === 0
                            ? "bg-amber-100 text-amber-700"
                            : i === 1
                              ? "bg-slate-100 text-slate-600"
                              : "bg-orange-50 text-orange-500"
                          }`}
                      >
                        {i + 1}
                      </span>

                      <ImageWithFallback
                        src={c?.photo ?? ""}
                        alt={c?.name ?? "Candidate"}
                        className="w-8 h-8 rounded-lg object-cover bg-slate-200 flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-slate-900 text-sm truncate">
                            {c?.name ?? "Unknown"}
                          </span>

                          <span className="text-slate-900 font-extrabold text-sm flex-shrink-0">
                            {c?.votes ?? 0}
                          </span>
                        </div>

                        <div className="mt-1.5 bg-slate-100 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full transition-all"
                            style={{
                              width: `${c?.pct ?? 0}%`,
                              backgroundColor: COLORS[i] ?? "#94a3b8",
                            }}
                          />
                        </div>
                      </div>

                      <span className="text-slate-400 text-xs flex-shrink-0 w-10 text-right font-semibold">
                        {c?.pct ?? 0}%
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Export Buttons */}
      <div className="flex flex-wrap gap-3">
        <Btn
          variant="ghost"
          disabled={!hasVotes}
          onClick={() =>
            exportToPDF(
              chairs,
              leaders,
              votes,
              schoolSettings.schoolName
            )
          }
        >
          <Download className="w-4 h-4" />
          Export PDF
        </Btn>

        <Btn
          variant="ghost"
          disabled={!hasVotes}
          onClick={() =>
            exportToExcel(
              chairs,
              leaders,
              votes,
              votingProgress,
              schoolSettings.schoolName
            )
          }
        >
          <Download className="w-4 h-4" />
          Export Excel
        </Btn>

        <Btn variant="ghost" disabled={!hasVotes} onClick={printPage}>
          <Printer className="w-4 h-4" />
          Print Report
        </Btn>
      </div>
    </div>
  );
}
