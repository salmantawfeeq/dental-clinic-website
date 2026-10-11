import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { displayServices } from "@/lib/services";
import { clinicInfo } from "@/lib/clinicInfo";
import { IconTooth } from "@/components/icons";
import { asset } from "@/lib/basePath";

export const metadata: Metadata = {
  title: "الخدمات",
  description: `خدمات ${clinicInfo.name}: ${displayServices.map((s) => s.name).join("، ")}.`,
  alternates: { canonical: "/services/" },
};

// بند: نفس خلفية قسم "خدماتنا" في الصفحة الرئيسية، عشان الشكل يبقى متسق بين الاتنين.
const servicesPageBackgroundStyle = {
  backgroundColor: "var(--color-bg)",
  backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(240,253,250,0.75) 100%), url("${asset("services-bg.jpg")}")`,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />

      <section className="section" style={{ paddingTop: 56, ...servicesPageBackgroundStyle }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">خدماتنا</span>
            <h1 className="section-title">كل احتياجات أسنانك في مكان واحد</h1>
            <p className="section-subtitle">فريق متخصص وأحدث الأجهزة لعلاج شامل وآمن، من الكشف الدوري لحد الزراعة.</p>
          </div>

          <div className="grid-auto">
            {displayServices.map((service) => (
              <div key={service.name} className="feature-item">
                <div className="icon-badge">
                  <IconTooth />
                </div>
                <div>
                  <strong style={{ fontSize: "1.05rem" }}>{service.name}</strong>
                  <p style={{ margin: "6px 0 0", color: "var(--color-ink-soft)", fontSize: "0.92rem" }}>{service.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/book" className="btn btn-primary" style={{ fontSize: "1.05rem" }}>
              احجز موعدك الآن
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
