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
import type { RevenuePoint } from "@/types/dashboard";
import { RevenueForecastSkeleton } from "./dashboard-skeleton";

// ── Colours ───────────────────────────────────────────────────────────────────

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

interface RevenueForecastProps {
  data?: RevenuePoint[];
}

export function RevenueForecast({ data }: RevenueForecastProps) {
  if (!data) return <RevenueForecastSkeleton />;

  const TOTAL_THIS = data.reduce((s, d) => s + d.thisYear, 0);
  const TOTAL_LAST = data.reduce((s, d) => s + d.lastYear, 0);
  const GROWTH_PCT = (((TOTAL_THIS - TOTAL_LAST) / TOTAL_LAST) * 100).toFixed(1);

  return (
    <div className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-card">

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
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

      {/* Chart */}
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id="rev-grad-this" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={C_THIS} stopOpacity={0.18} />
                <stop offset="95%" stopColor={C_THIS} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="rev-grad-last" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={C_LAST} stopOpacity={0.25} />
                <stop offset="95%" stopColor={C_LAST} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#E4E4E7" strokeDasharray="3 3" />
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
            <Area
              type="monotone"
              dataKey="lastYear"
              name="lastYear"
              stroke={C_LAST}
              strokeWidth={1.5}
              fill="url(#rev-grad-last)"
              dot={false}
              activeDot={{ r: 4, fill: C_LAST, strokeWidth: 0 }}
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="thisYear"
              name="thisYear"
              stroke={C_THIS}
              strokeWidth={2}
              fill="url(#rev-grad-this)"
              dot={false}
              activeDot={{ r: 4, fill: C_THIS, strokeWidth: 0 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-4">
        {[
          { label: "This Year", val: `$${(TOTAL_THIS / 10).toFixed(1)}M`, color: "text-gray-900"  },
          { label: "Last Year", val: `$${(TOTAL_LAST / 10).toFixed(1)}M`, color: "text-gray-400"  },
          { label: "Growth",    val: `+${GROWTH_PCT}%`,                   color: "text-green-600" },
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
