import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { PageHead } from "@/components/PageHead";
import { Rows } from "@/components/Rows";
import { getProblem, problems } from "@/content/problems";
import { services } from "@/content/services";
import { pageMeta } from "@/lib/seo";
import { pick } from "@/lib/pick";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return problems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProblem(slug);
  if (!p) return {};
  return pageMeta({ title: p.metaTitle, description: p.metaDescription, path: `/problems/${p.slug}/`, modifiedTime: p.updated });
}

export default async function ProblemPage({ params }: Props) {
  const { slug } = await params;
  const p = getProblem(slug);
  if (!p) notFound();

  const related = pick(services, p.services);
  const others = problems.filter((x) => x.slug !== p.slug);

  return (
    <>
      <PageHead
        crumbs={[
          { name: "علائم خرابی", path: "/problems/" },
          { name: p.navTitle, path: `/problems/${p.slug}/` },
        ]}
        title={p.title}
        lead={p.lead}
        updated={p.updated}
      />
      <div className="wrap page-body">
        <section aria-labelledby="causes">
          <h2 id="causes" className="block__title">معمولاً چه چیزی پشت این مشکل است؟</h2>
          <ul className="causes">
            {p.causes.map((c) => (
              <li className="causes__item" key={c.t}>
                <span className="causes__title">{c.t}</span>
                <span className="causes__text">{c.d}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="block" aria-labelledby="checks">
          <h2 id="checks" className="block__title">تا رسیدن به تعمیرگاه چه کاری بکنید؟</h2>
          <div className="prose">
            <ul className="prose__list">
              {p.checks.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </section>

        <section className="block" aria-labelledby="stop">
          <div className="warn">
            <h2 id="stop" className="warn__title">چه زمانی رانندگی را متوقف کنید؟</h2>
            <p>{p.stopWhen}</p>
          </div>
        </section>

        <section className="block" aria-labelledby="svc">
          <h2 id="svc" className="block__title">خدمات مرتبط</h2>
          <Rows items={related.map((s) => ({ href: `/services/${s.slug}/`, title: s.navTitle, text: s.summary }))} />
        </section>

        <section className="block" aria-labelledby="faq">
          <h2 id="faq" className="block__title">پرسش‌های رایج</h2>
          <Faq items={p.faq} />
        </section>

        <section className="block" aria-labelledby="others">
          <h2 id="others" className="block__title">علائم دیگر</h2>
          <ul className="chips">
            {others.map((x) => (
              <li key={x.slug}>
                <Link className="chip" href={`/problems/${x.slug}/`}>{x.navTitle}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <Cta title="علت را دقیق پیدا کنیم" text="با دیاگ و تست جاده علت مشکل را مشخص می‌کنیم و پیش از هر تعمیر، برآورد کتبی می‌دهیم." />
    </>
  );
}
