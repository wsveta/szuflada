import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mywyuwdtsribhouvdkiv.supabase.co",
      },
    ],
  },
};

export default nextConfig;

//додати валідацію полів, 