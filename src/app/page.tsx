import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { clinicInfo } from "@/lib/clinicInfo";
import { displayServices } from "@/lib/services";
import { asset } from "@/lib/basePath";
import { IconTooth, IconShield, IconCalendarCheck, IconWallet, IconSparkle } from "@/components/icons";

const trustPoints = [
  { icon: <IconCalendarCheck />, title: "حجز فوري بدون انتظار", desc: "موعدك بيتأكد لحظة الحجز مباشرة، من غير ما تنتظر رد من حد." },
  { icon: <IconWallet />, title: "بدون أي رسوم", desc: "الحجز الأونلاين مجاني بالكامل — تدفع في العيادة وقت الكشف بس." },
  { icon: <IconShield />, title: "بياناتك محفوظة وآمنة", desc: "معلوماتك بتتحفظ في ملفك الطبي داخل العيادة، مش بتتشارك مع حد." },
  { icon: <IconSparkle />, title: "خطة علاج مخصصة ليك", desc: "كل حالة بتتقيّم لوحدها وبتاخد خطة علاج تناسبها، مش حل واحد للكل." },
];

const stats = [
  { number: `${displayServices.length}+`, label: "خدمة متخصصة تحت سقف واحد" },
  { number: "24/7", label: "الحجز الأونلاين متاح في أي وقت" },
  { number: "0", label: "جنيه رسوم على الحجز الأونلاين" },
  { number: "1", label: "دقيقة بس لتأكيد ميعادك" },
];

const steps = [
  { n: "1", title: "اختار الخدمة", desc: "دور على الخدمة اللي محتاجها من قائمة خدماتنا الكاملة." },
  { n: "2", title: "اختار اليوم والوقت", desc: "شوف الأوقات المتاحة فعليًا واختار اللي يناسبك." },
  { n: "3", title: "تأكيد فوري", desc: "ميعادك بيتأكد على طول — بدون دفع، وبدون ما تستنى موافقة من حد." },
];

