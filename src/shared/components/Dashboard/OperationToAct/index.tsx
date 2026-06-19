import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Table } from "~/shared/components/Table";
import type { TOperation } from "~/shared/types/operation.type";
import { managerClassNames, mask } from "~/shared/utils";
import { Button } from "../..";

type TOperationToActProps = {
  operations: TOperation[];
  isLoading?: boolean;
};

export function OperationToAct({
  operations,
  isLoading,
}: TOperationToActProps) {
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
        enableSorting: false,
        cell: ({ getValue }) => {
          const impact = getValue<number>();
          return <strong>{mask.currency(impact, "pt-BR")}</strong>;
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
    <div className="flex flex-col gap-3 w-full ">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold">Agir Agora</span>
        <Button variant="outlined" size="small">
          Ver fila completa
        </Button>
      </div>

      <Table columns={columns} data={operations} isLoading={isLoading} />
    </div>
  );
}
