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

export function IconWhatsapp({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.6 14.3c-.2.7-1.4 1.3-2 1.4-.5.1-1.1.1-1.8-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 .9-2.3c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.8.8 1.9.1.2.1.3 0 .5-.1.2-.1.3-.3.5-.1.2-.3.4-.4.5-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.5 1.5.2.1.4.1.5-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.4.2.5.3.1.2.1.7-.1 1.3Z" />
    </svg>
  );
}

export function IconFacebook({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.4c0-.9.2-1.5 1.5-1.5h1.6V4.3C16.3 4.2 15.3 4 14.2 4c-2.3 0-3.9 1.4-3.9 4v2.5H7.8v3h2.5V21h3.2Z" />
    </svg>
  );
}

export function IconGraduationCap({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M2 8.5 12 4l10 4.5-10 4.5-10-4.5Z" />
      <path d="M6 10.7v4.3c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.3" />
      <path d="M22 8.5v6" />
    </svg>
  );
}

export function IconMenu({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
