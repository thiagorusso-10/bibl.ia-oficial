import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@clerk/nextjs", "@clerk/shared", "@clerk/backend"],
};

export default nextConfig;
