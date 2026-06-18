import { createFileRoute } from "@tanstack/react-router";
import { RefreshCcwIcon } from "lucide-react";
import { Header } from "~/shared/components/Header";
import { JsonViewer } from "~/shared/components/JsonViewer";
import { useShipments } from "~/shared/hooks/useShipments";

export const Route = createFileRoute("/dashboard/shiments/")({
  component: ShipmentsRoute,
});

// eslint-disable-next-line react-refresh/only-export-components
function ShipmentsRoute() {
  const { shipmentsData, isFetching, refetch } = useShipments();
  return (
    <div className="flex flex-col w-full h-full">
      <Header
        title="Remessas e Retornos"
        subtitle="Rastreabilidade da integração FGO"
        action={[
          {
            icon: <RefreshCcwIcon />,
            title: "Atualizar remessas",
            onClick: () => refetch(),
          },
        ]}
      />

      <div className="px-5 py-6 w-full h-full flex-1  overflow-auto">
        {isFetching && <p>Loading...</p>}
        <JsonViewer value={shipmentsData} />
      </div>
    </div>
  );
}
