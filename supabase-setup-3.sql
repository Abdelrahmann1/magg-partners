-- Run this once in the Supabase SQL Editor, in addition to the previous setup files.

create table if not exists public.jobs (
  id text primary key,
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.jobs enable row level security;

create policy "Public read access"
  on public.jobs for select
  using (true);

create policy "Authenticated insert"
  on public.jobs for insert
  to authenticated
  with check (true);

create policy "Authenticated update"
  on public.jobs for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated delete"
  on public.jobs for delete
  to authenticated
  using (true);

drop trigger if exists trg_jobs_updated_at on public.jobs;
create trigger trg_jobs_updated_at
before update on public.jobs
for each row execute function public.set_updated_at();
