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

// ── Component ──────────────────────────────────────────────────────────────────

export function DateFilterTabs() {
  const [activeTab, setActiveTab] = useAtom(periodAtom);

  return (
    <div className="overflow-x-auto px-4 pb-3 pt-1 md:px-6" style={{ scrollbarWidth: "none" }}>
      <div
        role="tablist"
        aria-label="Date range filter"
        className="flex w-fit gap-2.5 rounded-[6px] bg-gray-100 p-1 dark:bg-stone-800"
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
                "flex h-8.75 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[6px] px-3.5 py-1.5 text-body font-medium transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
                isActive
                  ? "bg-white text-gray-900 shadow-xs dark:bg-stone-700 dark:text-stone-50"
                  : "shadow-xs text-gray-500 hover:text-gray-700 dark:text-stone-500 dark:hover:text-stone-300",
              ].join(" ")}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}

