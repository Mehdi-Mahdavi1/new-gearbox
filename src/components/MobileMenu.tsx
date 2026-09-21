"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChatIcon, ChevronIcon, PhoneIcon } from "./Icons";
import type { NavLink } from "./NavLinks";

/** منوی موبایل: صفحه‌ی کامل با لینک‌های درشت و دکمه‌های تماس در پایین */
export function MobileMenu({
  links,
  phoneTel,
  phoneDisplay,
  whatsapp,
}: {
  links: NavLink[];
  phoneTel: string;
  phoneDisplay: string;
  whatsapp?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <div className="menu">
      <button
        type="button"
        className="menu__btn"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "بستن منو" : "باز کردن منو"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="menu__icon" aria-hidden="true" data-open={open} />
      </button>
      <nav id="mobile-nav" className="menu__panel" aria-label="منوی موبایل" hidden={!open}>
        {links.map((l) => {
          const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
          return (
            <Link key={l.href} href={l.href} className="menu__link" aria-current={active ? "page" : undefined}>
              {l.label}
              <ChevronIcon />
            </Link>
          );
        })}
        <div className="menu__cta">
          <a href={`tel:${phoneTel}`} className="btn btn--primary">
            <PhoneIcon size={18} />
            تماس با تعمیرگاه
            <span className="ltr">{phoneDisplay}</span>
          </a>
          {whatsapp && (
            <a href={`https://wa.me/${whatsapp}`} className="btn btn--ghost" rel="noopener">
              <ChatIcon size={18} />
              پیام در واتساپ
            </a>
          )}
        </div>
      </nav>
    </div>
  );
}
