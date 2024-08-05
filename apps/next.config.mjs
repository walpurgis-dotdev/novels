/**
 * The whitelist list of domains,
 * that are allowed to show media.
 */

import withPlaiceholder from "@plaiceholder/next";

const hostnames = [
  "plus.unsplash.com",
  "images.unsplash.com",
  "res.cloudinary.com",
  "revo.zongheng.com",
  "bossaudioandcomic-1252317822.image.myqcloud.com",
  "img2.qidian.com",
  "images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com",
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: hostnames.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },

  eslint: { ignoreDuringBuilds: true },
};

export default withPlaiceholder(nextConfig);
