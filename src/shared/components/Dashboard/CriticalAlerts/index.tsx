import type { TAlert } from "~/shared/types/dashboard.type";
import { managerClassNames } from "~/shared/utils/managerClassNames";

type TCriticalAlertsProps = {
  alerts: TAlert[];
};
export function CriticalAlerts({ alerts }: TCriticalAlertsProps) {
  return (
    <div className="flex flex-col gap-3 w-full ">
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold">⚠️ Alertas Críticos</span>
        <div className="py-1 px-2 bg-gray-300 w-max rounded-sm text-xs">
          {alerts.length}
        </div>
      </div>
      {alerts.map((item) => (
        <div
          key={item.description}
          className={managerClassNames([
            "flex gap-3 p-4 flex-1 justify-between border border-secondary-100 rounded-md",
            { "bg-yellow-200 text-yellow-500": item.severity === "low" },
            { "bg-orange-200 text-orange-500": item.severity === "medium" },
            { "bg-red-200 text-red-500": item.severity === "high" },
          ])}
        >
          <span className="uppercase text-xs font-semibold">
            ⚠️ {item.description}
          </span>

          <span className="uppercase text-xs font-semibold">
            {new Date(item.date).toLocaleTimeString()}
          </span>
        </div>
      ))}
    </div>
  );
}
