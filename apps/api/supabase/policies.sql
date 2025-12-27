-- Basic Supabase schema + RLS for VentureSci surfaces
-- Run inside your Supabase SQL editor.

create table if not exists organizations (
  id text primary key,
  name text not null,
  focus text,
  location text,
  contact text,
  created_by uuid references auth.users(id) default auth.uid()
);
alter table organizations enable row level security;
create policy "organization-read" on organizations for select using (true);
create policy "organization-manage-own" on organizations for all using (auth.uid() = created_by);

create table if not exists research_projects (
  id text primary key,
  title text not null,
  principal_investigator text not null,
  summary text,
  tags text[],
  organization_id text references organizations(id),
  created_by uuid references auth.users(id) default auth.uid()
);
alter table research_projects enable row level security;
create policy "projects-read" on research_projects for select using (true);
create policy "projects-manage-own" on research_projects for all using (auth.uid() = created_by);

create table if not exists funder_requests (
  id text primary key,
  funder_name text not null,
  project_id text references research_projects(id),
  amount_requested numeric,
  message text,
  status text default 'pending',
  created_at timestamptz default now(),
  created_by uuid references auth.users(id) default auth.uid()
);
alter table funder_requests enable row level security;
create policy "funder-requests-read" on funder_requests for select using (true);
create policy "funder-requests-manage-own" on funder_requests for all using (auth.uid() = created_by);

create table if not exists profiles (
  id text primary key,
  email text,
  credibility jsonb default '[]'::jsonb,
  owner uuid references auth.users(id) default auth.uid()
);
alter table profiles enable row level security;
create policy "profiles-read-own" on profiles for select using (auth.uid() = owner);
create policy "profiles-manage-own" on profiles for all using (auth.uid() = owner);

create table if not exists credibility_links (
  id uuid primary key default gen_random_uuid(),
  profile_id text references profiles(id),
  label text,
  url text,
  owner uuid references auth.users(id) default auth.uid()
);
alter table credibility_links enable row level security;
create policy "credibility-links-read-own" on credibility_links for select using (auth.uid() = owner);
create policy "credibility-links-manage-own" on credibility_links for all using (auth.uid() = owner);

-- OAuth2 providers (GitHub, Google, etc.) can be configured in Supabase Authentication > Providers.
