import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getSupabasePublic } from "@/lib/supabasePublic";
import { clinicInfo } from "@/lib/clinicInfo";

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
  { title: "حجز فوري بدون انتظار", desc: "موعدك بيتأكد لحظة الحجز، من غير ما تنتظر رد من العيادة." },
  { title: "بدون أي رسوم", desc: "الحجز الأونلاين مجاني بالكامل — تدفع في العيادة وقت الكشف بس." },
  { title: "بياناتك محفوظة وآمنة", desc: "معلوماتك بتتحفظ في ملفك الطبي داخل العيادة، مش بتتشارك مع حد." },
];

export default async function HomePage() {
  const services = await getServices();

  return (
    <>
      <SiteHeader />

      <section style={{ padding: "72px 0 56px", background: "linear-gradient(180deg, var(--color-primary-light) 0%, #fff 100%)" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: 720 }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 800, lineHeight: 1.3, margin: 0 }}>
            ابتسامتك تستاهل عناية حقيقية
          </h1>
          <p style={{ fontSize: "1.15rem", color: "var(--color-ink-soft)", marginTop: 16 }}>
            {clinicInfo.name} — احجز موعدك أونلاين في أقل من دقيقة، بدون دفع وبدون انتظار موافقة.
          </p>
          <div style={{ marginTop: 32 }}>
            <Link href="/book" className="btn btn-primary" style={{ fontSize: "1.05rem" }}>
              احجز موعدك الآن
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 0" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {trustPoints.map((point) => (
            <div key={point.title} className="card" style={{ padding: 24 }}>
              <h3 style={{ margin: "0 0 8px", fontSize: "1.05rem" }}>{point.title}</h3>
              <p style={{ margin: 0, color: "var(--color-ink-soft)", fontSize: "0.95rem" }}>{point.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {services.length > 0 && (
        <section style={{ padding: "48px 0" }}>
          <div className="container">
            <h2 style={{ fontSize: "1.5rem", marginBottom: 24 }}>خدماتنا</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              {services.map((service) => (
                <div key={service.id as string} className="card" style={{ padding: 20 }}>
                  <strong>{service.name as string}</strong>
                  <p style={{ margin: "8px 0 0", color: "var(--color-ink-soft)", fontSize: "0.9rem" }}>
                    مدة الجلسة: {service.duration_min_minutes as number}–{service.duration_max_minutes as number} دقيقة
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </>
  );
}
