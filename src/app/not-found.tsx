import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "صفحه پیدا نشد", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <div className="wrap notfound">
      <h1 className="page-head__title">این صفحه پیدا نشد</h1>
      <p className="page-head__lead">ممکن است آدرس تغییر کرده باشد. از این مسیرها ادامه دهید:</p>
      <div className="hero__actions">
        <Link className="btn btn--primary" href="/">صفحه‌ی اصلی</Link>
        <Link className="btn btn--ghost" href="/services/">خدمات</Link>
        <Link className="btn btn--ghost" href="/problems/">علائم خرابی</Link>
      </div>
    </div>
  );
}
