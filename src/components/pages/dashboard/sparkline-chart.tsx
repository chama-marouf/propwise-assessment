"use client";

import { ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";
import type { TrendDirection } from "@/types/dashboard";

// ── Colours ───────────────────────────────────────────────────────────────────

const COLORS: Record<TrendDirection, { stroke: string; gradientId: string }> = {
  up:   { stroke: "#3D52D5", gradientId: "spark-up"   },
  down: { stroke: "#FF485D", gradientId: "spark-down" },
  flat: { stroke: "#A0A0AB", gradientId: "spark-flat" },
};

// ── Tooltip ───────────────────────────────────────────────────────────────────

function SparkTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value?: number }> }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-gray-200 bg-white px-2 py-1 text-caption font-semibold text-gray-700 shadow-dropdown">
      {payload[0].value}
    </div>
  );
}

// ── Animated active dot ──────────────────────────────────────────────────────

function AnimatedDot({ cx, cy, fill }: { cx?: number; cy?: number; fill?: string }) {
  if (cx === undefined || cy === undefined) return null;
  return (
    <g style={{
      transform: `translate(${cx}px, ${cy}px)`,
      transition: "transform 180ms cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <circle cx={0} cy={0} r={5} fill={fill} opacity={0.2}
        style={{ animation: "dot-ping 1s ease-out infinite" }} />
      <circle cx={0} cy={0} r={3} fill={fill} />
    </g>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

interface SparklineChartProps {
  data:           number[];
  trendDirection: TrendDirection;
}

export function SparklineChart({ data, trendDirection }: SparklineChartProps) {
  const c         = COLORS[trendDirection];
  const chartData = data.map((v) => ({ v }));

  return (
    <div className="h-12 w-full" aria-hidden>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={c.gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={c.stroke} stopOpacity={0.2} />
              <stop offset="95%" stopColor={c.stroke} stopOpacity={0}   />
            </linearGradient>
          </defs>
          <Tooltip
            content={<SparkTooltip />}
            cursor={{ stroke: c.stroke, strokeWidth: 1, strokeDasharray: "3 3" }}
          />
          <Area
            type="monotone"
            dataKey="v"
            stroke={c.stroke}
            strokeWidth={1.5}
            fill={`url(#${c.gradientId})`}
            dot={false}
            activeDot={(props: { cx?: number; cy?: number }) => <AnimatedDot cx={props.cx} cy={props.cy} fill={c.stroke} />}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
