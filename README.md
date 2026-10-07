# Befit

Aplicativo iOS para gestão de treinos de academia, construído com Expo, React Native,
TypeScript e Supabase.

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
src/
├── lib/supabase/        # cliente e configuração do Supabase
├── screens/             # telas da aplicação
└── theme/               # tokens visuais fundamentais
supabase/
└── tests/database/      # testes de integração do banco
```

Novas funcionalidades serão organizadas por domínio em `src/features/<dominio>`. Bibliotecas
de navegação, UI, estado e formulários serão definidas quando os requisitos funcionais forem
conhecidos.

## Pipeline

Os Pull Requests executam dois jobs no GitHub Actions:

1. lint, tipos, testes e geração do bundle iOS;
2. inicialização do Supabase, aplicação das migrations e testes de banco.

Build assinado, EAS, TestFlight e deploy ainda não fazem parte da pipeline.
