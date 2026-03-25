import { DashboardHeader } from "./Header";
import { KpiCards }       from "./KpiCards";
import { RevenueChart }   from "./RevenueChart";
import { Pipeline }       from "./Pipeline";
import { ActivityFeed }   from "./ActivityFeed";
import { Tasks }          from "./Tasks";

export function DashboardShell() {
  return (
    /*
     * Scrollable content area (sidebar is fixed aside in parent).
     * p-6 = 24px all sides; gap-6 = 24px between every section.
     */
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
      {/* ── Header ── */}
      <DashboardHeader />

      {/* ── KPI Cards row ── */}
      <KpiCards />

      {/*
       * ── Main grid ──────────────────────────────────────────────────────
       *  Mobile  : single column (stacked)
       *  Desktop : left  = 3fr  (revenue + pipeline)
       *            right = 1.2fr (activity + tasks)
       * ─────────────────────────────────────────────────────────────────
       */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_1.2fr]">

        {/* ── Left column ── */}
        <div className="flex flex-col gap-6">
          <RevenueChart />
          <Pipeline />
        </div>

        {/* ── Right column ── */}
        <div className="flex flex-col gap-6">
          <ActivityFeed />
          <Tasks />
        </div>

      </div>
    </div>
  );
}
