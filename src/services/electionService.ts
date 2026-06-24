/**
 * Election Service
 *
 * Handles election configuration and status operations.
 * Currently uses local state via ElectionContext.
 * Ready to swap to Supabase queries when backend is integrated.
 */

import type { Election, DbElection } from "@/types";

// ─── Supabase-ready query functions (uncomment when Supabase is set up) ────

/*
import { supabase } from './supabase';

export async function fetchElection(): Promise<Election | null> {
  const { data, error } = await supabase
    .from('elections')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows
    throw error;
  }
  return mapDbToElection(data as DbElection);
}

export async function updateElectionById(id: string, updates: Partial<DbElection>): Promise<Election> {
  const { data, error } = await supabase
    .from('elections')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return mapDbToElection(data as DbElection);
}

export async function toggleElectionStatus(id: string, isOpen: boolean): Promise<Election> {
  return updateElectionById(id, { is_open: isOpen });
}
*/

// ─── Mapper ─────────────────────────────────────────────────────────────────

export function mapDbToElection(db: DbElection): Election {
  return {
    id: db.id,
    name: db.name,
    date: db.date,
    startTime: db.start_time,
    endTime: db.end_time,
    school: db.school,
    positions: db.positions,
    isOpen: db.is_open,
    createdAt: db.created_at,
  };
}

export function mapElectionToDb(e: Election): Omit<DbElection, "created_at" | "updated_at"> {
  return {
    id: e.id,
    name: e.name,
    date: e.date,
    start_time: e.startTime,
    end_time: e.endTime,
    school: e.school,
    positions: e.positions,
    is_open: e.isOpen,
  };
}
