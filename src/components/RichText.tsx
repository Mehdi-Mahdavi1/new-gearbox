import Link from "next/link";

/** پشتیبانی از لینک داخلی به‌شکل [متن](/مسیر/) در متن‌ها */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!m) return part;
        return (
          <Link key={i} href={m[2]} className="prose__link">
            {m[1]}
          </Link>
        );
      })}
    </>
  );
}
