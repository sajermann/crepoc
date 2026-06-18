import { Default as DefaultInternal, type TDefaultProps } from "./Default";
import { Expand } from "./Expand";

function Default<T>(props: TDefaultProps<T>) {
  return <DefaultInternal {...props} />;
}

Default.Default = DefaultInternal;
Default.Expand = Expand;

export type { TDefaultProps };
export { Default };
