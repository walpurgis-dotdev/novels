"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/primitives/ui/sheet";
import { MenuIcon } from "lucide-react";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden block">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="py-4 space-y-4">
            <div className="px-3 py-2">
              <h2 className="px-4 mb-2 text-lg font-semibold tracking-tight">Overview</h2>
              <div className="space-y-1">
                <p>Nội dung here</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
