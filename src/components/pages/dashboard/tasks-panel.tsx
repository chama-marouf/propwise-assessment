"use client";

import { useState } from "react";
import type { TaskItem as TaskItemType } from "@/types/dashboard";
import { ALL_TASKS } from "@/lib/mock-data";
import { TaskItem } from "./task-item";

// ── Icon ──────────────────────────────────────────────────────────────────────

const IconPlus = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────

interface TasksPanelProps {
  initialTasks?: TaskItemType[];
}

export function TasksPanel({ initialTasks }: TasksPanelProps) {
  const [tasks, setTasks] = useState<TaskItemType[]>(initialTasks ?? ALL_TASKS);

  const toggle = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const done    = tasks.filter((t) => t.done).length;
  const total   = tasks.length;
  const overdue = tasks.filter((t) => !t.done && t.dueState === "overdue").length;
  const pct     = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="flex flex-col gap-0 rounded-xl border border-gray-200 bg-white shadow-card">

      {/* Header */}
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

      {/* Progress bar */}
      <div className="px-5 pb-3">
        <div className="mb-1.5 flex items-center justify-between text-caption text-gray-400">
          <span>{done}/{total} completed</span>
          <span className={pct === 100 ? "font-semibold text-green-600" : ""}>{pct}%</span>
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

      {/* Task list */}
      <ul className="flex flex-col border-t border-gray-100">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={toggle} />
        ))}
      </ul>
    </div>
  );
}
