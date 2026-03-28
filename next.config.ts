import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "4004",
                pathname: "/uploads/**",
            },
        ],
        dangerouslyAllowLocalIP: true
    },
};

export default nextConfig;