export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  summary: string; // یک‌خطی برای لیست‌ها
  title: string; // H1
  navTitle: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  sections: { h: string; p?: string[]; ul?: string[]; ol?: string[] }[];
  faq: Faq[];
  problems: string[]; // slug مشکلات مرتبط
  guides: string[]; // slug راهنماهای مرتبط
  updated: string;
};

export type Problem = {
  slug: string;
  title: string; // H1
  navTitle: string;
  teaser: string; // یک‌خطی برای لیست‌ها
  metaTitle: string;
  metaDescription: string;
  lead: string;
  causes: { t: string; d: string }[];
  checks: string[];
  stopWhen: string;
  services: string[];
  faq: Faq[];
  updated: string;
};

export type Brand = {
  slug: string;
  name: string;
  nameEn: string;
  models: string[];
  gearboxes: string; // نوع گیربکس‌های رایج (محتاطانه)
  attention: string[]; // نکات خاص
  intro: string;
  services: string[];
  updated: string;
};

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "note"; text: string };

export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  published: string;
  updated: string;
  minutes: number;
  blocks: Block[];
  services: string[];
  problems: string[];
};
