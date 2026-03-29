"use client";

import type { TaskItem as TaskItemData, DueState, Priority, TaskType } from "@/types/dashboard";

// ── Config ────────────────────────────────────────────────────────────────────

const priorityConfig: Record<Priority, { badge: string; label: string }> = {
  high:   { badge: "bg-red-50 text-red-600",     label: "High" },
  medium: { badge: "bg-orange-50 text-orange-600", label: "Med" },
  low:    { badge: "bg-gray-100 text-gray-500",  label: "Low"  },
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
  overdue:  { text: "text-red-500 font-semibold", rowBg: "bg-red-50/50 hover:bg-red-50" },
  today:    { text: "text-red-500",               rowBg: "hover:bg-gray-50"             },
  tomorrow: { text: "text-orange-500",            rowBg: "hover:bg-gray-50"             },
  upcoming: { text: "text-gray-400",              rowBg: "hover:bg-gray-50"             },
};

// ── Component ─────────────────────────────────────────────────────────────────

interface TaskItemProps {
  task:     TaskItemData;
  onToggle: (id: string) => void;
}

export function TaskItem({ task, onToggle }: TaskItemProps) {
  const due = task.done ? { text: "text-gray-300", rowBg: "hover:bg-gray-50" } : dueConfig[task.dueState];
  const pri = priorityConfig[task.priority];
  const typ = typeConfig[task.type];

  return (
    <li className={["group border-b border-gray-100 last:border-0 dark:border-stone-800", task.done ? "opacity-60" : "", due.rowBg].join(" ")}>
      <button type="button" onClick={() => onToggle(task.id)} className="flex w-full items-start gap-3 px-5 py-3 text-left">

        {/* Checkbox */}
        <span className={[
          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors duration-100",
          task.done
            ? "border-brand-500 bg-brand-500"
            : task.dueState === "overdue"
              ? "border-red-400 group-hover:border-red-500"
              : "border-gray-300 group-hover:border-brand-400",
        ].join(" ")}>
          {task.done && (
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
              <path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>

        {/* Label + badges */}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className={["text-body-sm leading-snug", task.done ? "line-through text-gray-400 dark:text-stone-600" : "text-gray-800 dark:text-stone-200"].join(" ")}>
            {task.label}
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`rounded-full px-1.5 py-0.5 text-caption font-semibold leading-none ${typ.badge}`}>{typ.label}</span>
            <span className={`rounded-full px-1.5 py-0.5 text-caption font-semibold leading-none ${pri.badge}`}>{pri.label}</span>
          </div>
        </div>

        {/* Due date */}
        <span className={["shrink-0 text-caption", task.done ? "text-gray-300" : due.text].join(" ")}>
          {task.due}
        </span>
      </button>
    </li>
  );
}
