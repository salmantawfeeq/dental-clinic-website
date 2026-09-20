import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingWizard } from "@/components/BookingWizard";
import { getSupabasePublic } from "@/lib/supabasePublic";

type ServiceRow = { id: string; name: string; duration_min_minutes: number; duration_max_minutes: number };

async function getServices(): Promise<ServiceRow[]> {
  try {
    const supabase = getSupabasePublic();
    const { data } = await supabase
      .from("services")
      .select("id, name, duration_min_minutes, duration_max_minutes")
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    return (data ?? []) as ServiceRow[];
  } catch {
    // Supabase لسه مش متظبط (بند Phase 6) — الصفحة تفضل تشتغل، الحجز نفسه هيفشل لحد ما يتظبط.
    return [];
  }
}

export default async function BookPage() {
  const services = await getServices();

  return (
    <>
      <SiteHeader />
      <div className="container" style={{ padding: "56px 0 96px", maxWidth: 640 }}>
        <span className="eyebrow">احجز موعدك</span>
        <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, margin: "14px 0 8px" }}>
          خلّي موعدك جاهز في أقل من دقيقة
        </h1>
        <p style={{ color: "var(--color-ink-soft)", marginTop: 0, marginBottom: 36, fontSize: "1.02rem" }}>
          الحجز مجاني وبيتأكد فورًا — من غير ما تحتاج تدفع أو تستنى موافقة.
        </p>
        <BookingWizard services={services} />
      </div>
      <SiteFooter />
    </>
  );
}
