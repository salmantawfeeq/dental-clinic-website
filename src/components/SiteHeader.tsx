import Link from "next/link";
import { clinicInfo } from "@/lib/clinicInfo";

export function SiteHeader() {
  return (
    <header style={{ borderBottom: "1px solid var(--color-border)", position: "sticky", top: 0, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)", zIndex: 10 }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: "1.15rem", color: "var(--color-primary-dark)" }}>
          {clinicInfo.name}
        </Link>
        <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {clinicInfo.phone && (
            <a href={`tel:${clinicInfo.phone}`} style={{ color: "var(--color-ink-soft)", fontSize: "0.95rem" }}>
              {clinicInfo.phone}
            </a>
          )}
          <Link href="/book" className="btn btn-primary" style={{ padding: "10px 22px", fontSize: "0.95rem" }}>
            احجز موعدك
          </Link>
        </nav>
      </div>
    </header>
  );
}
