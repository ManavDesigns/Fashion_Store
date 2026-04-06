/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Bypass Next.js image optimization for all images — prevents the
    // "resolved to private ip" error when Bagisto runs on localhost.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "",
        pathname: "/**",
      },
      {
        // Allow Unsplash for hero images
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        // Wildcard for any future CDN
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },

  // Allow the local network IP to access Next.js dev server
  allowedDevOrigins: ["192.168.0.79"],
};

export default nextConfig;
