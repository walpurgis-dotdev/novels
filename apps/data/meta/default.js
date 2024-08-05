import { fullURL } from "@/data/meta/builder";
import { siteConfig } from "@/utils/common";

export const DEFAULT_METADATA = {
  metadataBase: fullURL(),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    description: siteConfig.description,
    siteName: siteConfig.name,
    title: siteConfig.name,
    // images: [
    //   {
    //     url: "/og-image.png",
    //     width: 1280,
    //     height: 640,
    //     alt: `${siteConfig.name} Website OG Image`,
    //   },
    // ],
  },
  // twitter: {
  //   creator: siteConfig.company.twitter,
  //   site: siteConfig.handles.twitter,
  //   card: "summary_large_image",
  // },
};
