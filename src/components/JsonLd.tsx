/** JSON-LD امن (کاراکتر < را escape می‌کند) — بدون هیچ JS سمت کلاینت */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
