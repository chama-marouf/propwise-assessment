"use client";

import type { PipelineStage } from "@/types/dashboard";
import { PipelineSkeleton } from "./dashboard-skeleton";

// Dark navy bar colour matching the design
const BAR_COLOR = "#1a2f6e";

function IconExternalLink() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2 10L10 2M10 2H5.5M10 2v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface PipelineSummaryProps {
  data?: PipelineStage[];
}

export function PipelineSummary({ data }: PipelineSummaryProps) {
  if (!data) return <PipelineSkeleton />;

  const totalDeals  = data.reduce((s, x) => s + x.count, 0);
  const totalValuek = data.reduce((s, x) => s + x.valuek, 0);
  const totalValueStr =
    totalValuek >= 1000
      ? `AED ${(totalValuek / 1000).toFixed(2)}M`
      : `AED ${totalValuek}K`;

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-card dark:border-stone-700 dark:bg-stone-900">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-stone-50">Pipeline Summary</h2>
          <p className="text-body-sm text-gray-400 dark:text-stone-500">
            {totalDeals} deals across {data.length} stages
            {" · "}{totalValueStr} total value
          </p>
        </div>
        <button
          type="button"
          className="flex shrink-0 items-center gap-1 text-body-sm font-semibold text-brand-500 transition-colors hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300"
        >
          Details
          <IconExternalLink />
        </button>
      </div>

      {/* Stage bars */}
      <div className="flex flex-col gap-3">
        {data.map((stage) => (
          <div key={stage.label} className="flex items-center gap-4">
            {/* Label */}
            <span className="w-28 shrink-0 text-right text-body-sm font-medium text-gray-500 dark:text-stone-400">
              {stage.label}
            </span>

            {/* Bar track */}
            <div className="relative h-11 flex-1 overflow-hidden rounded-lg">
              <div className="absolute inset-0 rounded-lg bg-gray-100 dark:bg-stone-800" />

              {/* Filled portion */}
              <div
                className="absolute inset-y-0 left-0 rounded-lg transition-[width] duration-500"
                style={{ width: `${stage.pct}%`, backgroundColor: BAR_COLOR }}
              >
                <div className="flex h-full items-center px-0.75 py-0.75">
                  {/* Single pill: count + value */}
                  <span className="inline-flex items-center gap-2 rounded-md bg-white/15 px-3 py-1 text-xs text-white">
                    <span className="font-bold">{stage.count}</span>
                    <span className="font-normal text-white/70">{stage.value}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
