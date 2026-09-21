import Link from "next/link";
import { ChevronIcon } from "./Icons";

export type RowItem = { href: string; title: string; text?: string };

/** فهرست لینک‌ها به‌صورت ردیف‌های خط‌دار */
export function Rows({ items, cols = false }: { items: RowItem[]; cols?: boolean }) {
  return (
    <ul className={cols ? "rows rows--cols" : "rows"}>
      {items.map((it) => (
        <li key={it.href}>
          <Link href={it.href} className="row">
            <span className="row__title">{it.title}</span>
            {it.text && <span className="row__text">{it.text}</span>}
            <span className="row__chev">
              <ChevronIcon />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
