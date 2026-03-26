"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// ── Data ──────────────────────────────────────────────────────────────────────

type DataPoint = { month: string; thisYear: number; lastYear: number };

const DATA: DataPoint[] = [
  { month: "Jan", thisYear: 58,  lastYear: 44 },
  { month: "Feb", thisYear: 72,  lastYear: 53 },
  { month: "Mar", thisYear: 65,  lastYear: 60 },
  { month: "Apr", thisYear: 84,  lastYear: 58 },
  { month: "May", thisYear: 91,  lastYear: 70 },
  { month: "Jun", thisYear: 78,  lastYear: 74 },
  { month: "Jul", thisYear: 104, lastYear: 80 },
  { month: "Aug", thisYear: 112, lastYear: 85 },
  { month: "Sep", thisYear: 98,  lastYear: 79 },
  { month: "Oct", thisYear: 125, lastYear: 92 },
  { month: "Nov", thisYear: 137, lastYear: 98 },
  { month: "Dec", thisYear: 143, lastYear: 105 },
];

const TOTAL_THIS  = DATA.reduce((s, d) => s + d.thisYear,  0);
const TOTAL_LAST  = DATA.reduce((s, d) => s + d.lastYear,  0);
const GROWTH_PCT  = (((TOTAL_THIS - TOTAL_LAST) / TOTAL_LAST) * 100).toFixed(1);

// Colours — raw hex so Recharts SVG can consume them
const C_THIS = "#3D52D5"; // brand-500
const C_LAST = "#A5B4FC"; // brand-300

// ── Custom tooltip ────────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: {
  active?:  boolean;
  label?:   string;
  payload?: Array<{ name: string; value: number; color: string }>;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-dropdown">
      <p className="mb-1.5 text-body-sm font-semibold text-gray-700">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-4 text-body-sm">
          <span className="flex items-center gap-1.5 text-gray-500">
            <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
            {p.name === "thisYear" ? "This Year" : "Last Year"}
          </span>
          <span className="font-semibold text-gray-900">${p.value}k</span>
        </div>
      ))}
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function RevenueChart() {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-card">

      {/* ── Header row ── */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        {/* title + total */}
        <div className="flex flex-col gap-0.5">
          <p className="text-body-sm text-gray-400">Revenue Forecast</p>
          <div className="flex items-baseline gap-2">
            <span className="text-display-2 text-gray-900">
              ${(TOTAL_THIS / 10).toFixed(1)}M
            </span>
            <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-body-sm font-semibold text-green-600">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2 8.5L5 5.5l2.5 2.5L11 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 3.5h3v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              +{GROWTH_PCT}%
            </span>
          </div>
          <p className="text-body-sm text-gray-400">Jan – Dec 2026</p>
        </div>

        {/* legend */}
        <div className="flex items-center gap-4 pt-1 text-body-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-5 rounded-full" style={{ background: C_THIS }} />
            This Year
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-5 rounded-full" style={{ background: C_LAST }} />
            Last Year
          </span>
        </div>
      </div>

      {/* ── Chart ── */}
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DATA} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
            <defs>
              {/* This year gradient */}
              <linearGradient id="grad-this" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={C_THIS} stopOpacity={0.18} />
                <stop offset="95%" stopColor={C_THIS} stopOpacity={0}    />
              </linearGradient>
              {/* Last year gradient */}
              <linearGradient id="grad-last" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={C_LAST} stopOpacity={0.25} />
                <stop offset="95%" stopColor={C_LAST} stopOpacity={0}    />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#E4E4E7"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#A0A0AB" }}
              tickLine={false}
              axisLine={false}
              dy={6}
            />

            <YAxis
              tick={{ fontSize: 11, fill: "#A0A0AB" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${v}k`}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#E4E4E7", strokeWidth: 1 }}
            />

            {/* Last year — render first so this year sits on top */}
            <Area
              type="monotone"
              dataKey="lastYear"
              name="lastYear"
              stroke={C_LAST}
              strokeWidth={1.5}
              fill="url(#grad-last)"
              dot={false}
              activeDot={{ r: 4, fill: C_LAST, strokeWidth: 0 }}
              isAnimationActive={false}
            />

            {/* This year */}
            <Area
              type="monotone"
              dataKey="thisYear"
              name="thisYear"
              stroke={C_THIS}
              strokeWidth={2}
              fill="url(#grad-this)"
              dot={false}
              activeDot={{ r: 4, fill: C_THIS, strokeWidth: 0 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── Summary strip ── */}
      <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-4">
        {[
          { label: "This Year",  val: `$${(TOTAL_THIS / 10).toFixed(1)}M`, color: "text-gray-900"  },
          { label: "Last Year",  val: `$${(TOTAL_LAST / 10).toFixed(1)}M`, color: "text-gray-400"  },
          { label: "Growth",     val: `+${GROWTH_PCT}%`,                   color: "text-green-600" },
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
