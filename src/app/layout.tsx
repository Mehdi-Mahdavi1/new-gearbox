import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileBar } from "@/components/MobileBar";
import { businessLd } from "@/lib/seo";
import { site } from "@/lib/site";

// فونت وزیرمتن (متغیر) — خودمیزبان، فقط دو زیرمجموعه‌ی لازم؛ بدون درخواست به سرور بیرونی
const faFont = localFont({
  src: "./fonts/vazirmatn-arabic.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-fa",
  adjustFontFallback: false,
  fallback: ["Tahoma", "system-ui", "sans-serif"],
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+0897-08E1,U+08E3-08FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC",
    },
  ],
});

const latinFont = localFont({
  src: "./fonts/vazirmatn-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-latin",
  preload: false, // فقط اگر متن لاتین (مثل CVT) در صفحه باشد دانلود می‌شود
  adjustFontFallback: false,
  fallback: ["Tahoma", "system-ui", "sans-serif"],
  declarations: [
    {
      prop: "unicode-range",
      value: "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-200B,U+200F-2010,U+2012-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.shortName}` },
  description: site.tagline,
  applicationName: site.name,
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  ...(site.gscVerification ? { verification: { google: site.gscVerification } } : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c1117",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={`${faFont.variable} ${latinFont.variable}`}>
      <body>
        <a className="skip" href="#main">
          پرش به محتوای اصلی
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <JsonLd data={businessLd()} />
      </body>
    </html>
  );
}
