type ActivityItem = {
  id: string;
  actor: string;
  initials: string;
  avatarColor: string;
  action: string;
  subject: string;
  time: string;
  type: "deal" | "contact" | "note" | "meeting";
};

const ITEMS: ActivityItem[] = [
  {
    id: "1",
    actor: "Lina Rahman",
    initials: "LR",
    avatarColor: "bg-brand-500",
    action: "closed deal with",
    subject: "Sunrise Apartments",
    time: "2m ago",
    type: "deal",
  },
  {
    id: "2",
    actor: "Tariq Hassan",
    initials: "TH",
    avatarColor: "bg-green-500",
    action: "added contact",
    subject: "Marina Al-Farsi",
    time: "18m ago",
    type: "contact",
  },
  {
    id: "3",
    actor: "Priya Nair",
    initials: "PN",
    avatarColor: "bg-purple-500",
    action: "left a note on",
    subject: "Gulf View Tower",
    time: "1h ago",
    type: "note",
  },
  {
    id: "4",
    actor: "Omar Khalid",
    initials: "OK",
    avatarColor: "bg-orange-400",
    action: "scheduled a meeting with",
    subject: "Al-Rashid Holdings",
    time: "3h ago",
    type: "meeting",
  },
  {
    id: "5",
    actor: "Lina Rahman",
    initials: "LR",
    avatarColor: "bg-brand-500",
    action: "moved to Negotiation",
    subject: "Pearl District Unit 4B",
    time: "Yesterday",
    type: "deal",
  },
];

const typeTag: Record<ActivityItem["type"], { label: string; classes: string }> = {
  deal:    { label: "Deal",    classes: "bg-brand-50 text-brand-600" },
  contact: { label: "Contact", classes: "bg-green-50 text-green-700" },
  note:    { label: "Note",    classes: "bg-gray-100 text-gray-500"  },
  meeting: { label: "Meeting", classes: "bg-orange-50 text-orange-600" },
};

export function ActivityFeed() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-card">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-body font-semibold text-gray-900">Activity</h2>
          <p className="text-body-sm text-gray-400">Team updates</p>
        </div>
        <button type="button" className="text-body-sm font-medium text-brand-500 hover:text-brand-600">
          View all
        </button>
      </div>

      {/* feed */}
      <ul className="flex flex-col divide-y divide-gray-100">
        {ITEMS.map((item) => {
          const tag = typeTag[item.type];
          return (
            <li key={item.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
              {/* avatar */}
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${item.avatarColor} text-caption font-bold text-white`}>
                {item.initials}
              </div>

              {/* content */}
              <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                <p className="text-body-sm text-gray-700">
                  <span className="font-semibold text-gray-900">{item.actor}</span>{" "}
                  {item.action}{" "}
                  <span className="font-medium text-gray-900">{item.subject}</span>
                </p>
                <div className="flex items-center gap-1.5">
                  <span className={`rounded-full px-1.5 py-0.5 text-caption font-semibold ${tag.classes}`}>
                    {tag.label}
                  </span>
                  <span className="text-caption text-gray-400">{item.time}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
