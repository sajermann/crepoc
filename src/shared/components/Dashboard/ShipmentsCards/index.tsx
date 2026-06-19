import type { TShipment } from "~/shared/types/dashboard.type";
import { managerClassNames } from "~/shared/utils/managerClassNames";

type TShipmentsCardsProps = {
  shipments: TShipment[];
};
export function ShipmentsCards({ shipments }: TShipmentsCardsProps) {
  return (
    <>
      <span className="text-sm font-bold">Remessas do dia</span>
      <div className="flex gap-3 w-full flex-wrap">
        {shipments.map((item) => (
          <div
            key={item.id}
            className={managerClassNames([
              "flex flex-col gap-3 p-4 flex-1 border border-l-4 border-l-black",
              "border-secondary-100 rounded-md bg-white min-w-45",
            ])}
          >
            <div className="flex justify-between items-center">
              <span className="uppercase text-base font-bold">
                {item.shipmentId}
              </span>
              <div
                className={managerClassNames([
                  "py-1 px-2 text-xs rounded border  text-white",
                  {
                    "bg-feedback-success ": item.status === "Processada",
                  },
                  {
                    "bg-feedback-warning": item.status === "Em análise",
                  },
                  {
                    "bg-feedback-danger": item.status === "Rejeitada",
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
                  { " text-feedback-success": item.status === "Processada" },
                  { " text-feedback-warning": item.status === "Em análise" },
                  { " text-feedback-danger ": item.status === "Rejeitada" },
                ])}
              >
                {item.errorsCount} erros
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
