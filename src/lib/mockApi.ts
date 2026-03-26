/**
 * Mock API — dashboard data
 *
 * All fetchers simulate network latency (300–800 ms) and return
 * data that scales realistically with the selected date period.
 */

import type { TrendDirection } from "@/components/dashboard/KpiCards";

// ── Shared period type (mirrors the Header tabs) ──────────────────────────────

export type DatePeriod =
  | "Today"
  | "This Week"
  | "This Month"
  | "This Quarter"
  | "This Year"
  | "Custom";

// ── Response shapes ───────────────────────────────────────────────────────────

export type KpiData = {
  label:          string;
  value:          string;
  sub:            string;
  trendDirection: TrendDirection;
  trend:          string;
  sparklineData:  number[];
};

export type RevenuePoint = {
  month:    string;
  thisYear: number;
  lastYear: number;
};

export type PipelineStage = {
  label: string;
  count: number;
  value: string;
  pct:   number;
};

export type ActivityGroup = "Just now" | "Earlier today" | "Yesterday";
export type ActivityType  = "deal" | "contact" | "note" | "meeting" | "task" | "listing";

export type ActivityItem = {
  id:          string;
  actor:       string;
  initials:    string;
  avatarColor: string;
  action:      string;
  subject:     string;
  timestamp:   string;
  group:       ActivityGroup;
  type:        ActivityType;
};

export type DueState  = "overdue" | "today" | "tomorrow" | "upcoming";
export type TaskType  = "call" | "contract" | "proposal" | "listing" | "meeting" | "review";
export type Priority  = "high" | "medium" | "low";

export type TaskItem = {
  id:       string;
  label:    string;
  due:      string;
  dueState: DueState;
  type:     TaskType;
  priority: Priority;
  done:     boolean;
};

export type DashboardData = {
  kpis:       KpiData[];
  revenue:    RevenuePoint[];
  pipeline:   PipelineStage[];
  activities: ActivityItem[];
  tasks:      TaskItem[];
};

// ── Utility ───────────────────────────────────────────────────────────────────

/** Simulated network delay: 300–800 ms */
function delay(ms?: number): Promise<void> {
  const wait = ms ?? 300 + Math.random() * 500;
  return new Promise((r) => setTimeout(r, wait));
}

/** Scale a base value by a period multiplier and format */
function scale(base: number, multiplier: number) {
  return Math.round(base * multiplier);
}

// Period multipliers relative to "This Month" baseline
const MULTIPLIERS: Record<DatePeriod, number> = {
  "Today":        0.04,
  "This Week":    0.25,
  "This Month":   1,
  "This Quarter": 3.1,
  "This Year":    12.4,
  "Custom":       1,
};

// ── KPI data ──────────────────────────────────────────────────────────────────

