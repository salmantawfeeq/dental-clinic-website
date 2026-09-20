import Link from "next/link";
import { clinicInfo } from "@/lib/clinicInfo";
import { IconPhone } from "./icons";

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
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {clinicInfo.phone && (
            <a
              href={`tel:${clinicInfo.phone}`}
              style={{
                color: "var(--color-ink-soft)",
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 600,
              }}
            >
              <IconPhone size={18} />
              <span dir="ltr">{clinicInfo.phone}</span>
            </a>
          )}
          <Link href="/book" className="btn btn-primary" style={{ padding: "12px 26px", fontSize: "0.95rem" }}>
            احجز موعدك
          </Link>
        </nav>
      </div>
    </header>
  );
}
