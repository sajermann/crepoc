import { createFileRoute, Link } from "@tanstack/react-router";
import { DownloadIcon, TriangleAlertIcon } from "lucide-react";
import { useState } from "react";
import { Button, JsonViewer } from "~/shared/components";
import { Header } from "~/shared/components/Header";
import { useDailyNews } from "~/shared/hooks/useDailyNews";
import { managerClassNames } from "~/shared/utils";

export const Route = createFileRoute("/dashboard/daily-news/")({
  component: DailyNewsRoute,
});

// eslint-disable-next-line react-refresh/only-export-components
function DailyNewsRoute() {
  const { dailyNewsData } = useDailyNews();
  const [referenceDate] = useState(new Date());
  return (
    <div>
      <Header
        title="Informativo Diário"
        subtitle="Visão macro da carteira e comprometimento de limites"
        action={[
          {
            icon: <DownloadIcon />,
            title: "Exportar resumo",
            onClick: () => console.log("Exportar resumo"),
          },
        ]}
      />

      <div className="px-5 py-6 w-full h-full flex-1 overflow-auto gap-2 flex flex-col">
        <span>Indicadores do dia - {referenceDate.toLocaleDateString()}</span>
        <div className="flex gap-4 mt-4 flex-wrap">
          {dailyNewsData?.indicators?.map((indicator, index) => (
            <div
              key={`${indicator.description}-${indicator.subtitle}`}
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
                {indicator.title}
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
                {indicator.subtitle}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs">{indicator.description}</div>
                <div
                  className={managerClassNames([
                    "p-2 text-xs text-center rounded-md",
                    { "bg-feedback-success": indicator.status === "Ok" },
                    { "bg-feedback-warning": indicator.status === "Atenção" },
                    { "bg-feedback-danger": indicator.status === "Crítico" },
                  ])}
                >
                  {indicator.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <span className="font-bold text-sm">Leitura Executiva</span>
          <div className="p-4 border rounded-md">
            <span className="text-sm">{dailyNewsData?.executiveReading}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-2 font-bold">
            <TriangleAlertIcon className="w-4 h-4" /> Pontos de atenção
          </span>
          {dailyNewsData?.warningPoints?.map((item) => (
            <div
              key={item.description}
              className={managerClassNames([
                "p-2 px-4 border rounded-md flex items-center justify-between",
                { "bg-feedback-information": item.severity === "Info" },
                { "bg-feedback-warning": item.severity === "Warning" },
                { "bg-feedback-danger": item.severity === "Error" },
              ])}
            >
              <span className="flex items-center gap-2">
                <TriangleAlertIcon className="w-4 h-4" /> {item.description}
              </span>
            </div>
          ))}
        </div>
        <div>
          <span className="font-bold">Aprofundar Investigação</span>
          <div className="flex gap-2">
            <Link to="/dashboard">
              <Button size="small" colorStyle="inverse" variant="outlined">
                Dashboard
              </Button>
            </Link>
            <Link to="/dashboard/transactions">
              <Button size="small" colorStyle="inverse" variant="outlined">
                Financeiro
              </Button>
            </Link>
            <Link to="/dashboard/shiments">
              <Button size="small" colorStyle="inverse" variant="outlined">
                Remessas
              </Button>
            </Link>
          </div>
        </div>
        <span>Json Data</span>
        <JsonViewer value={dailyNewsData} collapsed />
      </div>
    </div>
  );
}
