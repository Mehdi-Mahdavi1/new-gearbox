import Link from "next/link";
import { Cta } from "@/components/Cta";
import { PageHead } from "@/components/PageHead";
import { Rows } from "@/components/Rows";
import { brands } from "@/content/brands";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "تعمیر گیربکس اتوماتیک بر اساس برند خودرو",
  description:
    "تعمیر گیربکس اتوماتیک هیوندای، کیا، تویوتا، مزدا، هوندا، نیسان، پژو، ام‌وی‌ام، چری، جک، مرسدس‌بنز و بی‌ام‌و. نوع گیربکس و نکات هر برند.",
  path: "/brands/",
});

export default function BrandsPage() {
  return (
    <>
      <PageHead
        crumbs={[{ name: "برندها", path: "/brands/" }]}
        title="تعمیر گیربکس اتوماتیک بر اساس برند"
        lead="نوع گیربکس و رفتار آن بین برندها و حتی مدل‌های یک برند فرق می‌کند. برند خودروی خود را انتخاب کنید."
      />
      <div className="wrap page-body">
        <Rows
          cols
          items={brands.map((b) => ({
            href: `/brands/${b.slug}/`,
            title: `گیربکس ${b.name}`,
            text: b.models.slice(0, 4).join("، "),
          }))}
        />
        <p className="page-head__meta">
          برند خودروی شما در فهرست نیست؟ <Link className="prose__link" href="/contact/">تماس بگیرید</Link>؛ بیشتر خودروهای اتوماتیک را بررسی می‌کنیم.
        </p>
      </div>
      <Cta />
    </>
  );
}
