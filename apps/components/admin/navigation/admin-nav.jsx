"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/icons";
import { useSidebar } from "@/hooks/use-sidebar";
import { cls } from "@/utils/cn-classes";

export function AdminNav({ items }) {
  const path = usePathname();
  const { isOpen } = useSidebar();

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, idx) => {
        const Icon = Icons[item.icon || "arrowRight"];
        const isDisabled = item.disabled;
        const isActive = path === item.href;

        return (
          item.href && (
            <Link key={idx} href={isDisabled ? "/" : item.href}>
              <span
                className={cls(
                  "group flex items-center rounded-md px-3 h-10 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  isActive && "bg-accent",
                  isDisabled && "cursor-not-allowed opacity-80",
                  !isOpen && "justify-center",
                )}
              >
                <Icon className={cls("h-4 w-4", isOpen && "mr-2")} />
                <span className={!isOpen ? "hidden" : ""}>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
