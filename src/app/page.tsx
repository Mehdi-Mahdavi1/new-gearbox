import Link from "next/link";
import { ShifterArt, Art, postArtName } from "@/components/Art";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { FluidScale } from "@/components/FluidScale";
import { HeroStage } from "@/components/HeroStage";
import { ArrowIcon, ChevronIcon, ClipboardIcon, ClockIcon, GaugeIcon, PhoneIcon, ShieldIcon } from "@/components/Icons";
import { ServiceCard } from "@/components/ServiceCard";
import { Visit } from "@/components/Visit";
import { articles } from "@/content/articles";
import { brands } from "@/content/brands";
import { homeFaq } from "@/content/faq";
import { problems } from "@/content/problems";
import { reviews } from "@/content/reviews";
import { services } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import { site, withYear } from "@/lib/site";

export const metadata = pageMeta({
  title: `تعمیر گیربکس اتوماتیک در ${site.city} | ${site.shortName}`,
  description: `تعمیر تخصصی گیربکس اتوماتیک AT، CVT و DCT در ${site.city}: عیب‌یابی با دیاگ، برآورد کتبی پیش از تعمیر و ضمانت‌نامه. برای مشاوره تماس بگیرید.`,
  path: "/",
  absoluteTitle: true,
});

const trust = [
  { icon: <GaugeIcon />, t: "عیب‌یابی پیش از تعمیر", d: "با دیاگ، بررسی روغن و تست جاده" },
  { icon: <ClipboardIcon />, t: "برآورد کتبی و تفکیک‌شده", d: "بدون هماهنگی با شما کاری شروع نمی‌شود" },
  { icon: <ShieldIcon />, t: site.warranty, d: "شرایط پیش از شروع کار اعلام می‌شود" },
  { icon: <ClockIcon />, t: "زمان‌بندی شفاف", d: "زمان تحویل را پیش از شروع می‌گوییم" },
];

const steps = [
  { t: "گفت‌وگو درباره‌ی علائم", d: "مدل خودرو و رفتار گیربکس را می‌پرسیم: کِی رخ می‌دهد، سرد یا گرم، در کدام دنده." },
  { t: "عیب‌یابی با دیاگ و تست جاده", d: "خطاها و داده‌ی زنده را می‌خوانیم، روغن را بررسی می‌کنیم و خودرو را در جاده تست می‌کنیم." },
  { t: "برآورد کتبی", d: "علت مشکل، گزینه‌های تعمیر و هزینه‌ی تفکیک‌شده را می‌گوییم. بدون موافقت شما کاری شروع نمی‌شود." },
  { t: "تعمیر", d: "گیربکس باز و بازرسی می‌شود؛ قطعات فرسوده تعویض و روغن مناسب سازنده پر می‌شود." },
  { t: "کالیبراسیون، تست و تحویل", d: "پس از بستن، ریست تطبیقی و تست جاده انجام می‌شود و ضمانت‌نامه‌ی کتبی تحویل می‌گیرید." },
];

