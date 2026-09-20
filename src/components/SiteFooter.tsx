import Link from "next/link";
import { clinicInfo } from "@/lib/clinicInfo";
import { IconMapPin, IconPhone, IconClock } from "./icons";

export function SiteFooter() {
  return (
    <footer style={{ background: "var(--color-primary-darker)", color: "rgba(255,255,255,0.85)", marginTop: 80 }}>
      <div className="container" style={{ padding: "56px 0 32px", display: "grid", gap: 32, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
              }}
            >
              🦷
            </span>
            <strong style={{ color: "white", fontSize: "1.05rem" }}>{clinicInfo.name}</strong>
          </div>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.8, margin: 0, color: "rgba(255,255,255,0.65)" }}>
            رعاية أسنان حديثة وموثوقة، بحجز أونلاين سهل وسريع، بدون أي رسوم.
          </p>
        </div>

        <div style={{ display: "grid", gap: 14, fontSize: "0.9rem" }}>
          <strong style={{ color: "white", marginBottom: 4 }}>تواصل معانا</strong>
          {clinicInfo.phone && (
            <a href={`tel:${clinicInfo.phone}`} style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.8)" }}>
              <IconPhone size={18} />
              <span dir="ltr">{clinicInfo.phone}</span>
            </a>
          )}
          {clinicInfo.address && (
            <span style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "rgba(255,255,255,0.8)" }}>
              <IconMapPin size={18} />
              <span>{clinicInfo.address}</span>
            </span>
          )}
          <span style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.8)" }}>
            <IconClock size={18} />
            <span>يوميًا من 4 عصرًا حتى 11 مساءً</span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
          <strong style={{ color: "white", marginBottom: 4 }}>روابط سريعة</strong>
          <Link href="/" style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem" }}>
            الرئيسية
          </Link>
          <Link href="/book" style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem" }}>
            احجز موعدك
          </Link>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
        <div className="container" style={{ padding: "18px 0", fontSize: "0.8rem", color: "rgba(255,255,255,0.55)" }}>
          © {new Date().getFullYear()} {clinicInfo.name} — جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}
