import { Toaster } from "@/components/toast-custom";
import { DEFAULT_METADATA } from "@/data/meta";
import { AppProvider } from "@/providers/app-provider";
import { NextThemesProvider } from "@/providers/theme-provider";

import "@/styles/globals.css";

import { cookies } from "next/headers";
import { fontRoboto } from "@/styles/fonts";
import { cls } from "@/utils/cn-classes";
import { siteConfig } from "@/utils/common";

export const metadata = {
  ...DEFAULT_METADATA,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  openGraph: {
    ...DEFAULT_METADATA.openGraph,
    url: siteConfig.url.base,
  },
};

export default function RootLayout({ children }) {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("access_token")?.value;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cls("min-h-screen bg-background font-sans antialiased", fontRoboto.className)}>
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AppProvider token={accessToken}>{children}</AppProvider>
          <Toaster />
        </NextThemesProvider>
      </body>
    </html>
  );
}
