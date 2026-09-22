"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getSupabasePublic } from "@/lib/supabasePublic";
import { buildCairoISOString, nowInCairo, formatTime12h, CLINIC_OPEN_HOUR, CLINIC_CLOSE_HOUR, SLOT_STEP_MINUTES } from "@/lib/clinicHours";

interface Service {
  id: string;
  name: string;
  duration_min_minutes: number;
  duration_max_minutes: number;
}

interface Slot {
  scheduledAt: string;
  time: string;
  available: boolean;
}

const EGYPT_PHONE_PATTERN = /^01[0-2,5]\d{8}$/;

function nextDays(count: number): { value: string; label: string }[] {
  const days: { value: string; label: string }[] = [];
  const formatter = new Intl.DateTimeFormat("ar-EG", { weekday: "short", day: "numeric", month: "short" });
  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    days.push({ value, label: formatter.format(d) });
  }
  return days;
}

async function fetchSlotsForDay(date: string, serviceId: string): Promise<Slot[]> {
  const supabase = getSupabasePublic();
  const [year, month, day] = date.split("-").map(Number) as [number, number, number];
  const dayStartISO = buildCairoISOString(year, month, day, 0, 0);
  const dayEndISO = buildCairoISOString(year, month, day + 1, 0, 0);

  const [busyResult, onlineResult] = await Promise.all([
    supabase.from("busy_slots").select("scheduled_at").gte("scheduled_at", dayStartISO).lt("scheduled_at", dayEndISO),
    supabase
      .from("public_busy_online_slots")
      .select("scheduled_at")
      .gte("scheduled_at", dayStartISO)
      .lt("scheduled_at", dayEndISO),
  ]);

  const occupied = new Set<string>([
    ...(busyResult.data ?? []).map((row: { scheduled_at: string }) => new Date(row.scheduled_at).toISOString()),
    ...(onlineResult.data ?? []).map((row: { scheduled_at: string }) => new Date(row.scheduled_at).toISOString()),
  ]);

  const now = nowInCairo();
  const slots: Slot[] = [];
  const totalMinutesInDay = (CLINIC_CLOSE_HOUR - CLINIC_OPEN_HOUR) * 60;

  for (let offset = 0; offset < totalMinutesInDay; offset += SLOT_STEP_MINUTES) {
    const hour = CLINIC_OPEN_HOUR + Math.floor(offset / 60);
    const minute = offset % 60;
    const scheduledAt = new Date(buildCairoISOString(year, month, day, hour, minute));
    if (scheduledAt < now) continue;

    slots.push({
      scheduledAt: scheduledAt.toISOString(),
      time: formatTime12h(hour, minute),
      available: !occupied.has(scheduledAt.toISOString()),
    });
  }

  void serviceId; // كل الخدمات بتتشارك نفس شبكة المواعيد (دكتور واحد) — موجود للتوسع المستقبلي لو اتغير الافتراض ده.
  return slots;
}