const faqs = [
  { q: "هل الحجز الأونلاين له أي رسوم؟", a: "لا، الحجز مجاني بالكامل من غير أي مقابل — بتدفع في العيادة وقت الكشف بس." },
  { q: "هل محتاج موافقة قبل ما ميعادي يتأكد؟", a: "لأ، بمجرد ما تخلص خطوات الحجز، ميعادك بيتأكد فورًا من غير أي انتظار." },
  { q: "لو حابب أأجل أو ألغي ميعادي أعمل إيه؟", a: "اتصل بينا أو ابعت رسالة على الواتساب وهنساعدك تظبط ميعادك زي ما يناسبك." },
  { q: "بياناتي هتتخزن فين؟", a: "بتتحفظ في ملفك الطبي جوه نظام العيادة الداخلي، ومش بتتشارك مع أي طرف تالت." },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", padding: "72px 0 64px" }}>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(60% 60% at 80% 10%, var(--color-primary-tint) 0%, #fff 60%)",
            zIndex: -1,
          }}
        />
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">
              <IconSparkle size={16} /> {clinicInfo.doctorTitle}
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 4.2vw, 3.1rem)", fontWeight: 800, lineHeight: 1.25, margin: "18px 0 0", letterSpacing: "-0.02em" }}>
              ابتسامتك تستاهل عناية حقيقية
            </h1>
            <p style={{ fontSize: "1.15rem", color: "var(--color-ink-soft)", marginTop: 18, maxWidth: 480 }}>
              {clinicInfo.name} — {clinicInfo.doctorQualification}.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 32 }}>
              <Link href="/book" className="btn btn-primary" style={{ fontSize: "1.05rem" }}>
                احجز موعدك الآن
              </Link>
              <a href={clinicInfo.phoneHref} className="btn btn-outline" style={{ fontSize: "1.05rem" }}>
                اتصل بالعيادة
              </a>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: "-10%",
                background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
                opacity: 0.18,
                filter: "blur(50px)",
                borderRadius: "50%",
                zIndex: -1,
              }}
            />
            <div
              style={{
                borderRadius: 28,
                overflow: "hidden",
                boxShadow: "var(--shadow-lift)",
                border: "6px solid white",
                aspectRatio: "4 / 5",
              }}
            >
              <img
                src={asset("doctor-photo.jpg")}
                alt={clinicInfo.doctorName}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ paddingBottom: 56 }}>
        <div className="container">
          <div className="grid-auto" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
            {stats.map((s) => (
              <div key={s.label} className="stat">
                <span className="stat-number">{s.number}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust points */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid-auto">
            {trustPoints.map((point) => (
              <div key={point.title} className="card interactive" style={{ padding: 24, height: "100%" }}>
                <div className="icon-badge">{point.icon}</div>
                <h3 style={{ margin: "16px 0 6px", fontSize: "1.02rem" }}>{point.title}</h3>
                <p style={{ margin: 0, color: "var(--color-ink-soft)", fontSize: "0.92rem" }}>{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section" style={{ background: "var(--color-bg-soft)" }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">إزاي تحجز؟</span>
            <h2 className="section-title">3 خطوات وموعدك جاهز</h2>
            <p className="section-subtitle">مفيش تعقيد، ومفيش انتظار رد.</p>
          </div>
          <div className="grid-auto">
            {steps.map((step) => (
              <div key={step.n} style={{ textAlign: "center", padding: "0 12px" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "1.2rem",
                    margin: "0 auto 16px",
                  }}
                >
                  {step.n}
                </div>
                <h3 style={{ margin: "0 0 8px", fontSize: "1.05rem" }}>{step.title}</h3>
                <p style={{ margin: 0, color: "var(--color-ink-soft)", fontSize: "0.92rem" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">خدماتنا</span>
            <h2 className="section-title">كل احتياجات أسنانك في مكان واحد</h2>
            <p className="section-subtitle">فريق متخصص وأحدث الأجهزة لعلاج شامل وآمن.</p>
          </div>
          <div className="grid-auto">
            {displayServices.slice(0, 3).map((service) => (
              <div key={service.name} className="card interactive" style={{ padding: 24, display: "flex", gap: 16, alignItems: "flex-start", height: "100%" }}>
                <div className="icon-badge">
                  <IconTooth />
                </div>
                <div>
                  <strong style={{ fontSize: "1.02rem" }}>{service.name}</strong>
                  <p style={{ margin: "6px 0 0", color: "var(--color-ink-soft)", fontSize: "0.88rem" }}>{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Link href="/services" className="btn btn-outline">
              اكتشف كل الخدمات
            </Link>
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="section" style={{ background: "var(--color-bg-soft)" }}>
        <div className="container about-grid" style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 48, alignItems: "center" }}>
          <div
            style={{
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "var(--shadow-card)",
              aspectRatio: "1 / 1",
              maxWidth: 320,
            }}
          >
            <img src={asset("doctor-photo.jpg")} alt={clinicInfo.doctorName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <span className="eyebrow">عن الدكتور</span>
            <h2 className="section-title" style={{ textAlign: "start" }}>
              {clinicInfo.doctorName}
            </h2>
            <p style={{ color: "var(--color-primary-dark)", fontWeight: 700, fontSize: "1.02rem", marginBottom: 12 }}>{clinicInfo.doctorTitle}</p>
            <p style={{ color: "var(--color-ink-soft)", fontSize: "1.02rem" }}>{clinicInfo.doctorBio[0]}</p>
            <Link href="/about" className="btn btn-outline" style={{ marginTop: 16 }}>
              اعرف أكتر
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <div className="section-head">
            <span className="eyebrow">أسئلة شائعة</span>
            <h2 className="section-title">حابب تعرف أكتر؟</h2>
          </div>
          <div>
            {faqs.map((faq) => (
              <details key={faq.q} className="faq-item">
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section style={{ padding: "72px 0" }}>
        <div className="container">
          <div
            style={{
              borderRadius: 28,
              padding: "56px 40px",
              textAlign: "center",
              background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-darker) 100%)",
              color: "white",
              boxShadow: "var(--shadow-lift)",
            }}
          >
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 800, margin: "0 0 12px" }}>
              جاهز تحجز موعدك؟
            </h2>
            <p style={{ margin: "0 0 28px", opacity: 0.9 }}>يستغرق أقل من دقيقة — بدون دفع، بدون انتظار.</p>
            <Link
              href="/book"
              className="btn"
              style={{ background: "white", color: "var(--color-primary-darker)", fontSize: "1.05rem" }}
            >
              احجز موعدك الآن
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
