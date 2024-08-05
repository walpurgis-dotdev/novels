"use client";

import Image from "next/image";
import Link from "next/link";
import { cls } from "@/utils/cn-classes";

export function LogoBrand({ src = "/logo.svg", alt = "", width = 160, height = 40, className }) {
  return (
    <Link href="/">
      <Image src={src} alt={alt} width={width} height={height} className={className} />
    </Link>
  );
}
