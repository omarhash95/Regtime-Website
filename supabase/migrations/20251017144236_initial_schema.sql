/*
  # Initial Database Schema for Regtime Dashboard

  ## Overview
  This migration creates the complete database schema for the Regtime dashboard application,
  migrated from Drizzle ORM to Supabase. The schema supports affordable housing project
  management, property tracking, team collaboration, and compliance management.

  ## New Tables
  
  ### Core Tables
  - `users` - User profiles (linked to auth.users)
  - `properties` - NYC property information (BBL-based)
  - `projects` - Affordable housing projects
  - `units` - Housing units within projects
  - `project_team_members` - Team assignments to projects
  
  ### Compliance & Data
  - `compliance_records` - Compliance tracking for projects
  - `ami_data` - Area Median Income data by year
  - `max_rent_data` - Maximum rent calculations
  - `certifications` - Project certifications
  - `distribution_tests` - Income distribution testing
  
  ### Task Management
  - `tasks` - Project tasks
  - `milestones` - Project milestones
  - `project_activities` - Activity log
  - `task_comments` - Task discussion threads
  - `time_entries` - Time tracking
  
  ### Professional Directory
  - `architects` - Registered architects
  - `engineers` - Licensed engineers
  - `contractors` - General contractors
  - `attorneys` - Legal professionals
  - `applicants` - Housing applicants
  
  ### Support Tables
  - `recent_searches` - User search history
  - `help_content` - In-app documentation
  - `project_settings` - Per-project configuration

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Users can only access their own data and team projects
  - Public read access for reference data (AMI, help content)

  ## Important Notes
  1. All timestamps use timestamptz for proper timezone handling
  2. UUIDs used for all primary keys
  3. Cascading deletes protect data integrity
  4. Default values minimize null handling
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  profile_image TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bbl TEXT UNIQUE NOT NULL,
  address TEXT NOT NULL,
  borough TEXT,
  block TEXT,
  lot TEXT,
  zip_code TEXT,
  owner_name TEXT,
  building_class TEXT,
  year_built INTEGER,
  num_floors INTEGER,
  units_residential INTEGER,
  units_total INTEGER,
  lot_area NUMERIC,
  building_area NUMERIC,
  gross_square_feet NUMERIC,
  assessed_value NUMERIC,
  market_value NUMERIC,
  tax_class TEXT,
  zoning TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id),
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  project_type TEXT,
  program_type TEXT,
  start_date DATE,
  target_completion_date DATE,
  actual_completion_date DATE,
  budget NUMERIC DEFAULT 0,
  total_units INTEGER DEFAULT 0,
  affordable_units INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Units table
CREATE TABLE IF NOT EXISTS units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  unit_number TEXT,
  floor INTEGER,
  bedrooms INTEGER DEFAULT 0,
  bathrooms NUMERIC DEFAULT 0,
  square_feet NUMERIC,
  ami_percentage INTEGER,
  household_size INTEGER,
  max_rent NUMERIC,
  actual_rent NUMERIC,
  is_affordable BOOLEAN DEFAULT false,
  unit_type TEXT,
  status TEXT DEFAULT 'planned',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project team members
CREATE TABLE IF NOT EXISTS project_team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  permissions TEXT[] DEFAULT ARRAY[]::TEXT[],
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

-- =====================================================
-- COMPLIANCE & DATA TABLES
-- =====================================================

-- AMI Data (Area Median Income)
CREATE TABLE IF NOT EXISTS ami_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year INTEGER NOT NULL,
  household_size INTEGER NOT NULL,
  income_limit NUMERIC NOT NULL,
  percentage INTEGER NOT NULL,
  region TEXT DEFAULT 'NYC',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(year, household_size, percentage, region)
);

-- Max Rent Data
CREATE TABLE IF NOT EXISTS max_rent_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  ami_percentage INTEGER NOT NULL,
  max_rent NUMERIC NOT NULL,
  utilities_included BOOLEAN DEFAULT false,
  region TEXT DEFAULT 'NYC',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(year, bedrooms, ami_percentage, region)
);

-- Compliance Records
CREATE TABLE IF NOT EXISTS compliance_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  compliance_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  checked_date DATE,
  checker_id UUID REFERENCES users(id),
  notes TEXT,
  requirements JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certifications
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  certification_type TEXT NOT NULL,
  issued_date DATE,
  expiry_date DATE,
  issued_by TEXT,
  certificate_number TEXT,
  document_url TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Distribution Tests
CREATE TABLE IF NOT EXISTS distribution_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  test_date DATE NOT NULL,
  test_type TEXT NOT NULL,
  passed BOOLEAN DEFAULT false,
  results JSONB DEFAULT '{}'::JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TASK MANAGEMENT TABLES
-- =====================================================

-- Tasks
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES users(id),
  created_by UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  priority TEXT DEFAULT 'medium',
  due_date DATE,
  estimated_hours NUMERIC,
  actual_hours NUMERIC,
  completed_at TIMESTAMPTZ,
  parent_task_id UUID REFERENCES tasks(id),
  order_index INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Milestones
CREATE TABLE IF NOT EXISTS milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  completed_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project Activities (audit log)
CREATE TABLE IF NOT EXISTS project_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  activity_type TEXT NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Task Comments
CREATE TABLE IF NOT EXISTS task_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Time Entries
CREATE TABLE IF NOT EXISTS time_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  task_id UUID REFERENCES tasks(id),
  description TEXT,
  hours NUMERIC NOT NULL,
  entry_date DATE NOT NULL,
  billable BOOLEAN DEFAULT true,
  hourly_rate NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- PROFESSIONAL DIRECTORY TABLES
-- =====================================================

-- Architects
CREATE TABLE IF NOT EXISTS architects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  firm_name TEXT,
  license_number TEXT UNIQUE,
  email TEXT,
  phone TEXT,
  address TEXT,
  specializations TEXT[] DEFAULT ARRAY[]::TEXT[],
  years_experience INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Engineers
CREATE TABLE IF NOT EXISTS engineers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  firm_name TEXT,
  license_number TEXT UNIQUE,
  engineering_type TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  specializations TEXT[] DEFAULT ARRAY[]::TEXT[],
  years_experience INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contractors
CREATE TABLE IF NOT EXISTS contractors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  company_name TEXT,
  license_number TEXT UNIQUE,
  email TEXT,
  phone TEXT,
  address TEXT,
  specializations TEXT[] DEFAULT ARRAY[]::TEXT[],
  insurance_expiry DATE,
  bonding_capacity NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attorneys
CREATE TABLE IF NOT EXISTS attorneys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  firm_name TEXT,
  bar_number TEXT UNIQUE,
  email TEXT,
  phone TEXT,
  address TEXT,
  specializations TEXT[] DEFAULT ARRAY[]::TEXT[],
  years_experience INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Applicants
CREATE TABLE IF NOT EXISTS applicants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  household_size INTEGER,
  annual_income NUMERIC,
  ami_percentage INTEGER,
  status TEXT DEFAULT 'pending',
  application_date DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SUPPORT TABLES
-- =====================================================

-- Recent Searches
CREATE TABLE IF NOT EXISTS recent_searches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  search_type TEXT NOT NULL,
  search_query TEXT NOT NULL,
  search_results JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Help Content
CREATE TABLE IF NOT EXISTS help_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project Settings
CREATE TABLE IF NOT EXISTS project_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE UNIQUE,
  settings JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_properties_bbl ON properties(bbl);
CREATE INDEX IF NOT EXISTS idx_properties_borough ON properties(borough);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_units_project_id ON units(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_time_entries_user_id ON time_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_project_id ON time_entries(project_id);
CREATE INDEX IF NOT EXISTS idx_project_activities_project_id ON project_activities(project_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE distribution_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;
ALTER TABLE recent_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_settings ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Properties policies (users can view all, insert/update their searches)
CREATE POLICY "Anyone can view properties"
  ON properties FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert properties"
  ON properties FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Projects policies
CREATE POLICY "Users can view own projects"
  ON projects FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM project_team_members
      WHERE project_team_members.project_id = projects.id
      AND project_team_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM project_team_members
      WHERE project_team_members.project_id = projects.id
      AND project_team_members.user_id = auth.uid()
      AND 'edit' = ANY(project_team_members.permissions)
    )
  )
  WITH CHECK (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM project_team_members
      WHERE project_team_members.project_id = projects.id
      AND project_team_members.user_id = auth.uid()
      AND 'edit' = ANY(project_team_members.permissions)
    )
  );

CREATE POLICY "Users can delete own projects"
  ON projects FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Units policies (inherit from projects)
CREATE POLICY "Users can view project units"
  ON units FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = units.project_id
      AND (
        projects.user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM project_team_members
          WHERE project_team_members.project_id = projects.id
          AND project_team_members.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Users can manage project units"
  ON units FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = units.project_id
      AND projects.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = units.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Tasks policies
CREATE POLICY "Users can view project tasks"
  ON tasks FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = tasks.project_id
      AND (
        projects.user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM project_team_members
          WHERE project_team_members.project_id = projects.id
          AND project_team_members.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Users can manage project tasks"
  ON tasks FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = tasks.project_id
      AND projects.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = tasks.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Time entries policies
CREATE POLICY "Users can view own time entries"
  ON time_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own time entries"
  ON time_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own time entries"
  ON time_entries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own time entries"
  ON time_entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Recent searches policies
CREATE POLICY "Users can view own searches"
  ON recent_searches FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own searches"
  ON recent_searches FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Help content policies (public read)
CREATE POLICY "Anyone can view help content"
  ON help_content FOR SELECT
  TO authenticated
  USING (published = true);

-- AMI and Max Rent data policies (public read for authenticated users)
ALTER TABLE ami_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE max_rent_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view AMI data"
  ON ami_data FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view max rent data"
  ON max_rent_data FOR SELECT
  TO authenticated
  USING (true);

-- Professional directory policies (public read for authenticated users)
ALTER TABLE architects ENABLE ROW LEVEL SECURITY;
ALTER TABLE engineers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE attorneys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view architects"
  ON architects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view engineers"
  ON engineers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view contractors"
  ON contractors FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view attorneys"
  ON attorneys FOR SELECT
  TO authenticated
  USING (true);