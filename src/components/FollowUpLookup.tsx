"use client";

import { useState } from "react";
import { getSupabasePublic } from "@/lib/supabasePublic";

interface AppointmentStatusResult {
  scheduled_at: string;
  checked_in: boolean;
  queue_ahead_count: number | null;
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
  if (diffMs <= 0) return "معادك دلوقتي تقريبًا";
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
    setSearched(false);

    try {
      const { data, error: rpcError } = await getSupabasePublic().rpc("lookup_appointment_status", {
        p_phone: phone.trim(),
        p_identifier: identifier.trim(),
      });

      if (rpcError) throw rpcError;
      setResult(Array.isArray(data) && data.length > 0 ? (data[0] as AppointmentStatusResult) : null);
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
            placeholder="01xxxxxxxxx"
          />
        </label>
        <label style={{ display: "grid", gap: 6 }}>
          <span>اسمك الثلاثي أو كود الحجز</span>
          <input
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            style={inputStyle}
            placeholder="مثال: أحمد محمد علي — أو كود الحجز"
          />
        </label>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "بيتم البحث..." : "استعلام عن معادي"}
        </button>
      </form>

      {error && <p style={{ color: "var(--color-danger, #c0392b)", marginTop: 16 }}>{error}</p>}

      {searched && !error && !result && (
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
