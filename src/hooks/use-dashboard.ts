"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchDashboard } from "@/lib/mock-api";
import type { DashboardData, DatePeriod } from "@/types/dashboard";

type State =
  | { status: "loading" }
  | { status: "success"; data: DashboardData; fetchedPeriod: DatePeriod }
  | { status: "error";   message: string };

export function useDashboard(period: DatePeriod) {
  const [state, setState] = useState<State>({ status: "loading" });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetchDashboard(period)
      .then((data) => {
        if (cancelled) return;
        setState({ status: "success", data, fetchedPeriod: period });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({
          status:  "error",
          message: err instanceof Error ? err.message : "Failed to load dashboard",
        });
      });

    return () => { cancelled = true; };
  }, [period, refreshKey]);

  const refetch = useCallback(() => setRefreshKey((k) => k + 1), []);

  const isLoading =
    state.status === "loading" ||
    (state.status === "success" && state.fetchedPeriod !== period);

  return {
    ...state,
    isLoading,
    isError: state.status === "error",
    data:    state.status === "success" ? state.data : undefined,
    refetch,
  };
}
