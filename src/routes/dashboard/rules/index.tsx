import { createFileRoute } from "@tanstack/react-router";
import { JsonViewer } from "~/shared/components";
import { Header } from "~/shared/components/Header";
import { useRules } from "~/shared/hooks/useRules";

export const Route = createFileRoute("/dashboard/rules/")({
  component: RulesRoute,
});

// eslint-disable-next-line react-refresh/only-export-components
function RulesRoute() {
  const { rulesData, isFetching } = useRules();
  return (
    <div className="flex flex-col w-full h-full">
      <Header
        title="Central de Regras e Erros"
        subtitle="Consulta de códigos, causas, regras e ações recomendadas"
      />

      <div className="px-5 py-6 w-full h-full flex-1  overflow-auto">
        {isFetching && <p>Loading...</p>}
        <JsonViewer value={rulesData} />
      </div>
    </div>
  );
}
