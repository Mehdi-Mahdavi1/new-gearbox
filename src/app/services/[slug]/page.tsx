import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { serviceArtName } from "@/components/Art";
import { PageHead } from "@/components/PageHead";
import { Rows } from "@/components/Rows";
import { articles } from "@/content/articles";
import { brands } from "@/content/brands";
import { problems } from "@/content/problems";
import { getService, services } from "@/content/services";
import { pageMeta, serviceLd } from "@/lib/seo";
import { pick } from "@/lib/pick";
import { withYear } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMeta({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}/`, modifiedTime: s.updated });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const relatedProblems = pick(problems, s.problems);
  const relatedGuides = pick(articles, s.guides);
  const otherServices = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <PageHead
        crumbs={[
          { name: "خدمات", path: "/services/" },
          { name: s.navTitle, path: `/services/${s.slug}/` },
        ]}
        title={s.title}
        lead={s.lead}
        updated={s.updated}
        art={serviceArtName(s.slug)}
      />

      <div className="wrap page-body">
        <div className="prose">
          {s.sections.map((sec) => (
            <section key={sec.h}>
              <h2 className="prose__h2">{sec.h}</h2>
              {sec.p?.map((t) => <p key={t}>{t}</p>)}
              {sec.ul && (
                <ul className="prose__list">
                  {sec.ul.map((i) => <li key={i}>{i}</li>)}
                </ul>
              )}
              {sec.ol && (
                <ol className="prose__list">
                  {sec.ol.map((i) => <li key={i}>{i}</li>)}
                </ol>
              )}
            </section>
          ))}
        </div>

        <section className="block" aria-labelledby="faq-title">
          <h2 id="faq-title" className="block__title">پرسش‌های رایج درباره‌ی {s.navTitle}</h2>
          <Faq items={s.faq} />
        </section>

        {relatedProblems.length > 0 && (
          <section className="block" aria-labelledby="rel-problems">
            <h2 id="rel-problems" className="block__title">علائم مرتبط</h2>
            <Rows items={relatedProblems.map((p) => ({ href: `/problems/${p.slug}/`, title: p.navTitle, text: p.teaser }))} />
          </section>
        )}

        {relatedGuides.length > 0 && (
          <section className="block" aria-labelledby="rel-guides">
            <h2 id="rel-guides" className="block__title">بخوانید</h2>
            <Rows items={relatedGuides.map((g) => ({ href: `/guides/${g.slug}/`, title: withYear(g.title, true) }))} />
          </section>
        )}

        <section className="block" aria-labelledby="rel-brands">
          <h2 id="rel-brands" className="block__title">برندهایی که تعمیر می‌کنیم</h2>
          <ul className="chips">
            {brands.map((b) => (
              <li key={b.slug}>
                <Link className="chip" href={`/brands/${b.slug}/`}>{b.name}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="block" aria-labelledby="rel-services">
          <h2 id="rel-services" className="block__title">خدمات دیگر</h2>
          <Rows cols items={otherServices.map((x) => ({ href: `/services/${x.slug}/`, title: x.navTitle, text: x.summary }))} />
        </section>
      </div>

      <Cta />
      <JsonLd data={serviceLd({ title: s.title, description: s.metaDescription, path: `/services/${s.slug}/` })} />
    </>
  );
}
