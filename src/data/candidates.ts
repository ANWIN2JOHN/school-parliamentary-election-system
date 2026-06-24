import type { Candidate, CandidateChartEntry, VotingProgressEntry } from "@/types";

import photoDheeptha from "@/imports/DHEEPTHA_A_R.jpg";
import photoFellah from "@/imports/FELLAH_KHADEEJA_PP.jpg";
import photoNiranjan from "@/imports/NIRANJAN_V.jpg";
import photoNia from "@/imports/NIA_MATHEWS.jpg";
import photoHata from "@/imports/HATA_FATHIMA.jpg";
import photoMehna from "@/imports/MEHNA_FATIN.jpg";
import photoCharunainika from "@/imports/CHARUNAINIKA_A_L.jpg";
import photoReyan from "@/imports/REYAN_KHADEEJA_M.jpg";

// ─── CHAIRPERSON CANDIDATES ────────────────────────────────────────────────

export const CHAIRS: Candidate[] = [
  {
    id: 1, name: "Dheeptha A R", class: "Form 4A", panel: "Unity Panel",
    position: "Chairperson", photo: photoDheeptha as unknown as string,
    votes: 0, pct: 0, symbolKey: "whistle",
    manifesto: "Building a united, inclusive school community where every voice matters and every student thrives.",
  },
  {
    id: 2, name: "Fellah Khadeeja P P", class: "Form 5B", panel: "Progress Panel",
    position: "Chairperson", photo: photoFellah as unknown as string,
    votes: 0, pct: 0, symbolKey: "pen",
    manifesto: "Driving academic excellence and extracurricular growth for every student in our school community.",
  },
  {
    id: 3, name: "Niranjan V", class: "Form 4C", panel: "Horizon Panel",
    position: "Chairperson", photo: photoNiranjan as unknown as string,
    votes: 0, pct: 0, symbolKey: "mouse",
    manifesto: "Harnessing innovation and technology to transform our school experience for all learners.",
  },
  {
    id: 7, name: "Nia Mathews", class: "Form 3B", panel: "Future Panel",
    position: "Chairperson", photo: photoNia as unknown as string,
    votes: 0, pct: 0, symbolKey: "keys",
    manifesto: "Creating equal opportunities and amplifying every student voice for a stronger school parliament.",
  },
];

// ─── SCHOOL LEADER CANDIDATES ──────────────────────────────────────────────

export const LEADERS: Candidate[] = [
  {
    id: 4, name: "Hata Fathima", class: "Form 3A", panel: "Unity Panel",
    position: "School Leader", photo: photoHata as unknown as string,
    votes: 0, pct: 0, symbolKey: "torch",
    manifesto: "Empowering students through leadership, wellness, and community service initiatives across all forms.",
  },
  {
    id: 5, name: "Mehna Fatin", class: "Form 5A", panel: "Progress Panel",
    position: "School Leader", photo: photoMehna as unknown as string,
    votes: 0, pct: 0, symbolKey: "book",
    manifesto: "Strengthening student-faculty partnerships and transparent communication for a better school tomorrow.",
  },
  {
    id: 6, name: "Charunainika A L", class: "Form 4B", panel: "Horizon Panel",
    position: "School Leader", photo: photoCharunainika as unknown as string,
    votes: 0, pct: 0, symbolKey: "telescope",
    manifesto: "Championing diversity, creative expression, and mental health awareness in our school environment.",
  },
  {
    id: 8, name: "Reyan Khadeeja M", class: "Form 4A", panel: "Future Panel",
    position: "School Leader", photo: photoReyan as unknown as string,
    votes: 0, pct: 0, symbolKey: "shield",
    manifesto: "Bridging gaps between students and administration through open dialogue and collaborative leadership.",
  },
];

// ─── DERIVED DATA ──────────────────────────────────────────────────────────

export const ALL_CANDIDATES: Candidate[] = [...CHAIRS, ...LEADERS];

export const DEFAULT_VOTING_PROGRESS: VotingProgressEntry[] = [
  { time: "8 AM", votes: 0 },
  { time: "9 AM", votes: 0 },
  { time: "10 AM", votes: 0 },
  { time: "11 AM", votes: 0 },
  { time: "12 PM", votes: 0 },
  { time: "1 PM", votes: 0 },
  { time: "2 PM", votes: 0 },
  { time: "3 PM", votes: 0 },
];

export const COLORS = ["#2563EB", "#10B981", "#F59E0B", "#8B5CF6"];

// ─── CHART HELPERS ─────────────────────────────────────────────────────────

export function buildChartData(candidates: Candidate[]): CandidateChartEntry[] {
  return candidates.map((c) => ({
    name: c.name.split(" ")[0],
    votes: c.votes,
    pct: c.pct,
  }));
}

export const TOTAL_STUDENTS = 1200;
