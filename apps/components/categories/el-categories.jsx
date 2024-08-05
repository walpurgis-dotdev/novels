"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/components/primitives/link-button";
import { Separator } from "@/components/primitives/ui/separator";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { siteConfig } from "@/utils/common";

import { Card } from "../primitives/ui/card";
import { MainEl } from "./sections/main-el";
import { MobileEl } from "./sections/mobile-el";

export function ElCategories() {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  const { contentRef, showPrevButton, showNextButton, handleScroll } = useScrollPosition();

  return (
    <Card className="flex border-none shadow shadow-white/10 px-6 py-3 md:py-4">
      <div className="hidden md:flex items-center">
        {siteConfig.menu.map((category) => (
          <Link key={category.label} href={category.href} size="sm" className="group pl-0 space-x-0.5">
            <em className="group-hover:animate-jump">{category.icon}</em>
            <span>{category.label}</span>
          </Link>
        ))}
        <Separator orientation="vertical" className="h-3 mx-2 " />
      </div>
      <MobileEl />
      <MainEl
        item={siteConfig.categories}
        contentRef={contentRef}
        showPrevButton={showPrevButton}
        showNextButton={showNextButton}
        handleScroll={handleScroll}
        isActive={isActive}
      />
      <div className="flex items-center">
        <Separator orientation="vertical" className="h-3 mx-2 " />
        <Link href="/categories" size="sm" className="pr-0 text-foreground/60 hover:text-foreground">
          <span>Trung tâm trợ giúp</span>
        </Link>
        <Link href="/#" size="sm" className="pr-0 group space-x-0.5 text-foreground/60 hover:text-foreground">
          <em className="group-hover:animate-jump">🛠️</em>
          <span>Đang phát triển</span>
        </Link>
      </div>
    </Card>
  );
}
