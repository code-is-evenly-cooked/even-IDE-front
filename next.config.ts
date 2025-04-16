import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    experimental: {
        allowedDevOrigins: ['http://192.168.123.103:3000'],
    },
};

export default nextConfig;