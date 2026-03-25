type Trend = "up" | "down" | "flat";

type KpiCard = {
  label: string;
  value: string;
  sub: string;
  trend: Trend;
  delta: string;
  icon: React.ReactElement;
  accent: string; // Tailwind bg-* class for icon bg
  iconColor: string; // Tailwind text-* class for icon
};

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

const IconBuilding = ({ className }: SVG) => (
  <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <rect x="2" y="5" width="14" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M6 16v-5h6v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 5V3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <rect x="6" y="7" width="2" height="2" rx=".5" fill="currentColor" />
    <rect x="10" y="7" width="2" height="2" rx=".5" fill="currentColor" />
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const CARDS: KpiCard[] = [
  {
    label:     "Total Revenue",
    value:     "$842,500",
    sub:       "vs $720k last quarter",
    trend:     "up",
    delta:     "+17.0%",
    icon:      <IconDollar />,
    accent:    "bg-brand-50",
    iconColor: "text-brand-500",
  },
  {
    label:     "Active Leads",
    value:     "284",
    sub:       "vs 241 last month",
    trend:     "up",
    delta:     "+17.8%",
    icon:      <IconUsers />,
    accent:    "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    label:     "Deals Closed",
    value:     "38",
    sub:       "vs 42 last month",
    trend:     "down",
    delta:     "−9.5%",
    icon:      <IconTarget />,
    accent:    "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    label:     "Listings",
    value:     "127",
    sub:       "same as last month",
    trend:     "flat",
    delta:     "0%",
    icon:      <IconBuilding />,
    accent:    "bg-purple-50",
    iconColor: "text-purple-500",
  },
];

const trendConfig = {
  up:   { Icon: IconTrendUp,   color: "text-green-600",  bg: "bg-green-50"  },
  down: { Icon: IconTrendDown, color: "text-red-500",    bg: "bg-red-50"    },
  flat: { Icon: IconMinus,     color: "text-gray-400",   bg: "bg-gray-100"  },
} as const;

// ── Component ─────────────────────────────────────────────────────────────────

function KpiCard({ card }: { card: KpiCard }) {
  const t = trendConfig[card.trend];
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-card">
      {/* top row */}
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.accent} ${card.iconColor}`}>
          {card.icon}
        </div>
        {/* trend badge */}
        <span className={`flex items-center gap-1 rounded-full ${t.bg} ${t.color} px-2 py-0.5 text-body-sm font-semibold`}>
          <t.Icon />
          {card.delta}
        </span>
      </div>

      {/* value */}
      <div className="flex flex-col gap-0.5">
        <p className="text-display-3 text-gray-900">{card.value}</p>
        <p className="text-body-sm text-gray-400">{card.label}</p>
      </div>

      {/* sub */}
      <p className="text-caption text-gray-400 border-t border-gray-100 pt-3">
        {card.sub}
      </p>
    </div>
  );
}

export function KpiCards() {
  return (
    <section aria-label="KPI summary" className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {CARDS.map((c) => <KpiCard key={c.label} card={c} />)}
    </section>
  );
}
