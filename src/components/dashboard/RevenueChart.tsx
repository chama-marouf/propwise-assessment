// Revenue bar chart — CSS-only bars (no external chart library)

type Bar = { month: string; value: number; prev: number };

const DATA: Bar[] = [
  { month: "Oct", value: 62,  prev: 55 },
  { month: "Nov", value: 74,  prev: 61 },
  { month: "Dec", value: 88,  prev: 70 },
  { month: "Jan", value: 78,  prev: 74 },
  { month: "Feb", value: 95,  prev: 80 },
  { month: "Mar", value: 100, prev: 88 },
];

const MAX = 100;

export function RevenueChart() {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-card">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-body font-semibold text-gray-900">Revenue</h2>
          <p className="text-body-sm text-gray-400">vs previous period</p>
        </div>
        <div className="flex items-center gap-3 text-body-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            Current
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-200" />
            Previous
          </span>
        </div>
      </div>

      {/* chart */}
      <div
        className="flex items-end gap-2"
        role="img"
        aria-label="Bar chart showing monthly revenue"
      >
        {DATA.map(({ month, value, prev }) => (
          <div key={month} className="flex flex-1 flex-col items-center gap-1.5">
            {/* paired bars */}
            <div className="flex w-full items-end gap-0.5">
              {/* current */}
              <div
                className="flex-1 rounded-t-sm bg-brand-500 transition-all"
                style={{ height: `${(value / MAX) * 80}px` }}
              />
              {/* previous */}
              <div
                className="flex-1 rounded-t-sm bg-brand-200 transition-all"
                style={{ height: `${(prev / MAX) * 80}px` }}
              />
            </div>
            <span className="text-caption text-gray-400">{month}</span>
          </div>
        ))}
      </div>

      {/* summary row */}
      <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-4">
        {[
          { label: "This period",  val: "$842.5k", color: "text-gray-900" },
          { label: "Last period",  val: "$720.0k", color: "text-gray-400" },
          { label: "Growth",       val: "+17.0%",  color: "text-green-600" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col gap-0.5">
            <p className={`text-body font-semibold ${s.color}`}>{s.val}</p>
            <p className="text-caption text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
