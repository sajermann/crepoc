import { Default, type TDefaultProps } from "./Default";

function Rows<T>(props: TDefaultProps<T>) {
  return <Default {...props} />;
}

Rows.Default = Default;

export { Rows };

// TODO: Verificar questão do Default, se nao colocar ele funciona do jeito que eu
// queria, pegando ele automatico, mas se eu coloco o Expand, preciso colocar o
// Default antes, video pages/TableMega/ExpandRow
