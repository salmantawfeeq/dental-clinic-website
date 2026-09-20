import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getSupabasePublic } from "@/lib/supabasePublic";
import { clinicInfo } from "@/lib/clinicInfo";
import { asset } from "@/lib/basePath";
import { IconTooth, IconClock, IconShield, IconCalendarCheck, IconWallet, IconSparkle } from "@/components/icons";

async function getServices() {
  try {
    const supabase = getSupabasePublic();
    const { data } = await supabase
      .from("services")
      .select("id, name, duration_min_minutes, duration_max_minutes")
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    return data ?? [];
  } catch {
    // Supabase لسه مش متظبط (بند Phase 6) — الصفحة تفضل تشتغل من غير قسم الخدمات لحد ما يتظبط.
    return [];
  }
}

const trustPoints = [
  { icon: <IconCalendarCheck />, title: "حجز فوري بدون انتظار", desc: "موعدك بيتأكد لحظة الحجز مباشرة، من غير ما تنتظر رد من حد." },
  { icon: <IconWallet />, title: "بدون أي رسوم", desc: "الحجز الأونلاين مجاني بالكامل — تدفع في العيادة وقت الكشف بس." },
  { icon: <IconShield />, title: "بياناتك محفوظة وآمنة", desc: "معلوماتك بتتحفظ في ملفك الطبي داخل العيادة، مش بتتشارك مع حد." },
  { icon: <IconClock />, title: "مواعيد مسائية مريحة", desc: "العيادة فاتحة يوميًا من 4 العصر لحد 11 بالليل، تختار الوقت المناسب لك." },
];

export default async function HomePage() {
  const services = await getServices();

  return (
    <>
      <SiteHeader />

      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", padding: "72px 0 96px" }}>
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
              <IconSparkle size={16} /> رعاية أسنان بمعايير عالمية
            </span>
            <h1 style={{ fontSize: "clamp(2rem, 4.2vw, 3.1rem)", fontWeight: 800, lineHeight: 1.25, margin: "18px 0 0", letterSpacing: "-0.02em" }}>
              ابتسامتك تستاهل عناية حقيقية
            </h1>
            <p style={{ fontSize: "1.15rem", color: "var(--color-ink-soft)", marginTop: 18, maxWidth: 480 }}>
              {clinicInfo.name} — احجز موعدك أونلاين في أقل من دقيقة، بدون دفع وبدون انتظار موافقة.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 32 }}>
              <Link href="/book" className="btn btn-primary" style={{ fontSize: "1.05rem" }}>
                احجز موعدك الآن
              </Link>
              {clinicInfo.phone && (
                <a href={`tel:${clinicInfo.phone}`} className="btn btn-outline" style={{ fontSize: "1.05rem" }}>
                  اتصل بالعيادة
                </a>
              )}
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
                alt={clinicInfo.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust points */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid-auto">
            {trustPoints.map((point) => (
              <div key={point.title} className="card" style={{ padding: 24 }}>
                <div className="icon-badge">{point.icon}</div>
                <h3 style={{ margin: "16px 0 6px", fontSize: "1.02rem" }}>{point.title}</h3>
                <p style={{ margin: 0, color: "var(--color-ink-soft)", fontSize: "0.92rem" }}>{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      {services.length > 0 && (
        <section className="section" style={{ background: "var(--color-bg-soft)" }}>
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">خدماتنا</span>
              <h2 className="section-title">كل احتياجات أسنانك في مكان واحد</h2>
              <p className="section-subtitle">فريق متخصص وأحدث الأجهزة لعلاج شامل وآمن.</p>
            </div>
            <div className="grid-auto">
              {services.map((service) => (
                <div key={service.id as string} className="card" style={{ padding: 24, display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div className="icon-badge">
                    <IconTooth />
                  </div>
                  <div>
                    <strong style={{ fontSize: "1.02rem" }}>{service.name as string}</strong>
                    <p style={{ margin: "6px 0 0", color: "var(--color-ink-soft)", fontSize: "0.88rem" }}>
                      مدة الجلسة: {service.duration_min_minutes as number}–{service.duration_max_minutes as number} دقيقة
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
