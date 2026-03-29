import { Skeleton } from "@/components/ui/skeleton";

// ── KPI card skeleton ─────────────────────────────────────────────────────────

export function KpiCardSkeleton() {
  return (
    <div className="flex animate-pulse items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5 shadow-card dark:border-stone-700 dark:bg-stone-900">
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-6 w-28" />
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-3 w-12 rounded-full" />
      </div>
    </div>
  );
}

// ── Revenue forecast skeleton ─────────────────────────────────────────────────

export function RevenueForecastSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-card dark:border-stone-700 dark:bg-stone-900">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="flex gap-3 pt-1">
          <Skeleton className="h-4 w-20 rounded-full" />
          <Skeleton className="h-4 w-20 rounded-full" />
        </div>
      </div>
      <Skeleton className="h-52 w-full rounded-xl" />
      <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-4 dark:border-stone-800">
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-8" />)}
      </div>
    </div>
  );
}

// ── Pipeline skeleton ─────────────────────────────────────────────────────────

export function PipelineSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-card dark:border-stone-700 dark:bg-stone-900">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-3 w-28" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-1.5 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}
