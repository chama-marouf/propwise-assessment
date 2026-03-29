"use client";

import type { KpiData } from "@/types/dashboard";
import { KpiCard } from "./kpi-card";
import { KpiCardSkeleton } from "./dashboard-skeleton";

// ── Component ───────────────────────────────────────────────────────────────

interface KpiCardsProps {
  data?: KpiData[];
}

export function KpiCards({ data }: KpiCardsProps) {
  if (!data) {
    return (
      <section aria-label="KPI summary" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <KpiCardSkeleton key={i} />)}
      </section>
    );
  }

  return (
    <section aria-label="KPI summary" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {data.map((d, i) => (
        <KpiCard key={d.label} {...d} index={i} />
      ))}
    </section>
  );
}
