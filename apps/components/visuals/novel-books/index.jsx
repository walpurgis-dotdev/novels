import * as React from "react";
import Image from "next/image";
import { cls } from "@/utils/cn-classes";
import { tv } from "tailwind-variants";

const bookVariants = tv({
  base: "group relative flex items-center flex-shrink-0 h-auto rounded-lg overflow-hidden",
  variants: {
    size: {
      zs: "w-[54px] h-[72px] rounded-md",
      ys: "w-[64px] h-[85px] rounded-lg",
      xs: "w-[80px] h-[106px] rounded-lg",
      sm: "w-[96px] h-[128px] rounded-lg",
      md: "w-[120px] h-[160px] rounded-lg",
      lg: "w-[180px] h-[240px] rounded-xl",
      xl: "w-[200px] h-[280px] rounded-xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const speedVariants = tv({
  base: "transition",
  variants: {
    hover: {
      scale105: "group-hover:scale-105",
      scale110: "group-hover:scale-110",
    },
    speed: {
      200: "duration-200",
      300: "duration-300",
      400: "duration-400",
      500: "duration-500",
      700: "duration-700",
    },
  },
  defaultVariants: {
    hover: "scale110",
    speed: "500",
  },
});

export const NovelBooks = React.forwardRef(
  ({ size, speed, hover, src, alt = "", className, width = 600, height = 800, ...props }, ref) => (
    <div ref={ref} className={cls(bookVariants({ size }), className)} {...props}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ width: "100%", height: "100%" }}
        className={cls("object-cover object-center", speedVariants(speed, hover))}
      />
    </div>
  ),
);
