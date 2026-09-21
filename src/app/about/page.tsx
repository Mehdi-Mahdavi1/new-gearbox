import { Cta } from "@/components/Cta";
import { PageHead } from "@/components/PageHead";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: `درباره‌ی ${site.name}`,
  description: `شیوه‌ی کار ${site.name}: عیب‌یابی پیش از تعمیر، برآورد کتبی، قطعات مشخص و ضمانت‌نامه‌ی کتبی برای تعمیر گیربکس اتوماتیک.`,
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <PageHead
        crumbs={[{ name: "درباره‌ی ما", path: "/about/" }]}
        title={`درباره‌ی ${site.name}`}
        lead="ما روی تعمیر گیربکس اتوماتیک تمرکز داریم. شیوه‌ی کارمان ساده است: اول علت را پیدا می‌کنیم، بعد قیمت می‌گوییم."
      />
      <div className="wrap page-body">
        <div className="prose">
          <h2 className="prose__h2">اصول کار ما</h2>
          <ul className="prose__list">
            <li>عیب‌یابی پیش از تعمیر: با دیاگ، بررسی روغن و تست جاده.</li>
            <li>برآورد کتبی و تفکیک‌شده؛ بدون هماهنگی با شما کاری شروع نمی‌شود.</li>
            <li>مشخص بودن قطعات تعویضی و نوع آن‌ها.</li>
            <li>{site.warranty}.</li>
            <li>کالیبراسیون و تست جاده پیش از تحویل خودرو.</li>
          </ul>
          <h2 className="prose__h2">چه چیزی تعمیر می‌کنیم؟</h2>
          <p>گیربکس‌های اتوماتیک کلاسیک (AT)، CVT، دو کلاچه (DCT) و رباتیک (AMT) در خودروهای کره‌ای، ژاپنی، چینی، اروپایی و ایرانی.</p>
        </div>
      </div>
      <Cta />
    </>
  );
}
