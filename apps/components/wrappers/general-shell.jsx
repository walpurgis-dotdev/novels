import { cls } from "@/utils/cn-classes";

export function GeneralShell({ children, className }) {
  return <main className={cls("flex min-h-screen flex-1 flex-col pt-16", className)}>{children}</main>;
}
