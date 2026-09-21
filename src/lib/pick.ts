/** انتخاب آیتم‌ها از یک لیست بر اساس slug، با حفظ ترتیب و حذف موارد ناموجود */
export function pick<T extends { slug: string }>(list: T[], slugs: string[]): T[] {
  return slugs.map((s) => list.find((x) => x.slug === s)).filter((x): x is T => x !== undefined);
}
