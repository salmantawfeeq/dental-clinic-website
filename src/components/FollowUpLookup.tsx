"use client";

import { useState } from "react";
import { getSupabasePublic } from "@/lib/supabasePublic";

interface AppointmentStatusResult {
  scheduled_at: string;
  checked_in: boolean;
  queue_ahead_count: number | null;
}

interface OnlineBookingStatusResult {
  status: string;
  sync_error: string | null;
}

// بند: لو الحجز لسه قيد المزامنة أو اتقفل لمراجعة يدوية، الحجز "موجود فعلاً" من وجهة نظر المريض —
// مش "مش موجود خالص". راجع تعليق lookup_online_booking_status في schema.sql للتفصيل الكامل.
function pendingBookingMessage(booking: OnlineBookingStatusResult): string {
  if (booking.status !== "failed") {
    return "📥 حجزك وصل لينا وجاري تأكيده حاليًا — جرب تاني بعد شوية.";
  }
  if (booking.sync_error === "name_phone_mismatch") {
    return "⚠️ حجزك محتاج مراجعة من العيادة قبل التأكيد — برجاء الاتصال بالعيادة مباشرة.";
  }
  return "⚠️ حصلت مشكلة في تأكيد حجزك — برجاء الاتصال بالعيادة مباشرة.";
}

const inputStyle: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid var(--color-border)",
  fontSize: "1rem",
  fontFamily: "inherit",
};

// بند: قبل ما المريض يعمل Check-in فعليًا في العيادة، مفيش رقم طابور حقيقي ليه أصلًا — فبنحسب هنا بس
// "باقي قد إيه" من وقت الموعد نفسه (scheduled_at)، من غير أي بيانات طابور لازمة. بعد الـCheck-in،
// الرقم الحقيقي (قدامك كام واحد) بييجي من السيرفر مباشرة.
function formatTimeRemaining(scheduledAt: string): string {
  const diffMs = new Date(scheduledAt).getTime() - Date.now();

  // بند (باگ حقيقي اكتُشف 2026-10-11): كان الشرط هنا diffMs <= 0 بس — يعني معاد فات من 10 دقايق ومعاد
  // فات من 6 ساعات كانوا بيطلعوا بنفس الرسالة بالظبط "معادك دلوقتي تقريبًا"، وده مضلل تمامًا لمعاد فات
  // من زمان. ساعة كاملة هامش معقول (ممكن المريض وصل ولسه السكرتيرة مسجلتش حضوره على النظام)، وبعدها
  // بنوضح إنه فات فعلاً، بنفس صيغة "باقي قد إيه" لكن بالعكس.
  if (diffMs <= 0) {
    const pastMinutes = Math.round(-diffMs / 60000);
    if (pastMinutes <= 60) return "معادك دلوقتي تقريبًا";
    const pastHours = Math.round(pastMinutes / 60);
    if (pastHours < 24) return `معادك ده فات من حوالي ${pastHours} ساعة`;
    const pastDays = Math.round(pastHours / 24);
    return `معادك ده فات من حوالي ${pastDays} يوم`;
  }

  const minutes = Math.round(diffMs / 60000);
  if (minutes < 60) return `باقي حوالي ${minutes} دقيقة`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `باقي حوالي ${hours} ساعة`;
  const days = Math.round(hours / 24);
  return `باقي حوالي ${days} يوم`;
}

function formatDateTime(scheduledAt: string): string {
  return new Date(scheduledAt).toLocaleString("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function FollowUpLookup() {
  const [phone, setPhone] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AppointmentStatusResult | null>(null);
  const [pendingBooking, setPendingBooking] = useState<OnlineBookingStatusResult | null>(null);
  const [searched, setSearched] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!phone.trim() || !identifier.trim()) {
      setError("لازم تكتب رقم التليفون والاسم (أو كود الحجز).");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setPendingBooking(null);
    setSearched(false);

    try {
      const supabase = getSupabasePublic();
      const { data, error: rpcError } = await supabase.rpc("lookup_appointment_status", {
        p_phone: phone.trim(),
        p_identifier: identifier.trim(),
      });

      if (rpcError) throw rpcError;
      const found = Array.isArray(data) && data.length > 0 ? (data[0] as AppointmentStatusResult) : null;
      setResult(found);

      // مفيش موعد مؤكد — قبل ما نقول "مفيش حجز خالص"، نتأكد إنه مش لسه قيد المزامنة أو قفل لمراجعة يدوية.
      if (!found) {
        const { data: bookingData } = await supabase.rpc("lookup_online_booking_status", {
          p_phone: phone.trim(),
          p_identifier: identifier.trim(),
        });
        const pending =
          Array.isArray(bookingData) && bookingData.length > 0 ? (bookingData[0] as OnlineBookingStatusResult) : null;
        setPendingBooking(pending);
      }

      setSearched(true);
    } catch {
      setError("حصل خطأ أثناء البحث — حاول تاني بعد شوية.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card" style={{ padding: 24 }}>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>رقم التليفون</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
            inputMode="numeric"
          />
        </label>
        <label style={{ display: "grid", gap: 6 }}>
          <span>اسمك الثلاثي أو كود الحجز</span>
          <input
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            style={inputStyle}
          />
        </label>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "بيتم البحث..." : "استعلام عن معادي"}
        </button>
      </form>

      {error && <p style={{ color: "var(--color-danger, #c0392b)", marginTop: 16 }}>{error}</p>}

      {searched && !error && !result && pendingBooking && (
        <p style={{ marginTop: 16 }}>{pendingBookingMessage(pendingBooking)}</p>
      )}

      {searched && !error && !result && !pendingBooking && (
        <p style={{ marginTop: 16 }}>لم يتم العثور على حجز بهذه البيانات — تأكد من رقم التليفون والاسم/الكود.</p>
      )}

      {result && (
        <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--color-border)" }}>
          <p style={{ fontWeight: 700, fontSize: "1.05rem", margin: 0 }}>{formatDateTime(result.scheduled_at)}</p>
          {result.checked_in ? (
            <p style={{ marginTop: 8 }}>
              أنت في الطابور الآن — قدامك{" "}
              <strong>{result.queue_ahead_count ?? 0}</strong> {result.queue_ahead_count === 1 ? "شخص" : "أشخاص"}.
            </p>
          ) : (
            <p style={{ marginTop: 8 }}>{formatTimeRemaining(result.scheduled_at)}</p>
          )}
        </div>
      )}
    </div>
  );
}
