"use client";

import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type Priority = "high" | "medium" | "low";
type TaskType = "call" | "contract" | "proposal" | "listing" | "meeting" | "review";
type DueState = "overdue" | "today" | "tomorrow" | "upcoming";

type Task = {
  id:       string;
  label:    string;
  due:      string;   // display string
  dueState: DueState;
  type:     TaskType;
  priority: Priority;
  done:     boolean;
};

// ── Config tables ─────────────────────────────────────────────────────────────

const priorityConfig: Record<Priority, { dot: string; badge: string; label: string }> = {
  high:   { dot: "bg-red-500",    badge: "bg-red-50 text-red-600",     label: "High"   },
  medium: { dot: "bg-orange-400", badge: "bg-orange-50 text-orange-600", label: "Med"  },
  low:    { dot: "bg-gray-300",   badge: "bg-gray-100 text-gray-500",  label: "Low"    },
};

const typeConfig: Record<TaskType, { badge: string; label: string }> = {
  call:     { badge: "bg-brand-50 text-brand-600",   label: "Call"     },
  contract: { badge: "bg-purple-50 text-purple-600", label: "Contract" },
  proposal: { badge: "bg-blue-50 text-blue-600",     label: "Proposal" },
  listing:  { badge: "bg-green-50 text-green-700",   label: "Listing"  },
  meeting:  { badge: "bg-orange-50 text-orange-600", label: "Meeting"  },
  review:   { badge: "bg-gray-100 text-gray-600",    label: "Review"   },
};

const dueConfig: Record<DueState, { text: string; rowBg: string }> = {
  overdue:  { text: "text-red-500 font-semibold", rowBg: "bg-red-50/50 hover:bg-red-50"      },
  today:    { text: "text-red-500",               rowBg: "hover:bg-gray-50"                   },
  tomorrow: { text: "text-orange-500",            rowBg: "hover:bg-gray-50"                   },
  upcoming: { text: "text-gray-400",              rowBg: "hover:bg-gray-50"                   },
};

// ── Data ──────────────────────────────────────────────────────────────────────

const INITIAL_TASKS: Task[] = [
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

// ── Icons ─────────────────────────────────────────────────────────────────────

const IconPlus = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────

export function Tasks({ initialTasks }: { initialTasks?: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks ?? INITIAL_TASKS);

  const toggle = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const done    = tasks.filter((t) =>  t.done).length;
  const total   = tasks.length;
  const overdue = tasks.filter((t) => !t.done && t.dueState === "overdue").length;
  const pct     = Math.round((done / total) * 100);

  return (
    <div className="flex flex-col gap-0 rounded-xl border border-gray-200 bg-white shadow-card">

      {/* ── Header ── */}
      <div className="flex items-start justify-between px-5 pb-3 pt-5">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-body font-semibold text-gray-900">Tasks</h2>
          <p className="text-body-sm text-gray-400">
            {total - done} remaining
            {overdue > 0 && (
              <span className="ml-1.5 rounded-full bg-red-50 px-1.5 py-0.5 text-caption font-semibold text-red-500">
                {overdue} overdue
              </span>
            )}
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-body-sm font-medium text-gray-600 shadow-xs transition-colors hover:bg-gray-50"
        >
          <IconPlus /> Add
        </button>
      </div>

      {/* ── Progress bar ── */}
      <div className="px-5 pb-3">
        <div className="flex items-center justify-between text-caption text-gray-400 mb-1.5">
          <span>{done}/{total} completed</span>
          <span className={pct === 100 ? "text-green-600 font-semibold" : ""}>{pct}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className={[
              "h-full rounded-full transition-all duration-500",
              pct === 100 ? "bg-green-500" : "bg-brand-500",
            ].join(" ")}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* ── Task list ── */}
      <ul className="flex flex-col border-t border-gray-100">
        {tasks.map((task) => {
          const due = task.done
            ? { text: "text-gray-300", rowBg: "hover:bg-gray-50" }
            : dueConfig[task.dueState];
          const pri  = priorityConfig[task.priority];
          const typ  = typeConfig[task.type];

          return (
            <li
              key={task.id}
              className={[
                "group border-b border-gray-100 last:border-0",
                task.done ? "opacity-60" : "",
                due.rowBg,
              ].join(" ")}
            >
              <button
                type="button"
                onClick={() => toggle(task.id)}
                className="flex w-full items-start gap-3 px-5 py-3 text-left"
              >
                {/* ── Checkbox ── */}
                <span
                  className={[
                    "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors duration-100",
                    task.done
                      ? "border-brand-500 bg-brand-500"
                      : task.dueState === "overdue"
                        ? "border-red-400 group-hover:border-red-500"
                        : "border-gray-300 group-hover:border-brand-400",
                  ].join(" ")}
                >
                  {task.done && (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                      <path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>

                {/* ── Label + badges ── */}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span
                    className={[
                      "text-body-sm leading-snug",
                      task.done ? "line-through text-gray-400" : "text-gray-800",
                    ].join(" ")}
                  >
                    {task.label}
                  </span>

                  {/* badge row */}
                  <div className="flex items-center gap-1.5">
                    {/* type badge */}
                    <span className={`rounded-full px-1.5 py-0.5 text-caption font-semibold leading-none ${typ.badge}`}>
                      {typ.label}
                    </span>
                    {/* priority badge */}
                    <span className={`rounded-full px-1.5 py-0.5 text-caption font-semibold leading-none ${pri.badge}`}>
                      {pri.label}
                    </span>
                  </div>
                </div>

                {/* ── Due date ── */}
                <span
                  className={[
                    "shrink-0 text-caption",
                    task.done ? "text-gray-300" : due.text,
                  ].join(" ")}
                >
                  {task.due}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
