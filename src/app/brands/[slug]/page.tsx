import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cta } from "@/components/Cta";
import { PageHead } from "@/components/PageHead";
import { Rows } from "@/components/Rows";
import { brands, getBrand } from "@/content/brands";
import { services } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import { pick } from "@/lib/pick";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const b = getBrand(slug);
  if (!b) return {};
  return pageMeta({
    title: `تعمیر گیربکس اتوماتیک ${b.name} در ${site.city}`,
    description: `تعمیر گیربکس اتوماتیک ${b.name} (${b.models.slice(0, 3).join("، ")}): نوع گیربکس‌های رایج، نکات این برند، عیب‌یابی با دیاگ و برآورد کتبی.`,
    path: `/brands/${b.slug}/`,
    modifiedTime: b.updated,
  });
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const b = getBrand(slug);
  if (!b) notFound();

  const related = pick(services, b.services);
  const others = brands.filter((x) => x.slug !== b.slug);

  return (
    <>
      <PageHead
        crumbs={[
          { name: "برندها", path: "/brands/" },
          { name: b.name, path: `/brands/${b.slug}/` },
        ]}
        title={`تعمیر گیربکس اتوماتیک ${b.name} در ${site.city}`}
        lead={b.intro}
        updated={b.updated}
      />
      <div className="wrap page-body">
        <dl className="facts">
          <div className="facts__row">
            <dt className="facts__k">مدل‌ها</dt>
            <dd className="facts__v">{b.models.join("، ")}</dd>
          </div>
          <div className="facts__row">
            <dt className="facts__k">گیربکس رایج</dt>
            <dd className="facts__v">{b.gearboxes}</dd>
          </div>
        </dl>

        <section className="block" aria-labelledby="attn">
          <h2 id="attn" className="block__title">برای {b.name} به این نکته‌ها توجه کنید</h2>
          <div className="prose">
            <ul className="prose__list">
              {b.attention.map((a) => <li key={a}>{a}</li>)}
            </ul>
            <p>
              شناسایی دقیق گیربکس با مدل، سال ساخت و شماره‌ی شاسی انجام می‌شود. پیش از تعمیر، با دیاگ و تست جاده علت را مشخص و برآورد کتبی ارائه می‌کنیم.
            </p>
          </div>
        </section>

        <section className="block" aria-labelledby="svc">
          <h2 id="svc" className="block__title">خدمات مرتبط با {b.name}</h2>
          <Rows items={related.map((s) => ({ href: `/services/${s.slug}/`, title: s.navTitle, text: s.summary }))} />
        </section>

        <section className="block" aria-labelledby="other">
          <h2 id="other" className="block__title">برندهای دیگر</h2>
          <ul className="chips">
            {others.map((x) => (
              <li key={x.slug}>
                <Link className="chip" href={`/brands/${x.slug}/`}>{x.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <Cta title={`گیربکس ${b.name} شما مشکل دارد؟`} />
    </>
  );
}
