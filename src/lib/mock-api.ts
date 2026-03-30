/**
 * Mock API — all fetchers that simulate network latency and return
 * data that scales realistically with the selected date period.
 */

import type {
  DatePeriod,
  KpiData,
  RevenuePoint,
  PipelineStage,
  ActivityItem,
  TaskItem,
  DashboardData,
} from "@/types/dashboard";
import { delay, scale } from "@/lib/utils";
import {
  MULTIPLIERS,
  MONTHS_SHORT,
  BASE_REVENUE,
  ALL_ACTIVITIES,
  ALL_TASKS,
} from "@/lib/mock-data";

// ── KPI builder ───────────────────────────────────────────────────────────────

function buildKpis(period: DatePeriod): KpiData[] {
  const m = MULTIPLIERS[period];

  const rev      = scale(842_500, m);
  const leads    = scale(284, m);
  const closed   = scale(38, m);
  const listings = period === "Today" ? 127 : scale(127, Math.min(m, 1.2));

  const prevRev    = scale(720_000, m);
  const prevLeads  = scale(241, m);
  const prevClosed = scale(42, m);

  const revDelta    = (((rev    - prevRev)    / prevRev)    * 100).toFixed(1);
  const leadsDelta  = (((leads  - prevLeads)  / prevLeads)  * 100).toFixed(1);
  const closedDelta = (((closed - prevClosed) / prevClosed) * 100).toFixed(1);

  const fmt = (n: number) =>
    n >= 1_000_000
      ? `AED ${(n / 1_000_000).toFixed(1)}M`
      : n >= 1_000
        ? `AED ${(n / 1_000).toFixed(0)}k`
        : `AED ${n.toLocaleString()}`;

  const spark = (base: number, dir: "up" | "down" | "flat"): number[] => {
    const pts: number[] = [];
    let v = base * 0.6;
    for (let i = 0; i < 12; i++) {
      const nudge =
        (Math.random() - (dir === "up" ? 0.3 : dir === "down" ? 0.7 : 0.5)) *
        base * 0.12;
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

// ── Revenue builder ───────────────────────────────────────────────────────────

function buildRevenue(period: DatePeriod): RevenuePoint[] {
  switch (period) {
    case "Today":
      return Array.from({ length: 12 }, (_, i) => ({
        month:    `${(i * 2).toString().padStart(2, "0")}:00`,
        thisYear: Math.round(4 + Math.random() * 8),
        lastYear: Math.round(3 + Math.random() * 6),
      }));

    case "This Week":
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => ({
        month:    d,
        thisYear: Math.round(12 + Math.random() * 20),
        lastYear: Math.round(10 + Math.random() * 15),
      }));

    case "This Quarter": {
      const q = [MONTHS_SHORT[0], MONTHS_SHORT[1], MONTHS_SHORT[2]];
      return q.map((m) => {
        const base = BASE_REVENUE.find((r) => r.month === m)!;
        return {
          month:    m,
          thisYear: (base.thisYear * 3.1) | 0,
          lastYear: (base.lastYear * 3.1) | 0,
        };
      });
    }

    case "This Year":
      return BASE_REVENUE;

    default:
      return BASE_REVENUE.slice(0, 6);
  }
}

// ── Pipeline builder ──────────────────────────────────────────────────────────

function buildPipeline(period: DatePeriod): PipelineStage[] {
  const m = MULTIPLIERS[period];
  // Base values for "This Month": 113 deals · AED 2.76M total
  const base = [
    { label: "New Lead",      count: 42, valuek: 840 },
    { label: "Contacted",     count: 28, valuek: 560 },
    { label: "Proposal Sent", count: 18, valuek: 420 },
    { label: "Negotiation",   count: 12, valuek: 320 },
    { label: "Closed Won",    count:  8, valuek: 480 },
    { label: "Closed Lost",   count:  5, valuek: 140 },
  ];

  const maxCount = scale(base[0].count, m);

  return base.map((s) => {
    const count  = scale(s.count, m);
    const valuek = scale(s.valuek, m);
    const valueStr =
      valuek >= 1000
        ? `AED ${(valuek / 1000).toFixed(2)}M`
        : `AED ${valuek}K`;
    return {
      label: s.label,
      count,
      value: valueStr,
      valuek,
      pct:   Math.round((count / maxCount) * 100),
    };
  });
}

// ── Activity builder ──────────────────────────────────────────────────────────

function buildActivities(period: DatePeriod): ActivityItem[] {
  if (period === "Today")     return ALL_ACTIVITIES.filter((a) => a.group !== "Yesterday");
  return ALL_ACTIVITIES;
}

// ── Task builder ──────────────────────────────────────────────────────────────

function buildTasks(period: DatePeriod): TaskItem[] {
  if (period === "Today")
    return ALL_TASKS.filter((t) => t.dueState === "today" || t.dueState === "overdue");
  if (period === "This Week")
    return ALL_TASKS.filter((t) => t.dueState !== "upcoming" || t.due === "30 Mar");
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

// ── Real-time activity simulation ─────────────────────────────────────────────

const LIVE_POOL: Omit<ActivityItem, "id" | "group" | "timestamp">[] = [
  { actor: "Sara Al-Mansoori", initials: "SM", avatarColor: "bg-pink-500",   action: "requested a viewing of",   subject: "Downtown Loft 7C",            type: "meeting"  },
  { actor: "Khalid Youssef",   initials: "KY", avatarColor: "bg-cyan-500",    action: "submitted an offer on",    subject: "Palm Residences Unit 12",     type: "deal"     },
  { actor: "Nadia Chami",      initials: "NC", avatarColor: "bg-amber-500",   action: "added a note on",           subject: "Harbour View Tower",          type: "note"     },
  { actor: "Rami Fares",       initials: "RF", avatarColor: "bg-teal-500",    action: "called",                   subject: "Ahmed Al-Sayed",              type: "contact"  },
  { actor: "Lina Rahman",      initials: "LR", avatarColor: "bg-brand-500",   action: "updated listing price on", subject: "Skyline Penthouse",           type: "listing"  },
  { actor: "Tariq Hassan",     initials: "TH", avatarColor: "bg-green-500",   action: "completed task",            subject: "Send Q2 market report",       type: "task"     },
  { actor: "Omar Khalid",      initials: "OK", avatarColor: "bg-orange-400",  action: "moved to Offer stage",     subject: "Creek Horizon Suite",         type: "deal"     },
  { actor: "Priya Nair",       initials: "PN", avatarColor: "bg-purple-500",  action: "scheduled a call with",    subject: "Marina Al-Farsi",             type: "meeting"  },
  { actor: "Jad Haddad",       initials: "JH", avatarColor: "bg-red-400",     action: "closed a deal with",       subject: "Business Bay Tower B",        type: "deal"     },
  { actor: "Hana Saleh",       initials: "HS", avatarColor: "bg-indigo-500",  action: "published listing",        subject: "JBR Beachfront Studio",       type: "listing"  },
];

let _liveCounter = 0;

export async function fetchNewActivity(): Promise<ActivityItem> {
  await delay(200);
  const entry = LIVE_POOL[_liveCounter % LIVE_POOL.length];
  _liveCounter++;
  return {
    ...entry,
    id:        `live-${Date.now()}-${_liveCounter}`,
    group:     "Just now",
    timestamp: "Just now",
  };
}
