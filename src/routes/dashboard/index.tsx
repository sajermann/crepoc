import { createFileRoute } from "@tanstack/react-router";
import { RefreshCcwIcon } from "lucide-react";
import { useState } from "react";
import { Header } from "~/shared/components/Header";
import { JsonViewer } from "~/shared/components/JsonViewer";
import { useDashboard } from "~/shared/hooks";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

// eslint-disable-next-line react-refresh/only-export-components
function DashboardIndex() {
  const { dashboardData, isFetching, refetch } = useDashboard();
  const [lastUpdate, setLastUpdate] = useState(new Date());
  return (
    <div className="flex flex-col w-full h-full">
      <Header
        title="Dashboard Operacional"
        subtitle={`Última atualização: ${lastUpdate.toLocaleDateString()} às ${lastUpdate.toLocaleTimeString()}`}
        action={[
          {
            icon: <RefreshCcwIcon />,
            title: "Atualizar",
            onClick: () => {
              refetch();
              setLastUpdate(new Date());
            },
          },
        ]}
      />

      <div className="px-5 py-6 w-full h-full flex-1  overflow-auto">
        {isFetching && <p>Loading...</p>}
        <JsonViewer value={dashboardData} />
      </div>
    </div>
  );
}
