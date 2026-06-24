import React from "react";
import { Award, CheckCircle2, TrendingUp, Clock, Download } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { SectionHeader } from "@/components/SectionHeader";
import { DonutChart } from "@/charts/DonutChart";
import { VotingSparkline } from "@/charts/VotingSparkline";
import { useElectionContext } from "@/contexts/ElectionContext";
import { buildChartData, COLORS, TOTAL_STUDENTS } from "@/data/candidates";
import { Btn } from "@/components/Btn";
import { exportToExcel, exportToPDF } from "@/utils/exportUtils";

export function DashboardView() {
  const { chairs, leaders, totalVotes, turnoutPct, votingProgress, votes, schoolSettings } = useElectionContext();

  const chairChart = buildChartData(chairs);
  const leaderChart = buildChartData(leaders);

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Export Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-sm font-bold text-slate-800">Quick Reports</h2>
          <p className="text-xs text-slate-400 font-medium">Download the latest election standings and vote logs</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Btn variant="ghost" size="sm" className="bg-slate-50 hover:bg-slate-100 text-xs" onClick={() => exportToPDF(chairs, leaders, votes, schoolSettings.schoolName)}>
            <Download className="w-3.5 h-3.5" /> PDF Report
          </Btn>
          <Btn variant="ghost" size="sm" className="bg-slate-50 hover:bg-slate-100 text-xs" onClick={() => exportToExcel(chairs, leaders, votes, votingProgress, schoolSettings.schoolName)}>
            <Download className="w-3.5 h-3.5" /> Excel Spreadsheet
          </Btn>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={<Award className="w-5 h-5" />} label="Total Candidates" value={chairs.length + leaders.length} sub="2 positions" color="purple" />
        <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Votes Cast" value={totalVotes} sub={totalVotes === 0 ? "Election not started" : `${TOTAL_STUDENTS - totalVotes} remaining`} color="green" />
        <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Voter Turnout" value={`${turnoutPct}%`} sub={totalVotes === 0 ? "Awaiting election" : `${totalVotes} of ${TOTAL_STUDENTS} students`} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <SectionHeader title="Voting Progress" subtitle="Cumulative votes cast by hour today" />
          <VotingSparkline data={votingProgress} />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <SectionHeader title="Voter Turnout" subtitle="Overall participation" />
          <div className="flex items-center justify-center">
            <DonutChart pct={turnoutPct} voted={totalVotes} total={TOTAL_STUDENTS} />
          </div>
          <div className="flex justify-center gap-5 mt-1">
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 block" />Voted ({totalVotes})
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200 block" />Pending ({TOTAL_STUDENTS - totalVotes})
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <SectionHeader title="Candidate Vote Distribution" subtitle="Live standings by position" />
          <div className="space-y-6">
            {[{ label: "Chairperson", data: chairChart }, { label: "School Leader", data: leaderChart }].map(({ label, data }) => {
              // Guard: Math.max on empty array → -Infinity; default to 1 so bars show 0%
              const maxVotes = data.length > 0 ? Math.max(...data.map(d => d.votes), 0) : 0;
              return (
                <div key={label}>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">{label}</p>
                  {data.length === 0 ? (
                    <p className="text-slate-400 text-xs py-2">No candidates loaded</p>
                  ) : (
                    <div className="space-y-2.5">
                      {data.map((entry, i) => (
                        <div key={entry.name ?? i} className="flex items-center gap-3">
                          <span className="text-xs text-slate-600 font-semibold w-24 truncate flex-shrink-0">{entry.name ?? "—"}</span>
                          <div className="flex-1 bg-slate-100 rounded-full h-2.5">
                            <div
                              className="h-2.5 rounded-full transition-all duration-500"
                              style={{ width: maxVotes > 0 ? `${(entry.votes / maxVotes) * 100}%` : "0%", backgroundColor: COLORS[i] ?? "#94a3b8" }}
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-700 w-8 text-right flex-shrink-0">{entry.votes}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <SectionHeader title="Recent Activity" />
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-slate-500 text-sm font-medium">
              {totalVotes > 0 ? `${totalVotes} vote${totalVotes !== 1 ? "s" : ""} recorded` : "No activity yet"}
            </p>
            <p className="text-slate-400 text-xs mt-1">
              {totalVotes > 0 ? "Election is in progress" : "Activity will appear here once the election begins"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
