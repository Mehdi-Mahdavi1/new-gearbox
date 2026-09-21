import { formatFaDate } from "@/lib/site";
import { Art } from "./Art";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

export function PageHead({
  crumbs,
  title,
  lead,
  updated,
  art,
}: {
  crumbs: Crumb[];
  title: string;
  lead?: string;
  updated?: string;
  /** نام تصویرسازی اختیاری (فقط دکوراتیو) */
  art?: string;
}) {
  return (
    <div className="page-head">
      <div className={art ? "wrap page-head__grid" : "wrap"}>
        <div>
          <Breadcrumbs items={crumbs} />
          <h1 className="page-head__title">{title}</h1>
          {lead && <p className="page-head__lead">{lead}</p>}
          {updated && (
            <p className="page-head__meta">
              آخرین به‌روزرسانی: <time dateTime={updated}>{formatFaDate(updated)}</time>
            </p>
          )}
        </div>
        {art && (
          <div className="page-head__art" aria-hidden="true">
            <Art name={art} />
          </div>
        )}
      </div>
    </div>
  );
}
