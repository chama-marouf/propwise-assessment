// ── Types ─────────────────────────────────────────────────────────────────────

type ActivityType = "deal" | "contact" | "note" | "meeting" | "task" | "listing";
type Group        = "Just now" | "Earlier today" | "Yesterday";

type ActivityItem = {
  id:          string;
  actor:       string;
  initials:    string;
  avatarColor: string;
  action:      string;
  subject:     string;
  timestamp:   string;       // display time, e.g. "2 min ago"
  group:       Group;
  type:        ActivityType;
};

// ── Icons — one per activity type ────────────────────────────────────────────

type SVG = { className?: string };

const IconDeal = ({ className }: SVG) => (
  <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path d="M6 1L11 4.5v5L6 11 1 9.5v-5L6 1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M6 1v10M1 4.5l5 2 5-2" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

const IconContact = ({ className }: SVG) => (
  <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <circle cx="6" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M1.5 11c0-2.2 2-4 4.5-4s4.5 1.8 4.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IconNote = ({ className }: SVG) => (
  <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <rect x="2" y="1.5" width="8" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M4 4.5h4M4 6.5h4M4 8.5h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IconMeeting = ({ className }: SVG) => (
  <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <rect x="1.5" y="2.5" width="9" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M1.5 5.5h9" stroke="currentColor" strokeWidth="1.3" />
    <path d="M4 1.5v2M8 1.5v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IconTask = ({ className }: SVG) => (
  <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <rect x="1.5" y="1.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M4 6l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconListing = ({ className }: SVG) => (
  <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path d="M2 8.5V5L6 2l4 3v3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.5 11.5V8h3v3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Config: icon + colour per type ───────────────────────────────────────────

const typeConfig: Record<ActivityType, {
  Icon:       (p: SVG) => React.ReactElement;
  iconBg:     string;
  iconColor:  string;
  tagBg:      string;
  tagColor:   string;
  tagLabel:   string;
}> = {
  deal:    { Icon: IconDeal,    iconBg: "bg-brand-50",  iconColor: "text-brand-500",  tagBg: "bg-brand-50",  tagColor: "text-brand-600",  tagLabel: "Deal"    },
  contact: { Icon: IconContact, iconBg: "bg-green-50",  iconColor: "text-green-600",  tagBg: "bg-green-50",  tagColor: "text-green-700",  tagLabel: "Contact" },
  note:    { Icon: IconNote,    iconBg: "bg-gray-100",  iconColor: "text-gray-500",   tagBg: "bg-gray-100",  tagColor: "text-gray-500",   tagLabel: "Note"    },
  meeting: { Icon: IconMeeting, iconBg: "bg-orange-50", iconColor: "text-orange-500", tagBg: "bg-orange-50", tagColor: "text-orange-600", tagLabel: "Meeting" },
  task:    { Icon: IconTask,    iconBg: "bg-purple-50", iconColor: "text-purple-500", tagBg: "bg-purple-50", tagColor: "text-purple-600", tagLabel: "Task"    },
  listing: { Icon: IconListing, iconBg: "bg-blue-50",   iconColor: "text-blue-500",   tagBg: "bg-blue-50",   tagColor: "text-blue-600",   tagLabel: "Listing" },
};

// ── Data ──────────────────────────────────────────────────────────────────────

const ITEMS: ActivityItem[] = [
  // ── Just now ──
  {
    id: "1", group: "Just now",
    actor: "Lina Rahman", initials: "LR", avatarColor: "bg-brand-500",
    action: "closed a deal with", subject: "Sunrise Apartments",
    timestamp: "2 min ago", type: "deal",
  },
  {
    id: "2", group: "Just now",
    actor: "Tariq Hassan", initials: "TH", avatarColor: "bg-green-500",
    action: "added contact", subject: "Marina Al-Farsi",
    timestamp: "8 min ago", type: "contact",
  },

  // ── Earlier today ──
  {
    id: "3", group: "Earlier today",
    actor: "Priya Nair", initials: "PN", avatarColor: "bg-purple-500",
    action: "left a note on", subject: "Gulf View Tower",
    timestamp: "1h ago", type: "note",
  },
  {
    id: "4", group: "Earlier today",
    actor: "Omar Khalid", initials: "OK", avatarColor: "bg-orange-400",
    action: "scheduled a meeting with", subject: "Al-Rashid Holdings",
    timestamp: "3h ago", type: "meeting",
  },
  {
    id: "5", group: "Earlier today",
    actor: "Priya Nair", initials: "PN", avatarColor: "bg-purple-500",
    action: "completed task", subject: "Update Q2 pipeline report",
    timestamp: "5h ago", type: "task",
  },

  // ── Yesterday ──
  {
    id: "6", group: "Yesterday",
    actor: "Lina Rahman", initials: "LR", avatarColor: "bg-brand-500",
    action: "moved to Negotiation", subject: "Pearl District Unit 4B",
    timestamp: "Yesterday, 4:12 PM", type: "deal",
  },
  {
    id: "7", group: "Yesterday",
    actor: "Tariq Hassan", initials: "TH", avatarColor: "bg-green-500",
    action: "published listing", subject: "Marina Heights — 3BR",
    timestamp: "Yesterday, 11:30 AM", type: "listing",
  },
];

const GROUP_ORDER: Group[] = ["Just now", "Earlier today", "Yesterday"];

// ── Sub-components ────────────────────────────────────────────────────────────

function TimelineItem({ item, isLast }: { item: ActivityItem; isLast: boolean }) {
  const cfg = typeConfig[item.type];
  return (
    <li className="relative flex gap-3">
      {/* ── Vertical connector line ── */}
      {!isLast && (
        <span
          aria-hidden
          className="absolute left-3.25 top-7 w-px bg-gray-100"
          style={{ bottom: "-12px" }}
        />
      )}

      {/* ── Left: stacked icon chip + avatar ── */}
      <div className="relative flex flex-col items-center shrink-0">
        {/* type icon chip */}
        <div className={`flex h-7 w-7 items-center justify-center rounded-full ${cfg.iconBg} ${cfg.iconColor} ring-2 ring-white`}>
          <cfg.Icon />
        </div>
        {/* avatar badge — overlapping bottom-right of chip */}
        <div
          className={`absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full ${item.avatarColor} text-[8px] font-bold text-white ring-1 ring-white`}
          title={item.actor}
        >
          {item.initials[0]}
        </div>
      </div>

      {/* ── Right: content ── */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 pb-4">
        <p className="text-body-sm leading-snug text-gray-700">
          <span className="font-semibold text-gray-900">{item.actor}</span>{" "}
          {item.action}{" "}
          <span className="font-medium text-gray-900">{item.subject}</span>
        </p>
        <div className="flex items-center gap-1.5">
          <span className={`rounded-full px-1.5 py-0.5 text-caption font-semibold leading-none ${cfg.tagBg} ${cfg.tagColor}`}>
            {cfg.tagLabel}
          </span>
          <span className="text-caption text-gray-400">{item.timestamp}</span>
        </div>
      </div>
    </li>
  );
}


// ── Main component ─────────────────────────────────────────────────────────────────

export function ActivityFeed({ items }: { items?: ActivityItem[] }) {
  // Show hardcoded placeholder data while the API response is loading
  const activeItems = items ?? ITEMS;

  // Pre-group items
  const grouped = GROUP_ORDER.map((g) => ({
    group: g,
    items: activeItems.filter((i) => i.group === g),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-card">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-body font-semibold text-gray-900">Activity</h2>
          <p className="text-body-sm text-gray-400">Team updates</p>
        </div>
        <button type="button" className="text-body-sm font-medium text-brand-500 transition-colors hover:text-brand-600">
          View all
        </button>
      </div>

      {/* ── Timeline groups ── */}
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
                <TimelineItem
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

