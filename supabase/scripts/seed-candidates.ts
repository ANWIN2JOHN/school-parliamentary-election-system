/**
 * seed-candidates.ts
 *
 * TypeScript seed script to insert all candidates from src/data/candidates.ts
 * into the Supabase `candidates` table.
 *
 * Usage:
 *   npx tsx supabase/scripts/seed-candidates.ts
 *
 * Environment variables (reads from .env):
 *   SUPABASE_SERVICE_ROLE_KEY  — preferred (bypasses RLS)
 *   VITE_SUPABASE_ANON_KEY     — fallback (will fail if INSERT RLS blocks anon)
 *
 * ⚠️  The candidates table has RLS enabled. To seed via this script you MUST
 *     provide SUPABASE_SERVICE_ROLE_KEY in your .env file.
 *     Alternatively, run the SQL migration directly in the Supabase SQL Editor.
 *
 * Field mapping from candidates.ts:
 *   class     → class
 *   panel     → panel
 *   symbolKey → symbol
 *   photo     → photo_url  (stored as the original filename)
 */

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

// ── Load environment ────────────────────────────────────────────────────────
config();

const supabaseUrl =
  process.env.VITE_SUPABASE_URL?.trim() ??
  process.env.SUPABASE_URL?.trim() ??
  "";

// Prefer service_role key (bypasses RLS) over anon key
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ??
  process.env.VITE_SUPABASE_ANON_KEY?.trim() ??
  process.env.SUPABASE_ANON_KEY?.trim() ??
  "";

const keySource = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  ? "service_role"
  : "anon";

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "❌  Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Check your .env file."
  );
  process.exit(1);
}

