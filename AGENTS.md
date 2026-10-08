# Regras de desenvolvimento do Befit

O Befit é um aplicativo iOS construído com Expo, React Native, TypeScript e Supabase.

- Priorize componentes nativos, acessibilidade, desempenho e suporte às safe areas do iPhone.
- Use TypeScript estrito e mantenha integrações externas nas bordas de `src/lib`.
- Organize funcionalidades futuras por domínio em `src/features/<dominio>`.
- Não adicione bibliotecas de UI, navegação, estado ou formulários sem uma necessidade definida.
- Instale módulos compatíveis com o SDK usando `pnpm expo install <pacote>`.
- Não edite `ios/` ou `android/` manualmente; configure o projeto pelo Expo e seus plugins.
- Antes de adicionar uma dependência, verificar se o Expo já fornece um módulo oficial compatível. Para módulos nativos, usar `pnpm expo install`.
- Antes de concluir mudanças, execute `pnpm lint`, `pnpm typecheck`, `pnpm test`,
  `pnpm expo:doctor` e `pnpm build`.
- Use branches `feat/` ou `fix/` e commits Conventional Commits em português.
- Nunca faça commit de credenciais, certificados, provisioning profiles ou arquivos `.env`.
