import { Sidebar }        from "@/components/layout/sidebar";
import { DashboardShell } from "@/components/pages/dashboard";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      <Sidebar />
      {/* On mobile the sidebar is a fixed overlay, so this div takes full width */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <DashboardShell />
      </div>
    </div>
  );
}
