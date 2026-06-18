import {
  type ColumnDef,
  type ColumnOrderState,
  type FilterFnOption,
  getCoreRowModel,
  getFilteredRowModel,
  type OnChangeFn,
  type RowSelectionState,
  type Table,
  type TableMeta,
  useReactTable,
} from "@tanstack/react-table";
import React, { createContext, type ReactNode, useMemo } from "react";

type TContextProviderType<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  meta?: TableMeta<T>;
  table: Table<T>;
  expandedComponent?: React.ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
export const Context = createContext({} as TContextProviderType<any>);

export type TContextProviderProps<T, U = undefined> = {
  children: ReactNode;
  data: T[];
  columns: ColumnDef<T, unknown>[];
  meta?: TableMeta<T>;
  columnOrder?: ColumnOrderState;
  columnVisibility?: Record<string, boolean>;
  globalFilter?: {
    filter: U;
    onChange: (data: U) => void;
    globalFilterFn?: FilterFnOption<T>;
  };
  selection?: {
    type: "multi" | "single";
    rowSelection: { [index: number]: boolean };
    setRowSelection: OnChangeFn<RowSelectionState>;
  };
};

export function ContextProvider<T, U>({
  data,
  children,
  columns,
  meta,
  columnOrder,
  columnVisibility,
  globalFilter,
  selection,
}: TContextProviderProps<T, U>) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(columns.some((col) => col.meta?.resizingElement) && {
      columnResizeMode: "onChange",
    }),
    ...((columns.some((col) => col.filterFn) || !!globalFilter) && {
      getFilteredRowModel: getFilteredRowModel(),
    }),
    state: {
      ...(!!selection && {
        rowSelection: selection.rowSelection,
      }),
      ...(!!globalFilter && {
        globalFilter: globalFilter.filter,
      }),

      columnVisibility,
      columnOrder,
    },

    ...(!!globalFilter?.onChange && {
      onGlobalFilterChange: globalFilter.onChange,
    }),

    ...(!!globalFilter && {
      globalFilterFn: globalFilter.globalFilterFn || "auto",
    }),

    ...(!!selection && {
      onRowSelectionChange: selection.setRowSelection,
      enableRowSelection: true,
      enableMultiRowSelection: selection?.type === "multi",
    }),
    meta,
  });

  const memoizedValue = useMemo<TContextProviderType<T>>(
    () => ({
      table,
      columns,
      data,
      meta,
    }),
    [table, columns, data, meta],
  );

  return (
    <Context.Provider value={{ ...memoizedValue }}>{children}</Context.Provider>
  );
}
