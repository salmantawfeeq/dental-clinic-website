export function HeroIllustration() {
  return (
    <svg viewBox="0 0 400 500" width="100%" height="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="chairGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0fdfa" />
          <stop offset="100%" stopColor="#ccfbf1" />
        </linearGradient>
      </defs>

      <rect width="400" height="500" fill="url(#bgGrad)" />

      {/* decorative circles */}
      <circle cx="60" cy="80" r="26" fill="#0d9488" opacity="0.12" />
      <circle cx="350" cy="430" r="40" fill="#d97706" opacity="0.12" />
      <circle cx="340" cy="70" r="14" fill="#0d9488" opacity="0.18" />

      {/* dental chair (simplified flat illustration) */}
      <g transform="translate(60,150)">
        {/* base */}
        <rect x="70" y="270" width="140" height="16" rx="8" fill="#0f766e" opacity="0.25" />
        <rect x="120" y="200" width="40" height="80" rx="10" fill="url(#chairGrad)" />
        {/* seat back */}
        <rect x="30" y="60" width="70" height="170" rx="18" fill="url(#chairGrad)" />
        {/* seat base */}
        <rect x="90" y="180" width="140" height="50" rx="18" fill="url(#chairGrad)" />
        {/* headrest */}
        <rect x="15" y="20" width="55" height="55" rx="16" fill="url(#chairGrad)" />
        {/* arm */}
        <rect x="220" y="140" width="90" height="14" rx="7" fill="#0d9488" />
        <circle cx="310" cy="147" r="10" fill="#0f766e" />
        {/* lamp arm */}
        <path d="M230 40 Q 300 10 320 70" stroke="#0d9488" strokeWidth="8" fill="none" strokeLinecap="round" />
        <circle cx="322" cy="72" r="22" fill="#fbbf24" opacity="0.9" />
        <circle cx="322" cy="72" r="22" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.6" />
      </g>

      {/* floating tooth icon */}
      <g transform="translate(255,60)">
        <circle cx="30" cy="30" r="30" fill="white" opacity="0.9" />
        <path
          d="M30 12c-6 0-7.5 3-12 3s-7.5-3-11-1c-4.5 3-4.5 10.5-3.5 17 1.5 7.5 4.5 10.5 6 18 1.2 6 3 12 6.6 12 3.9 0 3.9-6.9 5.4-12.9.9-3.9 2.4-6.6 4.5-6.6s3.6 2.7 4.5 6.6c1.5 6 1.5 12.9 5.4 12.9 3.6 0 5.4-6 6.6-12 1.5-7.5 4.5-10.5 6-18 1-6.5 1-14-3.5-17-3.5-2-7 1-11 1s-6-3-9-3Z"
          fill="var(--color-primary, #0d9488)"
          transform="translate(0,-3) scale(0.85)"
        />
      </g>

      <text x="200" y="470" textAnchor="middle" fontSize="15" fill="#0f766e" fontWeight="700" opacity="0.7">
        عناية أسنان بمعايير عالمية
      </text>
    </svg>
  );
}
