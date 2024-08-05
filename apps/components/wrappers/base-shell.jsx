"use client";

import { useOptionalControlStore } from "@/stores/use-optional-control-store";
import { cls } from "@/utils/cn-classes";

export function BaseShell({ children }) {
  const { options } = useOptionalControlStore();

  return (
    <div className={cls("relative flex min-h-screen justify-center", options.themeColorSchema.backgroundColor)}>
      {children}
    </div>
  );
}
