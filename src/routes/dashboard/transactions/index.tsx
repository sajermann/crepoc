import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import {
  BanknoteArrowUpIcon,
  ChartNoAxesCombinedIcon,
  DownloadIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useMemo } from "react";
import { Button, Table } from "~/shared/components";
import { Header } from "~/shared/components/Header";
import { JsonViewer } from "~/shared/components/JsonViewer";
import { useTransactions } from "~/shared/hooks/useTransactions";
import type { TOperationForTransactions } from "~/shared/types/transactions.type";
import { managerClassNames, mask } from "~/shared/utils";

export const Route = createFileRoute("/dashboard/transactions/")({
  component: TransactionsRoute,
});

// eslint-disable-next-line react-refresh/only-export-components
function TransactionsRoute() {
  const { transactionsData, isFetching } = useTransactions();

  const columns = useMemo<ColumnDef<TOperationForTransactions>[]>(
    () => [
      {
        accessorKey: "id",
        header: "OPERAÇÃO",
        enableSorting: false,
        maxSize: 100,
        meta: {
          align: "center",
        },
      },
      {
        accessorKey: "type",
        header: "Tipo",
        enableSorting: false,
        meta: {
          align: "center",
        },
      },
      {
        accessorKey: "operationValue",
        header: "Valor",
        maxSize: 100,
        enableSorting: false,
        cell: ({ getValue }) => {
          const impact = getValue<number>();
          return <strong>{mask.currency(impact, "pt-BR")}</strong>;
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
                    "bg-feedback-success ": status === "Pago",
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
                    "bg-feedback-danger": status === "Divergente",
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
        accessorKey: "conciliation",
        header: "Conciliação",
        enableSorting: false,
      },
      {
        accessorKey: "date",
        header: "Data",
        enableSorting: false,
        cell: ({ getValue }) => {
          const lastUpdate = new Date(getValue<string>());
          return `${lastUpdate.toLocaleDateString()}`;
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
            Abrir
          </Button>
        ),
        enableResizing: false,
      },
    ],
    [],
  );

  return (
    <div>
      <Header
        title="Movimentação Financeira"
        subtitle="Controle de valores esperados, pagos e divergências"
        action={[
          {
            icon: <DownloadIcon />,
            title: "Exportar extrato",
            onClick: () => console.log("Exportar extrato"),
          },
        ]}
      />
      <div className="px-5 py-6 w-full h-full flex-1 overflow-auto">
        <div className="flex gap-2 mb-4 text-sm">
          <div className="flex-1 border rounded-xl p-4 flex gap-2 items-center">
            <BanknoteArrowUpIcon className="w-10 h-10" />
            <div className="flex flex-col gal-2">
              <span>Valor Esperado</span>
              <span className="text-feedback-information text-2xl font-bold">
                {mask.currency(
                  transactionsData?.header.expectedValue || 0,
                  "pt-BR",
                )}
              </span>
              <span>
                {transactionsData?.header.expectedDiference || 0}% vs ontem
              </span>
            </div>
          </div>

          <div className="flex-1 border rounded-xl p-4 flex gap-2 items-center">
            <ChartNoAxesCombinedIcon className="w-10 h-10" />
            <div className="flex flex-col gal-2">
              <span>Valor Pago</span>
              <span className="text-feedback-success text-2xl font-bold">
                {mask.currency(
                  transactionsData?.header.paidValue || 0,
                  "pt-BR",
                )}
              </span>
              <span>
                {transactionsData?.header.paidValueDiference || 0}% vs ontem
              </span>
            </div>
          </div>

          <div className="flex-1 border rounded-xl p-4 flex gap-2 items-center">
            <TriangleAlertIcon className="w-10 h-10" />
            <div className="flex flex-col gal-2">
              <span>Divergência</span>
              <span className="text-feedback-danger text-2xl font-bold">
                {mask.currency(
                  transactionsData?.header.divergenceValue || 0,
                  "pt-BR",
                )}
              </span>
              <span>
                {transactionsData?.header.divergenceDiference || 0}% vs ontem
              </span>
            </div>
          </div>
        </div>

        <div className="py-4 bg-feedback-warning mb-4 rounded-lg px-4 text-sm flex items-center gap-2">
          <TriangleAlertIcon className="w-6 h-6" />

          <span>{transactionsData?.header.alertDescription}</span>
        </div>

        <Table
          columns={columns}
          data={transactionsData?.operations || []}
          isLoading={isFetching}
        />
        <span>Json Data</span>
        <JsonViewer value={transactionsData || []} collapsed />
      </div>
    </div>
  );
}
