import '@tanstack/react-table';

declare module '@tanstack/table-core' {
  interface ColumnMeta {
    align?: any;
    filterElement?: (data: any, dataB: any) => React.ReactNode;
    cellEdit?: (data: any) => React.ReactNode;
  }
}
