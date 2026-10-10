import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FollowUpLookup } from "@/components/FollowUpLookup";
import { clinicInfo } from "@/lib/clinicInfo";

export const metadata: Metadata = {
  title: "متابعة الموعد",
  description: `اعرف معاد حجزك في ${clinicInfo.name}، ولو كنت في العيادة دلوقتي اعرف قدامك كام واحد في الطابور.`,
  alternates: { canonical: "/follow-up/" },
};

export default function FollowUpPage() {
  return (
    <>
      <SiteHeader />
      <div className="container" style={{ paddingTop: 56, paddingBottom: 96, maxWidth: 640 }}>
        <span className="eyebrow">متابعة الموعد</span>
        <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, margin: "14px 0 8px" }}>
          اعرف باقي قد إيه على معادك
        </h1>
        <p style={{ color: "var(--color-ink-soft)", marginTop: 0, marginBottom: 36, fontSize: "1.02rem" }}>
          اكتب رقم تليفونك واسمك أو كود الحجز، واعرف بدقة الوقت المتبقي على موعدك — وبعد وصولك للعيادة،
          تابع دورك واعرف كام كشف قبلك بالضبط من خلال الصفحة دي.
        </p>
        <FollowUpLookup />
      </div>
      <SiteFooter />
    </>
  );
}
