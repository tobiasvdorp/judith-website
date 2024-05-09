/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * This setting is required for Builder's Visual Editor to work with your site.
   */
  transpilePackages: ["@builder.io/sdk-react-nextjs"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.builder.io",
      },
    ],
  },
};

module.exports = nextConfig;
