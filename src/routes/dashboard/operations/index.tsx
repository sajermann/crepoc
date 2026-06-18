import { createFileRoute } from "@tanstack/react-router";
import { JsonViewer } from "~/shared/components";
import { Header } from "~/shared/components/Header";
import { useOperations } from "~/shared/hooks/useOperations";

export const Route = createFileRoute("/dashboard/operations/")({
  component: OperationsRoute,
});

// eslint-disable-next-line react-refresh/only-export-components
function OperationsRoute() {
  const { operationsData, isFetching } = useOperations();
  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Operações" subtitle="Consulta da carteira completa" />

      <div className="px-5 py-6 w-full h-full flex-1  overflow-auto">
        {isFetching && <p>Loading...</p>}
        <JsonViewer value={operationsData} />
      </div>
    </div>
  );
}