export default function HomePage() {
  const latest = [...articles].slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <h1 className="hero__title">
              تعمیر گیربکس اتوماتیک <span>در {site.city}</span>
            </h1>
            <p className="hero__lead">
              عیب‌یابی با دستگاه دیاگ، برآورد کتبی پیش از هر تعمیر و ضمانت‌نامه. برای گیربکس‌های AT، CVT، دو کلاچه و رباتیک.
            </p>
            <div className="hero__actions">
              <a href={`tel:${site.phoneTel}`} className="btn btn--primary">
                <PhoneIcon size={18} />
                دریافت مشاوره و نوبت
              </a>
              <Link href="/services/" className="btn btn--ghost">
                مشاهده خدمات
                <ArrowIcon size={18} />
              </Link>
            </div>
            <p className="hero__meta">{site.hoursText}</p>
          </div>
          <HeroStage />
        </div>
        <div className="wrap">
          <ul className="trust">
            {trust.map((x) => (
              <li className="trust__item" key={x.t}>
                <span className="trust__icon">{x.icon}</span>
                <span className="trust__title">{x.t}</span>
                <span className="trust__sub">{x.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="wrap">
          <div className="section__bar">
            <div className="section__head">
              <h2 id="services-title" className="section__title">خدمات تعمیر گیربکس</h2>
              <p className="section__sub">هر نوع گیربکس، ساختار و خرابی‌های خاص خودش را دارد. خدمت مناسب را انتخاب کنید.</p>
            </div>
            <Link href="/services/" className="more">
              مشاهده همه
              <ChevronIcon size={16} />
            </Link>
          </div>
          <ul className="svcs">
            {services.map((s) => (
              <li key={s.slug}>
                <ServiceCard slug={s.slug} title={s.navTitle} text={s.summary} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="problems-title">
        <div className="wrap">
          <div className="sym">
            <div className="sym__body">
              <h2 id="problems-title" className="section__title">علائم خرابی گیربکس اتومات</h2>
              <p className="section__sub" style={{ marginTop: "0.6rem" }}>
                اگر یکی از این حالت‌ها را دارید، علت‌های رایج و کارهای درست را ببینید.
              </p>
              <ul className="sym__list">
                {problems.slice(0, 6).map((p) => (
                  <li key={p.slug}>
                    <Link href={`/problems/${p.slug}/`} className="sym__link">
                      {p.navTitle}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/problems/" className="btn btn--ghost">
                مشاهده همه علائم
                <ArrowIcon size={18} />
              </Link>
            </div>
            <div className="sym__art" aria-hidden="true">
              <ShifterArt />
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="wrap">
          <div className="section__head" style={{ marginBottom: "clamp(1.75rem, 4vw, 3rem)" }}>
            <h2 id="process-title" className="section__title">فرآیند تعمیر گیربکس اتومات</h2>
            <p className="section__sub">مراحل شفاف است تا در هر مرحله بدانید چه اتفاقی می‌افتد.</p>
          </div>
          <ol className="tl">
            {steps.map((s) => (
              <li className="tl__item" key={s.t}>
                <h3 className="tl__title">{s.t}</h3>
                <p className="tl__text">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FluidScale />

      <div className="theme-light">
        <section className="section" aria-labelledby="brands-title">
          <div className="wrap">
            <div className="section__bar">
              <div className="section__head">
                <h2 id="brands-title" className="section__title">تعمیر گیربکس بر اساس برند خودرو</h2>
                <p className="section__sub">خودروهای کره‌ای، ژاپنی، چینی، اروپایی و ایرانی.</p>
              </div>
              <Link href="/brands/" className="more">
                همه‌ی برندها
                <ChevronIcon size={16} />
              </Link>
            </div>
            <ul className="chips">
              {brands.map((b) => (
                <li key={b.slug}>
                  <Link className="chip" href={`/brands/${b.slug}/`}>
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }} aria-labelledby="guides-title">
          <div className="wrap">
            <div className="section__bar">
              <div className="section__head">
                <h2 id="guides-title" className="section__title">مقالات و راهنماها</h2>
                <p className="section__sub">پاسخ روشن به پرسش‌های رایج: هزینه، سرویس و انتخاب.</p>
              </div>
              <Link href="/guides/" className="more">
                همه‌ی راهنماها
                <ChevronIcon size={16} />
              </Link>
            </div>
            <ul className="posts">
              {latest.map((a) => (
                <li key={a.slug}>
                  <Link href={`/guides/${a.slug}/`} className="post">
                    <div className="post__art">
                      <Art name={postArtName(a.slug)} />
                    </div>
                    <div className="post__body">
                      <h3 className="post__title">{withYear(a.title, true)}</h3>
                      <p className="post__text">{a.lead.split(".")[0]}.</p>
                      <span className="post__more">مطالعه‌ی بیشتر ‹</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {reviews.length > 0 && (
          <section className="section" style={{ paddingTop: 0 }} aria-labelledby="reviews-title">
            <div className="wrap">
              <div className="section__head" style={{ marginBottom: "1.5rem" }}>
                <h2 id="reviews-title" className="section__title">تجربه‌ی مشتریان</h2>
              </div>
              <ul className="reviews">
                {reviews.map((r) => (
                  <li key={r.name + r.text.slice(0, 12)}>
                    <figure className="review">
                      <div className="review__stars" role="img" aria-label={`امتیاز ${r.rating} از ۵`}>
                        {"★".repeat(r.rating)}
                      </div>
                      <blockquote className="review__text">{r.text}</blockquote>
                      <figcaption className="review__by">
                        {r.name}
                        {r.car ? `، ${r.car}` : ""}
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="section" style={{ paddingTop: 0 }} aria-labelledby="faq-title">
          <div className="wrap split">
            <div className="split__head">
              <h2 id="faq-title" className="section__title">پرسش‌های متداول</h2>
              <p className="section__sub">پاسخ کوتاه به رایج‌ترین پرسش‌ها پیش از تماس با ما.</p>
            </div>
            <Faq items={homeFaq} />
          </div>
        </section>
      </div>

      <Visit />

      <Cta />
    </>
  );
}
