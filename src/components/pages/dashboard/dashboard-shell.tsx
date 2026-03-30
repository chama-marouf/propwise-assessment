"use client";

import { useAtomValue } from "jotai";
import { dashboardAtom } from "@/store";
import { DashboardHeader }  from "./dashboard-header";
import { KpiCards }         from "./kpi-cards";
import { RevenueForecast }  from "./revenue-forecast";
import { PipelineSummary }  from "./pipeline-summary";
import { ActivityFeed }     from "./activity-feed";
import { TasksPanel }       from "./tasks-panel";

export function DashboardShell() {
  const result  = useAtomValue(dashboardAtom);
  const data    = result.state === "hasData" ? result.data : undefined;
  const isError = result.state === "hasError";

  return (
    <div className="flex flex-1 flex-col overflow-y-auto min-w-0">

      {/* Header — sticky */}
      <div className="sticky top-0 z-10 rounded-t-2xl bg-white dark:bg-stone-900">
        <DashboardHeader />
      </div>

      {/* Error banner */}
      {isError && (
        <div className="mx-6 mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-body-sm text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
          Failed to load dashboard data. Please try again.
        </div>
      )}

      {/* Scrollable content */}
      <div className="flex flex-col gap-6.5 p-4 pt-6.5 md:p-6 md:pt-6.5">

        {/* KPI Cards */}
        <KpiCards data={data?.kpis} />

        {/*
         * Main grid
         *  Mobile  : single column, stacked in DOM order
         *  Desktop : 2-column grid where Revenue (col1 row1) and Activity
         *            (col2 row1) share the same row → identical height.
         */}
        <div className="grid grid-cols-1 gap-6.5 lg:grid-cols-[3fr_2fr]">

          {/* Revenue — col 1, row 1 */}
          <div className="lg:col-start-1 lg:row-start-1">
            <RevenueForecast data={data?.revenue} />
          </div>

          {/* Pipeline — col 1, row 2 */}
          <div className="lg:col-start-1 lg:row-start-2">
            <PipelineSummary data={data?.pipeline} />
          </div>

          {/* Activity — col 2, row 1: same row as Revenue → same height */}
          <div className="lg:col-start-2 lg:row-start-1 lg:overflow-hidden">
            <ActivityFeed items={data?.activities} />
          </div>

          {/* Tasks — col 2, row 2 */}
          <div className="lg:col-start-2 lg:row-start-2">
            <TasksPanel
              key={data?.tasks?.map((t) => t.id).join(",") ?? ""}
              initialTasks={data?.tasks}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
