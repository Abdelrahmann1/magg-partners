-- Run this once in the Supabase SQL Editor, in addition to the previous setup files.

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

create policy "Anyone can subscribe"
  on public.newsletter_subscribers for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated can read subscribers"
  on public.newsletter_subscribers for select
  to authenticated
  using (true);

create policy "Authenticated can delete subscribers"
  on public.newsletter_subscribers for delete
  to authenticated
  using (true);
