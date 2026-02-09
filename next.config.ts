import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ecommerce.routemisr.com"], // هنا حطي أي دومين خارجي هتستخدميه للصور
  },
};

export default nextConfig;
