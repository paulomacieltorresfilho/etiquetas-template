/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["puppeteer-core", "@sparticuz/chromium-min"],
  },
  env: {
    BASE_URL: process.env.BASE_URL
  }
};

export default nextConfig;
