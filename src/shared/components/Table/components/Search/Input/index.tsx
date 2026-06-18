import {
  type FilterFnOption,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  type DetailedHTMLProps,
  type InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { Input } from "~/shared/components";
import { useTableMega } from "../../../hooks";

type TInputProps<T> = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  controlled?: {
    filter: string;
    setFilter: (data: string) => void;
  };
  globalFilterFn?: FilterFnOption<T>;
};

export function SearchInput<T>({
  controlled,
  globalFilterFn,
  ...rest
}: TInputProps<T>) {
  const { table } = useTableMega();
  const [filter, setFilter] = useState("");

  const filterInternal = controlled?.filter ? controlled.filter : filter;
  const setFilterInternal = controlled?.setFilter
    ? controlled.setFilter
    : setFilter;

  useEffect(() => {
    table.setOptions((prev) => ({
      ...prev,
      onGlobalFilterChange: controlled?.setFilter
        ? controlled.setFilter
        : setFilter,
      getFilteredRowModel: getFilteredRowModel(),
      globalFilterFn: globalFilterFn || "auto",
    }));

    table.setState((prev) => ({
      ...prev,
      globalFilter: filterInternal,
    }));
  }, [filterInternal, setFilterInternal]);

  return (
    <Input
      value={filterInternal}
      onChange={(e) => setFilterInternal(e.target.value)}
      placeholder="Procurar"
      type="search"
      {...rest}
    />
  );
}
