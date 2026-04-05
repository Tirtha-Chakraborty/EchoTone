/** @type {import('next').NextConfig} */
const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:8000";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/echotone/:path*",
        destination: `${backendUrl.replace(/\/$/, "")}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
