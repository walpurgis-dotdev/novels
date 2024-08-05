"use client";

import * as React from "react";
import Link from "next/link";
import { cls } from "@/utils/cn-classes";

import { Icons } from "../icons";

export function AddressBar({ items }) {
  return (
    <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
      <Link href={"/dashboard"} className="overflow-hidden text-ellipsis whitespace-nowrap">
        Dashboard
      </Link>
      {items?.map((item, index) => (
        <React.Fragment key={item.title}>
          <Icons.chevronRight className="h-4 w-4" />
          <Link
            href={item.link}
            className={cls(
              "font-medium",
              index === items.length - 1 ? "text-foreground pointer-events-none" : "text-muted-foreground",
            )}
          >
            {item.title}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}
