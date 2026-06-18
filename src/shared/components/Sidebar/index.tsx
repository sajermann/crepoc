import { Link } from "@tanstack/react-router";
import { LogOutIcon } from "lucide-react";
import { ELogout } from "~/shared/enums/logout.enum";
import { useUserLogged } from "~/shared/hooks";
import { Button } from "../Button";

const OPTIONS = [
  { label: "📊 Dashboard", path: "/dashboard" },
  { label: "📋 Fila de Tratamento", path: "/dashboard/treatment-queue" },
  { label: "📄 Operações", path: "/dashboard/operations" },
  { label: "↔️ Remessas e Retornos", path: "/dashboard/shiments" },
  { label: "💰 Movimentação Financeira", path: "/dashboard/transactions" },
  { label: "📅 Informativo Diário", path: "/dashboard/daily-news" },
  { label: "📚 Regras e Erros", path: "/dashboard/rules" },
];

export function Sidebar() {
  const { userLogged, logout } = useUserLogged();
  return (
    <aside className="w-60 h-full flex flex-col justify-between bg-brand-500">
      <div>
        <div className="p-4 mb-4 text-white text-lg flex flex-col items-center justify-center border-b">
          <span className="text-sm font-bold">Plataforma</span>
          <span className="text-xs text-[#dde1e7]">Operacional</span>
        </div>
        <div>
          {OPTIONS.map((option) => (
            <Link
              key={option.path}
              to={option.path}
              className="block text-white hover:bg-brand-300 text-sm p-3 mx-3 mb-1 rounded-lg transition-colors duration-300"
              activeProps={{ className: "bg-brand-300 font-bold" }}
              activeOptions={{ exact: true }}
            >
              {option.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t text-white p-4 flex flex-col gap-2">
        <div className="flex items-center">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
          <span className="text-sm">Online</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="rounded-full p-2 w-8 h-8 bg-brand-300 text-white flex items-center justify-center">
            {userLogged?.name?.[0]}
          </div>
          <div className="flex flex-col text-sm">
            <span>{userLogged?.name}</span>
            <span>{userLogged?.roles[0]}</span>
          </div>
          <div>
            <Button
              iconButton="squared"
              className="text-white border-white ml-2"
              variant="outlined"
              colorStyle="mono"
              onClick={() => logout(ELogout.HANDLE_BY_USER)}
            >
              <LogOutIcon />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
