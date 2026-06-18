import { createFileRoute } from "@tanstack/react-router";
import { DownloadIcon } from "lucide-react";
import { Header } from "~/shared/components/Header";
import { JsonViewer } from "~/shared/components/JsonViewer";
import { useTransactions } from "~/shared/hooks/useTransactions";

export const Route = createFileRoute("/dashboard/transactions/")({
  component: TransactionsRoute,
});

// eslint-disable-next-line react-refresh/only-export-components
function TransactionsRoute() {
  const { transactionsData, isFetching } = useTransactions();
  return (
    <div>
      <Header
        title="Movimentação Financeira"
        subtitle="Controle de valores esperados, pagos e divergências"
        action={[
          {
            icon: <DownloadIcon />,
            title: "Exportar extrato",
            onClick: () => console.log("Exportar extrato"),
          },
        ]}
      />
      <div className="px-5 py-6 w-full h-full flex-1  overflow-auto">
        {isFetching && <p>Loading...</p>}
        <JsonViewer value={transactionsData} />
      </div>
    </div>
  );
}
