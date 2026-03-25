// ── shared micro-icon ─────────────────────────────────────────────────────────
type SVG = { className?: string };

const IconBell = ({ className }: SVG) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M8 1.5A4.5 4.5 0 003.5 6v3L2 11h12l-1.5-2V6A4.5 4.5 0 008 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M6.5 11.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IconPlus = ({ className }: SVG) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconChevronRight = ({ className }: SVG) => (
  <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path d="M4.5 3L7.5 6l-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── component ─────────────────────────────────────────────────────────────────

export function DashboardHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left: breadcrumb + title */}
      <div className="flex flex-col gap-1">
        {/* breadcrumb */}
        <nav aria-label="breadcrumb" className="flex items-center gap-1 text-body-sm text-gray-400">
          <span>Home</span>
          <IconChevronRight />
          <span className="text-gray-600">Dashboard</span>
        </nav>

        <div className="flex items-baseline gap-3">
          <h1 className="text-display-2 text-gray-900">Dashboard</h1>
          <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-body-sm font-medium text-brand-600">
            Q2 2026
          </span>
        </div>

        <p className="text-body-sm text-gray-400">
          Friday, 28 March 2026 &nbsp;·&nbsp; Atlas Estates
        </p>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-xs transition-colors hover:bg-gray-50 hover:text-gray-700"
        >
          <IconBell />
          {/* unread dot */}
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        {/* Primary CTA */}
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg bg-brand-500 px-3.5 py-2 text-body font-semibold text-white shadow-xs transition-colors hover:bg-brand-600 active:scale-95"
        >
          <IconPlus />
          New Deal
        </button>
      </div>
    </header>
  );
}
