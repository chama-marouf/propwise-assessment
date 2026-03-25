import { Sidebar }        from "@/components/sidebar";
import { DashboardShell } from "@/components/dashboard";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      <Sidebar />
      <DashboardShell />
    </div>
  );
}
