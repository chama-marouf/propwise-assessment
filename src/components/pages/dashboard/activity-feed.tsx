"use client";

import { useEffect, useRef, useState } from "react";
import type { ActivityItem, ActivityGroup } from "@/types/dashboard";
import { ALL_ACTIVITIES } from "@/lib/mock-data";
import { fetchNewActivity } from "@/lib/mock-api";
import { ActivityEntry } from "./activity-entry";

// ── Constants ─────────────────────────────────────────────────────────────────

const GROUP_ORDER: ActivityGroup[] = ["Just now", "Earlier today", "Yesterday"];
const POLL_INTERVAL_MS = 12_000; // ~12 s (randomised ±3 s per tick)

// ── Component ─────────────────────────────────────────────────────────────────

interface ActivityFeedProps {
  items?: ActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  const seed = items ?? ALL_ACTIVITIES;

  // Local list starts from seed; new items are prepended
  const [list, setList] = useState<ActivityItem[]>(seed);
  // Track which IDs were just added so we can animate them
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const seenIds = useRef<Set<string>>(new Set(seed.map((i) => i.id)));

  // Re-seed when parent data changes (e.g. period switch)
  useEffect(() => {
    setList(seed);
    seenIds.current = new Set(seed.map((i) => i.id));
    setNewIds(new Set());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // Polling
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const poll = async () => {
      try {
        const item = await fetchNewActivity();
        if (!seenIds.current.has(item.id)) {
          seenIds.current.add(item.id);
          setList((prev) => [item, ...prev]);
          setNewIds((prev) => new Set(prev).add(item.id));
          // Remove from "new" set after animation completes (500 ms)
          setTimeout(() => {
            setNewIds((prev) => {
              const next = new Set(prev);
              next.delete(item.id);
              return next;
            });
          }, 600);
        }
      } catch {
        // silently ignore fetch errors in mock env
      }
      // Randomise next interval 9–15 s
      const jitter = POLL_INTERVAL_MS + (Math.random() * 6_000 - 3_000);
      timeoutId = setTimeout(poll, jitter);
    };

    timeoutId = setTimeout(poll, POLL_INTERVAL_MS);
    return () => clearTimeout(timeoutId);
  }, []);

  const grouped = GROUP_ORDER.map((g) => ({
    group: g,
    items: list.filter((i) => i.group === g),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-card dark:border-stone-700 dark:bg-stone-900">

      {/* Header */}
      <h2 className="text-body font-semibold text-gray-900 dark:text-stone-50">Activity Feed</h2>

      {/* Timeline groups */}
      <div className="flex flex-col gap-5">
        {grouped.map(({ group, items: groupItems }) => (
          <div key={group} className="flex flex-col gap-3">
            {/* Group label */}
            <div className="flex items-center gap-2">
              <span className="text-caption font-semibold uppercase tracking-widest text-gray-400 dark:text-stone-500">
                {group}
              </span>
              <span className="flex-1 border-t border-gray-100 dark:border-stone-800" />
            </div>

            {/* Items */}
            <ul className="flex flex-col">
              {groupItems.map((item, idx) => (
                <li
                  key={item.id}
                  className={newIds.has(item.id) ? "animate-slide-in-new" : ""}
                >
                  <ActivityEntry
                    item={item}
                    isLast={idx === groupItems.length - 1}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer link */}
      <div className="border-t border-gray-100 pt-3 dark:border-stone-800">
        <button
          type="button"
          className="flex items-center gap-1 text-body-sm font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400"
        >
          View full activity log
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2 10L10 2M10 2H5.5M10 2v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
