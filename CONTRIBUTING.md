# Contributing to VentureSci

Thanks for contributing! This guide explains how we work, what to check before opening a PR, and how to handle Supabase + encrypted chat specifics.

## Workflow

1. **Branch** off `main`.
2. **Sync** with upstream `main` before opening a PR.
3. **Small, atomic PRs** are easiest to review; avoid bundling unrelated changes.
4. **Link issues** in your PR description and reference them in commits when applicable.

## Coding standards

- **TypeScript/React (frontend)**
  - Prefer functional components with hooks; avoid class components.
  - Keep UI slices FSD-aligned (`features`, `entities`, `widgets`, `shared`, `processes`).
  - Co-locate tests and stories with implementations; name tests `*.test.ts(x)`.
  - Use `async/await` over `.then` chains; avoid `any`.
  - Never expose service-role keys or secrets to the browser; only use `NEXT_PUBLIC_*` for safe values.

- **Python/FastAPI (backend)**
  - Type all function signatures; enable `from __future__ import annotations` where helpful.
  - Keep handlers thin; move logic into services/use-cases.
  - Prefer Pydantic models for request/response validation.
  - Use dependency injection for auth and database clients; avoid global state.
  - Log with `structlog`/`logging` instead of prints.

- **General**
  - Follow Conventional Commits (`feat:`, `fix:`, `docs:`, etc.).
  - Keep files formatted via `eslint --fix`, `prettier`, and `ruff/black` where applicable.
  - Add or update documentation when behavior changes.

## Linting, testing, and checks

Run relevant checks before pushing:

- **Frontend**
  - `pnpm lint`
  - `pnpm test` (or `pnpm vitest` if configured)
  - `pnpm typecheck`
- **Backend**
  - `ruff check .`
  - `pytest`
  - `mypy` (if enabled)

CI should pass without failures; include rationale for any temporarily skipped tests.

## Supabase, RLS, and migrations

- Store Supabase migrations (SQL) in the backend `db/migrations/` folder; never apply ad-hoc console edits without exporting the SQL.
- RLS policies must be explicit and tested. Add policy coverage tests (e.g., `tests/db/test_policies.py`) when tables or policies change.
- Use the **service-role key only on the server** (backend/CI). The frontend must use the anon key.
- Keep **storage bucket policies** in sync with table policies; restrict public buckets to read-only if possible.
- Document any new policies in the PR description.

## Encrypted chat and secrets

- Keys for encrypted chat should be generated locally (e.g., `openssl genrsa` / `openssl rsa -pubout`) and referenced via environment variables or key files; **do not commit keys**.
- When adding chat features, ensure key exchange happens only over authenticated channels and that decrypted content never leaves the server logs.
- If introducing new cryptography dependencies, prefer audited libraries and short-lived session keys.

## Working with OAuth providers

- Configure OAuth providers (Google, GitHub) in Supabase; mirror the client IDs/secrets in `.env`/`.env.local`.
- Ensure redirect URLs align between Supabase and the frontend (e.g., `http://localhost:3000/auth/callback`).

## Submitting PRs

- Rebase on `main`, fix conflicts locally, and ensure tests are green.
- Provide a concise summary of changes, risks, and verification steps in the PR description.
- Include screenshots for visual changes (UI) where applicable.
