create table public.attendance_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  attended_on date not null,
  created_at timestamptz not null default now(),
  constraint attendance_records_user_id_attended_on_key unique (user_id, attended_on)
);

alter table public.attendance_records enable row level security;

create policy "Usuários podem consultar as próprias presenças"
on public.attendance_records
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Usuários podem confirmar a própria presença"
on public.attendance_records
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Usuários podem remover as próprias presenças"
on public.attendance_records
for delete
to authenticated
using ((select auth.uid()) = user_id);
