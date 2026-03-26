"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchDashboard, type DashboardData, type DatePeriod } from "@/lib/mockApi";

type State =
  | { status: "idle"    }
  | { status: "loading" }
  | { status: "success"; data: DashboardData }
  | { status: "error";   message: string };

export function useDashboard(period: DatePeriod) {
  const [state, setState] = useState<State>({ status: "idle" });

  const load = useCallback(async () => {
    setState({ status: "loading" });
    try {
      const data = await fetchDashboard(period);
      setState({ status: "success", data });
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Failed to load dashboard",
      });
    }
  }, [period]);

  useEffect(() => { load(); }, [load]);

  return {
    ...state,
    isLoading: state.status === "loading" || state.status === "idle",
    isError:   state.status === "error",
    data:      state.status === "success" ? state.data : undefined,
    refetch:   load,
  };
}
