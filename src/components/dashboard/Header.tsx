"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { periodAtom } from "@/store/dashboardAtoms";
import { sidebarOpenAtom } from "@/store/sidebarAtom";
import { useToast } from "@/hooks/useToast";

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

const IconCalendar = ({ className }: SVG) => (
  <svg className={className} width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
    <rect x="1" y="2.5" width="11" height="9.5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M1 5.5h11" stroke="currentColor" strokeWidth="1.3" />
    <path d="M4 1v2.5M9 1v2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

// ── Constants ─────────────────────────────────────────────────────────────────

const DATE_TABS = [
  "Today",
  "This Week",
  "This Month",
  "This Quarter",
  "This Year",
  "Custom",
] as const;

type DateTab = (typeof DATE_TABS)[number];

// ── Component ─────────────────────────────────────────────────────────────────

export function DashboardHeader() {
  const [activeTab, setActiveTab] = useAtom(periodAtom);
  const [, setSidebarOpen]        = useAtom(sidebarOpenAtom);
  const [indicator, setIndicator]       = useState({ left: 0, width: 0 });
  const [indicatorReady, setReady]      = useState(false);
  const { success, error, info, neutral } = useToast();

  const tabsWrapRef = useRef<HTMLDivElement>(null);
  const btnRefs     = useRef<(HTMLButtonElement | null)[]>([]);

  // Measure the active tab button and position the sliding pill
  const syncIndicator = useCallback((tab: DateTab) => {
    const idx       = DATE_TABS.indexOf(tab);
    const btn       = btnRefs.current[idx];
    const container = tabsWrapRef.current;
    if (!btn || !container) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect       = btn.getBoundingClientRect();

    setIndicator({
      left:  btnRect.left - containerRect.left + container.scrollLeft,
      width: btnRect.width,
    });
    setReady(true);
  }, []);

  // Run on mount + whenever activeTab changes
  useEffect(() => {
    syncIndicator(activeTab);
  }, [activeTab, syncIndicator]);

  // Re-measure on window resize so the indicator doesn't drift
  useEffect(() => {
    const onResize = () => syncIndicator(activeTab);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeTab, syncIndicator]);

  const handleTab = (tab: DateTab) => {
    setActiveTab(tab);
    // Scroll the tab into view on mobile
    const idx = DATE_TABS.indexOf(tab);
    btnRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <header className="flex flex-col gap-0 border-b border-gray-200 bg-white">

      {/* ── Top row: title + actions ── */}
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

        {/* Left: title block */}
        <div className="flex flex-col gap-0.5">
          <p className="text-body-sm text-gray-400">
            Friday, 28 March 2026 · Atlas Estates
          </p>
          <h1 className="text-display-2 text-gray-900 leading-tight">
            Dashboard
          </h1>
          <p className="text-body-sm text-gray-400 mt-0.5">
            Overview of your pipeline, revenue and team activity
          </p>
        </div>

        {/* Right: actions */}
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

          {/* Create — fires demo toasts to exercise the toast system */}
          <button
            type="button"
            onClick={() => {
              success("Deal closed successfully", {
                action: { label: "View deal", onClick: () => {}, icon: "retry" },
              });
              setTimeout(() => neutral("Draft saved automatically"), 400);
              setTimeout(() => info(`Showing data for ${activeTab}`), 800);
              setTimeout(() =>
                error("Sync failed. Could not reach server", {
                  action: { label: "Retry", onClick: () => success("Synced!"), icon: "retry" },
                }), 1200);
            }}
            className="flex items-center gap-1.5 rounded-lg bg-brand-500 px-3.5 py-2 text-body font-semibold text-white shadow-xs transition-all hover:bg-brand-600 active:scale-95"
          >
            <IconPlus />
            Create
          </button>
        </div>
      </div>

      {/* ── Date filter tabs ── */}
      <div
        ref={tabsWrapRef}
        role="tablist"
        aria-label="Date range filter"
        className="relative flex gap-0 overflow-x-auto px-6 scrollbar-none"
        // hide scrollbar cross-browser
        style={{ scrollbarWidth: "none" }}
      >
        {DATE_TABS.map((tab, i) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              ref={(el) => { btnRefs.current[i] = el; }}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => handleTab(tab)}
              className={[
                "relative flex shrink-0 items-center gap-1.5 whitespace-nowrap px-3.5 py-3 text-body font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
                isActive ? "text-brand-600" : "text-gray-500 hover:text-gray-700",
                // Custom tab gets a calendar icon treatment
              ].join(" ")}
            >
              {tab === "Custom" && <IconCalendar className="opacity-70" />}
              {tab}
            </button>
          );
        })}

        {/* ── Sliding indicator ── */}
        <span
          aria-hidden
          className={[
            "pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-brand-500",
            "transition-[left,width] duration-200 ease-out",
            indicatorReady ? "opacity-100" : "opacity-0",
          ].join(" ")}
          style={{ left: indicator.left, width: indicator.width }}
        />

        {/* ── Bottom baseline ── */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gray-200"
        />
      </div>
    </header>
  );
}
