import * as React from "react";
import { Link } from "@/components/primitives/link-button";
import { cls } from "@/utils/cn-classes";

export const ListItem = React.forwardRef(({ label, href, className, children, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      href={href}
      className={cls(
        "block select-none space-y-1 rounded-md px-3 py-1 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className,
      )}
      {...props}
    >
      <div className="text-sm font-medium leading-none">{label}</div>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
    </Link>
  );
});
