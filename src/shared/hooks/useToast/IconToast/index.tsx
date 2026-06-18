import { BanIcon, CheckIcon, CircleAlertIcon, InfoIcon } from "lucide-react";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { managerClassNames } from "~/shared/utils";
import { COMMONS_TYPE, type TTypeOptions } from "..";

// eslint-disable-next-line react-refresh/only-export-components
export const ICONS = {
  success: <CheckIcon />,
  error: <BanIcon />,
  warning: <CircleAlertIcon />,
  info: <InfoIcon />,
  default: null,
};

type TIconToastProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { type?: TTypeOptions };

export function IconToast({ type }: TIconToastProps) {
  return (
    <div
      className={managerClassNames({
        hidden: type === "default",
        "min-w-[1.75rem] w-7 max-w-[1.75rem]": true,
        "min-h-[1.75rem] h-7 max-h-[1.75rem]": true,
        [COMMONS_TYPE[type || "default"]]: true,
      })}
    >
      {ICONS[type || "default"]}
    </div>
  );
}
