-- ============================================================================
-- Seed Migration: Candidates
-- Generated from src/data/candidates.ts
-- Date: 2026-06-24
--
-- Target table: public.candidates (already exists in Supabase)
--
-- Existing Supabase schema:
--   id          UUID PRIMARY KEY (auto-generated)
--   name        TEXT
--   class       TEXT
--   panel       TEXT
--   position    TEXT
--   symbol      TEXT
--   photo_url   TEXT
--   manifesto   TEXT
--   created_at  TIMESTAMPTZ
--
-- Field mapping from candidates.ts:
--   candidates.ts field  →  Supabase column
--   ─────────────────────────────────────────
--   name                 →  name
--   class                →  class
--   panel                →  panel
--   position             →  position
--   symbolKey            →  symbol
--   photo (filename)     →  photo_url
--   manifesto            →  manifesto
--
-- Notes:
--   • id is UUID in Supabase (not the integer id from candidates.ts)
--   • votes / pct are runtime-only fields, not stored in the DB
-- ============================================================================

-- Chairperson candidates
INSERT INTO candidates (name, class, panel, position, symbol, photo_url, manifesto)
VALUES
  (
    'Dheeptha A R',
    'Form 4A',
    'Unity Panel',
    'Chairperson',
    'whistle',
    'DHEEPTHA_A_R.jpg',
    'Building a united, inclusive school community where every voice matters and every student thrives.'
  ),
  (
    'Fellah Khadeeja P P',
    'Form 5B',
    'Progress Panel',
    'Chairperson',
    'pen',
    'FELLAH_KHADEEJA_PP.jpg',
    'Driving academic excellence and extracurricular growth for every student in our school community.'
  ),
  (
    'Niranjan V',
    'Form 4C',
    'Horizon Panel',
    'Chairperson',
    'mouse',
    'NIRANJAN_V.jpg',
    'Harnessing innovation and technology to transform our school experience for all learners.'
  ),
  (
    'Nia Mathews',
    'Form 3B',
    'Future Panel',
    'Chairperson',
    'keys',
    'NIA_MATHEWS.jpg',
    'Creating equal opportunities and amplifying every student voice for a stronger school parliament.'
  )
ON CONFLICT DO NOTHING;

-- School Leader candidates
INSERT INTO candidates (name, class, panel, position, symbol, photo_url, manifesto)
VALUES
  (
    'Hata Fathima',
    'Form 3A',
    'Unity Panel',
    'School Leader',
    'torch',
    'HATA_FATHIMA.jpg',
    'Empowering students through leadership, wellness, and community service initiatives across all forms.'
  ),
  (
    'Mehna Fatin',
    'Form 5A',
    'Progress Panel',
    'School Leader',
    'book',
    'MEHNA_FATIN.jpg',
    'Strengthening student-faculty partnerships and transparent communication for a better school tomorrow.'
  ),
  (
    'Charunainika A L',
    'Form 4B',
    'Horizon Panel',
    'School Leader',
    'telescope',
    'CHARUNAINIKA_A_L.jpg',
    'Championing diversity, creative expression, and mental health awareness in our school environment.'
  ),
  (
    'Reyan Khadeeja M',
    'Form 4A',
    'Future Panel',
    'School Leader',
    'shield',
    'REYAN_KHADEEJA_M.jpg',
    'Bridging gaps between students and administration through open dialogue and collaborative leadership.'
  )
ON CONFLICT DO NOTHING;
