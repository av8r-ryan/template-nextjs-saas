# Next.js SaaS Template

Production-ready Next.js 16 SaaS template with database/auth abstraction, design system, and Nexus integration.

## Features

- **Next.js 16** with Turbopack (default bundler)
- **React 19** with Server Components
- **TypeScript** strict mode
- **TailwindCSS 4 + DaisyUI** for styling
- **Database Abstraction** - Switch between Supabase and Neon
- **Auth Abstraction** - Switch between Supabase Auth and NextAuth
- **Design System** - Centralized tokens with light/dark/system themes
- **AWS SES** - Email integration with templates
- **Nexus Integration** - Health and metrics endpoints
- **Testing** - Vitest, Playwright, Lighthouse CI
- **CI/CD** - GitHub Actions workflow

## Quick Start

1. Create a new repo from this template
2. Clone your new repo
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy environment file:
   ```bash
   cp .env.example .env.local
   ```
5. Configure your environment variables
6. Start development:
   ```bash
   npm run dev
   ```

## Environment Configuration

### Database Provider

Set `DATABASE_PROVIDER` to choose your database:

```env
DATABASE_PROVIDER=supabase  # or 'neon'
```

- **Supabase**: Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- **Neon**: Set `DATABASE_URL`

### Auth Provider

Set `AUTH_PROVIDER` to choose your auth:

```env
AUTH_PROVIDER=supabase  # or 'nextauth'
```

- **Supabase Auth**: Uses Supabase credentials (same as database)
- **NextAuth**: Set `NEXTAUTH_SECRET`, `NEXTAUTH_URL`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint + Prettier check |
| `npm run format` | Auto-fix formatting |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run lighthouse` | Run Lighthouse audit |
| `npm run validate` | Full validation |

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/nexus/       # Nexus integration endpoints
│   └── ...
├── components/          # React components
│   ├── ui/              # Base UI components
│   ├── layout/          # Layout components
│   └── theme/           # Theme components
├── contexts/            # React contexts
│   └── theme.tsx        # Theme provider
├── lib/                 # Utilities
│   ├── db/              # Database abstraction
│   ├── auth/            # Auth abstraction
│   ├── email/           # AWS SES client
│   └── config.ts        # Environment config
└── styles/              # CSS
    └── tokens.css       # Design tokens
```

## Nexus Integration

This template includes endpoints for Nexus Command Center integration:

- `GET /api/nexus/health` - Health status
- `GET /api/nexus/metrics` - Product metrics

Set `NEXUS_PRODUCT_SLUG` to identify your product.

## License

MIT
