import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { clinicInfo } from "@/lib/clinicInfo";
import { IconPhone, IconWhatsapp, IconClock, IconMapPin, IconFacebook } from "@/components/icons";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">تواصل معنا</span>
            <h1 className="section-title">إحنا هنا لأي استفسار</h1>
            <p className="section-subtitle">اتصل، ابعت واتساب، أو احجز موعدك مباشر أونلاين.</p>
          </div>

          <div className="grid-auto" style={{ maxWidth: 900, margin: "0 auto" }}>
            <a href={clinicInfo.phoneHref} className="card interactive" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 12, alignItems: "center", textAlign: "center" }}>
              <div className="icon-badge">
                <IconPhone />
              </div>
              <strong>اتصل بينا</strong>
              <span style={{ color: "var(--color-ink-soft)" }} dir="ltr">
                {clinicInfo.phoneDisplay}
              </span>
            </a>

            <a
              href={clinicInfo.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{ padding: 28, display: "flex", flexDirection: "column", gap: 12, alignItems: "center", textAlign: "center" }}
            >
              <div className="icon-badge" style={{ color: "#25D366" }}>
                <IconWhatsapp />
              </div>
              <strong>واتساب</strong>
              <span style={{ color: "var(--color-ink-soft)" }} dir="ltr">
                {clinicInfo.whatsappDisplay}
              </span>
            </a>

            <div className="card interactive" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 12, alignItems: "center", textAlign: "center" }}>
              <div className="icon-badge">
                <IconClock />
              </div>
              <strong>مواعيد العمل</strong>
              <span style={{ color: "var(--color-ink-soft)" }}>{clinicInfo.hours}</span>
            </div>

            <a
              href={clinicInfo.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card"
              style={{ padding: 28, display: "flex", flexDirection: "column", gap: 12, alignItems: "center", textAlign: "center" }}
            >
              <div className="icon-badge">
                <IconMapPin />
              </div>
              <strong>موقع العيادة</strong>
              <span style={{ color: "var(--color-ink-soft)" }}>{clinicInfo.address || "احصل على الاتجاهات"}</span>
            </a>

            {clinicInfo.facebookUrl && (
              <a
                href={clinicInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card"
                style={{ padding: 28, display: "flex", flexDirection: "column", gap: 12, alignItems: "center", textAlign: "center" }}
              >
                <div className="icon-badge">
                  <IconFacebook />
                </div>
                <strong>فيسبوك</strong>
                <span style={{ color: "var(--color-ink-soft)" }}>تابعنا لآخر الأخبار والعروض</span>
              </a>
            )}
          </div>

          <div
            className="card"
            style={{ marginTop: 32, maxWidth: 900, marginInline: "auto", overflow: "hidden", padding: 0, aspectRatio: "16 / 8" }}
          >
            <iframe
              src={clinicInfo.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع العيادة على الخريطة"
            />
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/book" className="btn btn-primary" style={{ fontSize: "1.05rem" }}>
              احجز موعدك أونلاين
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
