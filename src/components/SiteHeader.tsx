"use client";

import { useState } from "react";
import Link from "next/link";
import { clinicInfo } from "@/lib/clinicInfo";
import { IconPhone, IconWhatsapp, IconMenu, IconClose } from "./icons";

const navItems = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "عن الدكتور" },
  { href: "/services", label: "الخدمات" },
  { href: "/contact", label: "تواصل معنا" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        borderBottom: "1px solid var(--color-border)",
        position: "sticky",
        top: 0,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(10px)",
        zIndex: 30,
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
          <a href={clinicInfo.phoneHref} className="header-icon-link" style={{ color: "var(--color-ink-soft)", display: "flex", alignItems: "center" }} aria-label="اتصال">
            <IconPhone size={20} />
          </a>
          <Link href="/book" className="btn btn-primary" style={{ padding: "12px 22px", fontSize: "0.92rem" }}>
            احجز موعدك
          </Link>
          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <IconClose size={22} /> : <IconMenu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <div className="mobile-menu-contact">
            <a href={clinicInfo.phoneHref} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IconPhone size={18} /> اتصال
            </a>
            <a href={clinicInfo.whatsappHref} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, color: "#25D366" }}>
              <IconWhatsapp size={18} /> واتساب
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
