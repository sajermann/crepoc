import { Input } from "~/shared/components/Input";
import type { TSearchProps } from "../../types/search.type";

export function Search({ value, show, onChange, ...rest }: TSearchProps) {
  if (!show) return null;
  return (
    <Input
      {...rest}
      value={value}
      onChange={onChange}
      placeholder="Procurar"
      type="search"
    />
  );
}
