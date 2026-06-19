import type { ColumnDef, Table } from "@tanstack/react-table";
import { managerClassNames } from "~/shared/utils";
import type { TExpandRow } from "../../types/expand-row.type";
import { IsLoading } from "../IsLoading";
import { NoData } from "../NoData";
import { RowsWithoutVirtualization } from "../RowsWithoutVirtualization";

type Props<T> = {
  table: Table<T>;
  data: T[];
  isLoading?: boolean;
  columns: ColumnDef<T>[];
  expandRow?: TExpandRow<T>;
  enableVirtualization?: boolean;
};

export function Tbody<T>({
  table,
  data,
  isLoading,
  columns,
  expandRow,
  enableVirtualization,
}: Props<T>) {
  return (
    <tbody
      className={managerClassNames({
        "[&>*:nth-child(odd)]:bg-[#f2f2f2]": true,
      })}
      style={{
        opacity: isLoading ? 0.5 : 1,
      }}
    >
      <NoData columns={columns} data={data} isLoading={isLoading} />
      <IsLoading columns={columns} data={data} isLoading={isLoading} />
      <RowsWithoutVirtualization
        table={table}
        enableVirtualization={enableVirtualization}
        expandRow={expandRow}
      />
    </tbody>
  );
}
