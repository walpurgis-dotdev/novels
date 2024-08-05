/**
 * This file is used to define the Tailwind CSS variants that can be used in the component.
 *
 * Used in other components
 *
 * Properties:
 * ...
 *
 * @see https://github.com/nextui-org/tailwind-variants
 */

import { tv } from "tailwind-variants";

export const labelVariants = tv({
  base: "leading-7 tracking-tight",
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export const buttonVariants = tv({
  base: "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background/5 hover:bg-background/10",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary/80",
    },
    size: {
      default: "h-9 px-4 py-2",
      sm: "h-7 rounded-md px-3",
      lg: "h-10 rounded-lg px-6",
      icon: "h-10 w-10 rounded-lg",
      chip: "h-7 w-7 rounded-md",
    },
  },
  defaultVariants: {
    variant: "link",
  },
});

export const shellVariants = tv({
  base: "grid items-center gap-8 pb-8 pt-6 md:py-8",
  variants: {
    variant: {
      default: "max-w-[1200px] mx-auto",
      centered: "container flex h-[100dvh] max-w-2xl flex-col justify-center",
      full: "container flex h-[100dvh] max-w-none",
      none: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
