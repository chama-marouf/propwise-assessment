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

// ── Animated active dot ──────────────────────────────────────────────────────

function AnimatedDot({ cx, cy, fill }: { cx?: number; cy?: number; fill?: string }) {
  if (cx === undefined || cy === undefined) return null;
  return (
    <g style={{
      transform: `translate(${cx}px, ${cy}px)`,
      transition: "transform 180ms cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <circle cx={0} cy={0} r={7} fill={fill} opacity={0.15}
        style={{ animation: "dot-ping 1s ease-out infinite" }} />
      <circle cx={0} cy={0} r={4} fill={fill} />
    </g>
  );
}

// ── Custom tooltip ────────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: {
  active?:  boolean;
  label?:   string;
  payload?: Array<{ name: string; value: number; color: string }>;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 shadow-dropdown dark:border-stone-700 dark:bg-stone-900">
      <p className="mb-1.5 text-body-sm font-semibold text-gray-700 dark:text-stone-200">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-4 text-body-sm">
          <span className="flex items-center gap-1.5 text-gray-500 dark:text-stone-400">
            <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
            {p.name === "thisYear" ? "This Year" : "Last Year"}
          </span>
          <span className="font-semibold text-gray-900 dark:text-stone-50">${p.value}k</span>
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
    <div className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-card dark:border-stone-700 dark:bg-stone-900">

      {/* Header row: label + Report link */}
      <div className="flex items-center justify-between">
        <p className="text-body-sm text-gray-400 dark:text-stone-500">Revenue Forecast</p>
        <button
          type="button"
          className="flex items-center gap-1 text-body-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400"
        >
          Report
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2 10L10 2M10 2H5.5M10 2v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Value + growth + legend */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-baseline gap-2">
            <span className="text-display-2 font-bold text-gray-900 dark:text-stone-50">
              ${(TOTAL_THIS / 10).toFixed(1)}M
            </span>
            <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-body-sm font-semibold text-green-600 dark:bg-green-950 dark:text-green-400">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2 8.5L5 5.5l2.5 2.5L11 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 3.5h3v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              +{GROWTH_PCT}%
            </span>
            <span className="text-body-sm text-gray-400 dark:text-stone-500">vs last year</span>
          </div>
        </div>
        <div className="flex items-center gap-4 pt-1 text-body-sm text-gray-500 dark:text-stone-400">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-5" style={{ background: C_THIS }} />
            This year
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="20" height="4" viewBox="0 0 20 4" aria-hidden>
              <line x1="0" y1="2" x2="20" y2="2" stroke={C_LAST} strokeWidth="2" strokeDasharray="4 2.5" />
            </svg>
            Last year
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
              activeDot={(props: { cx?: number; cy?: number }) => <AnimatedDot cx={props.cx} cy={props.cy} fill={C_LAST} />}
              isAnimationActive={true}
              animationDuration={1200}
              animationEasing="ease-out"
            />
            <Area
              type="monotone"
              dataKey="thisYear"
              name="thisYear"
              stroke={C_THIS}
              strokeWidth={2}
              fill="url(#rev-grad-this)"
              dot={false}
              activeDot={(props: { cx?: number; cy?: number }) => <AnimatedDot cx={props.cx} cy={props.cy} fill={C_THIS} />}
              isAnimationActive={true}
              animationDuration={1400}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-4 dark:border-stone-800">
        {[
          { label: "This Year", val: `$${(TOTAL_THIS / 10).toFixed(1)}M`, color: "text-gray-900 dark:text-stone-50"  },
          { label: "Last Year", val: `$${(TOTAL_LAST / 10).toFixed(1)}M`, color: "text-gray-400 dark:text-stone-500"  },
          { label: "Growth",    val: `+${GROWTH_PCT}%`,                   color: "text-green-600 dark:text-green-400" },
        ].map((s) => (
          <div key={s.label} className="flex flex-col gap-0.5">
            <p className={`text-body font-semibold ${s.color}`}>{s.val}</p>
            <p className="text-caption text-gray-400 dark:text-stone-500">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
