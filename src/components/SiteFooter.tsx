import { clinicInfo } from "@/lib/clinicInfo";

export function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--color-border)", marginTop: 80, padding: "40px 0", color: "var(--color-ink-soft)" }}>
      <div className="container" style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.9rem" }}>
        <strong style={{ color: "var(--color-ink)" }}>{clinicInfo.name}</strong>
        {clinicInfo.address && <span>{clinicInfo.address}</span>}
        {clinicInfo.phone && <span>{clinicInfo.phone}</span>}
        <span style={{ marginTop: 12, fontSize: "0.8rem" }}>© {new Date().getFullYear()} جميع الحقوق محفوظة.</span>
      </div>
    </footer>
  );
}
