import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "../../shared/components/Sidebar";

export const Route = createFileRoute("/dashboard")({
  component: DashboardRoute,
});

// eslint-disable-next-line react-refresh/only-export-components
function DashboardRoute() {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <main className="flex-1 h-full overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
