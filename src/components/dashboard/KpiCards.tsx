"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";

// ── Public component props ────────────────────────────────────────────────────

export type TrendDirection = "up" | "down" | "flat";

export type KpiCardProps = {
  /** Small label shown below the value */
  label: string;
  /** Formatted metric value, e.g. "$842,500" */
  value: string;
  /** Comparison subtitle, e.g. "vs $720k last quarter" */
  sub: string;
  /** Direction of the trend */
  trendDirection: TrendDirection;
  /** Formatted delta string, e.g. "+17.0%" */
  trend: string;
  /** Icon element to display in the accent chip */
  icon: React.ReactElement;
  /** Tailwind bg-* class for icon background */
  accent: string;
  /** Tailwind text-* class for icon colour */
  iconColor: string;
  /** Raw data points for the sparkline, oldest → newest */
  sparklineData: number[];
};

// Internal shape kept for the CARDS constant below
type KpiCardDef = KpiCardProps;

// ── Icons ─────────────────────────────────────────────────────────────────────

type SVG = { className?: string };

const IconDollar = ({ className }: SVG) => (
  <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <path d="M9 2v14M5.5 13.5c0 1.1 1.6 2 3.5 2s3.5-.9 3.5-2-1.6-2-3.5-2-3.5-.9-3.5-2 1.6-2 3.5-2 3.5.9 3.5 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IconUsers = ({ className }: SVG) => (
  <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.4" />
    <path d="M2 16c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M12 4a3 3 0 010 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M16 16c0-2.76-1.34-4.5-4-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IconTarget = ({ className }: SVG) => (
  <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="9" cy="9" r="1.5" fill="currentColor" />
  </svg>
);

const IconBuilding = ({ className }: SVG) => (
  <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <rect x="2" y="5" width="14" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M6 16v-5h6v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 5V3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <rect x="6" y="7" width="2" height="2" rx=".5" fill="currentColor" />
    <rect x="10" y="7" width="2" height="2" rx=".5" fill="currentColor" />
  </svg>
);

const IconTrendUp = ({ className }: SVG) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M2 10L6 6l3 3 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.5 4H13v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconTrendDown = ({ className }: SVG) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M2 4L6 8l3-3 4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.5 10H13V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconMinus = ({ className }: SVG) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ── Trend config ──────────────────────────────────────────────────────────────

const trendConfig: Record<
  TrendDirection,
  { Icon: (p: SVG) => React.ReactElement; color: string; bg: string }
> = {
  up:   { Icon: IconTrendUp,   color: "text-green-600", bg: "bg-green-50"  },
  down: { Icon: IconTrendDown, color: "text-red-500",   bg: "bg-red-50"    },
  flat: { Icon: IconMinus,     color: "text-gray-400",  bg: "bg-gray-100"  },
};

// ── Sparkline colours (raw hex so Recharts can consume them) ──────────────────

const sparklineColors: Record<TrendDirection, { stroke: string; gradientId: string }> = {
  up:   { stroke: "#3D52D5", gradientId: "spark-up"   },
  down: { stroke: "#FF485D", gradientId: "spark-down" },
  flat: { stroke: "#A0A0AB", gradientId: "spark-flat" },
};

// ── Custom minimal tooltip ────────────────────────────────────────────────────

function SparkTooltip({ active, payload }: {
  active?: boolean;
  payload?: Array<{ value?: number }>;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-gray-200 bg-white px-2 py-1 text-caption font-semibold text-gray-700 shadow-dropdown">
      {payload[0].value}
    </div>
  );
}

// ── KpiCard ───────────────────────────────────────────────────────────────────

export function KpiCard({
  label,
  value,
  sub,
  trend,
  trendDirection,
  sparklineData,
  icon,
  accent,
  iconColor,
}: KpiCardProps) {
  const t  = trendConfig[trendDirection];
  const sc = sparklineColors[trendDirection];
  const chartData = sparklineData.map((v) => ({ v }));

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-card">

      {/* ── Icon + trend badge ── */}
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent} ${iconColor}`}>
          {icon}
        </div>
        <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-body-sm font-semibold ${t.bg} ${t.color}`}>
          <t.Icon />
          {trend}
        </span>
      </div>

      {/* ── Value + label ── */}
      <div className="mt-4 flex flex-col gap-0.5">
        <p className="text-display-3 font-bold text-gray-900">{value}</p>
        <p className="text-body-sm text-gray-400">{label}</p>
      </div>

      {/* ── Sub ── */}
      <p className="mt-3 border-t border-gray-100 pt-3 text-caption text-gray-400">
        {sub}
      </p>

      {/* ── Sparkline ── */}
      <div className="mt-3 h-12 w-full" aria-hidden>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={sc.gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={sc.stroke} stopOpacity={0.2} />
                <stop offset="95%" stopColor={sc.stroke} stopOpacity={0}   />
              </linearGradient>
            </defs>
            <Tooltip
              content={<SparkTooltip />}
              cursor={{ stroke: sc.stroke, strokeWidth: 1, strokeDasharray: "3 3" }}
            />
            <Area
              type="monotone"
              dataKey="v"
              stroke={sc.stroke}
              strokeWidth={1.5}
              fill={`url(#${sc.gradientId})`}
              dot={false}
              activeDot={{ r: 3, fill: sc.stroke, strokeWidth: 0 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Data + section ────────────────────────────────────────────────────────────

const CARDS: KpiCardDef[] = [
  {
    label:          "Total Revenue",
    value:          "$842,500",
    sub:            "vs $720k last quarter",
    trendDirection: "up",
    trend:          "+17.0%",
    icon:           <IconDollar />,
    accent:         "bg-brand-50",
    iconColor:      "text-brand-500",
    sparklineData:  [52, 60, 55, 70, 65, 80, 72, 88, 78, 95, 90, 100],
  },
  {
    label:          "Active Leads",
    value:          "284",
    sub:            "vs 241 last month",
    trendDirection: "up",
    trend:          "+17.8%",
    icon:           <IconUsers />,
    accent:         "bg-green-50",
    iconColor:      "text-green-600",
    sparklineData:  [180, 200, 190, 220, 210, 240, 230, 255, 245, 265, 260, 284],
  },
  {
    label:          "Deals Closed",
    value:          "38",
    sub:            "vs 42 last month",
    trendDirection: "down",
    trend:          "−9.5%",
    icon:           <IconTarget />,
    accent:         "bg-orange-50",
    iconColor:      "text-orange-500",
    sparklineData:  [48, 45, 50, 46, 44, 47, 43, 42, 40, 39, 41, 38],
  },
  {
    label:          "Listings",
    value:          "127",
    sub:            "same as last month",
    trendDirection: "flat",
    trend:          "0%",
    icon:           <IconBuilding />,
    accent:         "bg-purple-50",
    iconColor:      "text-purple-500",
    sparklineData:  [122, 126, 123, 128, 125, 127, 124, 126, 128, 125, 127, 127],
  },
];

export function KpiCards() {
  return (
    <section aria-label="KPI summary" className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {CARDS.map((c) => (
        <KpiCard key={c.label} {...c} />
      ))}
    </section>
  );
}
