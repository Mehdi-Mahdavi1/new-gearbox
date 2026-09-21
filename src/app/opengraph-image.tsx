import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { CSSProperties, ReactNode } from "react";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (f: string) => readFile(join(process.cwd(), "src/lib/og-fonts", f));

/**
 * Satori چیدمان RTL را به‌درستی انجام نمی‌دهد (ترتیب کلمات وارونه می‌شود)،
 * پس کلمات را جداگانه و با row-reverse می‌چینیم. هر «نیم‌فاصله» هم یک قطعه‌ی جدا با فاصله‌ی صفر است.
 */
function Rtl({ text, size: fontSize, weight, color, lineHeight = 1.4 }: { text: string; size: number; weight: 500 | 700; color: string; lineHeight?: number }): ReactNode {
  const base: CSSProperties = { fontSize, fontWeight: weight, color, lineHeight, display: "flex" };
  const words = text.split(" ");
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse", flexWrap: "wrap", columnGap: fontSize * 0.28 }}>
      {words.map((w, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "row-reverse" }}>
          {w.split("\u200c").map((part, j) => (
            <div key={j} style={base}>{part}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default async function OpenGraphImage() {
  const [ar700, ar500, lat700] = await Promise.all([
    font("vazirmatn-arabic-700.woff"),
    font("vazirmatn-arabic-500.woff"),
    font("vazirmatn-latin-700.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
          background: "#0c1117",
          padding: 72,
          fontFamily: "Vazirmatn",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Rtl text={site.shortName} size={34} weight={700} color="#f1f4f8" />
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              border: "6px solid #f5891f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#f5891f" }} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28, width: "100%", alignItems: "flex-end" }}>
          <Rtl text={`تعمیر گیربکس اتوماتیک در ${site.city}`} size={88} weight={700} color="#f1f4f8" lineHeight={1.3} />
          <Rtl text="عیب‌یابی با دیاگ، برآورد کتبی و ضمانت‌نامه" size={38} weight={500} color="#9aa7b4" />
          <div
            style={{
              height: 18,
              width: "100%",
              borderRadius: 9,
              background: "linear-gradient(to left, #e5566f 0%, #c93f55 28%, #8a3e32 58%, #4a2b22 80%, #1e1614 100%)",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Vazirmatn", data: ar700, weight: 700, style: "normal" },
        { name: "Vazirmatn", data: ar500, weight: 500, style: "normal" },
        { name: "Vazirmatn", data: lat700, weight: 700, style: "normal" },
      ],
    },
  );
}
