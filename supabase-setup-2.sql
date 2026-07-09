-- Run this once in the Supabase SQL Editor, in addition to supabase-setup.sql

-- ── Storage bucket for project images ───────────────────────
insert into storage.buckets (id, name, public, file_size_limit)
values ('project-images', 'project-images', true, 10485760)
on conflict (id) do nothing;

create policy "Authenticated can upload project images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-images');

create policy "Authenticated can update project images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-images')
  with check (bucket_id = 'project-images');

create policy "Authenticated can delete project images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-images');

-- ── Inquiries table (contact form submissions) ──────────────
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  name text,
  email text,
  subject text,
  message text,
  data jsonb,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

create policy "Anyone can submit an inquiry"
  on public.inquiries for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated can read inquiries"
  on public.inquiries for select
  to authenticated
  using (true);

create policy "Authenticated can update inquiries"
  on public.inquiries for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can delete inquiries"
  on public.inquiries for delete
  to authenticated
  using (true);
