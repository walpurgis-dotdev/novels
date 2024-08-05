import Image from "next/image";
import { cls } from "@/utils/cn-classes";
import { tv } from "tailwind-variants";

const adsVariants = tv({
  base: "w-full h-full relative overflow-hidden rounded-xl",
  variants: {
    size: {
      20: "h-[5rem]",
      30: "h-[7.2rem]",
      40: "h-[10rem]",
      50: "h-[12.5rem]",
    },
  },
  defaultVariants: {
    size: "20",
  },
});

export function Ads({ src, alt = "", size, className, ...props }) {
  return (
    <div className={cls(adsVariants({ size }), className)} {...props}>
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
