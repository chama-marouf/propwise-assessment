"use client";

import { useAtom } from "jotai";
import { sidebarOpenAtom, periodAtom } from "@/store";
import { useToast } from "@/hooks/use-toast";
import { DateFilterTabs } from "./date-filter-tabs";

// ── Icons ─────────────────────────────────────────────────────────────────────

type SVG = { className?: string };

const IconMenu = ({ className }: SVG) => (
  <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconPlus = ({ className }: SVG) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconBell = ({ className }: SVG) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M8 1.5A4.5 4.5 0 003.5 6v3L2 11h12l-1.5-2V6A4.5 4.5 0 008 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M6.5 11.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────

export function DashboardHeader() {
  const [, setSidebarOpen]             = useAtom(sidebarOpenAtom);
  const [activeTab]                    = useAtom(periodAtom);
  const { success, error, info, neutral } = useToast();

  return (
    <header className="flex flex-col gap-0 border-b border-gray-200 bg-white">

      {/* Top row: title + actions */}
      <div className="flex items-start justify-between gap-4 px-4 pb-4 pt-5 md:px-6">

        {/* Hamburger — mobile only */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setSidebarOpen(true)}
          className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 lg:hidden"
        >
          <IconMenu />
        </button>

        {/* Title block */}
        <div className="flex flex-col gap-0.5">
          <h1 className="text-display-2 font-bold leading-tight text-gray-900">
            Dashboard
          </h1>
          <p className="text-body-sm text-gray-400">
            Here&apos;s your pipeline health and sales activity at a glance.
          </p>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2 pt-1">
          {/* Bell */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-xs transition-colors hover:bg-gray-50 hover:text-gray-700"
          >
            <IconBell />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
          </button>

          {/* Create — fires demo toasts */}
          <button
            type="button"
            onClick={() => {
              success("Deal closed successfully", {
                action: { label: "View deal", onClick: () => {}, icon: "retry" },
              });
              setTimeout(() => neutral("Draft saved automatically"), 400);
              setTimeout(() => info(`Showing data for ${activeTab}`), 800);
              setTimeout(
                () =>
                  error("Sync failed. Could not reach server", {
                    action: { label: "Retry", onClick: () => success("Synced!"), icon: "retry" },
                  }),
                1200,
              );
            }}
            className="flex items-center gap-1.5 rounded-lg bg-brand-500 px-3.5 py-2 text-body font-semibold text-white shadow-xs transition-all hover:bg-brand-600 active:scale-95"
          >
            <IconPlus />
            Create
          </button>
        </div>
      </div>

      {/* Date filter tabs */}
      <DateFilterTabs />
    </header>
  );
}
