import { cls } from "@/utils/cn-classes";

export function Navbar({ children, isSticky, className }) {
  return (
    <header className="absolute top-0 z-[1000] w-full">
      <nav
        className={cls(
          "flex w-full h-[3.5rem]",
          isSticky ? "fixed inset-x-0 bg-white dark:bg-background shadow-md" : "bg-transparent",
          className,
        )}
      >
        <div className={cls("flex items-center space-x-4 w-full", isSticky && "max-w-[1200px] mx-auto")}>
          {children}
        </div>
      </nav>
    </header>
  );
}
