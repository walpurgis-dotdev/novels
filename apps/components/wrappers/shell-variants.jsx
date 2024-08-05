import * as React from "react";
import { shellVariants } from "@/themes/twv";
import { cn } from "@/utils/cn-classes";

function Shell({ className, as: Comp = "section", variant, ...props }) {
  return <Comp className={cn(shellVariants({ variant }), className)} {...props} />;
}

export { Shell, shellVariants };
