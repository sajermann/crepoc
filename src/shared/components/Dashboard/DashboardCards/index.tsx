import type { TDataUnknownProp } from "~/shared/types/dashboard.type";
import { managerClassNames } from "~/shared/utils/managerClassNames";

type TDashboardCardsProps = {
  dataUnknown: TDataUnknownProp[];
};
export function DashboardCards({ dataUnknown }: TDashboardCardsProps) {
  return (
    <div className="flex gap-3 w-full flex-wrap">
      {dataUnknown.map((item, index) => (
        <div
          key={item.description}
          className={managerClassNames([
            "flex flex-col gap-3 p-4 flex-1 border border-l-4 border-secondary-100 ",
            "rounded-md text-secondary bg-white min-w-45",
            { "border-l-surface-brand-02-primary": index === 0 },
            { "border-l-orange-500": index === 1 },
            { "border-l-text-danger": index === 2 },
            { "border-l-surface-brand-01-primary": index === 3 },
            { "border-l-green-500": index === 4 },
          ])}
        >
          <div className="uppercase text-xs font-semibold">
            {item.description}
          </div>
          <div
            className={managerClassNames([
              "text-2xl font-bold",
              { "text-surface-brand-02-secondary": index === 0 },
              { "text-orange-500": index === 1 },
              { "text-text-danger": index === 2 },
              { "text-surface-brand-01-secondary": index === 3 },
              { "text-green-500": index === 4 },
            ])}
          >
            {item.quantity}
          </div>
          <div className="text-xs">{item.difference}</div>
        </div>
      ))}
    </div>
  );
}
