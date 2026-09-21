import { site } from "@/lib/site";
import { ChatIcon, PhoneIcon } from "./Icons";

/** نوار ثابت پایین در موبایل؛ بدون JS */
export function MobileBar() {
  return (
    <div className="mbar" role="region" aria-label="تماس سریع">
      <a href={`tel:${site.phoneTel}`} className="btn btn--primary">
        <PhoneIcon size={18} />
        تماس
        <span className="ltr">{site.phoneDisplay}</span>
      </a>
      {site.whatsapp ? (
        <a href={`https://wa.me/${site.whatsapp}`} className="btn btn--ghost" rel="noopener">
          <ChatIcon size={18} />
          واتساپ
        </a>
      ) : (
        <a href="/contact/" className="btn btn--ghost">
          آدرس
        </a>
      )}
    </div>
  );
}
