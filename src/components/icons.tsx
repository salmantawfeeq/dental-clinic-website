type IconProps = { size?: number };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconTooth({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M12 3c-2 0-2.5 1-4 1S5 3 3.5 4C2 5 2 7.5 2.5 10c.5 2.5 1.5 3.5 2 6 .4 2 1 4 2.2 4 1.3 0 1.3-2.3 1.8-4.3.3-1.3.8-2.2 1.5-2.2s1.2.9 1.5 2.2c.5 2 .5 4.3 1.8 4.3 1.2 0 1.8-2 2.2-4 .5-2.5 1.5-3.5 2-6 .5-2.5.5-5-1-6-1.5-1-2.5 0-4-1Z" />
    </svg>
  );
}

export function IconClock({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

export function IconShield({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function IconCalendarCheck({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M3 9.5h18" />
      <path d="M8 3v3M16 3v3" />
      <path d="M8.5 14l2 2 4-4.5" />
    </svg>
  );
}

export function IconPhone({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M4.5 3.5h3.2l1.6 4.2-2 1.7a13 13 0 0 0 5.3 5.3l1.7-2 4.2 1.6v3.2c0 1-.9 1.9-2 1.7-6.5-1-11.8-6.3-12.8-12.8-.2-1.1.7-2 1.8-2Z" />
    </svg>
  );
}

export function IconMapPin({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function IconWallet({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M3 10h18" />
      <path d="M15 14.5h3" />
    </svg>
  );
}

export function IconSparkle({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M12 3l1.6 4.9L18.5 9l-4.9 1.6L12 15.5l-1.6-4.9L5.5 9l4.9-1.6L12 3Z" />
      <path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
    </svg>
  );
}
