import Link from "next/link";
import { breadcrumbLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "خانه", path: "/" }, ...items];
  return (
    <>
      <nav className="crumbs" aria-label="مسیر صفحه">
        <ol className="crumbs__list">
          {all.map((c, i) => (
            <li key={c.path} className="crumbs__item">
              {i < all.length - 1 ? (
                <Link className="crumbs__link" href={c.path}>
                  {c.name}
                </Link>
              ) : (
                <span aria-current="page">{c.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(all)} />
    </>
  );
}