export function BookingWizard({ services }: { services: Service[] }) {
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [scheduledAt, setScheduledAt] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<{ time: string; date: string } | null>(null);

  const days = useMemo(() => nextDays(14), []);
  const selectedService = services.find((s) => s.id === serviceId) ?? null;
  const cardRef = useRef<HTMLDivElement>(null);

  // بند: لو المستخدم مرّر تحت لآخر خدمة في الليستة واختارها، كان بينتقل لخطوة التاريخ/الوقت من غير
  // ما الشاشة ترجع لفوق — فكان محتاج يمرّر لفوق تاني بنفسه عشان يشوف الخطوة الجديدة. بنعمل الرجوع
  // لفوق تلقائي مع كل خطوة، وبناخد في الاعتبار ارتفاع الهيدر الثابت (78px) عشان الكارت ميختفيش تحته.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const node = cardRef.current;
    if (!node) return;
    const headerOffset = 90;
    const top = node.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  }, [step]);

  useEffect(() => {
    if (!serviceId || !date) return;
    setLoadingSlots(true);
    setScheduledAt(null);
    fetchSlotsForDay(date, serviceId)
      .then(setSlots)
      .catch(() => setSlots([]))
      .finally(() => setLoadingSlots(false));
  }, [serviceId, date]);

  async function handleSubmit() {
    setErrorMessage(null);

    const normalizedName = fullName.trim().replace(/\s+/g, " ");
    if (normalizedName.split(" ").length < 3) {
      setErrorMessage("من فضلك اكتب الاسم الثلاثي بالكامل (الاسم + اسم الأب + اسم الجد على الأقل)");
      return;
    }
    if (!EGYPT_PHONE_PATTERN.test(phone.trim())) {
      setErrorMessage("رقم الموبايل غير صحيح — لازم يبدأ بـ 010 أو 011 أو 012 أو 015 ويتكون من 11 رقم");
      return;
    }
    if (!dateOfBirth) {
      setErrorMessage("من فضلك اختار تاريخ الميلاد");
      return;
    }
    if (!serviceId || !scheduledAt) {
      setErrorMessage("من فضلك اختار الخدمة والموعد");
      return;
    }

    setSubmitting(true);
    try {
      const supabase = getSupabasePublic();

      // فحص التعارض لحظة التأكيد نفسها — بيمنع إن اثنين يحجزوا نفس المعاد بالضبط لو ضغطوا في نفس الثانية تقريبًا.
      const [busyCheck, onlineCheck] = await Promise.all([
        supabase.from("busy_slots").select("scheduled_at").eq("scheduled_at", scheduledAt).maybeSingle(),
        supabase.from("public_busy_online_slots").select("scheduled_at").eq("scheduled_at", scheduledAt).maybeSingle(),
      ]);

      if (busyCheck.data || onlineCheck.data) {
        setErrorMessage("للأسف الموعد ده اتحجز لحظة ما كنت بتأكد — اختار وقت تاني من فضلك");
        setStep(1);
        return;
      }

      const { error: insertError } = await supabase.from("online_bookings").insert({
        service_id: serviceId,
        scheduled_at: scheduledAt,
        patient_full_name: normalizedName,
        patient_phone: phone.trim(),
        patient_date_of_birth: dateOfBirth,
        status: "pending_sync",
      });

      if (insertError) {
        // كود 23505 = Unique violation على online_bookings_active_slot_idx (schema.sql) — سباق نادر.
        if (insertError.code === "23505") {
          setErrorMessage("للأسف الموعد ده اتحجز لحظة ما كنت بتأكد — اختار وقت تاني من فضلك");
          setStep(1);
          return;
        }
        setErrorMessage("حصل خطأ، حاول تاني بعد شوية");
        return;
      }

      const selectedSlot = slots.find((s) => s.scheduledAt === scheduledAt);
      const selectedDay = days.find((d) => d.value === date);
      setConfirmed({ time: selectedSlot?.time ?? "", date: selectedDay?.label ?? "" });
    } catch {
      setErrorMessage("حصل خطأ في الاتصال، حاول تاني");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmed) {
    return (
      <div className="card" style={{ padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 40 }}>✅</div>
        <h2 style={{ margin: "16px 0 8px" }}>تم تأكيد حجزك</h2>
        <p style={{ color: "var(--color-ink-soft)" }}>
          {selectedService?.name} — {confirmed.date} الساعة {confirmed.time}
        </p>
        <p style={{ color: "var(--color-ink-soft)", fontSize: "0.9rem" }}>تقدر تتأخر أو تلغي عن طريق الاتصال بالعيادة.</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: 24 }} ref={cardRef}>
      <StepIndicator step={step} />

      {step === 0 && (
        <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
          {services.map((service) => (
            <button
              key={service.id}
              className={service.id === serviceId ? "btn btn-primary" : "btn btn-outline"}
              style={{ justifyContent: "flex-start", width: "100%" }}
              onClick={() => {
                setServiceId(service.id);
                setStep(1);
              }}
            >
              {service.name}
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div style={{ marginTop: 20 }}>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8 }}>
            {days.map((d) => (
              <button
                key={d.value}
                className={d.value === date ? "btn btn-primary" : "btn btn-outline"}
                style={{ flexShrink: 0, padding: "10px 16px", fontSize: "0.85rem" }}
                onClick={() => setDate(d.value)}
              >
                {d.label}
              </button>
            ))}
          </div>

          {date && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: 10, marginTop: 20 }}>
              {loadingSlots && <p>جاري تحميل الأوقات المتاحة...</p>}
              {!loadingSlots && slots.filter((s) => s.available).length === 0 && (
                <p style={{ color: "var(--color-ink-soft)" }}>مفيش أوقات متاحة في اليوم ده، جرب يوم تاني</p>
              )}
              {!loadingSlots &&
                slots
                  .filter((s) => s.available)
                  .map((slot) => (
                    <button
                      key={slot.scheduledAt}
                      className={slot.scheduledAt === scheduledAt ? "btn btn-primary" : "btn btn-outline"}
                      style={{ padding: "10px 8px", fontSize: "0.9rem" }}
                      onClick={() => {
                        setScheduledAt(slot.scheduledAt);
                        setStep(2);
                      }}
                    >
                      {slot.time}
                    </button>
                  ))}
            </div>
          )}

          <button className="btn btn-outline" style={{ marginTop: 20 }} onClick={() => setStep(0)}>
            رجوع
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={{ marginTop: 20, display: "grid", gap: 16 }}>
          <label style={{ display: "grid", gap: 6 }}>
            <span>الاسم الثلاثي بالكامل</span>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={inputStyle}
              placeholder="مثال: محمد أحمد علي"
            />
          </label>
          <label style={{ display: "grid", gap: 6 }}>
            <span>رقم الموبايل</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
              placeholder="01xxxxxxxxx"
              inputMode="numeric"
              dir="ltr"
            />
          </label>
          <label style={{ display: "grid", gap: 6 }}>
            <span>تاريخ الميلاد</span>
            <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} style={inputStyle} required />
          </label>

          {errorMessage && <p style={{ color: "var(--color-danger)", margin: 0 }}>{errorMessage}</p>}

          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn btn-outline" onClick={() => setStep(1)}>
              رجوع
            </button>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSubmit} disabled={submitting}>
              {submitting ? "جاري التأكيد..." : "تأكيد الحجز"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid var(--color-border)",
  fontSize: "1rem",
  fontFamily: "inherit",
};

function StepIndicator({ step }: { step: number }) {
  const labels = ["الخدمة", "الموعد", "بياناتك"];
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {labels.map((label, i) => (
        <div
          key={label}
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: i <= step ? "var(--color-primary-dark)" : "var(--color-ink-soft)",
            borderBottom: `3px solid ${i <= step ? "var(--color-primary)" : "var(--color-border)"}`,
            paddingBottom: 10,
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
