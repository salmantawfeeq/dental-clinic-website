// نفس ثوابت ساعات العمل في النظام الداخلي (apps/desktop/local-server/src/scheduling.ts) —
// لازم يفضلوا متطابقين، لأن الموقع والنظام الداخلي بيتشاركوا نفس شبكة المواعيد.
export const CLINIC_OPEN_HOUR = 16;
export const CLINIC_CLOSE_HOUR = 23;
export const SLOT_STEP_MINUTES = 20;

// السيرفر بتاع الموقع (Vercel) بيشتغل بتوقيت UTC، لكن العيادة بتوقيت القاهرة (UTC+2، بدون توقيت صيفي حاليًا).
// بنبني الـISO string بالـoffset ده صراحةً عشان "4 العصر" يفضل يعني 4 العصر بتوقيت القاهرة مهما كان السيرفر فين.
const CAIRO_OFFSET = "+02:00";

export function buildCairoISOString(year: number, month: number, day: number, hour: number, minute: number): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00${CAIRO_OFFSET}`;
}

export function nowInCairo(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" }));
}

/** بيحول الساعة (24) لصيغة 12 ساعة بصباحًا/مساءً — بدل 16:00 بيطلع 4:00 م. */
export function formatTime12h(hour: number, minute: number): string {
  const period = hour >= 12 ? "م" : "ص";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
}
