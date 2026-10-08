# Befit

Aplicativo iOS para gestão de treinos de academia, construído com Expo, React Native,
TypeScript e Supabase.

## Stack de interface

- Expo SDK 57 com Expo Router e rotas baseadas em arquivos em `app/`;
- NativeWind v4.2.7 + Tailwind CSS 3.4.17;
- React Native Reusables para primitives locais em `src/components/ui/`;
- Lucide React Native para ícones vetoriais;
- TanStack Query para dados remotos do Supabase;
- Zustand reservado para estado local de interface e fluxo;
- React Hook Form + Zod para formulários e validação.

## Requisitos

- Node.js 22
- pnpm 11
- Xcode (para simulador e instalação no iPhone)
- Docker (para o ambiente local do Supabase)

## Primeiros passos

```bash
pnpm install
pnpm db:start
cp .env.example .env.local
pnpm dev
```

Depois de iniciar o Supabase, substitua em `.env.local` a chave de exemplo pelos valores
exibidos pelo comando `pnpm db:start`.

- Pressione `i` no terminal do Expo para abrir o simulador iOS.
- Execute `pnpm ios:device` para compilar e instalar em um iPhone conectado ao Mac.
- O Supabase Studio fica disponível em `http://localhost:54323`.

## Comandos

| Comando | Descrição |
| --- | --- |
| `pnpm dev` | inicia o servidor de desenvolvimento do Expo |
| `pnpm ios` | abre o projeto no simulador iOS |
| `pnpm ios:device` | compila e instala o app em um iPhone conectado |
| `pnpm build` | exporta e valida o bundle iOS |
| `pnpm lint` | executa as regras de lint |
| `pnpm typecheck` | valida os tipos TypeScript |
| `pnpm test` | executa os testes unitários |
| `pnpm expo:doctor` | valida dependências e configuração do Expo |
| `pnpm db:start` | inicia o Supabase local |
| `pnpm db:reset` | recria o banco e aplica migrations |
| `pnpm test:integration` | executa os testes pgTAP do banco |
| `pnpm db:stop` | encerra o Supabase local |

## Estrutura

```text
app/                     # rotas do Expo Router
src/
├── components/ui/       # primitives reutilizáveis
├── features/            # funcionalidades organizadas por domínio
├── lib/supabase/        # cliente e configuração do Supabase
├── lib/query/           # QueryClient e provider
├── schemas/             # schemas Zod dos formulários
├── screens/             # telas da aplicação
├── stores/              # estado local Zustand por domínio
└── theme/               # tokens visuais e mapeamento semântico
supabase/
└── tests/database/      # testes de integração do banco
```

O cliente e o provider do TanStack Query ficam em `src/lib/query`. Consultas futuras ao
Supabase devem usar TanStack Query; Zustand não deve duplicar estado remoto. Formulários
futuros devem usar React Hook Form com schemas Zod em `src/schemas`.

O tema visual mantém os tokens atuais em `src/theme/tokens.ts` e os expõe como variáveis
semânticas para NativeWind/Reusables em `global.css`.

## Pipeline

Os Pull Requests executam dois jobs no GitHub Actions:

1. lint, tipos, testes e geração do bundle iOS;
2. inicialização do Supabase, aplicação das migrations e testes de banco.

Build assinado, EAS, TestFlight e deploy ainda não fazem parte da pipeline.
