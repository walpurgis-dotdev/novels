"use client";

import { Card } from "@/components/primitives/ui/card";
import { LogoBrand } from "@/components/visuals/logo/logo-brand";

import { UserMenu } from "../user-menu";

export function ChapterNav() {
  return (
    <Card className="flex items-center justify-between border-none bg-transparent shadow-none rounded-none py-4 px-6">
      <LogoBrand className="dark:invert" />
      <div>
        <UserMenu />
      </div>
    </Card>
  );
}
