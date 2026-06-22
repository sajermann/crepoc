import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { DownloadIcon } from "lucide-react";
import { useMemo } from "react";
import { Button, JsonViewer, Table } from "~/shared/components";
import { Header } from "~/shared/components/Header";
import { useTreatmentQueue } from "~/shared/hooks/useTreatmentQueue";
import type { TOperation } from "~/shared/types";
import { managerClassNames, mask } from "~/shared/utils";

export const Route = createFileRoute("/dashboard/treatment-queue/")({
  component: TreatmentQueueRoute,
});

// eslint-disable-next-line react-refresh/only-export-components
function TreatmentQueueRoute() {
  const { isFetching, treatmentQueueData } = useTreatmentQueue();
  const columns = useMemo<ColumnDef<TOperation>[]>(
    () => [
      {
        accessorKey: "operationId",
        header: "OPERAÇÃO",
        enableSorting: false,
        maxSize: 100,
        meta: {
          align: "center",
        },
      },
      {
        accessorKey: "personId",
        header: "CPF",
        enableSorting: false,
        meta: {
          align: "center",
        },
      },
      {
        accessorKey: "status",
        header: "STATUS",
        cell: ({ getValue }) => {
          const status = getValue<string>();
          return (
            <div className="flex justify-center w-full">
              <div
                className={managerClassNames([
                  "py-1 px-2 text-xs rounded border w-max text-white",
                  {
                    "bg-feedback-success ": status === "Processada",
                  },
                  {
                    "bg-feedback-warning": status === "Em análise",
                  },
                  {
                    "bg-surface-brand-01-secondary": status === "Pendente",
                  },
                  {
                    "bg-surface-brand-01-primary": status === "Impugnada",
                  },
                  {
                    "bg-feedback-danger": status === "Rejeitada",
                  },
                ])}
              >
                {status}
              </div>
            </div>
          );
        },
        enableSorting: false,
        meta: {
          align: "center",
        },
      },
      {
        accessorKey: "reason",
        header: "Motivo",
        enableSorting: false,
      },
      {
        accessorKey: "actionDescription",
        header: "Ação",
        enableSorting: false,
        cell: ({ getValue }) => {
          const action = getValue<string>();
          return <strong>{action}</strong>;
        },
      },
      {
        accessorKey: "actionLimitDate",
        header: "Prazo",
        enableSorting: false,
        cell: ({ getValue }) => {
          const lastUpdate = new Date(getValue<string>());
          return `${lastUpdate.toLocaleDateString()} às ${lastUpdate.toLocaleTimeString()}`;
        },
      },
      {
        accessorKey: "impactValue",
        header: "Impacto",
        maxSize: 100,
        enableSorting: false,
        cell: ({ getValue }) => {
          const impact = getValue<number>();
          return <strong>{mask.currency(impact, "pt-BR")}</strong>;
        },
      },
      {
        accessorKey: "urgency",
        header: "Urgência",
        maxSize: 100,
        cell: ({ getValue }) => {
          const urgency = getValue<string>();
          return (
            <div className="flex justify-center w-full">
              <div
                className={managerClassNames([
                  "py-1 px-2 text-xs rounded border w-max text-white",
                  {
                    "bg-feedback-information ": urgency === "Normal",
                  },
                  {
                    "bg-feedback-warning": urgency === "Atenção",
                  },
                  {
                    "bg-feedback-danger": urgency === "Crítico",
                  },
                ])}
              >
                {urgency}
              </div>
            </div>
          );
        },
        enableSorting: false,
        meta: {
          align: "center",
        },
      },
      {
        accessorKey: "id",
        header: "",
        meta: {
          align: "center",
        },
        enableSorting: false,
        maxSize: 100,
        cell: () => (
          <Button variant="outlined" colorStyle="inverse" size="small">
            Tratar
          </Button>
        ),
        enableResizing: false,
      },
    ],
    [],
  );
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
        <Table
          columns={columns}
          data={treatmentQueueData}
          isLoading={isFetching}
        />
        <span>Json Data</span>
        <JsonViewer value={treatmentQueueData} collapsed />
      </div>
    </div>
  );
}
