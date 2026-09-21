import type { Metadata } from "next";
import { services } from "@/content/services";
import { absoluteUrl, fullAddress, site } from "./site";

type PageMetaInput = {
  title: string; // بدون پسوند نام برند؛ layout خودش اضافه می‌کند
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  absoluteTitle?: boolean;
};

export function pageMeta({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${site.shortName}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: "fa_IR",
      type,
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

/* ───────────── JSON-LD ───────────── */

const ORG_ID = `${site.url}/#business`;
const SITE_ID = `${site.url}/#website`;

export function businessLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["AutoRepair", "LocalBusiness"],
        "@id": ORG_ID,
        name: site.name,
        description: site.tagline,
        url: absoluteUrl("/"),
        telephone: site.phoneTel,
        image: absoluteUrl("/opengraph-image"),
        address: {
          "@type": "PostalAddress",
          streetAddress: site.street,
          addressLocality: site.city,
          addressRegion: site.region,
          ...(site.postalCode ? { postalCode: site.postalCode } : {}),
          addressCountry: "IR",
        },
        ...(site.geo ? { geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng } } : {}),
        areaServed: { "@type": "City", name: site.city },
        openingHoursSpecification: site.openingHours.map((h) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.days,
          opens: h.opens,
          closes: h.closes,
        })),
        ...(site.email ? { email: site.email } : {}),
        ...(site.social.length ? { sameAs: site.social } : {}),
        hasMap: site.mapsUrl,
        knowsAbout: ["گیربکس اتوماتیک", "گیربکس CVT", "گیربکس دو کلاچه DCT", "گیربکس رباتیک AMT", "روغن گیربکس ATF"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "خدمات تعمیر گیربکس",
          itemListElement: services.map((sv) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: sv.navTitle, url: absoluteUrl(`/services/${sv.slug}/`) },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: absoluteUrl("/"),
        name: site.name,
        inLanguage: "fa-IR",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceLd(s: { title: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.description,
    url: absoluteUrl(s.path),
    serviceType: "تعمیر گیربکس اتوماتیک",
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: site.city },
    availableChannel: { "@type": "ServiceChannel", serviceLocation: { "@type": "Place", address: fullAddress } },
  };
}

export function articleLd(a: {
  title: string;
  description: string;
  path: string;
  published: string;
  updated: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    inLanguage: "fa-IR",
    datePublished: a.published,
    dateModified: a.updated,
    mainEntityOfPage: absoluteUrl(a.path),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}
