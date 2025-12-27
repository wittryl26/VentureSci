# VentureSci

## Overview

This repository is organized as a monorepo with clearly separated application targets:

- `apps/expo`: Expo / React Native (mobile + web) client following Feature-Sliced Design (FSD) with bottom navigation, authentication flows, encrypted messaging, and post/inquiry features.
- `apps/api`: Node.js REST API with Supabase-aware endpoints for funder requests, researcher projects, organization pages, and profile credibility links.
- `packages`: reserved for shared libraries and design system packages as the project grows.

## Getting Started

Install dependencies with npm (workspaces are configured automatically):

```bash
npm install
```

Run project-wide scripts:

- Lint: `npm run lint`
- Type check: `npm run type-check`
- Tests: `npm test`

### Expo app

- Start: `npm run start --workspace @venturesci/expo` (use `--web` to preview web).
- Environment: copy `apps/expo/.env.example` to `.env` and set `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`, and `EXPO_PUBLIC_STREAM_CHAT_KEY`.
- Structure: FSD layers under `apps/expo/src` (`app`, `pages`, `features`, `entities`, `shared`, `widgets`).

### API

- Start: `npm run dev --workspace @venturesci/api`
- Environment: copy `apps/api/.env.example` to `.env` and set Supabase keys plus an optional Stream Chat key.
- Supabase: `apps/api/supabase/policies.sql` bootstraps schema + RLS. Configure OAuth2 providers (GitHub/Google/etc.) in Supabase Authentication.

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs linting, type-checking, and tests on pushes and pull requests with cached npm modules and mock Supabase environment variables.
