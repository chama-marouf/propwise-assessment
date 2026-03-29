"use client";

import { useAtom } from "jotai";
import { periodAtom } from "@/store";
import type { DatePeriod } from "@/types/dashboard";


// ── Constants ──────────────────────────────────────────────────────────────────

const DATE_TABS: DatePeriod[] = [
  "Today",
  "This Week",
  "This Month",
  "This Quarter",
  "This Year",
  "Custom",
];

// ── Icon ────────────────────────────────────────────────────────────────────────

type SVG = { className?: string };

const IconCalendar = ({ className }: SVG) => (
  <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M1 5h10" stroke="currentColor" strokeWidth="1.3" />
    <path d="M3.5 1v2M8.5 1v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

// ── Component ──────────────────────────────────────────────────────────────────

export function DateFilterTabs() {
  const [activeTab, setActiveTab] = useAtom(periodAtom);

  return (
    <div className="overflow-x-auto px-4 pb-3 pt-1 md:px-6" style={{ scrollbarWidth: "none" }}>
      <div
        role="tablist"
        aria-label="Date range filter"
        className="flex w-fit min-w-full gap-0 rounded-sm bg-gray-100 p-1 dark:bg-stone-800"
      >
        {DATE_TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab)}
              className={[
                "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm px-3.5 py-1.5 text-body font-medium transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
                isActive
                  ? "bg-white text-gray-900 shadow-xs dark:bg-stone-700 dark:text-stone-50"
                  : "text-gray-500 hover:text-gray-700 dark:text-stone-500 dark:hover:text-stone-300",
              ].join(" ")}
            >
              {tab === "Custom" && <IconCalendar className="opacity-60" />}
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}

