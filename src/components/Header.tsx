import Link from "next/link";
import { site } from "@/lib/site";
import { LogoMark, PhoneIcon } from "./Icons";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

const links = [
  { href: "/", label: "صفحه‌ی اصلی" },
  { href: "/services/", label: "خدمات" },
  { href: "/brands/", label: "برندها" },
  { href: "/problems/", label: "علائم خرابی" },
  { href: "/guides/", label: "راهنما" },
  { href: "/contact/", label: "تماس با ما" },
];

export function Header() {
  return (
    <header className="hdr">
      <div className="wrap">
        <div className="hdr__bar">
          <Link href="/" className="brand" aria-label={`${site.name} — صفحه‌ی اصلی`}>
            <LogoMark />
            <span className="brand__text">
              <span className="brand__name">{site.shortName}</span>
              <span className="brand__sub">{site.brandSub}</span>
            </span>
          </Link>
          <NavLinks links={links} />
          <a href={`tel:${site.phoneTel}`} className="btn hdr__call">
            <PhoneIcon size={17} />
            <span className="ltr">{site.phoneDisplay}</span>
          </a>
          <MobileMenu
            links={links}
            phoneTel={site.phoneTel}
            phoneDisplay={site.phoneDisplay}
            whatsapp={site.whatsapp || undefined}
          />
        </div>
      </div>
    </header>
  );
}
