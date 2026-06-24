import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { submitVote, fetchVotes, clearAllVotes } from "@/services/voteService";
import { fetchCandidates } from "@/services/candidateService";
import type {
  Candidate, VoteRecord, Election, SchoolSettings,
  BrandingSettings, VotingProgressEntry,
} from "@/types";
import {
  DEFAULT_VOTING_PROGRESS,
  TOTAL_STUDENTS,
} from "@/data/candidates";

// ─── Context Value ──────────────────────────────────────────────────────────
interface ElectionContextValue {
  // Candidates
  chairs: Candidate[];
  leaders: Candidate[];
  allCandidates: Candidate[];

  addCandidate: (
    candidate: Omit<Candidate, "id" | "votes" | "pct">
  ) => void;

  updateCandidate: (
    id: number,
    updates: Partial<Candidate>
  ) => void;

  deleteCandidate: (id: number) => void;

  // Election
  election: Election;

  toggleElection: () => void;

  updateElection: (
    updates: Partial<Election>
  ) => void;

  // Voting
  votes: VoteRecord[];
  totalVotes: number;
  turnoutPct: number;

  castVote: (
    chairpersonId: number,
    schoolLeaderId: number
  ) => Promise<string>;

  votingProgress: VotingProgressEntry[];

  // Settings
  schoolSettings: SchoolSettings;

  updateSchoolSettings: (
    updates: Partial<SchoolSettings>
  ) => void;

  brandingSettings: BrandingSettings;

  updateBrandingSettings: (
    updates: Partial<BrandingSettings>
  ) => void;

  selectedThemeColor: string;

  setSelectedThemeColor: (
    hex: string
  ) => void;

  // Reset
  resetSystem: () => Promise<void>;
}

const ElectionContext = createContext<ElectionContextValue | null>(null);

// ─── Default Values ─────────────────────────────────────────────────────────

const DEFAULT_ELECTION: Election = {
  id: "election-2026",
  name: "2026 Student Parliament Elections",
  date: "",
  startTime: "",
  endTime: "",
  school: "Silver Hills Higher Secondary School",
  positions: ["Chairperson", "School Leader"],
  isOpen: true,
  createdAt: new Date().toISOString(),
};

const DEFAULT_SCHOOL_SETTINGS: SchoolSettings = {
  schoolName: "Silver Hills Higher Secondary School",
  schoolCode: "GIS-001",
  address: "123 Education Avenue, City",
  contactEmail: "admin@greenfield.edu",
};

const DEFAULT_BRANDING_SETTINGS: BrandingSettings = {
  systemTitle: "School Parliamentary Election System",
  footerText: "Powered by Silver Hills HSS",
};

// ─── Helper: generate vote reference ────────────────────────────────────────

let voteCounter = 0;
function generateVoteReference(): string {
  voteCounter += 1;
  return `SHSS-2026-${String(voteCounter).padStart(3, "0")}`;
}

// ─── Helper: get current hour bucket ────────────────────────────────────────

function getCurrentHourBucket(): string {
  const hour = new Date().getHours();
  if (hour < 12) {
    return hour === 0 ? "12 AM" : `${hour} AM`;
  }
  const h12 = hour === 12 ? 12 : hour - 12;
  return `${h12} PM`;
}

function getHourBucketForTimestamp(timestampStr: string): string {
  try {
    const date = new Date(timestampStr);
    const hour = date.getHours();
    if (hour < 12) {
      return hour === 0 ? "12 AM" : `${hour} AM`;
    }
    const h12 = hour === 12 ? 12 : hour - 12;
    return `${h12} PM`;
  } catch (e) {
    return "9 AM";
  }
}

// ─── Provider ───────────────────────────────────────────────────────────────

