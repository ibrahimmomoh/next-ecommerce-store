-- =====================================================
-- UPSS Transport Fee Manager — Supabase Schema Setup
-- =====================================================

-- 1. ROUTES TABLE
CREATE TABLE IF NOT EXISTS routes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  to_fro NUMERIC DEFAULT 0,
  to_only NUMERIC DEFAULT 0,
  fro_only NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. STUDENTS TABLE
CREATE TABLE IF NOT EXISTS students (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  route_key TEXT NOT NULL REFERENCES routes(key) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT DEFAULT '',
  school TEXT DEFAULT '',
  service TEXT DEFAULT '',
  pickup TEXT DEFAULT '',
  dropoff TEXT DEFAULT '',
  deduction NUMERIC DEFAULT 0,
  fee1 NUMERIC DEFAULT 0,
  fee2 NUMERIC DEFAULT 0,
  fee3 NUMERIC DEFAULT 0,
  paid1 NUMERIC DEFAULT 0,
  paid2 NUMERIC DEFAULT 0,
  paid3 NUMERIC DEFAULT 0,
  method TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. INDEXES
CREATE INDEX IF NOT EXISTS idx_students_route_key ON students(route_key);
CREATE INDEX IF NOT EXISTS idx_students_school ON students(school);
CREATE INDEX IF NOT EXISTS idx_students_name ON students(name);

-- 4. ROW LEVEL SECURITY — open access for anon key (internal tool)
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to routes" ON routes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to students" ON students FOR ALL USING (true) WITH CHECK (true);

-- 5. SEED DEFAULT ROUTES
INSERT INTO routes (key, name, to_fro, to_only, fro_only, status) VALUES
  ('ekenwan',  'Ekenwan Road',    50000, 30000, 30000, 'Active'),
  ('sapele',   'Sapele Road',     50000, 30000, 30000, 'Active'),
  ('siluko',   'Siluko',          45000, 25000, 25000, 'Active'),
  ('airport',  'Airport Road',    55000, 35000, 35000, 'Active'),
  ('uselu',    'Uselu - Ugbowo',  40000, 25000, 25000, 'Active')
ON CONFLICT (key) DO NOTHING;
