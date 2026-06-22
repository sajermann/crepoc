import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { RefreshCcwIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Table } from "~/shared/components";
import { Button } from "~/shared/components/Button";
import { Header } from "~/shared/components/Header";
import { JsonViewer } from "~/shared/components/JsonViewer";
import { useShipments } from "~/shared/hooks/useShipments";
import type { TShipment } from "~/shared/types/dashboard.type";
import { managerClassNames } from "~/shared/utils";

export const Route = createFileRoute("/dashboard/shiments/")({
  component: ShipmentsRoute,
});

// eslint-disable-next-line react-refresh/only-export-components
function ShipmentsRoute() {
  const { shipmentsData, isFetching, refetch } = useShipments();
  const [selectedShipment, setSelectedShipment] = useState<TShipment | null>(
    null,
  );

  const columns = useMemo<ColumnDef<TShipment>[]>(
    () => [
      {
        accessorKey: "shipmentId",
        header: "ID",
        enableSorting: false,
        maxSize: 100,
        meta: {
          align: "center",
        },
      },
      {
        accessorKey: "date",
        header: "Data",
        enableSorting: false,
        meta: {
          align: "center",
        },
        cell: ({ getValue }) => {
          const lastUpdate = new Date(getValue<string>());
          return `${lastUpdate.toLocaleDateString()}`;
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
        accessorKey: "registryCount",
        header: "Registros",
        maxSize: 100,
        enableSorting: false,
      },
      {
        accessorKey: "errorsCount",
        header: "Erros",
        enableSorting: false,
      },
      {
        accessorKey: "id",
        header: "",
        meta: {
          align: "center",
        },
        enableSorting: false,
        maxSize: 100,
        cell: ({ row }) => (
          <Button
            variant="outlined"
            colorStyle="inverse"
            size="small"
            onClick={() => setSelectedShipment(row.original)}
          >
            Operações
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
        title="Remessas e Retornos"
        subtitle="Rastreabilidade da integração FGO"
        action={[
          {
            icon: <RefreshCcwIcon />,
            title: "Atualizar remessas",
            onClick: () => {
              setSelectedShipment(null);
              refetch();
            },
          },
        ]}
      />

      <div className="px-5 py-6 w-full h-full flex-1  overflow-auto">
        <div className="flex justify-between mb-4 gap-4">
          <Table
            columns={columns}
            data={shipmentsData}
            isLoading={isFetching}
          />
          {selectedShipment && (
            <div className="border p-4 rounded-2xl min-w-xs text-sm">
              <div className="py-4 pt-0 border-b flex flex-col gap-2">
                <p className="font-bold">
                  REMESSA {selectedShipment.shipmentId}
                </p>
                <p>
                  {selectedShipment
                    ? new Date(selectedShipment.date).toLocaleDateString()
                    : ""}
                </p>
                <div
                  className={managerClassNames([
                    "py-1 px-2 text-xs rounded border w-max text-white",
                    {
                      "bg-feedback-success ":
                        selectedShipment.status === "Processada",
                    },
                    {
                      "bg-feedback-information":
                        selectedShipment.status === "Honrada",
                    },
                    {
                      "bg-feedback-warning":
                        selectedShipment.status === "Em análise",
                    },
                    {
                      "bg-surface-brand-01-secondary":
                        selectedShipment.status === "Pendente",
                    },
                    {
                      "bg-surface-brand-01-primary":
                        selectedShipment.status === "Impugnada",
                    },
                    {
                      "bg-feedback-danger":
                        selectedShipment.status === "Rejeitada",
                    },
                  ])}
                >
                  {selectedShipment.status}
                </div>
              </div>
              <div className="py-4 border-b flex flex-col gap-2">
                <p className="font-semibold">ESTRUTURA DO ARQUIVO</p>
                <div className="flex justify-between">
                  <span>Header</span>
                  <span>Banco 237 lote 002</span>
                </div>
                <div className="flex justify-between">
                  <span>Trailer</span>
                  <span>
                    {selectedShipment.registryCount +
                      selectedShipment.errorsCount}{" "}
                    registros enviados
                  </span>
                </div>
              </div>

              <div className="py-4 pb-0  flex flex-col gap-2">
                <p className="font-semibold">RETORNOS RECEBIDOS</p>
                <div className="flex gap-2">
                  <span>✅</span>
                  <span>Aceite de header</span>
                </div>
                <div className="flex gap-2">
                  <span>❌</span>
                  <span>
                    {selectedShipment.errorsCount} registros com divergência de
                    valor
                  </span>
                </div>
                <div className="flex gap-2">
                  <span>✅</span>
                  <span>
                    {selectedShipment.registryCount} registros processados
                  </span>
                </div>

                <div className="flex gap-2 border bg-feedback-danger p-2 rounded-xl my-2 text-sm">
                  <span>⚠️</span>
                  <span>
                    {selectedShipment.errorsCount} registros com erro nessa
                    remessa
                  </span>
                </div>

                <Button
                  className="w-full"
                  colorStyle="primary"
                  variant="outlined"
                  size="small"
                >
                  ↔️ Ver Operações Vinculadas
                </Button>
              </div>
            </div>
          )}
        </div>

        <span>Json Data</span>
        <JsonViewer value={shipmentsData} collapsed />
      </div>
    </div>
  );
}