export function ElectionProvider({ children }: { children: React.ReactNode }) {
  const [chairs, setChairs] = useState<Candidate[]>([]);
  const [leaders, setLeaders] = useState<Candidate[]>([]);
  const [election, setElection] = useState<Election>({ ...DEFAULT_ELECTION });
  const [votes, setVotes] = useState<VoteRecord[]>([]);
  const [votingProgress, setVotingProgress] = useState<VotingProgressEntry[]>(
    () => DEFAULT_VOTING_PROGRESS.map(v => ({ ...v }))
  );
  const [schoolSettings, setSchoolSettings] = useState<SchoolSettings>({ ...DEFAULT_SCHOOL_SETTINGS });
  const [brandingSettings, setBrandingSettings] = useState<BrandingSettings>({ ...DEFAULT_BRANDING_SETTINGS });
  const [selectedThemeColor, setSelectedThemeColor] = useState("#2563EB");

  useEffect(() => {
    async function loadData() {
      try {
        const [candidates, dbVotes] = await Promise.all([
          fetchCandidates(),
          fetchVotes(),
        ]);

        // Convert DB votes → VoteRecord
        const voteRecords: VoteRecord[] = dbVotes.map(v => ({
          id: v.id,
          chairpersonId: 0,
          schoolLeaderId: 0,
          chairpersonSupabaseId: v.chairperson_candidate_id,
          schoolLeaderSupabaseId: v.school_leader_candidate_id,
          timestamp: v.created_at,
          reference: v.vote_reference,
        }));

        // Map candidate UUID → local numeric ID
        const candidateMap = new Map<string, number>();
        candidates.forEach(c => {
          if (c.supabaseId) candidateMap.set(c.supabaseId, c.id);
        });

        // Resolve UUIDs back to local IDs
        const resolvedVotes = voteRecords.map(v => ({
          ...v,
          chairpersonId: v.chairpersonSupabaseId
            ? (candidateMap.get(v.chairpersonSupabaseId) ?? 0)
            : 0,
          schoolLeaderId: v.schoolLeaderSupabaseId
            ? (candidateMap.get(v.schoolLeaderSupabaseId) ?? 0)
            : 0,
        }));

        // Count votes per candidate (safe when resolvedVotes is empty)
        const chairVotesMap: Record<number, number> = {};
        const leaderVotesMap: Record<number, number> = {};

        resolvedVotes.forEach(v => {
          if (v.chairpersonId) {
            chairVotesMap[v.chairpersonId] = (chairVotesMap[v.chairpersonId] ?? 0) + 1;
          }
          if (v.schoolLeaderId) {
            leaderVotesMap[v.schoolLeaderId] = (leaderVotesMap[v.schoolLeaderId] ?? 0) + 1;
          }
        });

        // Apply vote counts — defaults to 0 if no votes exist
        const updatedCandidates = candidates.map(c => ({
          ...c,
          votes:
            c.position.toLowerCase() === "chairperson"
              ? (chairVotesMap[c.id] ?? 0)
              : (leaderVotesMap[c.id] ?? 0),
        }));

        const finalChairs = updatedCandidates.filter(
          c => c.position.toLowerCase() === "chairperson"
        );
        const finalLeaders = updatedCandidates.filter(
          c => c.position.toLowerCase() === "school leader"
        );

        // Calculate percentages safely
        const totalChairVotes = finalChairs.reduce((sum, c) => sum + c.votes, 0);
        const totalLeaderVotes = finalLeaders.reduce((sum, c) => sum + c.votes, 0);

        setChairs(
          finalChairs.map(c => ({
            ...c,
            pct: totalChairVotes > 0 ? Math.round((c.votes / totalChairVotes) * 100) : 0,
          }))
        );

        setLeaders(
          finalLeaders.map(c => ({
            ...c,
            pct: totalLeaderVotes > 0 ? Math.round((c.votes / totalLeaderVotes) * 100) : 0,
          }))
        );

        // Safe with empty array — setVotes([]) is perfectly fine
        setVotes(resolvedVotes);

        // Rebuild hourly progress from resolved votes
        const progressMap: Record<string, number> = {};
        resolvedVotes.forEach(v => {
          const date = new Date(v.timestamp);
          const h = date.getHours();
          const bucket = h < 12
            ? `${h === 0 ? 12 : h} AM`
            : `${h === 12 ? 12 : h - 12} PM`;
          progressMap[bucket] = (progressMap[bucket] ?? 0) + 1;
        });

        setVotingProgress(prev =>
          prev.map(entry => ({ ...entry, votes: progressMap[entry.time] ?? 0 }))
        );

        console.log(
          `Loaded ${candidates.length} candidates and ${resolvedVotes.length} votes from Supabase`
        );
      } catch (error) {
        // On any error: keep candidates loaded if possible, clear votes cleanly
        console.error("Failed to load data from Supabase:", error);

        // Attempt to still load candidates alone so the UI doesn't crash
        try {
          const candidates = await fetchCandidates();
          const finalChairs = candidates.filter(
            c => c.position.toLowerCase() === "chairperson"
          );
          const finalLeaders = candidates.filter(
            c => c.position.toLowerCase() === "school leader"
          );
          setChairs(finalChairs.map(c => ({ ...c, votes: 0, pct: 0 })));
          setLeaders(finalLeaders.map(c => ({ ...c, votes: 0, pct: 0 })));
        } catch {
          // Absolute fallback — leave chairs/leaders as empty arrays
          setChairs([]);
          setLeaders([]);
        }

        setVotes([]);
        setVotingProgress(DEFAULT_VOTING_PROGRESS.map(v => ({ ...v, votes: 0 })));
      }
    }

    loadData();
  }, []);

  // ── Derived ─────────────────────────────────────────────────────────────

  const allCandidates = useMemo(() => [...chairs, ...leaders], [chairs, leaders]);
  const totalVotes = votes.length;
  const turnoutPct = TOTAL_STUDENTS > 0 ? Math.round((totalVotes / TOTAL_STUDENTS) * 100) : 0;

  // ── Recalculate percentages ─────────────────────────────────────────────

  const recalcPercentages = useCallback((
    updatedChairs: Candidate[],
    updatedLeaders: Candidate[],
    updatedVotes: VoteRecord[]
  ) => {
    const totalChairVotes = updatedChairs.reduce((sum, c) => sum + c.votes, 0);
    const totalLeaderVotes = updatedLeaders.reduce((sum, c) => sum + c.votes, 0);

    setChairs(updatedChairs.map(c => ({
      ...c,
      pct: totalChairVotes > 0 ? Math.round((c.votes / totalChairVotes) * 100) : 0,
    })));
    setLeaders(updatedLeaders.map(c => ({
      ...c,
      pct: totalLeaderVotes > 0 ? Math.round((c.votes / totalLeaderVotes) * 100) : 0,
    })));
    setVotes(updatedVotes);
  }, []);

  // ── Cast Vote ───────────────────────────────────────────────────────────
  const castVote = useCallback(
    async (
      chairpersonId: number,
      schoolLeaderId: number
    ): Promise<string> => {
      const chairCandidate = chairs.find(
        c => c.id === chairpersonId
      );


      const leaderCandidate = leaders.find(
        c => c.id === schoolLeaderId
      );

      if (!chairCandidate?.supabaseId) {
        throw new Error(
          "Chairperson Supabase ID not found"
        );
      }

      if (!leaderCandidate?.supabaseId) {
        throw new Error(
          "School Leader Supabase ID not found"
        );
      }

      const dbVote = await submitVote(
        chairCandidate.supabaseId,
        leaderCandidate.supabaseId
      );

      const record: VoteRecord = {
        id: dbVote.id,

        chairpersonId,
        schoolLeaderId,

        chairpersonSupabaseId:
          chairCandidate.supabaseId,

        schoolLeaderSupabaseId:
          leaderCandidate.supabaseId,

        timestamp: dbVote.created_at,

        reference: dbVote.vote_reference,
      };

      const newChairs = chairs.map(c =>
        c.id === chairpersonId
          ? { ...c, votes: c.votes + 1 }
          : c
      );

      const newLeaders = leaders.map(c =>
        c.id === schoolLeaderId
          ? { ...c, votes: c.votes + 1 }
          : c
      );

      const newVotes = [...votes, record];

      recalcPercentages(
        newChairs,
        newLeaders,
        newVotes
      );

      const bucket = getCurrentHourBucket();

      setVotingProgress(prev =>
        prev.map(entry =>
          entry.time === bucket
            ? {
              ...entry,
              votes: entry.votes + 1,
            }
            : entry
        )
      );

      return dbVote.vote_reference;

    },
    [
      chairs,
      leaders,
      votes,
      recalcPercentages,
    ]
  );


  // ── Toggle Election ─────────────────────────────────────────────────────

  const toggleElection = useCallback(() => {
    setElection(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const updateElection = useCallback((updates: Partial<Election>) => {
    setElection(prev => ({ ...prev, ...updates }));
  }, []);

  // ── Candidate CRUD ──────────────────────────────────────────────────────

  const addCandidate = useCallback((candidate: Omit<Candidate, "id" | "votes" | "pct">) => {
    const maxId = Math.max(...[...chairs, ...leaders].map(c => c.id), 0);
    const newCandidate: Candidate = {
      ...candidate,
      id: maxId + 1,
      votes: 0,
      pct: 0,
    };
    if (candidate.position === "Chairperson") {
      setChairs(prev => [...prev, newCandidate]);
    } else {
      setLeaders(prev => [...prev, newCandidate]);
    }
  }, [chairs, leaders]);

  const updateCandidate = useCallback((id: number, updates: Partial<Candidate>) => {
    setChairs(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    setLeaders(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const deleteCandidate = useCallback((id: number) => {
    setChairs(prev => prev.filter(c => c.id !== id));
    setLeaders(prev => prev.filter(c => c.id !== id));
  }, []);

  // ── Settings ────────────────────────────────────────────────────────────

  const updateSchoolSettings = useCallback((updates: Partial<SchoolSettings>) => {
    setSchoolSettings(prev => ({ ...prev, ...updates }));
  }, []);

  const updateBrandingSettings = useCallback((updates: Partial<BrandingSettings>) => {
    setBrandingSettings(prev => ({ ...prev, ...updates }));
  }, []);

  // ── Reset ───────────────────────────────────────────────────────────────
  // Clears only the votes table. Candidates are preserved as-is from Supabase.

  const resetSystem = useCallback(async () => {
    try {
      // 1. Delete all rows from Supabase votes table
      await clearAllVotes();

      // 2. Zero out vote counts & percentages on currently-loaded candidates
      setChairs(prev => prev.map(c => ({ ...c, votes: 0, pct: 0 })));
      setLeaders(prev => prev.map(c => ({ ...c, votes: 0, pct: 0 })));

      // 3. Clear local vote records
      setVotes([]);

      // 4. Reset hourly progress back to zero
      setVotingProgress(prev => prev.map(v => ({ ...v, votes: 0 })));

      // 5. Reset in-memory vote counter
      voteCounter = 0;
    } catch (error) {
      console.error("Failed to reset votes in Supabase:", error);
      throw error;
    }
  }, []);

  // ── Value ───────────────────────────────────────────────────────────────

  const value: ElectionContextValue = {
    chairs, leaders, allCandidates,
    addCandidate, updateCandidate, deleteCandidate,
    election, toggleElection, updateElection,
    votes, totalVotes, turnoutPct, castVote, votingProgress,
    schoolSettings, updateSchoolSettings,
    brandingSettings, updateBrandingSettings,
    selectedThemeColor, setSelectedThemeColor,
    resetSystem,
  };

  return (
    <ElectionContext.Provider value={value}>
      {children}
    </ElectionContext.Provider>
  );
}

export function useElectionContext(): ElectionContextValue {
  const ctx = useContext(ElectionContext);
  if (!ctx) throw new Error("useElectionContext must be used within an ElectionProvider");
  return ctx;
}