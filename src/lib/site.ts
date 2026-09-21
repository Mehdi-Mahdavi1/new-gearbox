/**
 * ─────────────────────────────────────────────────────────────
 *  تنها فایلی که باید برای راه‌اندازی سایت ویرایش کنید.
 *  همه‌ی متن‌های تماس، آدرس، schema و متادیتا از اینجا می‌آید.
 *  مقدارهای زیر نمونه (placeholder) هستند؛ قبل از انتشار عوض کنید.
 * ─────────────────────────────────────────────────────────────
 */
/**
 * آدرس پایه‌ی سایت را امن تعیین می‌کند: اگر متغیر محیطی خالی یا نامعتبر بود،
 * به دامنه‌ی خود Vercel و در نهایت به مقدار نمونه برمی‌گردد تا ساخت هرگز خطا ندهد.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];
  for (const raw of candidates) {
    const v = raw?.trim();
    if (!v) continue;
    const withScheme = /^https?:\/\//i.test(v) ? v : `https://${v}`;
    try {
      return new URL(withScheme).origin;
    } catch {
      continue;
    }
  }
  return "https://example.ir";
}

export const site = {
  // برند
  name: "تعمیرگاه گیربکس نمونه",
  shortName: "گیربکس نمونه",
  brandSub: "تعمیر تخصصی گیربکس اتومات", // زیر لوگو در هدر
  tagline: "تعمیر تخصصی گیربکس اتوماتیک AT، CVT و DCT",

  // دامنه (از env خوانده می‌شود)
  url: resolveSiteUrl(),
  gscVerification: (process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "").trim(),

  // موقعیت
  city: "تهران",
  region: "تهران",
  street: "خیابان نمونه، پلاک ۰",
  postalCode: "",
  // مختصات دقیق (اختیاری ولی برای سئوی محلی مفید). اگر ندارید null بگذارید.
  geo: null as null | { lat: number; lng: number },
  mapsUrl: "https://maps.google.com/?q=Tehran",

  // تماس
  phoneTel: "+982100000000", // فرمت بین‌المللی برای لینک tel:
  phoneDisplay: "۰۲۱-۰۰۰۰۰۰۰۰",
  whatsapp: "989120000000", // بدون + ؛ اگر نمی‌خواهید null بگذارید
  email: "",
  // لینک شبکه‌های اجتماعی و پروفایل‌های رسمی (اینستاگرام، گوگل بیزینس، ...). برای سئوی محلی مفید است.
  social: [] as string[],

  // ساعت کاری
  hoursText: "شنبه تا پنجشنبه، ۸ تا ۱۹",
  openingHours: [
    { days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], opens: "08:00", closes: "19:00" },
  ],

  // ضمانت — فقط چیزی را بنویسید که واقعاً ارائه می‌دهید
  warranty: "ضمانت‌نامه کتبی برای تعمیرات",
} as const;

export const fullAddress = `${site.city}، ${site.street}`;

/** آدرس مطلق با اسلش انتهایی (هماهنگ با trailingSlash) */
export function absoluteUrl(path = "/"): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const withSlash = p.endsWith("/") || /\.[a-z0-9]+$/i.test(p) ? p : `${p}/`;
  return `${site.url}${withSlash}`;
}

/** تبدیل ارقام لاتین به فارسی */
export function toFa(input: string | number): string {
  return String(input).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

/** سال شمسی جاری (در زمان build). با هر build مجدد به‌روز می‌شود. */
export function persianYear(date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-u-ca-persian-nu-latn", { year: "numeric" }).formatToParts(date);
  return Number(parts.find((p) => p.type === "year")?.value ?? "1405");
}

/** تاریخ شمسی خوانا، مثلاً «۲۹ شهریور ۱۴۰۵» */
export function formatFaDate(iso: string): string {
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", { dateStyle: "long" }).format(new Date(iso));
}

/** جایگزینی {{year}} با سال شمسی جاری؛ fa=true ارقام فارسی برمی‌گرداند */
export function withYear(text: string, fa = false): string {
  const y = String(persianYear());
  return text.replaceAll("{{year}}", fa ? toFa(y) : y);
}
