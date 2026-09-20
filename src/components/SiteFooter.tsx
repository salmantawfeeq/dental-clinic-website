import Link from "next/link";
import { clinicInfo } from "@/lib/clinicInfo";
import { IconMapPin, IconPhone, IconClock, IconWhatsapp, IconFacebook } from "./icons";

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
          <p style={{ fontSize: "0.9rem", lineHeight: 1.8, margin: "0 0 16px", color: "rgba(255,255,255,0.65)" }}>
            {clinicInfo.doctorTitle} — {clinicInfo.doctorQualification}
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <a href={clinicInfo.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="واتساب" style={{ color: "rgba(255,255,255,0.8)" }}>
              <IconWhatsapp size={22} />
            </a>
            {clinicInfo.facebookUrl && (
              <a href={clinicInfo.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="فيسبوك" style={{ color: "rgba(255,255,255,0.8)" }}>
                <IconFacebook size={22} />
              </a>
            )}
          </div>
        </div>

        <div style={{ display: "grid", gap: 14, fontSize: "0.9rem" }}>
          <strong style={{ color: "white", marginBottom: 4 }}>تواصل معانا</strong>
          <a href={clinicInfo.phoneHref} style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.8)" }}>
            <IconPhone size={18} />
            <span dir="ltr">{clinicInfo.phoneDisplay}</span>
          </a>
          <a href={clinicInfo.whatsappHref} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.8)" }}>
            <IconWhatsapp size={18} />
            <span dir="ltr">{clinicInfo.whatsappDisplay}</span>
          </a>
          <a
            href={clinicInfo.mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "rgba(255,255,255,0.8)" }}
          >
            <IconMapPin size={18} />
            <span>{clinicInfo.address || "موقع العيادة على الخريطة"}</span>
          </a>
          <span style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.8)" }}>
            <IconClock size={18} />
            <span>{clinicInfo.hours}</span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
          <strong style={{ color: "white", marginBottom: 4 }}>روابط سريعة</strong>
          <Link href="/" style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem" }}>
            الرئيسية
          </Link>
          <Link href="/about" style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem" }}>
            عن الدكتور
          </Link>
          <Link href="/services" style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem" }}>
            الخدمات
          </Link>
          <Link href="/contact" style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem" }}>
            تواصل معنا
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
