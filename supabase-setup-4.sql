-- Run this once in the Supabase SQL Editor, in addition to the previous setup files.

create table if not exists public.news (
  id text primary key,
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.news enable row level security;

create policy "Public read access"
  on public.news for select
  using (true);

create policy "Authenticated insert"
  on public.news for insert
  to authenticated
  with check (true);

create policy "Authenticated update"
  on public.news for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated delete"
  on public.news for delete
  to authenticated
  using (true);

drop trigger if exists trg_news_updated_at on public.news;
create trigger trg_news_updated_at
before update on public.news
for each row execute function public.set_updated_at();
