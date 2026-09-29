// نفس ثوابت ساعات العمل في النظام الداخلي (apps/desktop/local-server/src/scheduling.ts) —
// لازم يفضلوا متطابقين، لأن الموقع والنظام الداخلي بيتشاركوا نفس شبكة المواعيد.
export const CLINIC_OPEN_HOUR = 16;
export const CLINIC_CLOSE_HOUR = 23;
export const SLOT_STEP_MINUTES = 20;

// السيرفر بتاع الموقع (Vercel) بيشتغل بتوقيت UTC، لكن العيادة بتوقيت القاهرة (UTC+2، بدون توقيت صيفي حاليًا).
// بنبني الـISO string بالـoffset ده صراحةً عشان "4 العصر" يفضل يعني 4 العصر بتوقيت القاهرة مهما كان السيرفر فين.
const CAIRO_OFFSET = "+02:00";

export function buildCairoISOString(year: number, month: number, day: number, hour: number, minute: number): string {
  // بند: كان فيه باگ حقيقي هنا — بناء السترينج يدوي (بدون تطبيع) كان بيقبل "يوم 31" حتى لشهر فيه 30 يوم بس،
  // فبينتج تاريخ مش موجود أصلًا زي "2026-09-31" (Postgres بيرفضه بخطأ 22008). بيحصل بالظبط آخر يوم في أي
  // شهر، لما fetchSlotsForDay بيحسب "بداية اليوم اللي بعده" بـday+1 عشان يحدد نهاية اليوم الحالي. بنستخدم
  // Date.UTC هنا كحاسبة تقويم بس (مش تحويل توقيت حقيقي) عشان يطبّع يوم 31 في شهر سبتمبر لأول أكتوبر صح.
  const normalized = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${normalized.getUTCFullYear()}-${pad(normalized.getUTCMonth() + 1)}-${pad(normalized.getUTCDate())}T${pad(normalized.getUTCHours())}:${pad(normalized.getUTCMinutes())}:00${CAIRO_OFFSET}`;
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
