"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/primitives/ui/button";
import { CardContent, CardDescription } from "@/components/primitives/ui/card";
import { useOptionalControlStore } from "@/stores/use-optional-control-store";
import { cls } from "@/utils/cn-classes";

export function TextContent({ item, handleClick }) {
  const { options } = useOptionalControlStore();
  return (
    <CardContent className="my-6 space-y-4">
      {item.split(".").map((paragraph, idx, array) => {
        const trimmedParagraph = paragraph.trim();
        if (!trimmedParagraph) return null;

        return (
          <CardDescription key={idx} className="text-xl text-foreground/80 cursor-default">
            <span className={cls(options.fontSizeSchema.fontSize, options.lineHeightSchema.lineHeight)}>
              {trimmedParagraph + (idx !== array.length - 1 ? "." : "") + " "}
              <Button variant="link" className="h-0 px-0" onClick={handleClick}>
                <Icons.chat size={20} className="text-accent-foreground/60 hover:text-accent-foreground/80" />
              </Button>
            </span>
          </CardDescription>
        );
      })}
    </CardContent>
  );
}
