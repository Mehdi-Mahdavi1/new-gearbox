import Link from "next/link";
import { brands } from "@/content/brands";
import { services } from "@/content/services";
import { fullAddress, persianYear, site, toFa } from "@/lib/site";

export function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__grid">
          <div>
            <strong>{site.name}</strong>
            <p className="ftr__about">{site.tagline}</p>
            <p className="ftr__about">
              {fullAddress}
              <br />
              <a href={`tel:${site.phoneTel}`} className="ltr">
                {site.phoneDisplay}
              </a>
              <br />
              {site.hoursText}
            </p>
          </div>

          <nav aria-label="خدمات">
            <p className="ftr__title">خدمات</p>
            <ul className="ftr__list">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link className="ftr__link" href={`/services/${s.slug}/`}>
                    {s.navTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="برندها">
            <p className="ftr__title">برندها</p>
            <ul className="ftr__list">
              {brands.map((b) => (
                <li key={b.slug}>
                  <Link className="ftr__link" href={`/brands/${b.slug}/`}>
                    گیربکس {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="اطلاعات">
            <p className="ftr__title">اطلاعات</p>
            <ul className="ftr__list">
              <li><Link className="ftr__link" href="/problems/">علائم خرابی گیربکس</Link></li>
              <li><Link className="ftr__link" href="/guides/">راهنماها</Link></li>
              <li><Link className="ftr__link" href="/about/">درباره‌ی ما</Link></li>
              <li><Link className="ftr__link" href="/contact/">تماس و آدرس</Link></li>
            </ul>
          </nav>
        </div>
        <p className="ftr__bottom">
          © {toFa(persianYear())} {site.name}. همه‌ی حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}
