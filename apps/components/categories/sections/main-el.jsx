import Link from "next/link";
import { Icons } from "@/components/icons";
import { Button } from "@/components/primitives/ui/button";
import { cls } from "@/utils/cn-classes";

export function MainEl({ item, contentRef, showPrevButton, showNextButton, handleScroll, isActive }) {
  return (
    <section className="relative flex-grow hidden md:flex items-center">
      <div
        ref={contentRef}
        className="flex flex-nowrap overflow-x-auto"
        style={{
          scrollbarWidth: "none",
          WebkitScrollbar: "none",
        }}
      >
        {item.map((i) => (
          <Link
            key={i.id}
            href={i.href || "/"}
            className={cls(
              "inline-flex items-center justify-center shrink-0 hover:bg-border rounded-md h-7 px-3",
              isActive(i.href) && "bg-border",
            )}
          >
            {i.label}
          </Link>
        ))}
      </div>
      {/* Previous */}
      {showPrevButton && (
        <div
          className={cls(
            "absolute inset-y-0 left-0 flex items-center justify-start w-20",
            "bg-gradient-to-r from-white via-white to-transparent",
            "dark:from-background dark:via-background dark:to-transparent",
          )}
        >
          <Button size="icon" variant="ghost" className="w-7 h-7 rounded-full " onClick={() => handleScroll("left")}>
            <Icons.chevronLeft size={16} />
          </Button>
        </div>
      )}
      {/* Next */}
      {showNextButton && (
        <div
          className={cls(
            "absolute inset-y-0 right-0 flex items-center justify-end w-20",
            "bg-gradient-to-l from-white via-white to-transparent",
            "dark:from-background dark:via-background dark:to-transparent",
          )}
        >
          <Button size="icon" variant="ghost" className="w-7 h-7 rounded-full " onClick={() => handleScroll("right")}>
            <Icons.chevronRight size={16} />
          </Button>
        </div>
      )}
    </section>
  );
}