function buildKpis(period: DatePeriod): KpiData[] {
  const m = MULTIPLIERS[period];

  const rev    = scale(842_500,  m);
  const leads  = scale(284,      m);
  const closed = scale(38,       m);
  const listings = period === "Today" ? 127 : scale(127, Math.min(m, 1.2));

  const prevRev    = scale(720_000, m);
  const prevLeads  = scale(241,     m);
  const prevClosed = scale(42,      m);

  const revDelta    = (((rev - prevRev)    / prevRev)    * 100).toFixed(1);
  const leadsDelta  = (((leads - prevLeads)  / prevLeads)  * 100).toFixed(1);
  const closedDelta = (((closed - prevClosed) / prevClosed) * 100).toFixed(1);

  const fmt = (n: number) =>
    n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(1)}M`
      : n >= 1_000
        ? `$${(n / 1_000).toFixed(0)}k`
        : `$${n.toLocaleString()}`;

  // Generate plausible sparkline that reflects direction
  const spark = (base: number, dir: "up" | "down" | "flat") => {
    const pts: number[] = [];
    let v = base * 0.6;
    for (let i = 0; i < 12; i++) {
      const nudge = (Math.random() - (dir === "up" ? 0.3 : dir === "down" ? 0.7 : 0.5)) * base * 0.12;
      v = Math.max(1, v + nudge + (dir === "up" ? base * 0.035 : dir === "down" ? -base * 0.02 : 0));
      pts.push(Math.round(v));
    }
    return pts;
  };

  return [
    {
      label:          "Total Revenue",
      value:          fmt(rev),
      sub:            `vs ${fmt(prevRev)} prior period`,
      trendDirection: rev >= prevRev ? "up" : "down",
      trend:          `${rev >= prevRev ? "+" : ""}${revDelta}%`,
      sparklineData:  spark(rev, rev >= prevRev ? "up" : "down"),
    },
    {
      label:          "Active Leads",
      value:          leads.toLocaleString(),
      sub:            `vs ${prevLeads.toLocaleString()} prior period`,
      trendDirection: leads >= prevLeads ? "up" : "down",
      trend:          `${leads >= prevLeads ? "+" : ""}${leadsDelta}%`,
      sparklineData:  spark(leads, leads >= prevLeads ? "up" : "down"),
    },
    {
      label:          "Deals Closed",
      value:          closed.toLocaleString(),
      sub:            `vs ${prevClosed.toLocaleString()} prior period`,
      trendDirection: closed >= prevClosed ? "up" : "down",
      trend:          `${closed >= prevClosed ? "+" : ""}${closedDelta}%`,
      sparklineData:  spark(closed, closed >= prevClosed ? "up" : "down"),
    },
    {
      label:          "Listings",
      value:          listings.toLocaleString(),
      sub:            "same as last period",
      trendDirection: "flat",
      trend:          "0%",
      sparklineData:  spark(listings, "flat"),
    },
  ];
}

// ── Revenue data ──────────────────────────────────────────────────────────────

const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const BASE_REVENUE: RevenuePoint[] = [
  { month: "Jan", thisYear: 58,  lastYear: 44  },
  { month: "Feb", thisYear: 72,  lastYear: 53  },
  { month: "Mar", thisYear: 65,  lastYear: 60  },
  { month: "Apr", thisYear: 84,  lastYear: 58  },
  { month: "May", thisYear: 91,  lastYear: 70  },
  { month: "Jun", thisYear: 78,  lastYear: 74  },
  { month: "Jul", thisYear: 104, lastYear: 80  },
  { month: "Aug", thisYear: 112, lastYear: 85  },
  { month: "Sep", thisYear: 98,  lastYear: 79  },
  { month: "Oct", thisYear: 125, lastYear: 92  },
  { month: "Nov", thisYear: 137, lastYear: 98  },
  { month: "Dec", thisYear: 143, lastYear: 105 },
];

function buildRevenue(period: DatePeriod): RevenuePoint[] {
  switch (period) {
    case "Today":
      // 12 hourly buckets
      return Array.from({ length: 12 }, (_, i) => ({
        month:    `${(i * 2).toString().padStart(2, "0")}:00`,
        thisYear: Math.round(4 + Math.random() * 8),
        lastYear: Math.round(3 + Math.random() * 6),
      }));

    case "This Week":
      return ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => ({
        month:    d,
        thisYear: Math.round(12 + Math.random() * 20),
        lastYear: Math.round(10 + Math.random() * 15),
      }));

    case "This Quarter": {
      // 3 months of the current quarter
      const q = [MONTHS_SHORT[0], MONTHS_SHORT[1], MONTHS_SHORT[2]];
      return q.map((m) => {
        const base = BASE_REVENUE.find((r) => r.month === m)!;
        return { month: m, thisYear: base.thisYear * 3.1 | 0, lastYear: base.lastYear * 3.1 | 0 };
      });
    }

    case "This Year":
      return BASE_REVENUE;

    default: // This Month + Custom
      return BASE_REVENUE.slice(0, 6);
  }
}

// ── Pipeline data ─────────────────────────────────────────────────────────────

function buildPipeline(period: DatePeriod): PipelineStage[] {
  const m = MULTIPLIERS[period];
  const base = [
    { label: "New Leads",    count: 284,  valuek: 1200 },
    { label: "Qualified",   count: 171,  valuek: 840  },
    { label: "Proposal",    count: 98,   valuek: 520  },
    { label: "Negotiation", count: 54,   valuek: 310  },
    { label: "Closed Won",  count: 38,   valuek: 210  },
  ];

  const maxCount = scale(base[0].count, m);

  return base.map((s) => {
    const count = scale(s.count, m);
    const valuek = scale(s.valuek, m);
    const valueStr = valuek >= 1000
      ? `$${(valuek / 1000).toFixed(1)}M`
      : `$${valuek}k`;
    return {
      label: s.label,
      count,
      value: valueStr,
      pct:   Math.round((count / maxCount) * 100),
    };
  });
}

// ── Activity data ─────────────────────────────────────────────────────────────

const ALL_ACTIVITIES: ActivityItem[] = [
  {
    id: "a1", group: "Just now",
    actor: "Lina Rahman", initials: "LR", avatarColor: "bg-brand-500",
    action: "closed a deal with", subject: "Sunrise Apartments",
    timestamp: "2 min ago", type: "deal",
  },
  {
    id: "a2", group: "Just now",
    actor: "Tariq Hassan", initials: "TH", avatarColor: "bg-green-500",
    action: "added contact", subject: "Marina Al-Farsi",
    timestamp: "8 min ago", type: "contact",
  },
  {
    id: "a3", group: "Earlier today",
    actor: "Priya Nair", initials: "PN", avatarColor: "bg-purple-500",
    action: "left a note on", subject: "Gulf View Tower",
    timestamp: "1h ago", type: "note",
  },
  {
    id: "a4", group: "Earlier today",
    actor: "Omar Khalid", initials: "OK", avatarColor: "bg-orange-400",
    action: "scheduled a meeting with", subject: "Al-Rashid Holdings",
    timestamp: "3h ago", type: "meeting",
  },
  {
    id: "a5", group: "Earlier today",
    actor: "Priya Nair", initials: "PN", avatarColor: "bg-purple-500",
    action: "completed task", subject: "Update Q2 pipeline report",
    timestamp: "5h ago", type: "task",
  },
  {
    id: "a6", group: "Yesterday",
    actor: "Lina Rahman", initials: "LR", avatarColor: "bg-brand-500",
    action: "moved to Negotiation", subject: "Pearl District Unit 4B",
    timestamp: "Yesterday, 4:12 PM", type: "deal",
  },
  {
    id: "a7", group: "Yesterday",
    actor: "Tariq Hassan", initials: "TH", avatarColor: "bg-green-500",
    action: "published listing", subject: "Marina Heights — 3BR",
    timestamp: "Yesterday, 11:30 AM", type: "listing",
  },
];

function buildActivities(period: DatePeriod): ActivityItem[] {
  if (period === "Today")     return ALL_ACTIVITIES.filter((a) => a.group !== "Yesterday");
  if (period === "This Week") return ALL_ACTIVITIES;
  // Longer periods return all items (in a real API you'd paginate)
  return ALL_ACTIVITIES;
}

// ── Task data ─────────────────────────────────────────────────────────────────

const ALL_TASKS: TaskItem[] = [
  {
    id: "t1", label: "Follow up with Al-Rashid Holdings",
    due: "Overdue · 26 Mar", dueState: "overdue",
    type: "call",     priority: "high",   done: false,
  },
  {
    id: "t2", label: "Prepare Sunrise Apartments contract",
    due: "Today",             dueState: "today",
    type: "contract", priority: "high",   done: false,
  },
  {
    id: "t3", label: "Send proposal to Marina Al-Farsi",
    due: "Today",             dueState: "today",
    type: "proposal", priority: "medium", done: false,
  },
  {
    id: "t4", label: "Update Gulf View Tower listing",
    due: "28 Mar",            dueState: "upcoming",
    type: "listing",  priority: "low",    done: true,
  },
  {
    id: "t5", label: "Schedule team pipeline review",
    due: "Tomorrow",          dueState: "tomorrow",
    type: "review",   priority: "medium", done: false,
  },
  {
    id: "t6", label: "Q2 strategy meeting with Priya",
    due: "30 Mar",            dueState: "upcoming",
    type: "meeting",  priority: "low",    done: false,
  },
];

function buildTasks(period: DatePeriod): TaskItem[] {
  if (period === "Today") {
    // Only show tasks due today / overdue
    return ALL_TASKS.filter((t) => t.dueState === "today" || t.dueState === "overdue");
  }
  if (period === "This Week") {
    return ALL_TASKS.filter((t) => t.dueState !== "upcoming" || t.due === "30 Mar");
  }
  return ALL_TASKS;
}

// ── Public fetchers ───────────────────────────────────────────────────────────

export async function fetchDashboard(period: DatePeriod): Promise<DashboardData> {
  await delay();
  return {
    kpis:       buildKpis(period),
    revenue:    buildRevenue(period),
    pipeline:   buildPipeline(period),
    activities: buildActivities(period),
    tasks:      buildTasks(period),
  };
}

export async function fetchKpis(period: DatePeriod):       Promise<KpiData[]>       { await delay(300); return buildKpis(period);       }
export async function fetchRevenue(period: DatePeriod):    Promise<RevenuePoint[]>  { await delay(350); return buildRevenue(period);    }
export async function fetchPipeline(period: DatePeriod):   Promise<PipelineStage[]> { await delay(300); return buildPipeline(period);   }
export async function fetchActivities(period: DatePeriod): Promise<ActivityItem[]>  { await delay(250); return buildActivities(period); }
export async function fetchTasks(period: DatePeriod):      Promise<TaskItem[]>      { await delay(280); return buildTasks(period);      }
