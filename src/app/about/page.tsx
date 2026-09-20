import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { clinicInfo } from "@/lib/clinicInfo";
import { asset } from "@/lib/basePath";
import { IconGraduationCap, IconShield, IconSparkle } from "@/components/icons";

const highlights = [
  { icon: <IconGraduationCap />, title: "المؤهل العلمي", desc: clinicInfo.doctorQualification },
  { icon: <IconSparkle />, title: "دقة في التشخيص والتنفيذ", desc: "اهتمام بأدق التفاصيل، خصوصًا في الحالات الجراحية الدقيقة." },
  { icon: <IconShield />, title: "رعاية موثوقة", desc: "متابعة كاملة لحالتك من الكشف لحد ما تخلص علاج." },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <section className="section" style={{ paddingTop: 56, paddingBottom: 0 }}>
        <div className="container about-grid" style={{ display: "grid", gridTemplateColumns: "0.75fr 1.25fr", gap: 56, alignItems: "center" }}>
          <div
            style={{
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: "var(--shadow-lift)",
              border: "6px solid white",
              aspectRatio: "4 / 5",
              maxWidth: 360,
            }}
          >
            <img src={asset("doctor-photo.jpg")} alt={clinicInfo.doctorName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          <div>
            <span className="eyebrow">عن الدكتور</span>
            <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 800, margin: "16px 0 8px" }}>{clinicInfo.doctorName}</h1>
            <p style={{ fontSize: "1.15rem", color: "var(--color-primary-dark)", fontWeight: 700, margin: "0 0 4px" }}>{clinicInfo.doctorTitle}</p>
            <p style={{ fontSize: "1.05rem", color: "var(--color-ink-soft)", marginBottom: 28 }}>{clinicInfo.doctorQualification}</p>

            <Link href="/book" className="btn btn-primary">
              احجز موعدك مع {clinicInfo.doctorName}
            </Link>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          {clinicInfo.doctorBio.map((paragraph, i) => (
            <p key={i} style={{ fontSize: "1.08rem", lineHeight: 1.9, color: "var(--color-ink)", marginBottom: 20 }}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="section" style={{ background: "var(--color-bg-soft)" }}>
        <div className="container">
          <div className="grid-auto">
            {highlights.map((h) => (
              <div key={h.title} className="feature-item">
                <div className="icon-badge">{h.icon}</div>
                <div>
                  <strong style={{ fontSize: "0.98rem" }}>{h.title}</strong>
                  <p style={{ margin: "4px 0 0", color: "var(--color-ink-soft)", fontSize: "0.92rem" }}>{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/book" className="btn btn-primary" style={{ fontSize: "1.05rem" }}>
              احجز موعدك مع {clinicInfo.doctorName}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
