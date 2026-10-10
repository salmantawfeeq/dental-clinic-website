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
          اعرف معادك باقي قد إيه
        </h1>
        <p style={{ color: "var(--color-ink-soft)", marginTop: 0, marginBottom: 36, fontSize: "1.02rem" }}>
          لو حجزت أونلاين أو بتليفون في العيادة، اكتب رقم تليفونك واسمك أو كود الحجز عشان تعرف معادك، ولو
          كنت داخل العيادة دلوقتي هتعرف قدامك كام واحد في الطابور.
        </p>
        <FollowUpLookup />
      </div>
      <SiteFooter />
    </>
  );
}
