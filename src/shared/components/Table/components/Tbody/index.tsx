import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { managerClassNames } from "~/shared/utils";

type TTbodyProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
> & {
  isLoading?: boolean;
};

export function Tbody({ isLoading, ...rest }: TTbodyProps) {
  return (
    <tbody
      {...rest}
      className={managerClassNames({
        "[&>*:nth-child(odd)]:bg-[#f2f2f2]": true,
        "opacity-5": isLoading,
        "opacity-100": !isLoading,
        [rest.className as string]: !!rest.className,
      })}
    />
  );
}
