"use client";

import type { ActivityItem, ActivityGroup } from "@/types/dashboard";
import { ALL_ACTIVITIES } from "@/lib/mock-data";
import { ActivityEntry } from "./activity-entry";

// ── Constants ─────────────────────────────────────────────────────────────────

const GROUP_ORDER: ActivityGroup[] = ["Just now", "Earlier today", "Yesterday"];

// ── Component ─────────────────────────────────────────────────────────────────

interface ActivityFeedProps {
  items?: ActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  const activeItems = items ?? ALL_ACTIVITIES;

  const grouped = GROUP_ORDER.map((g) => ({
    group: g,
    items: activeItems.filter((i) => i.group === g),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-card">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-body font-semibold text-gray-900">Activity</h2>
          <p className="text-body-sm text-gray-400">Team updates</p>
        </div>
        <button
          type="button"
          className="text-body-sm font-medium text-brand-500 transition-colors hover:text-brand-600"
        >
          View all
        </button>
      </div>

      {/* Timeline groups */}
      <div className="flex flex-col gap-5">
        {grouped.map(({ group, items: groupItems }) => (
          <div key={group} className="flex flex-col gap-3">
            {/* Group label */}
            <div className="flex items-center gap-2">
              <span className="text-caption font-semibold uppercase tracking-widest text-gray-400">
                {group}
              </span>
              <span className="flex-1 border-t border-gray-100" />
            </div>

            {/* Items */}
            <ul className="flex flex-col">
              {groupItems.map((item, idx) => (
                <ActivityEntry
                  key={item.id}
                  item={item}
                  isLast={idx === groupItems.length - 1}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
