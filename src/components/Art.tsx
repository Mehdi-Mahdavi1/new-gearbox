import type { ReactNode } from "react";

/**
 * تصویرسازی خطی برای کارت‌ها. رنگ‌ها از توکن‌های --art-a (نارنجی) و --art-b (خنثی) می‌آیند،
 * پس در بخش تیره و روشن هر دو خوانا است. به‌جای عکس، تا وقتی عکس واقعی ندارید.
 */

const A = "var(--art-a)";
const B = "var(--art-b)";

/** چرخ‌دنده‌ی خطی: یک دایره + حلقه‌ی دندانه‌ای (با ترفند dasharray) */
function GearLine({ cx, cy, r, teeth, color = A }: { cx: number; cy: number; r: number; teeth: number; color?: string }) {
  const c = 2 * Math.PI * (r + 3);
  const u = c / teeth;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 3} stroke={color} strokeWidth={5} strokeDasharray={`${u * 0.5} ${u * 0.5}`} />
      <circle cx={cx} cy={cy} r={r} stroke={color} strokeWidth={2} />
      <circle cx={cx} cy={cy} r={Math.max(r * 0.28, 2.5)} stroke={color} strokeWidth={2} />
    </g>
  );
}

const arts: Record<string, ReactNode> = {
  // مجموعه‌ی سیاره‌ای
  at: (
    <>
      <GearLine cx={120} cy={70} r={54} teeth={44} color={B} />
      <GearLine cx={120} cy={70} r={13} teeth={12} />
      {[90, 210, 330].map((d) => (
        <GearLine
          key={d}
          cx={120 + Math.cos((d * Math.PI) / 180) * 29}
          cy={70 - Math.sin((d * Math.PI) / 180) * 29}
          r={11}
          teeth={10}
        />
      ))}
    </>
  ),
  // دو پولی و تسمه
  cvt: (
    <>
      <GearLine cx={68} cy={70} r={30} teeth={26} color={B} />
      <GearLine cx={172} cy={70} r={19} teeth={16} />
      <path d="M68 40 L172 51 M68 100 L172 89" stroke={A} strokeWidth={2.2} strokeDasharray="3 5" />
    </>
  ),
  // دو دیسک کلاچ
  dct: (
    <>
      <circle cx={92} cy={70} r={44} stroke={B} strokeWidth={2} />
      <circle cx={148} cy={70} r={44} stroke={A} strokeWidth={2} />
      <circle cx={92} cy={70} r={30} stroke={B} strokeWidth={5} strokeDasharray="4 6" />
      <circle cx={148} cy={70} r={30} stroke={A} strokeWidth={5} strokeDasharray="4 6" />
      <circle cx={92} cy={70} r={7} stroke={B} strokeWidth={2} />
      <circle cx={148} cy={70} r={7} stroke={A} strokeWidth={2} />
    </>
  ),
  // چرخ‌دنده + محرک
  amt: (
    <>
      <GearLine cx={92} cy={70} r={36} teeth={30} />
      <rect x={150} y={56} width={64} height={28} rx={8} stroke={B} strokeWidth={2} />
      <path d="M150 70 H132" stroke={A} strokeWidth={2.4} />
      <path d="M170 56 V44 M194 56 V44" stroke={B} strokeWidth={2} />
    </>
  ),
  // قطره‌ی روغن
  oil: (
    <>
      <path d="M120 22 C120 22 88 60 88 84 a32 32 0 0 0 64 0 C152 60 120 22 120 22 Z" stroke={A} strokeWidth={2.4} />
      <path d="M104 88 a16 16 0 0 0 14 16" stroke={A} strokeWidth={2} />
      <path d="M40 124 q16 -10 32 0 t32 0 t32 0 t32 0 t32 0" stroke={B} strokeWidth={2} />
    </>
  ),
  // ولوبادی و شیربرقی
  valve: (
    <>
      <rect x={52} y={34} width={136} height={80} rx={10} stroke={B} strokeWidth={2} />
      <path d="M52 58 H92 V84 H140 V54 H188" stroke={A} strokeWidth={2.4} />
      <path d="M52 100 H120 V80" stroke={A} strokeWidth={2.4} />
      <circle cx={52} cy={58} r={4.5} fill={A} stroke="none" />
      <circle cx={188} cy={54} r={4.5} fill={A} stroke="none" />
      <path d="M78 34 V22 M120 34 V22 M162 34 V22" stroke={B} strokeWidth={5} />
    </>
  ),
  // مبدل گشتاور
  converter: (
    <>
      <circle cx={120} cy={70} r={54} stroke={B} strokeWidth={2} />
      <circle cx={120} cy={70} r={30} stroke={B} strokeWidth={2} />
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2;
        return (
          <path
            key={i}
            d={`M${120 + Math.cos(a) * 32} ${70 + Math.sin(a) * 32} L${120 + Math.cos(a + 0.35) * 52} ${70 + Math.sin(a + 0.35) * 52}`}
            stroke={A}
            strokeWidth={1.6}
          />
        );
      })}
      <circle cx={120} cy={70} r={9} stroke={A} strokeWidth={2} />
    </>
  ),
  // عیب‌یابی با دیاگ
  diag: (
    <>
      <path d="M24 30 H216 M24 70 H216 M24 110 H216 M60 22 V118 M120 22 V118 M180 22 V118" stroke={B} strokeWidth={1} opacity={0.6} />
      <path d="M20 72 H62 L74 34 L90 108 L106 56 L120 72 H164 L176 46 L192 98 L204 72 H222" stroke={A} strokeWidth={2.6} />
      <circle cx={222} cy={72} r={4} fill={A} stroke="none" />
    </>
  ),
};

