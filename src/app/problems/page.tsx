import { Cta } from "@/components/Cta";
import { PageHead } from "@/components/PageHead";
import { Rows } from "@/components/Rows";
import { problems } from "@/content/problems";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "علائم خرابی گیربکس اتوماتیک",
  description:
    "ضربه، گاز هرز، لرزش، زوزه، روغن‌ریزی، چراغ گیربکس و بوی سوختگی؛ علت‌های رایج هر علامت و اینکه چه زمانی باید رانندگی را متوقف کنید.",
  path: "/problems/",
});

export default function ProblemsPage() {
  return (
    <>
      <PageHead
        crumbs={[{ name: "علائم خرابی", path: "/problems/" }]}
        title="علائم خرابی گیربکس اتوماتیک"
        lead="علامتی که می‌بینید را انتخاب کنید تا علت‌های رایج، کارهای درست و زمان توقف رانندگی را بدانید."
      />
      <div className="wrap page-body">
        <Rows cols items={problems.map((p) => ({ href: `/problems/${p.slug}/`, title: p.navTitle, text: p.teaser }))} />
      </div>
      <Cta />
    </>
  );
}
