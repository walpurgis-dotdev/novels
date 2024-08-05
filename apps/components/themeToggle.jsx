"use client";

import { Button } from "@/components/primitives/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/primitives/ui/dropdown-menu";
import { useTheme } from "next-themes";

import { Icons } from "./icons";

export function ThemeToggle({}) {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9 shrink-0 rounded-xl bg-background">
          <Icons.sun className="h-[1rem] w-[1rem] dark:hidden" />
          <Icons.moon className="h-[1rem] w-[1rem] hidden dark:block" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Sáng</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Tối</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>Hệ thống</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
