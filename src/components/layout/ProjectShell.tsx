import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"

const navigation = [
  { label: "Work", href: "/projects" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Hiring", href: "/hiring" },
]

type ProjectShellProps = {
  children: ReactNode
  activePage?: "work" | "hiring"
}

export function ProjectShell({ children, activePage = "work" }: ProjectShellProps) {
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cyan-50 focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-[var(--observatory-graphite)]"
      >
        Skip to main content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-3 text-lg font-semibold tracking-[-0.03em] text-white"
            aria-label="Pascal.dev home"
          >
            <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-white/[0.06]">
              <span className="h-3 w-3 rotate-45 border border-white/80" />
            </span>
            <span>
              Pascal<span className="text-white/55">.dev</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={
                  (activePage === "work" && item.href === "/projects") ||
                  (activePage === "hiring" && item.href === "/hiring")
                    ? "page"
                    : undefined
                }
                className={
                  (activePage === "work" && item.href === "/projects") ||
                  (activePage === "hiring" && item.href === "/hiring")
                    ? "inline-flex min-h-11 items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white"
                    : "inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm font-medium text-white/65 transition hover:text-white"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={activePage === "hiring" ? "/hiring" : "/projects"}
              aria-current="page"
              className="hidden min-h-11 items-center rounded-full px-3 text-sm font-medium text-white/70 transition hover:text-white sm:inline-flex lg:hidden"
            >
              {activePage === "hiring" ? "Hiring" : "Work"}
            </Link>
            <Link
              href="/#contact"
              className="liquid-sheen inline-flex min-h-11 items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-50 sm:px-5"
            >
              <span className="sm:hidden">Contact</span>
              <span className="hidden sm:inline">Discuss your project</span>
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="relative z-20 border-t border-white/10 bg-black/40 py-14 sm:py-16" aria-label="Footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold text-cyan-100/70">Pascal.dev · Product engineering</p>
              <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                Useful, clear software built around real business needs.
              </h2>
              <Link
                href="/#contact"
                className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition hover:border-cyan-100/40 hover:bg-cyan-50 hover:text-black"
              >
                Start a conversation <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="lg:text-right">
              <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2 lg:justify-end">
                <Link href="/" className="inline-flex min-h-11 items-center text-sm text-white/60 transition hover:text-white">Home</Link>
                {navigation.map((item) => (
                  <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center text-sm text-white/60 transition hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 flex gap-2 lg:justify-end">
                <a href="https://github.com/pascal1010100" target="_blank" rel="noopener noreferrer" aria-label="Visit Pascal.dev on GitHub" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/25 hover:text-white">
                  <Github className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href="https://www.linkedin.com/in/josema-aguilar-dev" target="_blank" rel="noopener noreferrer" aria-label="Visit Pascal.dev on LinkedIn" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/25 hover:text-white">
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href="mailto:josemanu0885@gmail.com" aria-label="Send an email" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/25 hover:text-white">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/45">
            © {currentYear} Pascal.dev. Guatemala · Remote.
          </div>
        </div>
      </footer>
    </div>
  )
}
