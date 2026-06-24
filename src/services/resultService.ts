/**
 * Result Service
 *
 * Handles election results aggregation and reporting.
 * Currently uses local state via ElectionContext.
 * Ready to swap to Supabase queries when backend is integrated.
 */

import type { Candidate, CandidateChartEntry } from "@/types";

// ─── Local helpers ──────────────────────────────────────────────────────────

export function getWinner(candidates: Candidate[]): Candidate | null {
  if (candidates.length === 0) return null;
  return candidates.reduce((best, c) => (c.votes > best.votes ? c : best), candidates[0]);
}

export function buildChartData(candidates: Candidate[]): CandidateChartEntry[] {
  return candidates.map(c => ({
    name: c.name.split(" ")[0],
    votes: c.votes,
    pct: c.pct,
  }));
}

export function getRankings(candidates: Candidate[]): Candidate[] {
  return [...candidates].sort((a, b) => b.votes - a.votes);
}

// ─── Supabase-ready query functions (uncomment when Supabase is set up) ────

/*
import { supabase } from './supabase';

export async function fetchResults(): Promise<{
  chairpersonResults: CandidateChartEntry[];
  leaderResults: CandidateChartEntry[];
}> {
  // Aggregate votes from the votes table grouped by candidate
  const { data: votes, error } = await supabase
    .from('votes')
    .select('chairperson_id, school_leader_id');

  if (error) throw error;

  // Count and build chart data from vote records
  // Implementation depends on your specific aggregation needs
  return {
    chairpersonResults: [],
    leaderResults: [],
  };
}

export async function fetchVotingProgress(): Promise<{ time: string; votes: number }[]> {
  const { data, error } = await supabase
    .rpc('get_voting_progress_by_hour');

  if (error) throw error;
  return data ?? [];
}
*/
