"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/primitives/ui/aspect-ratio";

export function Banner() {
  return (
    <div className="relative z-0 h-[12rem] max-h-[12rem] w-full overflow-hidden -mt-16">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <Image
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          fill
          className="object-cover"
        />
      </AspectRatio>
      <div className="absolute top-0 bottom-0 z-10 w-full">
        <div className="flex items-end justify-between h-full max-w-[1200px] mx-auto">
          <Image
            className="relative mb-6 drop-shadow-[0_0_0.3rem_#ffffff70] invert"
            style={{ width: "180px", height: "auto" }}
            src="/text_logo.svg"
            alt="Next.js Logo"
            width={180}
            height={100}
            priority
          />
        </div>
      </div>
    </div>
  );
}
