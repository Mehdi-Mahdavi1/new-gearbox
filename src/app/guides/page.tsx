import { Cta } from "@/components/Cta";
import { PageHead } from "@/components/PageHead";
import { Rows } from "@/components/Rows";
import { articles } from "@/content/articles";
import { pageMeta } from "@/lib/seo";
import { withYear } from "@/lib/site";

export const metadata = pageMeta({
  title: "راهنمای گیربکس اتوماتیک برای مالکان خودرو",
  description: "راهنماهای روشن درباره‌ی هزینه‌ی تعمیر، زمان تعویض روغن، تفاوت گیربکس‌های AT، CVT و DCT و نگهداری از گیربکس اتوماتیک.",
  path: "/guides/",
});

export default function GuidesPage() {
  return (
    <>
      <PageHead
        crumbs={[{ name: "راهنما", path: "/guides/" }]}
        title="راهنمای گیربکس اتوماتیک"
        lead="پاسخ روشن و بدون اغراق به پرسش‌هایی که مالکان خودرو بیشتر می‌پرسند."
      />
      <div className="wrap page-body">
        <Rows
          items={articles.map((a) => ({
            href: `/guides/${a.slug}/`,
            title: withYear(a.title, true),
            text: a.lead.split(".")[0],
          }))}
        />
      </div>
      <Cta />
    </>
  );
}
