import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingWizard } from "@/components/BookingWizard";
import { clinicInfo } from "@/lib/clinicInfo";

export const metadata: Metadata = {
  title: "احجز موعدك أونلاين",
  description: `احجز موعدك في ${clinicInfo.name} أونلاين في أقل من دقيقة، بدون دفع وبدون انتظار موافقة.`,
  alternates: { canonical: "/book/" },
};

// بند: الموقع Static، فجلب الخدمات وقت البناء هنا كان معناه قائمة الحجز بتفضل منسوخة لحظة آخر نشر —
// أي خدمة جديدة أو تعطيل خدمة في برنامج العيادة ميبانش غير بعد إعادة نشر يدوي. BookingWizard دلوقتي
// بيجيب الخدمات بنفسه من المتصفح (راجع تعليقه)، فمفيش داعي لجلبها هنا خالص.
export default function BookPage() {
  return (
    <>
      <SiteHeader />
      <div className="container" style={{ paddingTop: 56, paddingBottom: 96, maxWidth: 640 }}>
        <span className="eyebrow">احجز موعدك</span>
        <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, margin: "14px 0 8px" }}>
          خلّي موعدك جاهز في أقل من دقيقة
        </h1>
        <p style={{ color: "var(--color-ink-soft)", marginTop: 0, marginBottom: 36, fontSize: "1.02rem" }}>
          الحجز مجاني وبيتأكد فورًا — من غير ما تحتاج تدفع أو تستنى موافقة.
        </p>
        <BookingWizard />
      </div>
      <SiteFooter />
    </>
  );
}
