import type { PipelineStage } from "@/lib/mockApi";

type Stage = PipelineStage & { color: string };

// UI-only colours per stage index
const STAGE_COLORS = [
  "bg-brand-500",
  "bg-brand-400",
  "bg-brand-300",
  "bg-brand-200",
  "bg-green-400",
];

function PipelineSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-16 rounded bg-gray-100" />
          <div className="h-3 w-28 rounded bg-gray-100" />
        </div>
        <div className="h-5 w-16 rounded-full bg-gray-100" />
      </div>
      {[1,2,3,4,5].map((i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div className="h-3 w-full rounded bg-gray-100" />
          <div className="h-1.5 w-full rounded-full bg-gray-100" />
        </div>
      ))}
    </div>
  );
}

export function Pipeline({ data }: { data?: PipelineStage[] }) {
  if (!data) return <PipelineSkeleton />;

  const stages: Stage[] = data.map((s, i) => ({
    ...s,
    color: STAGE_COLORS[i] ?? "bg-brand-500",
  }));

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-card">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-body font-semibold text-gray-900">Pipeline</h2>
          <p className="text-body-sm text-gray-400">Deal stages overview</p>
        </div>
        <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-body-sm font-medium text-brand-600">
          {stages.reduce((s, x) => s + x.count, 0)} total
        </span>
      </div>

      {/* stages */}
      <div className="flex flex-col gap-3">
        {stages.map((s) => (
          <div key={s.label} className="flex flex-col gap-1">
            {/* label row */}
            <div className="flex items-center justify-between text-body-sm">
              <span className="text-gray-700">{s.label}</span>
              <div className="flex items-center gap-3 text-gray-400">
                <span>{s.count} leads</span>
                <span className="font-medium text-gray-700">{s.value}</span>
              </div>
            </div>
            {/* bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full ${s.color} transition-all`}
                style={{ width: `${s.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* conversion */}
      <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3.5 py-2.5 text-body-sm">
        <span className="text-gray-500">Conversion rate</span>
        <span className="font-semibold text-green-600">
          {stages.length >= 2
            ? ((stages[stages.length - 1].count / stages[0].count) * 100).toFixed(1)
            : "0.0"}%
        </span>
      </div>
    </div>
  );
}
