import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Button, JsonViewer, Table } from "~/shared/components";
import { Header } from "~/shared/components/Header";
import { useOperations } from "~/shared/hooks/useOperations";
import type { TOperation } from "~/shared/types";
import { managerClassNames, mask } from "~/shared/utils";

export const Route = createFileRoute("/dashboard/operations/")({
  component: OperationsRoute,
});

// eslint-disable-next-line react-refresh/only-export-components
function OperationsRoute() {
  const { operationsData, isFetching } = useOperations();

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
                    "bg-feedback-information": status === "Honrada",
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
        accessorKey: "impactValue",
        header: "Valor",
        maxSize: 100,
        enableSorting: false,
        cell: ({ getValue }) => {
          const impact = getValue<number>();
          return <strong>{mask.currency(impact, "pt-BR")}</strong>;
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
        accessorKey: "shipmentId",
        header: "Remessa",
        enableSorting: false,
        meta: {
          align: "center",
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
                    "bg-feedback-success ": urgency === "Ok",
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
            Detalhe
          </Button>
        ),
        enableResizing: false,
      },
    ],
    [],
  );

  return (
    <div className="flex flex-col w-full h-full">
      <Header title="Operações" subtitle="Consulta da carteira completa" />

      <div className="px-5 py-6 w-full h-full flex-1  overflow-auto">
        <Table columns={columns} data={operationsData} isLoading={isFetching} />
        <span>Json Data</span>
        <JsonViewer value={operationsData} collapsed />
      </div>
    </div>
  );
}
