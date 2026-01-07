import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            SaaS Template
          </Link>
        </div>
        <div className="flex-none gap-2">
          <ThemeToggle />
          <Link href="/login" className="btn btn-ghost">
            Login
          </Link>
          <Link href="/register" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold">
            Build Your SaaS
            <span className="text-primary"> Faster</span>
          </h1>
          <p className="mb-8 text-xl text-base-content/70">
            Production-ready Next.js 16 template with database abstraction, auth
            providers, and Nexus integration. Start building your product today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register" className="btn btn-primary btn-lg">
              Start Free Trial
            </Link>
            <Link
              href="https://github.com/av8r-ryan/template-nextjs-saas"
              className="btn btn-outline btn-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Database Abstraction"
            description="Choose between Supabase or Neon with a simple environment variable. No code changes required."
            icon="🗄️"
          />
          <FeatureCard
            title="Auth Providers"
            description="Supabase Auth or NextAuth.js - switch providers without rewriting your auth logic."
            icon="🔐"
          />
          <FeatureCard
            title="Design System"
            description="TailwindCSS + DaisyUI with centralized design tokens. Light, dark, and system themes."
            icon="🎨"
          />
          <FeatureCard
            title="Email Ready"
            description="AWS SES integration with pre-built email templates for common transactional emails."
            icon="📧"
          />
          <FeatureCard
            title="Nexus Integration"
            description="Health and metrics endpoints for centralized monitoring and management."
            icon="📊"
          />
          <FeatureCard
            title="Production Ready"
            description="TypeScript strict mode, ESLint, Prettier, Vitest, Playwright, and Lighthouse CI."
            icon="✅"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="footer footer-center bg-base-200 p-10 text-base-content">
        <div>
          <p>
            Built with Next.js 16, React 19, and TailwindCSS.
            <br />
            Managed by Nexus Command Center.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="card bg-base-200 shadow-md transition-shadow hover:shadow-lg">
      <div className="card-body">
        <div className="mb-2 text-4xl">{icon}</div>
        <h3 className="card-title">{title}</h3>
        <p className="text-base-content/70">{description}</p>
      </div>
    </div>
  );
}
