import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import * as TableMega from "~/shared/components/Table";
import type { TOperation } from "~/shared/types/operation.type";
import { Button } from "../..";

type TOperationToActProps = {
  operations: TOperation[];
};

export function OperationToAct({ operations }: TOperationToActProps) {
  const columns = useMemo<ColumnDef<TOperation>[]>(
    () => [
      {
        accessorKey: "operationId",
        header: "OPERAÇÃO",
      },
      {
        accessorKey: "personId",
        header: "CPF",
      },
      {
        accessorKey: "status",
        header: "STATUS",
        cell: ({ getValue }) => <div>{getValue() as string}</div>,
      },
      {
        accessorKey: "reason",
        header: "Motivo",
      },
      {
        accessorKey: "actionDescription",
        header: "Ação",
        meta: {
          align: "center",
        },
      },
      {
        accessorKey: "actionLimitDate",
        header: "Prazo",
      },
      {
        accessorKey: "impactValue",
        header: "Impacto",
      },
      {
        accessorKey: "id",
        header: "",
        minSize: 100,
        size: 100,
        meta: {
          align: "center",
        },
        cell: () => <div> Tratar</div>,
        enableResizing: false,
      },
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-3 w-full ">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold">Agir Agora</span>
        <Button variant="outlined">Ver fila completa</Button>
      </div>

      <TableMega.Root data={operations} columns={columns}>
        <TableMega.Table>
          <TableMega.Thead />
          <TableMega.Tbody>
            <TableMega.Rows />
          </TableMega.Tbody>
        </TableMega.Table>
      </TableMega.Root>
    </div>
  );
}
