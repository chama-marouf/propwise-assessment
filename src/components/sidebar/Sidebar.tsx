"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { sidebarOpenAtom } from "@/store/sidebarAtom";

// ── Icon primitives ───────────────────────────────────────────────────────────

type SVGProps = { className?: string };

const IconHome = ({ className }: SVGProps) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M2 7L8 2l6 5v7a1 1 0 01-1 1H3a1 1 0 01-1-1V7z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 15v-5h4v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconBarChart = ({ className }: SVGProps) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <rect x="2" y="9" width="3" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
    <rect x="6.5" y="5" width="3" height="9" rx="1" stroke="currentColor" strokeWidth="1.4" />
    <rect x="11" y="2" width="3" height="12" rx="1" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const IconUsers = ({ className }: SVGProps) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M1.5 13.5C1.5 11 3.5 9.5 6 9.5s4.5 1.5 4.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M10.5 3a2.5 2.5 0 010 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M14.5 13.5c0-2-1.5-3.4-4-3.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IconTarget = ({ className }: SVGProps) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="8" cy="8" r="1.2" fill="currentColor" />
  </svg>
);

const IconPipeline = ({ className }: SVGProps) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IconBuilding = ({ className }: SVGProps) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <rect x="2" y="4" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M5 14V9.5h6V14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 4V2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <rect x="5" y="5.5" width="1.8" height="1.8" rx=".4" fill="currentColor" />
    <rect x="9.2" y="5.5" width="1.8" height="1.8" rx=".4" fill="currentColor" />
  </svg>
);

const IconCheckSquare = ({ className }: SVGProps) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconCalendar = ({ className }: SVGProps) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <rect x="2" y="3.5" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M2 7.5h12" stroke="currentColor" strokeWidth="1.4" />
    <path d="M5 2v3M11 2v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="5.5" cy="10.5" r=".8" fill="currentColor" />
    <circle cx="8" cy="10.5" r=".8" fill="currentColor" />
    <circle cx="10.5" cy="10.5" r=".8" fill="currentColor" />
  </svg>
);

const IconShield = ({ className }: SVGProps) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M8 2L3 4.5V8c0 3 2.5 5 5 6 2.5-1 5-3 5-6V4.5L8 2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.5 8l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSettings = ({ className }: SVGProps) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M8 1.5v1.4M8 13.1v1.4M1.5 8h1.4M13.1 8h1.4M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IconHelp = ({ className }: SVGProps) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
    <path d="M6.3 6.2a2 2 0 013.2 1.6c0 1.2-1.5 1.5-1.5 2.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="8" cy="11.8" r=".7" fill="currentColor" />
  </svg>
);

