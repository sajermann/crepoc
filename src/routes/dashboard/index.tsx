import { createFileRoute } from "@tanstack/react-router";
import { RefreshCcwIcon } from "lucide-react";
import { useState } from "react";
import { CriticalAlerts } from "~/shared/components/Dashboard/CriticalAlerts";
import { DashboardCards } from "~/shared/components/Dashboard/DashboardCards";
import { OperationToAct } from "~/shared/components/Dashboard/OperationToAct";
import { ShipmentsCards } from "~/shared/components/Dashboard/ShipmentsCards";
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
    <div className="flex flex-col w-full h-full bg-background-main">
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

      <div className="px-5 py-6 w-full h-full flex-1 gap-4 flex flex-col overflow-auto">
        {isFetching && <p>Atualizando dados...</p>}
        <DashboardCards dataUnknown={dashboardData?.dataUnknown || []} />
        <CriticalAlerts alerts={dashboardData?.alerts || []} />
        <OperationToAct operations={dashboardData?.operations || []} />
        <ShipmentsCards shipments={dashboardData?.shipments || []} />

        <span>Json Data</span>
        <JsonViewer value={dashboardData} collapsed />
      </div>
    </div>
  );
}
