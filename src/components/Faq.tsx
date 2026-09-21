import { faqLd } from "@/lib/seo";
import type { Faq as FaqItem } from "@/content/types";
import { JsonLd } from "./JsonLd";

/** آکاردئون بدون JS با <details> + اسکیمای FAQPage */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <>
      <div className="faq">
        {items.map((f) => (
          <details className="qa" key={f.q}>
            <summary className="qa__q">{f.q}</summary>
            <p className="qa__a">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqLd(items)} />
    </>
  );
}
