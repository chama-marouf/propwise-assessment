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
      <div className="sticky top-0 z-10 bg-white dark:bg-stone-950">
        <DashboardHeader />
      </div>

      {/* Error banner */}
      {isError && (
        <div className="mx-6 mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-body-sm text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
          Failed to load dashboard data. Please try again.
        </div>
      )}

      {/* Scrollable content */}
      <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">

        {/* KPI Cards */}
        <KpiCards data={data?.kpis} />

        {/*
         * Main grid
         *  Mobile  : single column
         *  Desktop : left 3fr (revenue + pipeline) · right 1.2fr (activity + tasks)
         */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_1.2fr]">

          {/* Left */}
          <div className="flex flex-col gap-6">
            <RevenueForecast data={data?.revenue} />
            <PipelineSummary data={data?.pipeline} />
          </div>

          {/* Right */}
          <div className="flex flex-col gap-6">
            <ActivityFeed items={data?.activities} />
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
