"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

// ── Slug helpers ───────────────────────────────────────────────────────────────

const toSlug   = (p: DatePeriod) => p.toLowerCase().replace(/\s+/g, "-");
const fromSlug = (s: string): DatePeriod | null =>
  DATE_TABS.find((t) => toSlug(t) === s.toLowerCase()) ?? null;

// ── Component ──────────────────────────────────────────────────────────────────

export function DateFilterTabs() {
  const [activeTab, setActiveTab] = useAtom(periodAtom);
  const router       = useRouter();
  const searchParams = useSearchParams();

  // Seed atom from URL on first render, or set default URL if no param
  useEffect(() => {
    const slug = searchParams.get("period");
    if (slug) {
      const period = fromSlug(slug);
      if (period && period !== activeTab) setActiveTab(period);
    } else {
      // No param in URL — write the current default so URL always reflects state
      const params = new URLSearchParams(searchParams.toString());
      params.set("period", toSlug(activeTab));
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  // Only run on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (tab: DatePeriod) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("period", toSlug(tab));
    router.replace(`?${params.toString()}`, { scroll: false });
  };

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
              onClick={() => handleSelect(tab)}
              className={[
                "flex h-8.75 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[6px] px-3.5 py-1.5 text-body font-medium transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
                isActive
                  ? "bg-white text-gray-900 shadow-xs dark:bg-stone-700 dark:text-stone-50"
                  : "text-gray-500 hover:text-gray-700 dark:text-stone-500 dark:hover:text-stone-300",
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

