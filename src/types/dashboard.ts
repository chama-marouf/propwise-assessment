/**
 * Shared domain types for the Propwise dashboard.
 * All other modules import from here — never cross-import between features.
 */

// ── Date / Period ─────────────────────────────────────────────────────────────

export type DatePeriod =
  | "Today"
  | "This Week"
  | "This Month"
  | "This Quarter"
  | "This Year"
  | "Custom";

// ── KPI cards ─────────────────────────────────────────────────────────────────

export type TrendDirection = "up" | "down" | "flat";

export type KpiData = {
  label:          string;
  value:          string;
  sub:            string;
  trendDirection: TrendDirection;
  trend:          string;
  sparklineData:  number[];
};

// ── Revenue chart ─────────────────────────────────────────────────────────────

export type RevenuePoint = {
  month:    string;
  thisYear: number;
  lastYear: number;
};

// ── Pipeline ──────────────────────────────────────────────────────────────────

export type PipelineStage = {
  label:  string;
  count:  number;
  value:  string; // formatted AED string
  valuek: number; // raw value in thousands
  pct:    number; // 0-100
};

// ── Activity feed ─────────────────────────────────────────────────────────────

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

// ── Tasks ─────────────────────────────────────────────────────────────────────

export type DueState = "overdue" | "today" | "tomorrow" | "upcoming";
export type TaskType = "call" | "contract" | "proposal" | "listing" | "meeting" | "review";
export type Priority = "high" | "medium" | "low";

export type TaskItem = {
  id:       string;
  label:    string;
  due:      string;
  dueState: DueState;
  type:     TaskType;
  priority: Priority;
  done:     boolean;
};

// ── Aggregate dashboard response ──────────────────────────────────────────────

export type DashboardData = {
  kpis:       KpiData[];
  revenue:    RevenuePoint[];
  pipeline:   PipelineStage[];
  activities: ActivityItem[];
  tasks:      TaskItem[];
};

// ── Toast ─────────────────────────────────────────────────────────────────────

export type ToastType = "success" | "error" | "info" | "neutral";

export interface ToastAction {
  label:   string;
  onClick: () => void;
  /** Optional icon shown before the action label */
  icon?: "undo" | "retry";
}

export interface Toast {
  id:       string;
  type:     ToastType;
  title:    string;
  message?: string;
  /** Auto-dismiss after this many ms. Default 4000. Pass 0 to disable. */
  duration: number;
  action?:  ToastAction;
}