export type ArtName = keyof typeof arts;

export function Art({ name }: { name: string }) {
  return (
    <svg
      className="art"
      viewBox="0 0 240 140"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {arts[name] ?? arts.at}
    </svg>
  );
}

/** دستگیره‌ی دنده با دروازه‌ی P R N D */
export function ShifterArt() {
  const letters = ["P", "R", "N", "D"];
  return (
    <svg viewBox="0 0 200 280" fill="none" strokeLinecap="round" aria-hidden="true" focusable="false">
      <rect x={16} y={14} width={168} height={252} rx={26} stroke={B} strokeWidth={2} />
      <rect x={88} y={44} width={30} height={192} rx={15} stroke={B} strokeWidth={2} />
      {letters.map((l, i) => (
        <text
          key={l}
          x={52}
          y={72 + i * 50}
          textAnchor="middle"
          fontSize={22}
          fontWeight={700}
          fill={l === "D" ? A : B}
          stroke="none"
        >
          {l}
        </text>
      ))}
      <rect x={72} y={150} width={62} height={92} rx={24} fill="var(--surface)" stroke={A} strokeWidth={2.4} />
      <path d="M84 176 H122" stroke={A} strokeWidth={2} opacity={0.7} />
    </svg>
  );
}

const postMap: Record<string, string> = {
  "automatic-transmission-repair-cost": "diag",
  "atf-change-interval": "oil",
  "at-vs-cvt-vs-dct": "dct",
  "keep-automatic-gearbox-healthy": "converter",
};
export const postArtName = (slug: string) => postMap[slug] ?? "at";

export const serviceArtName = (slug: string) =>
  ({
    "automatic-gearbox-repair": "at",
    "cvt-gearbox-repair": "cvt",
    "dct-gearbox-repair": "dct",
    "amt-gearbox-repair": "amt",
    "gearbox-oil-change": "oil",
    "valve-body-solenoid-repair": "valve",
    "torque-converter-repair": "converter",
    "gearbox-diagnostics": "diag",
  })[slug] ?? "at";
