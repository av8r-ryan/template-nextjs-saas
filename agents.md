# SaaS Template - Agent Reference

## Quick Commands

- `npm run dev` - Start development server (Turbopack)
- `npm run build` - Production build
- `npm run lint` - ESLint + Prettier check
- `npm run format` - Auto-fix formatting
- `npm run test` - Run unit tests (Vitest)
- `npm run test:e2e` - Run E2E tests (Playwright)
- `npm run lighthouse` - Run Lighthouse CI
- `npm run validate` - Full validation pipeline

## Architecture

- Next.js 16 App Router (Turbopack default)
- React 19, Node.js 24, TypeScript strict
- Database: Supabase or Neon (set via `DATABASE_PROVIDER`)
- Auth: Supabase Auth or NextAuth (set via `AUTH_PROVIDER`)
- Styling: TailwindCSS 4 + DaisyUI
- Email: AWS SES

## Key Files

- `/src/lib/db/` - Database abstraction (Supabase/Neon)
- `/src/lib/auth/` - Auth abstraction (Supabase Auth/NextAuth)
- `/src/lib/config.ts` - Centralized env config with Zod validation
- `/src/lib/email/ses.ts` - AWS SES email client
- `/src/styles/tokens.css` - Design tokens (CSS variables)
- `/src/contexts/theme.tsx` - Theme provider (light/dark/system)
- `/src/app/api/` - API routes

## Database Provider Switch

```typescript
// Set DATABASE_PROVIDER=supabase or DATABASE_PROVIDER=neon
import { getDatabase } from "@/lib/db";
const db = await getDatabase();
```

## Auth Provider Switch

```typescript
// Set AUTH_PROVIDER=supabase or AUTH_PROVIDER=nextauth
import { getAuth } from "@/lib/auth";
const auth = await getAuth();
```

## Nexus Integration

- Health: `GET /api/nexus/health` - Returns health status
- Metrics: `GET /api/nexus/metrics` - Returns product metrics

## Testing

- Unit tests: `src/**/*.test.ts` (Vitest)
- E2E tests: `e2e/**/*.spec.ts` (Playwright)
- Lighthouse: `lighthouserc.js` config

## Directory Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # React components (ui/, layout/, theme/)
├── contexts/      # React contexts (theme)
├── lib/           # Utilities (db/, auth/, email/, config)
├── styles/        # CSS (tokens.css, globals.css)
└── test/          # Test setup
```
