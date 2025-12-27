# VentureSci

VentureSci is a full-stack web application for collaborative research, experiment tracking, and encrypted chat around venture-scale science projects. The platform combines a modern TypeScript frontend with a Python backend, Supabase for authentication/storage, and row-level security (RLS) to protect project data.

## Project overview

- **Collaboration-first**: Organize research workspaces, share datasets, and keep discussions in encrypted channels.
- **Data security**: Supabase Postgres with RLS policies to scope access per workspace/project; service-role keys are never exposed to the browser.
- **Real-time UX**: Live updates for tasks, experiments, and chat with optimistic UI patterns.
- **Auditability**: Structured activity logs and reproducible experiment notes.

## Tech stack

- **Frontend**: Next.js (App Router) with TypeScript, Tailwind CSS, and Supabase client for authentication.
- **Backend**: FastAPI (Python 3.11+), async Supabase/Postgres access, and WebSocket endpoints for encrypted chat handshakes.
- **Database**: Supabase Postgres with storage buckets for files and RLS-enabled tables.
- **Tooling**: pnpm for frontend package management, uv/pip for Python dependencies, pytest for backend tests, and eslint/prettier/ruff for consistency.

## Feature-Sliced Design (FSD) conventions

The frontend follows FSD to keep features isolated and composable:

- `app/`: Next.js routes; lean, defer to features/widgets.
- `pages/` (if used): legacy routes only; prefer `app/`.
- `processes/`: cross-feature flows (e.g., onboarding, workspace switcher).
- `features/`: self-contained user-facing capabilities (auth, chat, file upload).
- `entities/`: reusable business entities (user, workspace, experiment, message).
- `shared/`: design system, utilities, API clients, constants, and configuration.
- `widgets/`: page-level sections composed from features/entities.

Each slice exports its public API via an `index.ts` to avoid deep imports. Co-locate tests and stories next to implementations.

## Repository layout

```
.
├── README.md
├── CONTRIBUTING.md
├── frontend/
│   └── .env.example    # Environment template for the planned Next.js app
└── backend/
    └── .env.example    # Environment template for the planned FastAPI backend
```

> Note: The frontend and backend source code is not yet committed to this repository. The directory structure and environment templates are provided to prepare local configuration for the forthcoming Next.js and FastAPI implementations.

## Prerequisites

- Node.js 18+ and pnpm (for the frontend).
- Python 3.11+ with uv or pip (for the backend).
- Supabase project (or local Supabase CLI) for Postgres + storage.
- OpenSSL (or age/gpg) for generating encrypted chat keypairs.

## Environment variables

Environment templates live in `frontend/.env.example` and `backend/.env.example`. Copy them to `.env.local` (frontend) and `.env` (backend), then fill in secrets:

- **Supabase**: `SUPABASE_URL`, `SUPABASE_ANON_KEY` for the browser; `SUPABASE_SERVICE_ROLE_KEY` only on the server.
- **OAuth**: Google and GitHub client IDs/secrets for Supabase auth.
- **Backend**: `DATABASE_URL`, `JWT_SECRET`, `ALLOWED_ORIGINS`, `PORT`, and encrypted chat key paths.
- **Frontend**: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SUPABASE_URL`, public keys for encrypted chat, and optional analytics settings.

## Running the apps (development)

### Frontend

```bash
cd frontend
pnpm install
cp .env.example .env.local  # fill in values
pnpm dev
```

The app runs at `http://localhost:3000`. Supabase auth expects the backend API URL to be reachable via `NEXT_PUBLIC_API_URL`.

### Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt  # or uv pip sync requirements.txt
cp .env.example .env  # fill in values
uvicorn app.main:app --reload --port 8000
```

The API serves at `http://localhost:8000`. Ensure `ALLOWED_ORIGINS` permits the frontend origin and that RLS policies are applied in your Supabase project before testing.

### Supabase (local or hosted)

- Hosted: Create a project in Supabase, enable Google/GitHub providers, and add `http://localhost:3000` to redirect URLs. Use the project URL + anon/service keys in your `.env` files.
- Local: Install the Supabase CLI, run `supabase start`, and copy the generated `API URL`, `anon`, and `service_role` keys into your backend/frontend env files. Apply migrations before running the app.

### Useful commands

| Purpose | Command |
| --- | --- |
| Frontend lint | `pnpm lint` (from `frontend/`) |
| Frontend tests | `pnpm test` or `pnpm vitest` |
| Frontend typecheck | `pnpm typecheck` |
| Backend lint | `ruff check .` (from `backend/`) |
| Backend tests | `pytest` |
| Backend typing | `mypy` (if configured) |

Run linters/tests before opening a PR to keep CI green.
