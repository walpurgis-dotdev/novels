import { JetBrains_Mono as FontMono, Inter as FontSans, Gochi_Hand, Roboto } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontRoboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["vietnamese"],
  display: "swap",
});

export const fontGochiHand = Gochi_Hand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gochi-hand",
});
