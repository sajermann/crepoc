import { type ColumnDef } from "@tanstack/react-table";
import { Td } from "../Td";
import { Tr } from "../Tr";

type Props<T> = {
  data: T[];
  isLoading?: boolean;
  columns: ColumnDef<T>[];
};
export function NoData<T>({ data, isLoading, columns }: Props<T>) {
  if (data.length !== 0 || isLoading) {
    return null;
  }

  return (
    <Tr>
      <Td colSpan={Object.keys(columns).length}>Sem dados</Td>
    </Tr>
  );
}