console.log(`🔑  Using ${keySource} key`);
if (keySource === "anon") {
  console.warn(
    "⚠️   anon key detected — INSERT will fail if RLS blocks anon inserts."
  );
  console.warn(
    "    Add SUPABASE_SERVICE_ROLE_KEY to .env, or run the SQL migration in the Supabase SQL Editor.\n"
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ── Candidate seed data ─────────────────────────────────────────────────────

interface SeedCandidate {
  name: string;
  class: string;
  panel: string;
  position: string;
  symbol: string;
  photo_url: string;
  manifesto: string;
}

const candidates: SeedCandidate[] = [
  // ── Chairperson ──
  {
    name: "Dheeptha A R",
    class: "Form 4A",
    panel: "Unity Panel",
    position: "Chairperson",
    symbol: "whistle",
    photo_url: "DHEEPTHA_A_R.jpg",
    manifesto:
      "Building a united, inclusive school community where every voice matters and every student thrives.",
  },
  {
    name: "Fellah Khadeeja P P",
    class: "Form 5B",
    panel: "Progress Panel",
    position: "Chairperson",
    symbol: "pen",
    photo_url: "FELLAH_KHADEEJA_PP.jpg",
    manifesto:
      "Driving academic excellence and extracurricular growth for every student in our school community.",
  },
  {
    name: "Niranjan V",
    class: "Form 4C",
    panel: "Horizon Panel",
    position: "Chairperson",
    symbol: "mouse",
    photo_url: "NIRANJAN_V.jpg",
    manifesto:
      "Harnessing innovation and technology to transform our school experience for all learners.",
  },
  {
    name: "Nia Mathews",
    class: "Form 3B",
    panel: "Future Panel",
    position: "Chairperson",
    symbol: "keys",
    photo_url: "NIA_MATHEWS.jpg",
    manifesto:
      "Creating equal opportunities and amplifying every student voice for a stronger school parliament.",
  },
  // ── School Leader ──
  {
    name: "Hata Fathima",
    class: "Form 3A",
    panel: "Unity Panel",
    position: "School Leader",
    symbol: "torch",
    photo_url: "HATA_FATHIMA.jpg",
    manifesto:
      "Empowering students through leadership, wellness, and community service initiatives across all forms.",
  },
  {
    name: "Mehna Fatin",
    class: "Form 5A",
    panel: "Progress Panel",
    position: "School Leader",
    symbol: "book",
    photo_url: "MEHNA_FATIN.jpg",
    manifesto:
      "Strengthening student-faculty partnerships and transparent communication for a better school tomorrow.",
  },
  {
    name: "Charunainika A L",
    class: "Form 4B",
    panel: "Horizon Panel",
    position: "School Leader",
    symbol: "telescope",
    photo_url: "CHARUNAINIKA_A_L.jpg",
    manifesto:
      "Championing diversity, creative expression, and mental health awareness in our school environment.",
  },
  {
    name: "Reyan Khadeeja M",
    class: "Form 4A",
    panel: "Future Panel",
    position: "School Leader",
    symbol: "shield",
    photo_url: "REYAN_KHADEEJA_M.jpg",
    manifesto:
      "Bridging gaps between students and administration through open dialogue and collaborative leadership.",
  },
];

// ── Seed logic ──────────────────────────────────────────────────────────────

async function seed() {
  console.log(`\n🌱  Seeding ${candidates.length} candidates …\n`);

  let successCount = 0;
  for (const candidate of candidates) {
    // Check if already exists by name + position
    const { data: existing } = await supabase
      .from("candidates")
      .select("id")
      .eq("name", candidate.name)
      .eq("position", candidate.position)
      .maybeSingle();

    if (existing) {
      console.log(`⏭️   ${candidate.name} (${candidate.position}) — already exists, skipping.`);
      successCount++;
      continue;
    }

    const { error: insertErr } = await supabase
      .from("candidates")
      .insert(candidate);

    if (insertErr) {
      console.error(`❌  ${candidate.name} — ${insertErr.message}`);
    } else {
      console.log(`✅  ${candidate.name} (${candidate.position}) — inserted.`);
      successCount++;
    }
  }

  console.log(`\n📊  ${successCount}/${candidates.length} candidates seeded.`);
}

// ── Verification ────────────────────────────────────────────────────────────

async function verify() {
  console.log("\n🔍  Running verification queries …\n");

  // Total row count
  const { count, error: countErr } = await supabase
    .from("candidates")
    .select("*", { count: "exact", head: true });

  if (countErr) {
    console.error("❌  Count query failed:", countErr.message);
  } else {
    const expected = candidates.length;
    const status = count === expected ? "✅" : "⚠️";
    console.log(
      `${status}  Total candidates: ${count} (expected ${expected})`
    );
  }

  // Per-position breakdown
  for (const position of ["Chairperson", "School Leader"]) {
    const { data: rows, error: posErr } = await supabase
      .from("candidates")
      .select("id, name, class, panel, symbol, photo_url")
      .eq("position", position)
      .order("name");

    if (posErr) {
      console.error(`❌  Query for ${position} failed:`, posErr.message);
      continue;
    }

    console.log(`\n📋  ${position} (${rows.length} rows):`);
    console.table(
      rows.map((r: Record<string, unknown>) => ({
        id: String(r.id).slice(0, 8) + "…",
        name: r.name,
        class: r.class,
        panel: r.panel,
        symbol: r.symbol,
        photo_url: r.photo_url,
      }))
    );
  }

  // Field-mapping spot-check
  const { data: spot, error: spotErr } = await supabase
    .from("candidates")
    .select("id, name, symbol, photo_url")
    .eq("name", "Dheeptha A R")
    .single();

  if (spotErr) {
    console.error("❌  Spot-check failed:", spotErr.message);
  } else {
    const ok =
      spot.symbol === "whistle" && spot.photo_url === "DHEEPTHA_A_R.jpg";
    console.log(
      `\n${ok ? "✅" : "❌"}  Spot-check (Dheeptha A R): symbol="${spot.symbol}", photo_url="${spot.photo_url}"`
    );
  }

  console.log("\n🏁  Verification complete.\n");
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  await seed();
  await verify();
}

main().catch((err) => {
  console.error("💥  Unexpected error:", err);
  process.exit(1);
});
