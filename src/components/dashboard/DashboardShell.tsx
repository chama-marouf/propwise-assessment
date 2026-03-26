import { DashboardHeader } from "./Header";
import { KpiCards }       from "./KpiCards";
import { RevenueChart }   from "./RevenueChart";
import { Pipeline }       from "./Pipeline";
import { ActivityFeed }   from "./ActivityFeed";
import { Tasks }          from "./Tasks";

export function DashboardShell() {
  return (
    /*
     * Outer shell: flex column, fills remaining viewport height, scrollable.
     * The Header is full-bleed (owns its own px-6 + border-b).
     * Everything below gets p-6 / gap-6 via the inner content div.
     */
    <div className="flex flex-1 flex-col overflow-y-auto">
      {/* ── Header (full-bleed, sticky) ── */}
      <div className="sticky top-0 z-10 bg-white">
        <DashboardHeader />
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex flex-col gap-6 p-6">

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
    </div>
  );
}
