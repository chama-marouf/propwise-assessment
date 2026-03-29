"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { sidebarOpenAtom } from "@/store";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  IconDashboard,
  IconContacts,
  IconLeads,
  IconDeals,
  IconProperties,
  IconTasks,
  IconCalendar,
  IconReports,
  IconInbox,
  IconMarketing,
  IconSettings,
} from "@/components/icons";

// ── Local-only icons (not nav items, so kept inline) ──────────────────────────

type LocalSVGProps = { className?: string };

const IconHelp        = ({ className }: LocalSVGProps) => (<svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" /><path d="M6.3 6.2a2 2 0 013.2 1.6c0 1.2-1.5 1.5-1.5 2.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><circle cx="8" cy="11.8" r=".7" fill="currentColor" /></svg>);
const IconSearch      = ({ className }: LocalSVGProps) => (<svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" /><path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>);
const IconChevronDown = ({ className }: LocalSVGProps) => (<svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M3.5 5L7 8.5l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const IconSignOut     = ({ className }: LocalSVGProps) => (<svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M10.5 5.5L13.5 8l-3 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M13.5 8H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><path d="M6 2.5H3a1 1 0 00-1 1v9a1 1 0 001 1h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>);

// ── Types + config ────────────────────────────────────────────────────────────

type NavItem    = { id: string; label: string; Icon: (p: LocalSVGProps) => React.ReactElement; badge?: number; hasChevron?: boolean };
type NavSection = { label?: string; items: NavItem[] };

const NAV_SECTIONS: NavSection[] = [
  { items: [
    { id: "dashboard", label: "Dashboard", Icon: IconDashboard },
  ]},
  { label: "CRM", items: [
    { id: "inbox",    label: "Inbox",    Icon: IconInbox },
    { id: "leads",   label: "Leads",    Icon: IconLeads,    badge: 12 },
    { id: "deals",   label: "Deals",   Icon: IconDeals },
    { id: "contacts",label: "Contacts", Icon: IconContacts, badge: 4 },
    { id: "tasks",   label: "Tasks",   Icon: IconTasks,    badge: 3 },
    { id: "calendar",label: "Calendar", Icon: IconCalendar },
  ]},
  { label: "Workspace", items: [
    { id: "properties", label: "Properties", Icon: IconProperties, hasChevron: true },
    { id: "marketing",  label: "Marketing",  Icon: IconMarketing,  hasChevron: true },
    { id: "reports",    label: "Reports",    Icon: IconReports,    hasChevron: true },
  ]},
];

const BOTTOM_NAV: NavItem[] = [
  { id: "team",     label: "Team",     Icon: IconContacts },
  { id: "settings", label: "Settings", Icon: IconSettings },
];

// ── NavLink ───────────────────────────────────────────────────────────────────

function NavLink({ item, isActive, onClick }: { item: NavItem; isActive: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={[
        "group flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors duration-100",
        isActive
          ? "bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300"
          : "text-stone-500 hover:bg-gray-50 hover:text-stone-700 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-200",
      ].join(" ")}
    >
      <item.Icon className={["shrink-0 transition-colors duration-100", isActive ? "text-brand-700 dark:text-brand-300" : "text-stone-500 group-hover:text-stone-700 dark:text-stone-500 dark:group-hover:text-stone-300"].join(" ")} />
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge !== undefined && (
        <span className={["rounded-full px-1.5 py-0.5 text-caption font-semibold leading-none", isActive ? "bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300" : "bg-gray-100 text-stone-500 group-hover:bg-gray-200 dark:bg-stone-800 dark:text-stone-400"].join(" ")}>
          {item.badge}
        </span>
      )}
      {item.hasChevron && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="shrink-0 text-gray-300 group-hover:text-gray-400 dark:text-stone-600 dark:group-hover:text-stone-500">
          <path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

export function Sidebar() {
  const [activeId, setActiveId] = useState("dashboard");
  const [open, setOpen]         = useAtom(sidebarOpenAtom);
  const { neutral }             = useToast();

  const handleNavClick = (id: string) => {
    if (id === "dashboard") {
      setActiveId(id);
    } else {
      neutral("Feature coming soon");
    }
  };

  return (
    <>
      {open && (
        <div aria-hidden onClick={() => setOpen(false)}
          className="fixed inset-0 z-20 bg-gray-900/40 lg:hidden" />
      )}

      <aside className={[
        "flex h-screen w-56 shrink-0 flex-col",
        "bg-white lg:bg-transparent dark:bg-stone-950",
        "fixed inset-y-0 left-0 z-30 transition-transform duration-300 ease-out",
        open ? "translate-x-0" : "-translate-x-full",
        "lg:relative lg:translate-x-0 lg:z-auto",
      ].join(" ")}>

        {/* User profile — Radix DropdownMenu */}
        <div className="mx-2 mt-3 mb-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="group flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left transition-colors duration-100 hover:bg-gray-50 dark:hover:bg-stone-900"
              >
                <div className="relative shrink-0">
                  <Avatar className="h-8 w-8 shadow-sm">
                    <AvatarFallback>LR</AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-white bg-green-500 dark:border-stone-950" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-semibold text-gray-900 dark:text-stone-50">Lina Rahman</span>
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-[11px] text-gray-400 dark:text-stone-500">Atlas Estates</span>
                    <span className="rounded-full bg-brand-500 px-1.5 py-0.5 text-[9px] font-bold leading-none text-white">Pro</span>
                  </div>
                </div>
                <IconChevronDown className="shrink-0 text-gray-300 transition-transform duration-200 group-data-[state=open]:rotate-180 dark:text-stone-600" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" sideOffset={4} className="w-72">
              {/* Workspace header */}
              <div className="flex items-center gap-3 rounded-xl p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm dark:border-stone-700 dark:bg-stone-800">
                  <div className="grid grid-cols-2 gap-0.75">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-orange-400" />
                  </div>
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="text-sm font-bold text-gray-900 dark:text-stone-50">Atlas Estates</span>
                  <span className="text-xs text-gray-400 dark:text-stone-500">Business · 12 members</span>
                </div>
              </div>

              {/* Status */}
              <div className="mx-1 mb-1.5 flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 dark:border-stone-800 dark:bg-stone-900">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.15)]" />
                  <span className="text-sm text-gray-700 dark:text-stone-300">Online</span>
                </div>
                <span className="rounded-full bg-green-50 px-2 py-0.5 text-[9px] font-bold tracking-wider text-green-700 dark:bg-green-950 dark:text-green-400">
                  ACTIVE
                </span>
              </div>

              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="text-gray-400"><circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" /><path d="M3 14c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="text-gray-400"><path d="M8 1.5A4.5 4.5 0 003.5 6v3L2 11h12l-1.5-2V6A4.5 4.5 0 008 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M6.5 11.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                Notifications
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1.5 text-caption font-bold text-white">2</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconHelp className="text-gray-400" />
                Help &amp; Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem danger>
                <IconSignOut className="text-current" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search */}
        <div className="px-3 pb-2">
          <label className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-2 transition-colors duration-100 focus-within:border-brand-400 focus-within:bg-white focus-within:shadow-xs dark:border-stone-800 dark:bg-stone-900 dark:focus-within:border-brand-500 dark:focus-within:bg-stone-900">
            <IconSearch className="shrink-0 text-gray-400 dark:text-stone-500" />
            <input type="search" placeholder="Search…" className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:text-stone-200 dark:placeholder:text-stone-600" />
            <kbd className="hidden rounded border border-gray-200 bg-white px-1 py-0.5 text-caption font-mono text-gray-400 shadow-xs dark:border-stone-700 dark:bg-stone-800 dark:text-stone-500 sm:block">⌘K</kbd>
          </label>
        </div>

        {/* Main nav */}
        <ScrollArea className="flex-1 px-3 py-2">
          <nav aria-label="Main navigation" className="flex flex-col gap-5">
            {NAV_SECTIONS.map((section, si) => (
              <div key={si} className="flex flex-col gap-0.5">
                {section.label && (
                  <p className="mb-1 px-2.5 text-caption font-semibold uppercase tracking-widest text-gray-400 dark:text-stone-600">{section.label}</p>
                )}
                {section.items.map((item) => (
                  <NavLink key={item.id} item={item} isActive={activeId === item.id} onClick={() => handleNavClick(item.id)} />
                ))}
              </div>
            ))}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-gray-100 px-3 py-3 dark:border-stone-800">
          <div className="flex flex-col gap-0.5">
            {BOTTOM_NAV.map((item) => (
              <NavLink key={item.id} item={item} isActive={activeId === item.id} onClick={() => handleNavClick(item.id)} />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
