# Claude Code Context - SaaS Template

## Project Overview

Production-ready Next.js 16 SaaS template with database/auth abstraction, design system, and Nexus integration. Supports Supabase or Neon for database, Supabase Auth or NextAuth for authentication.

## Tech Stack

- Next.js 16, React 19, Node.js 24, TypeScript (strict)
- TailwindCSS 4 + DaisyUI
- Database: Supabase or Neon (set via `DATABASE_PROVIDER` env)
- Auth: Supabase Auth or NextAuth (set via `AUTH_PROVIDER` env)
- Email: AWS SES
- Testing: Vitest + Playwright + Lighthouse CI

## Key Patterns

### Server Components by Default

Use Server Components for data fetching. Only add `'use client'` when needed for interactivity.

### Database Abstraction

```typescript
// Dynamic import based on DATABASE_PROVIDER
import { getDatabase } from "@/lib/db";
const db = await getDatabase();

// Or direct import when you know the provider
import { getSupabaseServerClient } from "@/lib/db/supabase";
import { getNeonClient } from "@/lib/db/neon";
```

### Auth Abstraction

```typescript
// Dynamic import based on AUTH_PROVIDER
import { getAuth } from "@/lib/auth";
const auth = await getAuth();
const session = await auth.server().getSession();

// Or direct import
import { getSupabaseServerAuth } from "@/lib/auth/supabase-auth";
```

### Design Tokens

Centralized in `src/styles/tokens.css`. Use CSS variables for colors, spacing, typography.

### Theme Support

Light/dark/system themes via `ThemeProvider`. Access with `useTheme()` hook.

## Commands

```bash
npm run dev         # Development (Turbopack)
npm run build       # Production build
npm run lint        # ESLint + Prettier check
npm run format      # Auto-fix formatting
npm run test        # Unit tests (Vitest)
npm run test:e2e    # E2E tests (Playwright)
npm run lighthouse  # Lighthouse CI audit
npm run validate    # Full validation (lint + type-check + build)
```

## Key Files

- `src/lib/config.ts` - Centralized environment configuration
- `src/lib/db/index.ts` - Database abstraction layer
- `src/lib/auth/index.ts` - Auth abstraction layer
- `src/lib/email/ses.ts` - AWS SES email client
- `src/styles/tokens.css` - Design tokens
- `src/contexts/theme.tsx` - Theme provider

## Nexus Integration

This product is managed by Nexus Command Center.

- Health endpoint: `GET /api/nexus/health`
- Metrics endpoint: `GET /api/nexus/metrics`

## Environment Variables

See `.env.example` for all available variables. Key ones:

- `DATABASE_PROVIDER`: `supabase` or `neon`
- `AUTH_PROVIDER`: `supabase` or `nextauth`
- `NEXUS_PRODUCT_SLUG`: Product identifier for Nexus
