/**
 * Global Jotai atoms — single file for all dashboard state.
 */

import { atom } from "jotai";
import { loadable } from "jotai/utils";
import type { DatePeriod, DashboardData, Toast } from "@/types/dashboard";
import { fetchDashboard } from "@/lib/mock-api";

// ── Sidebar ───────────────────────────────────────────────────────────────────

/** true = sidebar overlay is open on mobile */
export const sidebarOpenAtom = atom(false);

// ── Dashboard / period ────────────────────────────────────────────────────────

/** Which date-range tab is active */
export const periodAtom = atom<DatePeriod>("This Month");

/** Async atom — re-fetches automatically whenever periodAtom changes */
const _dashboardAsyncAtom = atom<Promise<DashboardData>>((get) =>
  fetchDashboard(get(periodAtom))
);

/**
 * Loadable wrapper — never suspends; discriminated union:
 *   { state: "loading" }
 *   { state: "hasData",  data: DashboardData }
 *   { state: "hasError", error: unknown }
 */
export const dashboardAtom = loadable(_dashboardAsyncAtom);

// ── Toasts ────────────────────────────────────────────────────────────────────

export const toastsAtom = atom<Toast[]>([]);
