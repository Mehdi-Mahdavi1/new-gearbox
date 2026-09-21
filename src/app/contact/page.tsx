import { ChatIcon, PhoneIcon } from "@/components/Icons";
import { PageHead } from "@/components/PageHead";
import { pageMeta } from "@/lib/seo";
import { fullAddress, site } from "@/lib/site";

export const metadata = pageMeta({
  title: `تماس و آدرس تعمیرگاه گیربکس در ${site.city}`,
  description: `آدرس، تلفن و ساعت کاری ${site.name} در ${site.city}. برای مشاوره و وقت عیب‌یابی گیربکس تماس بگیرید.`,
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageHead
        crumbs={[{ name: "تماس", path: "/contact/" }]}
        title="تماس و آدرس"
        lead="علائم گیربکس را تلفنی بگویید؛ اگر لازم باشد، وقت عیب‌یابی هماهنگ می‌کنیم."
      />
      <div className="wrap page-body">
        <ul className="contact-list">
          <li className="contact-list__item">
            <span className="contact-list__k">تلفن</span>
            <a className="contact-list__v ltr" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
          </li>
          <li className="contact-list__item">
            <span className="contact-list__k">آدرس</span>
            <span className="contact-list__v">{fullAddress}</span>
            <br />
            <a href={site.mapsUrl} rel="noopener">مسیریابی روی نقشه</a>
          </li>
          <li className="contact-list__item">
            <span className="contact-list__k">ساعت کاری</span>
            <span className="contact-list__v">{site.hoursText}</span>
          </li>
        </ul>
        <div className="hero__actions">
          <a href={`tel:${site.phoneTel}`} className="btn btn--primary">
            <PhoneIcon size={18} />
            تماس تلفنی
          </a>
          {site.whatsapp && (
            <a href={`https://wa.me/${site.whatsapp}`} className="btn btn--ghost" rel="noopener">
              <ChatIcon size={18} />
              پیام در واتساپ
            </a>
          )}
        </div>
        <div className="prose block">
          <h2 className="prose__h2">هنگام تماس این اطلاعات را آماده داشته باشید</h2>
          <ul className="prose__list">
            <li>مدل و سال ساخت خودرو (ترجیحاً شماره‌ی شاسی)</li>
            <li>علائم: کِی رخ می‌دهد، سرد یا گرم، در کدام دنده</li>
            <li>مسافت کارکرد و آخرین تعویض روغن گیربکس</li>
            <li>وجود چراغ هشدار یا پیام روی داشبورد</li>
          </ul>
        </div>
      </div>
    </>
  );
}
