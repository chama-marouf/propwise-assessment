/**
 * Static seed data for the mock API.
 * Separating data from fetch logic keeps mock-api.ts readable.
 */

import type {
  DatePeriod,
  RevenuePoint,
  ActivityItem,
  TaskItem,
} from "@/types/dashboard";

// ── Period multipliers (relative to "This Month" baseline) ───────────────────

export const MULTIPLIERS: Record<DatePeriod, number> = {
  "Today":        0.04,
  "This Week":    0.25,
  "This Month":   1,
  "This Quarter": 3.1,
  "This Year":    12.4,
  "Custom":       1,
};

// ── Revenue baseline (Jan–Dec) ────────────────────────────────────────────────

export const MONTHS_SHORT = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

export const BASE_REVENUE: RevenuePoint[] = [
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

// ── Activity seed data ────────────────────────────────────────────────────────

export const ALL_ACTIVITIES: ActivityItem[] = [
  {
    id: "a1", group: "Just now",
    actor: "Lina Rahman",  initials: "LR", avatarColor: "bg-brand-500",
    action: "closed a deal with",          subject: "Sunrise Apartments",
    timestamp: "2 min ago", type: "deal",
  },
  {
    id: "a2", group: "Just now",
    actor: "Tariq Hassan", initials: "TH", avatarColor: "bg-green-500",
    action: "added contact",               subject: "Marina Al-Farsi",
    timestamp: "8 min ago", type: "contact",
  },
  {
    id: "a3", group: "Earlier today",
    actor: "Priya Nair",   initials: "PN", avatarColor: "bg-purple-500",
    action: "left a note on",              subject: "Gulf View Tower",
    timestamp: "1h ago", type: "note",
  },
  {
    id: "a4", group: "Earlier today",
    actor: "Omar Khalid",  initials: "OK", avatarColor: "bg-orange-400",
    action: "scheduled a meeting with",    subject: "Al-Rashid Holdings",
    timestamp: "3h ago", type: "meeting",
  },
  {
    id: "a5", group: "Earlier today",
    actor: "Priya Nair",   initials: "PN", avatarColor: "bg-purple-500",
    action: "completed task",              subject: "Update Q2 pipeline report",
    timestamp: "5h ago", type: "task",
  },
  {
    id: "a6", group: "Yesterday",
    actor: "Lina Rahman",  initials: "LR", avatarColor: "bg-brand-500",
    action: "moved to Negotiation",        subject: "Pearl District Unit 4B",
    timestamp: "Yesterday, 4:12 PM", type: "deal",
  },
  {
    id: "a7", group: "Yesterday",
    actor: "Tariq Hassan", initials: "TH", avatarColor: "bg-green-500",
    action: "published listing",           subject: "Marina Heights — 3BR",
    timestamp: "Yesterday, 11:30 AM", type: "listing",
  },
];

// ── Task seed data ────────────────────────────────────────────────────────────

export const ALL_TASKS: TaskItem[] = [
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
