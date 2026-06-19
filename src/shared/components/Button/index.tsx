import type { ButtonHTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const buttonVariants = tv({
  slots: {
    buttonPropsInternal: [
      "w-fit h-fit border-0",
      "cursor-pointer disabled:cursor-not-allowed! rounded-lg",
      "outline-none",
      "pressed:",
      "active:opacity-60 ring-0 hover:opacity-70",
      "disabled:opacity-40 disabled:active:opacity-60 disabled:hover:opacity-50",
      "transition-all duration-500",
    ],
  },
  variants: {
    color: {
      primary: {
        buttonPropsInternal: [
          "bg-surface-brand-01-primary text-brand-content-01-primary ",
        ],
      },
      secondary: {
        buttonPropsInternal: [
          "bg-surface-brand-02-primary text-brand-content-01-primary",
        ],
      },
      inverse: {
        buttonPropsInternal: [""],
      },
      link: {
        buttonPropsInternal: ["underline"],
      },
    },
    variant: {
      default: {
        buttonPropsInternal: [""],
      },
      outlined: {
        buttonPropsInternal: ["bg-transparent border border-black"],
      },
      option: {
        buttonPropsInternal: [
          "bg-transparent border-0 ring-0 focus:ring-0 hover:opacity-50",
        ],
      },
    },
    size: {
      default: {
        buttonPropsInternal: [
          "min-w-21 min-h-12 text-[17px] leading-6 py-3 px-6",
        ],
      },
      small: {
        buttonPropsInternal: [
          "min-w-16.5 min-h-10 text-sm font-bold leading-6 py-2 px-4",
        ],
      },
    },
  },
  compoundSlots: [
    {
      slots: ["buttonPropsInternal"],
      color: "primary",
      variant: ["outlined"],
      className: "border-surface-brand-01-primary",
    },
    {
      slots: ["buttonPropsInternal"],
      color: "secondary",
      variant: ["outlined"],
      className:
        "border-surface-brand-02-primary text-surface-brand-02-primary",
    },
    {
      slots: ["buttonPropsInternal"],
      color: "inverse",
      variant: ["outlined"],
      className: "text-brand-content-01-primary",
    },
    {
      slots: ["buttonPropsInternal"],
      color: "link",
      variant: ["outlined"],
      className: "border-0 text-brand-content-01-primary",
    },
  ],

  defaultVariants: {
    color: "primary",
    variant: "default",
    size: "default",
  },
});

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outlined";
  colorStyle?: "primary" | "secondary" | "inverse" | "link";
  size?: "default" | "small";
  type?: "submit" | "reset" | "button";
}

function Button({ children, colorStyle, variant, size, ...rest }: IButton) {
  const { buttonPropsInternal } = buttonVariants({
    color: colorStyle,
    variant,
    size,
  });

  return (
    <button
      {...rest}
      className={buttonPropsInternal({
        className: rest.className,
      })}
    >
      {children}
    </button>
  );
}

export { Button };
