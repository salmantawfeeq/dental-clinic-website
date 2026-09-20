import Link from "next/link";
import { clinicInfo } from "@/lib/clinicInfo";
import { IconPhone, IconWhatsapp } from "./icons";

const navItems = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "عن الدكتور" },
  { href: "/services", label: "الخدمات" },
  { href: "/contact", label: "تواصل معنا" },
];

export function SiteHeader() {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--color-border)",
        position: "sticky",
        top: 0,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(10px)",
        zIndex: 20,
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 78, gap: 16 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 800, fontSize: "1.05rem", color: "var(--color-primary-darker)" }}>
          <span
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              flexShrink: 0,
            }}
          >
            🦷
          </span>
          <span className="header-logo-name">{clinicInfo.name}</span>
        </Link>

        <nav className="nav-links">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-contact">
          <a href={clinicInfo.whatsappHref} target="_blank" rel="noopener noreferrer" className="header-icon-link" style={{ color: "#25D366", display: "flex", alignItems: "center", gap: 6 }} aria-label="واتساب">
            <IconWhatsapp size={22} />
          </a>
          <a href={clinicInfo.phoneHref} className="header-icon-link" style={{ color: "var(--color-ink-soft)", display: "flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
            <IconPhone size={18} />
            <span dir="ltr">{clinicInfo.phoneDisplay}</span>
          </a>
          <Link href="/book" className="btn btn-primary" style={{ padding: "12px 26px", fontSize: "0.95rem" }}>
            احجز موعدك
          </Link>
        </div>
      </div>
    </header>
  );
}
