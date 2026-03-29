"use client";

import type { ActivityItem as ActivityItemData } from "@/types/dashboard";

// ── Icons ─────────────────────────────────────────────────────────────────────

type SVG = { className?: string };
const IconDeal    = (p: SVG) => (<svg className={p.className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><path d="M6 1L11 4.5v5L6 11 1 9.5v-5L6 1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M6 1v10M1 4.5l5 2 5-2" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>);
const IconContact = (p: SVG) => (<svg className={p.className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><circle cx="6" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.3" /><path d="M1.5 11c0-2.2 2-4 4.5-4s4.5 1.8 4.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>);
const IconNote    = (p: SVG) => (<svg className={p.className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><rect x="2" y="1.5" width="8" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.3" /><path d="M4 4.5h4M4 6.5h4M4 8.5h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>);
const IconMeeting = (p: SVG) => (<svg className={p.className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><rect x="1.5" y="2.5" width="9" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.3" /><path d="M1.5 5.5h9" stroke="currentColor" strokeWidth="1.3" /><path d="M4 1.5v2M8 1.5v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>);
const IconTask    = (p: SVG) => (<svg className={p.className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><rect x="1.5" y="1.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" /><path d="M4 6l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const IconListing = (p: SVG) => (<svg className={p.className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden><path d="M2 8.5V5L6 2l4 3v3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /><path d="M4.5 11.5V8h3v3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>);

// ── Config ────────────────────────────────────────────────────────────────────

type ActivityType = ActivityItemData["type"];

const typeConfig: Record<ActivityType, { Icon: (p: SVG) => React.ReactElement; iconBg: string; iconColor: string; tagBg: string; tagColor: string; tagLabel: string }> = {
  deal:    { Icon: IconDeal,    iconBg: "bg-brand-50",  iconColor: "text-brand-500",  tagBg: "bg-brand-50",  tagColor: "text-brand-600",  tagLabel: "Deal"    },
  contact: { Icon: IconContact, iconBg: "bg-green-50",  iconColor: "text-green-600",  tagBg: "bg-green-50",  tagColor: "text-green-700",  tagLabel: "Contact" },
  note:    { Icon: IconNote,    iconBg: "bg-gray-100",  iconColor: "text-gray-500",   tagBg: "bg-gray-100",  tagColor: "text-gray-500",   tagLabel: "Note"    },
  meeting: { Icon: IconMeeting, iconBg: "bg-orange-50", iconColor: "text-orange-500", tagBg: "bg-orange-50", tagColor: "text-orange-600", tagLabel: "Meeting" },
  task:    { Icon: IconTask,    iconBg: "bg-purple-50", iconColor: "text-purple-500", tagBg: "bg-purple-50", tagColor: "text-purple-600", tagLabel: "Task"    },
  listing: { Icon: IconListing, iconBg: "bg-blue-50",   iconColor: "text-blue-500",   tagBg: "bg-blue-50",   tagColor: "text-blue-600",   tagLabel: "Listing" },
};

// ── Component ─────────────────────────────────────────────────────────────────

interface ActivityEntryProps {
  item:   ActivityItemData;
  isLast: boolean;
}

export function ActivityEntry({ item, isLast }: ActivityEntryProps) {
  const cfg = typeConfig[item.type];

  return (
    <li className="relative flex gap-3 pb-4">
      {!isLast && (
        <span aria-hidden className="absolute left-4 top-8 w-px bg-gray-100 dark:bg-stone-800" style={{ bottom: 0 }} />
      )}

      {/* Neutral gray circle icon */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-stone-800 dark:text-stone-400">
        <cfg.Icon />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-body-sm leading-snug text-gray-700 dark:text-stone-300">
          <span className="font-semibold text-gray-900 dark:text-stone-100">{item.actor}</span>{" "}
          {item.action}{" "}
          <span className="font-medium text-brand-600 dark:text-brand-400">{item.subject}</span>
        </p>
        <span className="text-caption text-gray-400 dark:text-stone-500">{item.timestamp}</span>
      </div>
    </li>
  );
}
