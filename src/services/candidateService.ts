/**

* Candidate Service
*
* Handles all candidate-related data operations.
* Supabase-ready implementation.
  */

import type { Candidate, DbCandidate } from "@/types";
import { supabase } from "./supabase";
import { PHOTO_MAP } from "@/data/photoMap";

// ─── Fetch Candidates ───────────────────────────────────────────────────────

export async function fetchCandidates(): Promise<Candidate[]> {
  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .order("position")
    .order("name");

  if (error) throw error;

  return (data as DbCandidate[]).map(mapDbToCandidate);
}

// ─── Create Candidate ───────────────────────────────────────────────────────

export async function createCandidate(
  candidate: Omit<DbCandidate, "id" | "created_at">
): Promise<Candidate> {
  const { data, error } = await supabase
    .from("candidates")
    .insert(candidate)
    .select()
    .single();

  if (error) throw error;

  return mapDbToCandidate(data as DbCandidate);
}

// ─── Update Candidate ───────────────────────────────────────────────────────

export async function updateCandidateById(
  id: string,
  updates: Partial<DbCandidate>
): Promise<Candidate> {
  const { data, error } = await supabase
    .from("candidates")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return mapDbToCandidate(data as DbCandidate);
}

// ─── Delete Candidate ───────────────────────────────────────────────────────

export async function deleteCandidateById(
  id: string
): Promise<void> {
  const { error } = await supabase
    .from("candidates")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

// ─── Mapper: DB → Frontend ──────────────────────────────────────────────────

export function mapDbToCandidate(db: DbCandidate): Candidate {
  const CANDIDATE_ID_MAP: Record<string, number> = {
    "Dheeptha A R": 1,
    "Fellah Khadeeja P P": 2,
    "Niranjan V": 3,
    "Hata Fathima": 4,
    "Mehna Fatin": 5,
    "Charunainika A L": 6,
    "Nia Mathews": 7,
    "Reyan Khadeeja M": 8,
  };

  return {
    id: CANDIDATE_ID_MAP[db.name] ?? 0,
    supabaseId: db.id,

    name: db.name,
    class: db.class,
    panel: db.panel,
    position: db.position,

    photo: PHOTO_MAP[db.photo_url] ?? "",

    votes: 0,
    pct: 0,

    manifesto: db.manifesto,

    symbolKey: db.symbol,
  };
}

// ─── Mapper: Frontend → DB ──────────────────────────────────────────────────

export function mapCandidateToDb(
  c: Candidate
): Omit<DbCandidate, "created_at"> {
  return {
    id: "",

    name: c.name,
    class: c.class,
    panel: c.panel,

    position: c.position,

    photo_url: c.photo,

    manifesto: c.manifesto,

    symbol: c.symbolKey,


  };
}
