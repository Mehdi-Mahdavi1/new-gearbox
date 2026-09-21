import { Cta } from "@/components/Cta";
import { PageHead } from "@/components/PageHead";
import { Rows } from "@/components/Rows";
import { services } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "خدمات تعمیر گیربکس اتوماتیک",
  description: `فهرست خدمات ${site.name}: تعمیر گیربکس AT، CVT، DCT و AMT، تعویض روغن، ولوبادی و شیربرقی، توربین و عیب‌یابی با دیاگ.`,
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <PageHead
        crumbs={[{ name: "خدمات", path: "/services/" }]}
        title="خدمات تعمیر گیربکس اتوماتیک"
        lead="از سرویس و عیب‌یابی تا اورهال کامل. اگر مطمئن نیستید چه خدمتی لازم دارید، از عیب‌یابی شروع کنید."
      />
      <div className="wrap page-body">
        <Rows
          items={services.map((s) => ({ href: `/services/${s.slug}/`, title: s.title, text: s.summary }))}
        />
      </div>
      <Cta />
    </>
  );
}
