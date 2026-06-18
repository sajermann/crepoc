import type { DetailedHTMLProps, TdHTMLAttributes } from "react";
import { TdDefaultInternal } from "./TdDefaultInternal";
import { TdWithEllipsis } from "./TdWithEllipsis";

type TTdProps = DetailedHTMLProps<
  TdHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

export function Td({ ...rest }: TTdProps) {
  // eslint-disable-next-line no-extra-boolean-cast
  return !!rest?.title ? (
    <TdWithEllipsis {...rest} />
  ) : (
    <TdDefaultInternal {...rest} />
  );
}
