/**
 * Dashboard global state — Jotai atoms
 */
import { atom } from "jotai";
import { loadable } from "jotai/utils";
import {
  fetchDashboard,
  type DatePeriod,
  type DashboardData,
} from "@/lib/mockApi";

/** Which date-range tab is active — shared between Header and all cards */
export const periodAtom = atom<DatePeriod>("This Month");

/** Async atom — re-fetches automatically whenever periodAtom changes */
const _asyncAtom = atom<Promise<DashboardData>>((get) =>
  fetchDashboard(get(periodAtom))
);

/**
 * Loadable wrapper — never suspends; gives a discriminated union:
 *   { state: "loading" }
 *   { state: "hasData",  data: DashboardData }
 *   { state: "hasError", error: unknown }
 */
export const dashboardAtom = loadable(_asyncAtom);
