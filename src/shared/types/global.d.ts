import '@tanstack/react-table';

// declare global {
//   interface Window {
//     store: UseBoundStore<Write<StoreApi<Props>, StorePersist<Props, Props>>>;
//   }
// }

type TFilterElement = {
  column: Column<T, unknown>;
  table: Table<T>;
};

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: TextAlign;
    filterElement?: (data: TFilterElement) => React.ReactNode;
    resizingElement?: (data: any) => React.ReactNode;
  }
}
