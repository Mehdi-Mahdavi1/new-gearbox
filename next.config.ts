import type { NextConfig } from "next";

/**
 * خروجی استاتیک (out/) — روی هر هاستی (cPanel، Nginx، Vercel، Netlify، Cloudflare Pages) بالا می‌آید.
 * اگر روی Vercel/Node هستید و ISR یا هدرهای سفارشی می‌خواهید، خط output را حذف کنید.
 */
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default config;
