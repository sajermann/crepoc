import { managerClassNames } from "~/shared/utils";
import type { TSearchProps } from "../../types/search.type";
import { Search } from "../Search";

type THeaderProps = {
  searchProps: TSearchProps;
};

export function Header({ searchProps }: THeaderProps) {
  if (!searchProps || !searchProps?.show) return null;
  return (
    <div className="grid grid-cols-12 gap-2 w-full mb-1 items-center">
      <Search
        className={managerClassNames({
          "col-span-12 sm:col-span-6": !!searchProps,
          "col-span-12": !searchProps,
        })}
        {...searchProps}
      />
    </div>
  );
}
