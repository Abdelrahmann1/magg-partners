-- Run this once in the Supabase SQL Editor, in addition to the previous setup files.

create table if not exists public.site_content (
  id text primary key,
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

create policy "Public read access"
  on public.site_content for select
  using (true);

create policy "Authenticated insert"
  on public.site_content for insert
  to authenticated
  with check (true);

create policy "Authenticated update"
  on public.site_content for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated delete"
  on public.site_content for delete
  to authenticated
  using (true);

drop trigger if exists trg_site_content_updated_at on public.site_content;
create trigger trg_site_content_updated_at
before update on public.site_content
for each row execute function public.set_updated_at();
