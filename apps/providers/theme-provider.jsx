"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";

export function NextThemesProvider({ children, ...props }) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}
