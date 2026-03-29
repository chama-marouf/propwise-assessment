"use client";

import type { KpiData, TrendDirection } from "@/types/dashboard";
import { useCountUp } from "@/hooks/use-count-up";
import { SparklineChart } from "./sparkline-chart";

// ── Icons ──────────────────────────────────────────────────────────────────

type SVG = { className?: string };

const IconTrendUp   = ({ className }: SVG) => (<svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><path d="M2 8.5L5 5.5l2.5 2.5L11 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M8.5 3.5H11v2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const IconTrendDown = ({ className }: SVG) => (<svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><path d="M2 3.5L5 6.5l2.5-2.5L11 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M8.5 8.5H11V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const IconMinus     = ({ className }: SVG) => (<svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><path d="M2 6h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>);

const trendConfig: Record<TrendDirection, { Icon: (p: SVG) => React.ReactElement; color: string }> = {
  up:   { Icon: IconTrendUp,   color: "text-green-600" },
  down: { Icon: IconTrendDown, color: "text-red-500"   },
  flat: { Icon: IconMinus,     color: "text-gray-400"  },
};

// ── Types ──────────────────────────────────────────────────────────────────

export type KpiCardProps = KpiData & { index?: number };

// ── Component ───────────────────────────────────────────────────────────────

export function KpiCard({ label, value, trend, trendDirection, sparklineData, index = 0 }: KpiCardProps) {
  const t = trendConfig[trendDirection];
  // Stagger delay: card entrance (index * 80ms) + extra 150ms so the count-up
  // starts after the card has faded in.
  const animatedValue = useCountUp({
    value,
    duration: 900 + index * 80, // slight per-card variation: 900ms → ~1180ms
    delay:    index * 80 + 150,
  });

  return (
    <div
      className="animate-fade-in flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5 shadow-card dark:border-stone-700 dark:bg-stone-900"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: "both" }}
    >

      {/* Left: label / value */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-body-sm text-gray-400 dark:text-stone-500">{label}</p>
        <p
          className="animate-count-up text-2xl font-bold leading-tight text-gray-900 dark:text-stone-50"
          style={{ animationDelay: `${index * 80 + 150}ms`, animationFillMode: "both" }}
        >
          {animatedValue}
        </p>
      </div>

      {/* Right: sparkline + trend below */}
      <div className="flex shrink-0 flex-col items-end gap-1">
        <div className="h-10 w-24">
          <SparklineChart data={sparklineData} trendDirection={trendDirection} />
        </div>
        <span className={`flex items-center gap-0.5 text-body-sm font-semibold ${t.color}`}>
          <t.Icon />
          {trend}
        </span>
      </div>
    </div>
  );
}