const IconSearch = ({ className }: SVGProps) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const IconChevron = ({ className }: SVGProps) => (
  <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path d="M4.5 3L7.5 6l-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ── Types ─────────────────────────────────────────────────────────────────────

type NavItem = {
  id: string;
  label: string;
  Icon: (p: SVGProps) => React.ReactElement;
  badge?: number;
};

type NavSection = {
  label?: string;
  items: NavItem[];
};

// ── Nav config ────────────────────────────────────────────────────────────────

const NAV_SECTIONS: NavSection[] = [
  {
    items: [
      { id: "dashboard", label: "Dashboard", Icon: IconHome },
      { id: "analytics", label: "Analytics",  Icon: IconBarChart },
    ],
  },
  {
    label: "CRM",
    items: [
      { id: "contacts", label: "Contacts",  Icon: IconUsers,   badge: 4 },
      { id: "leads",    label: "Leads",     Icon: IconTarget,  badge: 12 },
      { id: "pipeline", label: "Pipeline",  Icon: IconPipeline },
    ],
  },
  {
    label: "Workspace",
    items: [
      { id: "properties", label: "Properties", Icon: IconBuilding },
      { id: "tasks",      label: "Tasks",       Icon: IconCheckSquare, badge: 3 },
      { id: "calendar",   label: "Calendar",    Icon: IconCalendar },
    ],
  },
  {
    label: "Team",
    items: [
      { id: "members", label: "Members", Icon: IconUsers },
      { id: "roles",   label: "Roles",   Icon: IconShield },
    ],
  },
];

const BOTTOM_NAV: NavItem[] = [
  { id: "settings", label: "Settings", Icon: IconSettings },
  { id: "help",     label: "Help",     Icon: IconHelp },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function NavLink({
  item,
  isActive,
  onClick,
}: {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={[
        "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors duration-100",
        isActive
          ? "bg-brand-50 text-brand-600"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
      ].join(" ")}
    >
      <item.Icon
        className={[
          "shrink-0 transition-colors duration-100",
          isActive ? "text-brand-500" : "text-gray-400 group-hover:text-gray-600",
        ].join(" ")}
      />
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge !== undefined && (
        <span
          className={[
            "rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none",
            isActive
              ? "bg-brand-100 text-brand-600"
              : "bg-gray-100 text-gray-500 group-hover:bg-gray-200",
          ].join(" ")}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

export function Sidebar() {
  const [activeId, setActiveId] = useState<string>("dashboard");
  const [open, setOpen] = useAtom(sidebarOpenAtom);

  return (
    <>
      {/* ── Mobile backdrop ── */}
      {open && (
        <div
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-20 bg-gray-900/40 lg:hidden"
        />
      )}

      <aside
        className={[
          // Base
          "flex h-screen w-56 shrink-0 flex-col border-r border-gray-200 bg-white",
          // Mobile: fixed overlay, slides in from left
          "fixed inset-y-0 left-0 z-30 transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
          // Desktop: always visible, static in flow
          "lg:relative lg:translate-x-0 lg:z-auto",
        ].join(" ")}
      >

      {/* ── User Profile ── */}
      <div className="mx-2 mt-3 mb-2">
        <button
          type="button"
          className="group flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left transition-colors duration-100 hover:bg-gray-50"
        >
          {/* Avatar */}
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-400 to-brand-600 text-xs font-bold text-white shadow-sm">
            LR
            {/* online dot */}
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-white bg-green-500" />
          </div>
          {/* Name + Org */}
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-semibold text-gray-900">
              Lina Rahman
            </span>
            <span className="truncate text-[11px] text-gray-400">
              Atlas Estates
            </span>
          </div>
          <IconChevron className="shrink-0 text-gray-300 transition-transform duration-100 group-hover:text-gray-400" />
        </button>
      </div>

      {/* ── Search ── */}
      <div className="px-3 pb-2">
        <label className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-2 transition-colors duration-100 focus-within:border-brand-400 focus-within:bg-white focus-within:shadow-xs">
          <IconSearch className="shrink-0 text-gray-400" />
          <input
            type="search"
            placeholder="Search…"
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
          <kbd className="hidden rounded border border-gray-200 bg-white px-1 py-0.5 text-[10px] font-mono text-gray-400 shadow-xs sm:block">
            ⌘K
          </kbd>
        </label>
      </div>

      {/* ── Main navigation ── */}
      <nav aria-label="Main navigation" className="flex flex-1 flex-col gap-5 overflow-y-auto px-3 py-2 scrollbar-thin">
        {NAV_SECTIONS.map((section, si) => (
          <div key={si} className="flex flex-col gap-0.5">
            {section.label && (
              <p className="mb-1 px-2.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                {section.label}
              </p>
            )}
            {section.items.map((item) => (
              <NavLink
                key={item.id}
                item={item}
                isActive={activeId === item.id}
                onClick={() => setActiveId(item.id)}
              />
            ))}
          </div>
        ))}
      </nav>

      {/* ── Footer nav ── */}
      <div className="border-t border-gray-100 px-3 py-3">
        <div className="flex flex-col gap-0.5">
          {BOTTOM_NAV.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              isActive={activeId === item.id}
              onClick={() => setActiveId(item.id)}
            />
          ))}
        </div>
      </div>
    </aside>
    </>
  );
}
