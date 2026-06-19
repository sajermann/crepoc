import { forwardRef, useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import type { TInput } from "./Types/TInput";
import { onChangeCustom, preOnChange } from "./Utils";

const input = tv({
  slots: {
    inputPropsInternal: [
      "group outline-none focus:ring-0 border border-black h-11 py-1 px-2 rounded w-full bg-transparent",
      "transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-text-placeholder",
      "text-black",
    ],
  },
  variants: {
    color: {
      primary: {
        inputPropsInternal:
          "focus:ring-surface-brand-02-primary group-hover:border-surface-brand-02-primary focus:border-surface-brand-02-primary",
      },
      error: {
        inputPropsInternal:
          "focus:ring-text-danger group-hover:border-text-danger focus:border-text-danger",
      },

      normal: {
        inputPropsInternal: "",
      },
    },
  },

  defaultVariants: {
    color: "normal",
  },
});

export const Input = forwardRef<HTMLInputElement, TInput>(
  (
    { iserror, onBeforeChange, onChange, debounce, className, ...rest },
    ref,
  ) => {
    const [event, setEvent] = useState<React.ChangeEvent<HTMLInputElement>>();
    const { inputPropsInternal } = input({
      color: iserror ? "error" : "primary",
    });

    useEffect(() => {
      const timer = setTimeout(() => {
        if (debounce && event) {
          onChangeCustom({
            e: event,
            onBeforeChange,
            onChange,
          });
        }
      }, debounce);

      return () => clearTimeout(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [event]);

    return (
      <input
        {...rest}
        ref={ref}
        className={inputPropsInternal({
          class: className,
        })}
        onChange={(e) =>
          preOnChange({
            e,
            setEvent,
            debounce,
            onBeforeChange,
            onChange,
          })
        }
      />
    );
  },
);
