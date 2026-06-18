import { createFileRoute } from "@tanstack/react-router";
import { DownloadIcon } from "lucide-react";
import { JsonViewer } from "~/shared/components";
import { Header } from "~/shared/components/Header";
import { useTreatmentQueue } from "~/shared/hooks/useTreatmentQueue";

export const Route = createFileRoute("/dashboard/treatment-queue/")({
  component: TreatmentQueueRoute,
});

// eslint-disable-next-line react-refresh/only-export-components
function TreatmentQueueRoute() {
  const { isFetching, treatmentQueueData } = useTreatmentQueue();
  return (
    <div className="flex flex-col w-full h-full">
      <Header
        title="Fila de Tratamento"
        subtitle={`${treatmentQueueData.length} operações encontradas`}
        action={[
          {
            icon: <DownloadIcon />,
            title: "Exportar",
            onClick: () => console.log("Exportar"),
          },
        ]}
      />

      <div className="px-5 py-6 w-full h-full flex-1  overflow-auto">
        {isFetching && <p>Loading...</p>}
        <JsonViewer value={treatmentQueueData} />
      </div>
    </div>
  );
}
