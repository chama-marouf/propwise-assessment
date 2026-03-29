import { Suspense }      from "react";
import { Sidebar }        from "@/components/layout/sidebar";
import { DashboardShell } from "@/components/pages/dashboard";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 font-sans dark:bg-stone-950">
      <Sidebar />
      {/* On mobile the sidebar is a fixed overlay, so this div takes full width */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0 p-3 pl-0">
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-stone-900">
          <Suspense>
            <DashboardShell />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
