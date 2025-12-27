# VentureSci

## Overview

This repository is organized as a small monorepo with two workspaces:

- `packages/mobile`: React Native app scaffold with TypeScript, ESLint/Prettier, and Jest + React Native Testing Library.
- `packages/api`: Express-based API scaffold with TypeScript, ESLint/Prettier, and Jest + Supertest.

## Getting Started

Install dependencies with npm (workspaces are configured automatically):

```bash
npm install
```

Run project-wide scripts:

- Lint: `npm run lint`
- Type check: `npm run type-check`
- Tests: `npm test`

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs linting, type-checking, and tests on pushes and pull requests with cached npm modules and mock Supabase environment variables.
