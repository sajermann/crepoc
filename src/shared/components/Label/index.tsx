import { forwardRef, type LabelHTMLAttributes } from "react";
import { tv } from "tailwind-variants";
import { removeProp } from "~/shared/utils";

type TLabel = React.DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> & {
  isError?: boolean;
};

const label = tv({
  slots: {
    labelPropsInternal: [
      "text-sm text-gray-500",
      "transition-all duration-500",
    ],
  },
  variants: {
    color: {
      primary: {
        labelPropsInternal:
          "group-hover:text-surface-brand-02-primary group-focus-within:text-surface-brand-02-primary",
      },
      error: {
        labelPropsInternal: "text-text-danger",
      },
      normal: {
        labelPropsInternal: "",
      },
    },
  },

  defaultVariants: {
    color: "normal",
  },
});

export const Label = forwardRef<HTMLLabelElement, TLabel>((props, ref) => {
  const { labelPropsInternal } = label({
    color: props?.isError ? "error" : "primary",
  });
  return (
    <label
      {...removeProp(props, ["isError"])}
      ref={ref}
      className={labelPropsInternal({
        class: props?.className,
      })}
    />
  );
});
