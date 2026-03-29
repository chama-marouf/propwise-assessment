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
      <button type="button" onClick={() => onToggle(task.id)} className="flex w-full items-center gap-3 px-5 py-3 text-left">

        {/* Circular checkbox */}
        <span className={[
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-100",
          task.done
            ? "border-brand-500 bg-brand-500"
            : task.dueState === "overdue"
              ? "border-red-400 group-hover:border-red-500"
              : "border-gray-300 group-hover:border-brand-400",
        ].join(" ")}>
          {task.done && (
            <svg width="7" height="7" viewBox="0 0 8 8" fill="none" aria-hidden>
              <path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>

        {/* Label + due + type */}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className={["text-body-sm leading-snug", task.done ? "line-through text-gray-400 dark:text-stone-600" : "text-gray-800 dark:text-stone-200"].join(" ")}>
            {task.label}
          </span>
          <div className="flex items-center gap-1.5">
            <span className={["flex items-center gap-1 text-caption", task.done ? "text-gray-300" : due.text].join(" ")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 6V12L8 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {task.due}
            </span>
            <span className={`rounded-full px-1.5 py-0.5 text-caption font-semibold leading-none ${typ.badge}`}>{typ.label}</span>
          </div>
        </div>

        {/* Priority badge */}
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-caption font-semibold leading-none ${pri.badge}`}>
          {pri.label}
        </span>
      </button>
    </li>
  );
}
