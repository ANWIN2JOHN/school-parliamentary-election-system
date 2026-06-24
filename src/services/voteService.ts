import { supabase } from "./supabase";
import type { VoteRecord, DbVote } from "@/types";

// Submit Vote

export async function submitVote(
  chairpersonCandidateId: string,
  schoolLeaderCandidateId: string
): Promise<DbVote> {
  const voteReference =
    `SHSS-2026-${String(Date.now()).slice(-6)}`;

  const { data, error } = await supabase
    .from("votes")
    .insert({
      chairperson_candidate_id: chairpersonCandidateId,
      school_leader_candidate_id: schoolLeaderCandidateId,
      vote_reference: voteReference,
    })
    .select()
    .single();

  if (error) throw error;

  return data as DbVote;
}

// Fetch Votes

export async function fetchVotes(): Promise<DbVote[]> {
  const { data, error } = await supabase
    .from("votes")
    .select("*")
    .order("created_at");

  if (error) throw error;

  return (data ?? []) as DbVote[];
}

// Mapper

export function mapDbToVoteRecord(
  db: DbVote
): VoteRecord {
  return {
    id: db.id,

    chairpersonId: 0,
    schoolLeaderId: 0,

    chairpersonSupabaseId:
      db.chairperson_candidate_id,

    schoolLeaderSupabaseId:
      db.school_leader_candidate_id,

    timestamp: db.created_at,

    reference: db.vote_reference,
  };
}

// Clear All Votes

export async function clearAllVotes(): Promise<void> {
  const { error } = await supabase
    .from("votes")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (error) throw error;
}