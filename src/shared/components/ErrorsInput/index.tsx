import { type DetailedHTMLProps, forwardRef, type HTMLAttributes } from "react";
import { managerClassNames } from "~/shared/utils";

type TErrorsInput = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  errors?: string[];
};
export const ErrorsInput = forwardRef<HTMLDivElement, TErrorsInput>(
  ({ className, errors, ...rest }, ref) => {
    if (!errors) return null;
    return (
      <div
        {...rest}
        ref={ref}
        className={managerClassNames([
          { "flex flex-col text-red-500 text-sm": true },
          { [className as string]: className },
        ])}
      >
        {errors && errors?.map((error) => <span key={error}>{error}</span>)}
      </div>
    );
  }
);
