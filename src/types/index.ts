import type React from "react";

// ─── Core Domain Types ──────────────────────────────────────────────────────

export type Page = "login" | "admin" | "student-voting";

export type AdminTab =
  | "dashboard"
  | "elections"
  | "candidates"
  | "results"
  | "settings";

export type VotingStep = "vote" | "confirm" | "success";

// ─── Candidate ──────────────────────────────────────────────────────────────

export interface Candidate {
  id: number;
  supabaseId?: string;
  name: string;
  class: string;
  panel: string;
  position: string;
  photo: string;
  votes: number;
  pct: number;
  manifesto: string;
  symbolKey: string;
}

export interface CandidateChartEntry {
  name: string;
  votes: number;
  pct: number;
}

// ─── Election ───────────────────────────────────────────────────────────────

export interface Election {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  school: string;
  positions: string[];
  isOpen: boolean;
  createdAt: string;
}

// ─── Vote ───────────────────────────────────────────────────────────────────

// ─── Vote ───────────────────────────────────────────────────────────────────

export interface VoteRecord {
  id: string;

  chairpersonId: number;
  schoolLeaderId: number;

  chairpersonSupabaseId?: string;
  schoolLeaderSupabaseId?: string;

  timestamp: string;
  reference: string;
}

// ─── Voting Progress ────────────────────────────────────────────────────────

export interface VotingProgressEntry {
  time: string;
  votes: number;
}

// ─── Settings ───────────────────────────────────────────────────────────────

export interface SchoolSettings {
  schoolName: string;
  schoolCode: string;
  address: string;
  contactEmail: string;
}

export interface BrandingSettings {
  systemTitle: string;
  footerText: string;
}

export interface ThemeColor {
  name: string;
  hex: string;
}

// ─── Election Context State ─────────────────────────────────────────────────

export interface ElectionState {
  candidates: Candidate[];
  votes: VoteRecord[];
  election: Election;
  schoolSettings: SchoolSettings;
  brandingSettings: BrandingSettings;
  selectedThemeColor: string;
}

// ─── Symbol Definition ──────────────────────────────────────────────────────

export interface SymbolDef {
  label: string;
  color: string;
  bg: string;
  svg: React.ReactNode;
}

// ─── Navigation ─────────────────────────────────────────────────────────────

export interface NavItem {
  id: AdminTab;
  label: string;
  icon: React.ElementType;
}

// ─── Supabase Database Types ────────────────────────────────────────────────

export interface DbCandidate {
  id: string; // UUID

  name: string;
  class: string;
  panel: string;

  position: string;

  photo_url: string;
  manifesto: string;

  symbol: string;

  created_at: string;
}

export interface DbVote {
  id: string;

  chairperson_candidate_id: string;
  school_leader_candidate_id: string;

  vote_reference: string;

  created_at: string;
}

export interface DbElection {
  id: string;

  name: string;
  date: string;

  start_time: string;
  end_time: string;

  school: string;

  positions: string[];

  is_open: boolean;

  created_at: string;
}
