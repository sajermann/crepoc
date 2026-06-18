import { createFileRoute } from "@tanstack/react-router";
import { DownloadIcon } from "lucide-react";
import { JsonViewer } from "~/shared/components";
import { Header } from "~/shared/components/Header";
import { useDailyNews } from "~/shared/hooks/useDailyNews";

export const Route = createFileRoute("/dashboard/daily-news/")({
  component: DailyNewsRoute,
});

// eslint-disable-next-line react-refresh/only-export-components
function DailyNewsRoute() {
  const { dailyNewsData, isFetching } = useDailyNews();
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

      <div className="px-5 py-6 w-full h-full flex-1  overflow-auto">
        {isFetching && <p>Loading...</p>}
        <JsonViewer value={dailyNewsData} />
      </div>
    </div>
  );
}
