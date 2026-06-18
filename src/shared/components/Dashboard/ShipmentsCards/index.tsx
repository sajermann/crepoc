import type { TShipment } from "~/shared/types/dashboard.type";
import { managerClassNames } from "~/shared/utils/managerClassNames";

type TShipmentsCardsProps = {
  shipments: TShipment[];
};
export function ShipmentsCards({ shipments }: TShipmentsCardsProps) {
  return (
    <div className="flex gap-3 w-full">
      {shipments.map((item) => (
        <div
          key={item.id}
          className={managerClassNames([
            "flex flex-col gap-3 p-4 flex-1 border border-l-4 border-l-black",
            " border-secondary-100 rounded-md bg-white",
          ])}
        >
          <div className="flex justify-between items-center">
            <span className="uppercase text-base font-bold">
              {item.shipmentId}
            </span>
            <div
              className={managerClassNames([
                "py-1 px-2 text-xs rounded border",
                {
                  "bg-green-100 text-green-500 border-green-400":
                    item.status === "Processada",
                },
                {
                  "bg-yellow-100 text-yellow-500 border-yellow-400":
                    item.status === "Em análise",
                },
                {
                  "bg-red-100 text-red-500 border-red-400":
                    item.status === "Rejeitada",
                },
              ])}
            >
              {item.status}
            </div>
          </div>
          <span className="text-xs">
            {new Date(item.date).toLocaleDateString()}
          </span>
          <div className="flex gap-4 items-center">
            <span className="text-xs">
              <strong>{item.registryCount}</strong> registros
            </span>
            <span
              className={managerClassNames([
                "uppercase text-xs",
                { " text-green-500 ": item.status === "Processada" },
                { " text-yellow-500": item.status === "Em análise" },
                { " text-red-500 ": item.status === "Rejeitada" },
              ])}
            >
              {item.errorsCount} erros
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
