begin;

select plan(1);

select has_table('auth', 'users', 'a estrutura de autenticação do Supabase está disponível');

select * from finish();

rollback;
