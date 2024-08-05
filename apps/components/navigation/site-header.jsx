"use client";

import { LogoBrand } from "@/components/visuals/logo/logo-brand";
import { Navbar } from "@/components/wrappers/navbar";
import { Shell } from "@/components/wrappers/shell-variants";
import { useSticky } from "@/hooks/use-sticky";
import { siteConfig } from "@/utils/common";

import { ThemeToggle } from "../themeToggle";
import { CreateNovel } from "./create-novel";
import { ExtendNav } from "./navs/extend-nav";
import { MainNav } from "./navs/main-nav";
import { MobileNav } from "./navs/mobile-nav";
import { Search } from "./searchs/search";
import { UserMenu } from "./user-menu";

export function SiteHeader() {
  const { isSticky } = useSticky();
  return (
    <Shell as="div" className="relative z-50 py-0 md:py-0">
      <Navbar isSticky={isSticky}>
        <LogoBrand src="/logo.svg" />
        <MainNav items={siteConfig.mainNav} />
        <MobileNav items={siteConfig.mainNav} />
        <div className="flex items-center justify-end flex-1 h-full space-x-3">
          <Search />
          {/* <CommandSearch /> */}
          <ExtendNav items={siteConfig.extendNav} />
          <CreateNovel isSticky={isSticky} />
          <UserMenu />
          <ThemeToggle />
        </div>
      </Navbar>
    </Shell>
  );
}
