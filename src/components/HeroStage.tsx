"use client";

import { useEffect, useRef, useState } from "react";

/**
 * صحنه‌ی سه‌بعدی هیرو. فقط تزئینی است (aria-hidden) و متن هیرو مستقل از آن رندر می‌شود.
 * کد three.js جدا و با تأخیر (بعد از بیکاری مرورگر) بارگذاری می‌شود تا سرعت لود صفحه کم نشود.
 * اگر WebGL در دسترس نباشد یا کاربر «صرفه‌جویی داده» را روشن کرده باشد، همان تصویر ثابت می‌ماند.
 */
export function HeroStage() {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;

    let cancelled = false;
    let dispose: (() => void) | undefined;

    const start = async () => {
      try {
        const { mountGearbox } = await import("./gearbox-scene");
        if (cancelled) return;
        dispose = mountGearbox(el, {
          reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        });
        setReady(true);
      } catch (err) {
        /* WebGL در دسترس نیست؛ تصویر ثابت کافی است */
        console.warn("[gearbox-3d]", err);
      }
    };

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(start, { timeout: 1500 });
    } else {
      timeoutId = setTimeout(start, 300);
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      dispose?.();
    };
  }, []);

  return (
    <div className={`stage${ready ? " is-ready" : ""}`} aria-hidden="true">
      <svg className="stage__poster" viewBox="0 0 400 400" fill="none" focusable="false">
        <PosterGear cx={200} cy={200} r={146} teeth={48} tone="#3a444f" ring />
        <PosterGear cx={200} cy={200} r={44} teeth={18} tone="#9aa6b3" />
        {[90, 210, 330].map((d) => (
          <PosterGear
            key={d}
            cx={200 + Math.cos((d * Math.PI) / 180) * 84}
            cy={200 - Math.sin((d * Math.PI) / 180) * 84}
            r={36}
            teeth={15}
            tone="#7d8996"
            hub="#f5891f"
          />
        ))}
      </svg>
      <div className="stage__gl" ref={host} />
    </div>
  );
}

/** نسخه‌ی ساده‌ی ثابت (بدون WebGL): چرخ‌دنده با ترفند stroke-dasharray */
function PosterGear({
  cx,
  cy,
  r,
  teeth,
  tone,
  ring = false,
  hub,
}: {
  cx: number;
  cy: number;
  r: number;
  teeth: number;
  tone: string;
  ring?: boolean;
  hub?: string;
}) {
  const c = 2 * Math.PI * (r + 4);
  const u = c / teeth;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 4} stroke={tone} strokeWidth={9} strokeDasharray={`${u * 0.45} ${u * 0.55}`} />
      {ring ? (
        <circle cx={cx} cy={cy} r={r + 26} stroke={tone} strokeWidth={26} />
      ) : (
        <circle cx={cx} cy={cy} r={r} fill={tone} />
      )}
      {!ring && <circle cx={cx} cy={cy} r={r * 0.3} fill={hub ?? "#0c1117"} />}
    </g>
  );
}
