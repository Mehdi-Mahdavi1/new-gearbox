import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cta } from "@/components/Cta";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { RichText } from "@/components/RichText";
import { Rows } from "@/components/Rows";
import { articles, getArticle } from "@/content/articles";
import { problems } from "@/content/problems";
import { services } from "@/content/services";
import { pick } from "@/lib/pick";
import { articleLd, pageMeta } from "@/lib/seo";
import { toFa, withYear } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// سال شمسی داخل عنوان با هر build به‌روز می‌شود
export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMeta({
    title: withYear(a.metaTitle),
    description: withYear(a.metaDescription),
    path: `/guides/${a.slug}/`,
    type: "article",
    publishedTime: a.published,
    modifiedTime: a.updated,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const title = withYear(a.title, true);
  const relatedServices = pick(services, a.services);
  const relatedProblems = pick(problems, a.problems);
  const others = articles.filter((x) => x.slug !== a.slug);

  return (
    <>
      <PageHead
        crumbs={[
          { name: "راهنما", path: "/guides/" },
          { name: title, path: `/guides/${a.slug}/` },
        ]}
        title={title}
        lead={a.lead}
        updated={a.updated}
      />
      <div className="wrap page-body">
        <article className="prose">
          <p className="page-head__meta">زمان مطالعه: {toFa(a.minutes)} دقیقه</p>
          {a.blocks.map((b, i) => {
            switch (b.type) {
              case "h2":
                return <h2 key={i} className="prose__h2">{b.text}</h2>;
              case "p":
                return <p key={i}><RichText text={b.text} /></p>;
              case "note":
                return <p key={i} className="note"><RichText text={b.text} /></p>;
              case "ul":
                return (
                  <ul key={i} className="prose__list">
                    {b.items.map((it) => <li key={it}><RichText text={it} /></li>)}
                  </ul>
                );
              case "ol":
                return (
                  <ol key={i} className="prose__list">
                    {b.items.map((it) => <li key={it}><RichText text={it} /></li>)}
                  </ol>
                );
            }
          })}
        </article>

        <section className="block" aria-labelledby="rel-svc">
          <h2 id="rel-svc" className="block__title">خدمات مرتبط</h2>
          <Rows items={relatedServices.map((s) => ({ href: `/services/${s.slug}/`, title: s.navTitle, text: s.summary }))} />
        </section>

        {relatedProblems.length > 0 && (
          <section className="block" aria-labelledby="rel-prob">
            <h2 id="rel-prob" className="block__title">علائم مرتبط</h2>
            <Rows items={relatedProblems.map((p) => ({ href: `/problems/${p.slug}/`, title: p.navTitle, text: p.teaser }))} />
          </section>
        )}

        <section className="block" aria-labelledby="rel-guides">
          <h2 id="rel-guides" className="block__title">راهنماهای دیگر</h2>
          <Rows items={others.map((g) => ({ href: `/guides/${g.slug}/`, title: withYear(g.title, true) }))} />
        </section>
      </div>
      <Cta />
      <JsonLd
        data={articleLd({
          title,
          description: withYear(a.metaDescription),
          path: `/guides/${a.slug}/`,
          published: a.published,
          updated: a.updated,
        })}
      />
    </>
  );
}
