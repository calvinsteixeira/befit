begin;

select plan(7);

select has_table(
  'public',
  'attendance_records',
  'a tabela de presenças existe'
);

select has_column(
  'public',
  'attendance_records',
  'attended_on',
  'a presença guarda a data local da ida à academia'
);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.attendance_records'::regclass),
  'a tabela de presenças exige RLS'
);

select ok(
  exists (
    select 1
    from pg_constraint
    where conrelid = 'public.attendance_records'::regclass
      and conname = 'attendance_records_user_id_attended_on_key'
      and contype = 'u'
  ),
  'a combinação usuário e data é única'
);

select is(
  (
    select count(*)::integer
    from pg_policies
    where schemaname = 'public'
      and tablename = 'attendance_records'
  ),
  3,
  'a tabela possui políticas para consultar, inserir e remover'
);

select ok(
  exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'attendance_records'
      and cmd = 'INSERT'
      and with_check like '%auth.uid()%'
  ),
  'a política de inserção limita o usuário ao próprio auth.uid()'
);

select ok(
  not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'attendance_records'
      and cmd in ('SELECT', 'DELETE')
      and qual not like '%auth.uid()%'
  ),
  'as políticas de leitura e remoção limitam o usuário ao próprio auth.uid()'
);

select * from finish();

rollback;
