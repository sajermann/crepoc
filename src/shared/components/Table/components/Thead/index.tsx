import type { Table } from "@tanstack/react-table";
import { managerClassNames } from "~/shared/utils";
import { ThContent } from "./ThContent";

type TTheadProps<T> = {
  table: Table<T>;
  sorting?: {
    disabled?: boolean;
  };
};

export function Thead<T>({ table, sorting }: TTheadProps<T>) {
  return (
    <thead className="h-14 text-sm">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              className={managerClassNames([
                "p-4",
                {
                  "text-left":
                    !header.getContext().column.columnDef.meta?.align,
                  "text-center":
                    header.getContext().column.columnDef.meta?.align ===
                    "center",
                  "text-right":
                    header.getContext().column.columnDef.meta?.align ===
                    "right",
                },
              ])}
              key={header.id}
              colSpan={header.colSpan}
              style={{
                width: header.getSize(),
              }}
            >
              {header.isPlaceholder ? null : (
                <>
                  <ThContent table={table} header={header} sorting={sorting} />
                </>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
