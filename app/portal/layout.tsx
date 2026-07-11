import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Client portal",
  robots: { index: false, follow: false },
};

/**
 * Shell for the private client portal. Deliberately skips the marketing nav
 * and footer — this is a utility surface clients reach from Hunter's
 * delivery emails, not a stop on the sales path.
 */
export default function PortalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-svh flex-col bg-sand">
      <header className="border-b border-ink/10 bg-sand">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="font-display text-lg font-extrabold tracking-tight text-ink"
          >
            Apex Visuals
            <span className="sr-only">, back to the main site</span>
          </Link>
          <span className="text-eyebrow text-ink-soft">Client portal</span>
        </div>
      </header>
      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-5 py-10 sm:px-8">
        {children}
      </main>
      <footer className="border-t border-ink/10 py-6 text-center text-xs text-ink-soft">
        Private delivery portal · questions? Reply to your delivery email or{" "}
        <Link href="/book" className="font-semibold underline underline-offset-4">
          Book a Call
        </Link>
      </footer>
    </div>
  );
}
