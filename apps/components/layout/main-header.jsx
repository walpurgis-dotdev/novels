"use client";

import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { UserMenu } from "@/components/navigation/user-menu";
import { ThemeToggle } from "@/components/themeToggle";
import { LogoBrand } from "@/components/visuals/logo/logo-brand";
import { cls } from "@/utils/cn-classes";

export function MainHeader() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-6">
        <div className="hidden lg:block">
          <LogoBrand className="dark:invert" />
        </div>
        <div className={cls("block lg:!hidden")}>
          <MobileSidebar />
        </div>
        <div className="flex items-center gap-2">
          <UserMenu />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
