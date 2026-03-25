"use client";

import { useState } from "react";

type Task = {
  id: string;
  label: string;
  due: string;
  priority: "high" | "medium" | "low";
  done: boolean;
};

const INITIAL_TASKS: Task[] = [
  { id: "t1", label: "Follow up with Al-Rashid Holdings",  due: "Today",     priority: "high",   done: false },
  { id: "t2", label: "Prepare Sunrise Apartments contract", due: "Today",    priority: "high",   done: false },
  { id: "t3", label: "Send proposal to Marina Al-Farsi",   due: "Tomorrow",  priority: "medium", done: false },
  { id: "t4", label: "Update Gulf View Tower listing",      due: "28 Mar",    priority: "low",    done: true  },
  { id: "t5", label: "Schedule team pipeline review",       due: "29 Mar",    priority: "medium", done: false },
];

const priorityDot: Record<Task["priority"], string> = {
  high:   "bg-red-500",
  medium: "bg-orange-400",
  low:    "bg-gray-300",
};

const dueColor = (due: string, done: boolean) => {
  if (done) return "text-gray-300";
  if (due === "Today") return "text-red-500";
  if (due === "Tomorrow") return "text-orange-500";
  return "text-gray-400";
};

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const toggle = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const pending  = tasks.filter((t) => !t.done).length;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-card">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-body font-semibold text-gray-900">Tasks</h2>
          <p className="text-body-sm text-gray-400">
            {pending} remaining
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-body-sm font-medium text-gray-600 shadow-xs hover:bg-gray-50"
        >
          + Add
        </button>
      </div>

      {/* list */}
      <ul className="flex flex-col gap-1">
        {tasks.map((task) => (
          <li key={task.id}>
            <button
              type="button"
              onClick={() => toggle(task.id)}
              className={[
                "group flex w-full items-start gap-3 rounded-lg px-2.5 py-2 text-left transition-colors",
                task.done ? "opacity-50 hover:opacity-70" : "hover:bg-gray-50",
              ].join(" ")}
            >
              {/* checkbox */}
              <span
                className={[
                  "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                  task.done
                    ? "border-brand-500 bg-brand-500"
                    : "border-gray-300 group-hover:border-brand-400",
                ].join(" ")}
              >
                {task.done && (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                    <path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>

              {/* label */}
              <span
                className={[
                  "flex-1 text-body-sm",
                  task.done ? "line-through text-gray-400" : "text-gray-700",
                ].join(" ")}
              >
                {task.label}
              </span>

              {/* right meta */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className={`h-1.5 w-1.5 rounded-full ${priorityDot[task.priority]}`} />
                <span className={`text-caption ${dueColor(task.due, task.done)}`}>
                  {task.due}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* progress */}
      <div className="flex flex-col gap-1.5 border-t border-gray-100 pt-3">
        <div className="flex justify-between text-caption text-gray-400">
          <span>Progress</span>
          <span>{tasks.filter((t) => t.done).length}/{tasks.length} done</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-brand-500 transition-all"
            style={{ width: `${(tasks.filter((t) => t.done).length / tasks.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
