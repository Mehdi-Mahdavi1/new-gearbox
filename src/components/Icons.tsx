type P = { size?: number };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PhoneIcon({ size = 20 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

export function ChatIcon({ size = 20 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z" />
    </svg>
  );
}

/** فلش به چپ (جهت خواندن در RTL) */
export function ChevronIcon({ size = 18 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} strokeWidth={2} aria-hidden="true">
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function ArrowIcon({ size = 20 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} strokeWidth={2} aria-hidden="true">
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function ShieldIcon({ size = 32 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" {...stroke} aria-hidden="true">
      <path d="M16 3.5l10 3.6v8c0 6.2-4.1 10.7-10 13.4-5.9-2.7-10-7.2-10-13.4v-8L16 3.5z" />
      <path d="M11.5 15.8l3.3 3.3 6-6.4" />
    </svg>
  );
}

export function GaugeIcon({ size = 32 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" {...stroke} aria-hidden="true">
      <path d="M5.2 22.5a12 12 0 1121.6 0" />
      <path d="M16 20.5l5.2-7.2" />
      <circle cx="16" cy="20.8" r="1.6" />
      <path d="M8.2 16.2l1.5.9M16 9v1.7M23.8 16.2l-1.5.9" />
    </svg>
  );
}

export function ClipboardIcon({ size = 32 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" {...stroke} aria-hidden="true">
      <rect x="7" y="5.5" width="18" height="22" rx="3" />
      <path d="M12 5.5V4.6a1.6 1.6 0 011.6-1.6h4.8A1.6 1.6 0 0120 4.6v.9" />
      <path d="M11.5 13h9M11.5 17.5h9M11.5 22h5" />
    </svg>
  );
}

export function ClockIcon({ size = 32 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" {...stroke} aria-hidden="true">
      <circle cx="16" cy="16" r="12" />
      <path d="M16 9.5V16l4.5 2.7" />
    </svg>
  );
}

export function MapPinIcon({ size = 28 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" {...stroke} aria-hidden="true">
      <path d="M16 29s9-7.8 9-15.2a9 9 0 10-18 0C7 21.2 16 29 16 29z" />
      <circle cx="16" cy="13.6" r="3.2" />
    </svg>
  );
}

/** نشان برند: چرخ‌دنده‌ی نارنجی با مرکز خالی */
export function LogoMark({ size = 38 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="14.6" style={{ stroke: "var(--accent)" }} strokeWidth="5.4" strokeDasharray="5.7 5.7" />
      <circle cx="20" cy="20" r="12.2" style={{ fill: "var(--accent)" }} />
      <circle cx="20" cy="20" r="5.6" style={{ fill: "var(--bg)" }} />
      <circle cx="20" cy="20" r="2" style={{ fill: "var(--accent)" }} />
    </svg>
  );
}
