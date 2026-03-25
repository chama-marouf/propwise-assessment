type Stage = {
  label: string;
  count: number;
  value: string;
  pct: number; // 0-100 fill width
  color: string;
};

const STAGES: Stage[] = [
  { label: "New Leads",    count: 284, value: "$1.2M",  pct: 100, color: "bg-brand-500" },
  { label: "Qualified",   count: 171, value: "$840k",  pct: 60,  color: "bg-brand-400" },
  { label: "Proposal",    count: 98,  value: "$520k",  pct: 34,  color: "bg-brand-300" },
  { label: "Negotiation", count: 54,  value: "$310k",  pct: 19,  color: "bg-brand-200" },
  { label: "Closed Won",  count: 38,  value: "$210k",  pct: 13,  color: "bg-green-400" },
];

export function Pipeline() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-card">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-body font-semibold text-gray-900">Pipeline</h2>
          <p className="text-body-sm text-gray-400">Deal stages overview</p>
        </div>
        <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-body-sm font-medium text-brand-600">
          {STAGES.reduce((s, x) => s + x.count, 0)} total
        </span>
      </div>

      {/* stages */}
      <div className="flex flex-col gap-3">
        {STAGES.map((s) => (
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
          {((38 / 284) * 100).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}
