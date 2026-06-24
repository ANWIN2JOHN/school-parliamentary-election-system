-- ============================================================================
-- Verification Queries for Candidates Seed
-- Run these in the Supabase SQL Editor after applying the migration.
--
-- Actual table schema:
--   id (uuid), name, class, panel, position, symbol, photo_url,
--   manifesto, created_at
-- ============================================================================

-- 1. Total row count (expect 8)
SELECT
  count(*) AS total_candidates,
  CASE WHEN count(*) = 8 THEN '✅ PASS' ELSE '❌ FAIL' END AS status
FROM candidates;


-- 2. Breakdown by position (expect 4 Chairpersons, 4 School Leaders)
SELECT
  position,
  count(*) AS count,
  array_agg(name ORDER BY name) AS names
FROM candidates
GROUP BY position
ORDER BY position;


-- 3. Full candidate listing with all mapped fields
SELECT
  id,
  name,
  class,
  panel,
  position,
  symbol,          -- mapped from symbolKey
  photo_url,       -- mapped from photo (filename)
  manifesto,
  created_at
FROM candidates
ORDER BY position, name;


-- 4. Verify field-mapping integrity (spot checks)
--    Each row should return true for all checks.
SELECT
  name,
  -- symbolKey → symbol mapping checks
  CASE
    WHEN name = 'Dheeptha A R'       AND symbol = 'whistle'   THEN true
    WHEN name = 'Fellah Khadeeja P P' AND symbol = 'pen'      THEN true
    WHEN name = 'Niranjan V'          AND symbol = 'mouse'    THEN true
    WHEN name = 'Nia Mathews'         AND symbol = 'keys'     THEN true
    WHEN name = 'Hata Fathima'        AND symbol = 'torch'    THEN true
    WHEN name = 'Mehna Fatin'         AND symbol = 'book'     THEN true
    WHEN name = 'Charunainika A L'    AND symbol = 'telescope' THEN true
    WHEN name = 'Reyan Khadeeja M'    AND symbol = 'shield'   THEN true
    ELSE false
  END AS symbol_ok,
  -- photo → photo_url mapping checks
  CASE
    WHEN name = 'Dheeptha A R'       AND photo_url = 'DHEEPTHA_A_R.jpg'       THEN true
    WHEN name = 'Fellah Khadeeja P P' AND photo_url = 'FELLAH_KHADEEJA_PP.jpg' THEN true
    WHEN name = 'Niranjan V'          AND photo_url = 'NIRANJAN_V.jpg'         THEN true
    WHEN name = 'Nia Mathews'         AND photo_url = 'NIA_MATHEWS.jpg'        THEN true
    WHEN name = 'Hata Fathima'        AND photo_url = 'HATA_FATHIMA.jpg'       THEN true
    WHEN name = 'Mehna Fatin'         AND photo_url = 'MEHNA_FATIN.jpg'        THEN true
    WHEN name = 'Charunainika A L'    AND photo_url = 'CHARUNAINIKA_A_L.jpg'   THEN true
    WHEN name = 'Reyan Khadeeja M'    AND photo_url = 'REYAN_KHADEEJA_M.jpg'   THEN true
    ELSE false
  END AS photo_url_ok
FROM candidates
ORDER BY name;


-- 5. Panels cross-reference (each panel should have exactly 2 candidates)
SELECT
  panel,
  count(*) AS count,
  CASE WHEN count(*) = 2 THEN '✅ PASS' ELSE '⚠️ CHECK' END AS status,
  array_agg(position ORDER BY position) AS positions
FROM candidates
GROUP BY panel
ORDER BY panel;


-- 6. Data-quality assertions (should return 0 rows if everything is clean)
SELECT id, name, 'ISSUE: null or empty field' AS flag
FROM candidates
WHERE
  name      IS NULL OR name      = '' OR
  class     IS NULL OR class     = '' OR
  panel     IS NULL OR panel     = '' OR
  position  IS NULL OR position  = '' OR
  symbol    IS NULL OR symbol    = '' OR
  photo_url IS NULL OR photo_url = '';
