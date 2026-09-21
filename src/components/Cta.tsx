import { site } from "@/lib/site";
import { ChatIcon, PhoneIcon } from "./Icons";

export function Cta({
  title = "نیاز به مشاوره یا نوبت‌دهی دارید؟",
  text = "علائم را تلفنی بگویید. اگر لازم باشد خودرو را برای عیب‌یابی بیاورید و پیش از هر تعمیر، برآورد کتبی بگیرید.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="cta-sec" aria-labelledby="cta-title">
      <div className="wrap">
        <div className="cta">
          <div className="cta__copy">
            <h2 id="cta-title" className="cta__title">
              {title}
            </h2>
            <p className="cta__text">{text}</p>
          </div>
          <div className="cta__actions">
            <a href={`tel:${site.phoneTel}`} className="btn btn--primary">
              <PhoneIcon size={18} />
              دریافت مشاوره و نوبت
              <span className="ltr">{site.phoneDisplay}</span>
            </a>
            {site.whatsapp && (
              <a href={`https://wa.me/${site.whatsapp}`} className="btn btn--ghost" rel="noopener">
                <ChatIcon size={18} />
                پیام در واتساپ
              </a>
            )}
            <p className="cta__meta">{site.hoursText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
