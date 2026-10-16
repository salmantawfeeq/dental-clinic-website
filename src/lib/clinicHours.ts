import { getSupabasePublic } from "./supabasePublic";

// قيم احتياطية بس — نفس ساعات العمل في النظام الداخلي (apps/desktop/local-server/src/scheduling.ts). الموقع
// بياخد الساعات الفعلية من جهاز العيادة نفسه (clinic_time_offset) أول ما يكون اتزامن مرة.
export const CLINIC_OPEN_HOUR = 16;
export const CLINIC_CLOSE_HOUR = 23;
export const SLOT_STEP_MINUTES = 20;

// بند (طلب الدكتور 2026-10-11): مرجع واحد بس للوقت الصحيح — ساعة جهاز العيادة نفسه (اللي السكرتيرة والدكتور
// شايفينه قدامهم فعليًا)، مش حساب توقيت مستقل في كود الموقع ولا منطقة زمنية متثبتة. جهاز العيادة بيبعت كل دورة
// مزامنة (syncService.ts) إزاحته الحالية + إزاحة كل يوم من الأيام الجاية (عشان التوقيت الصيفي) + ساعات العمل.
//
// بند (باگ حقيقي، 2026-10-12): الإزاحة "الحالية" لوحدها كانت بتتطبق على كل الأيام — فأي حجز قبل نهاية
// التوقيت الصيفي (آخر خميس في أكتوبر) لمعاد بعدها كان بيتسجل بفرق ساعة (حجز الساعة 4 يوصل العيادة 3، قبل
// الفتح)، والعكس في أبريل. دلوقتي كل يوم بإزاحته هو من جهاز العيادة.
let deviceOffset: string | null = null;
let dayOffsets: Record<string, string> | null = null;
let deviceHours: { open: number; close: number; step: number } | null = null;

const OFFSET_PATTERN = /^[+-]\d{2}:\d{2}$/;

export async function loadClinicTimeOffset(): Promise<void> {
  try {
    // "*" عمدًا: لو أعمدة الإزاحات اليومية لسه متضافتش في Supabase، الطلب بيفضل شغال بالعمود القديم بس.
    const { data, error } = await getSupabasePublic().from("clinic_time_offset").select("*").maybeSingle();
    if (error || !data) return;
    if (typeof data.utc_offset === "string" && OFFSET_PATTERN.test(data.utc_offset)) deviceOffset = data.utc_offset;
    if (data.day_offsets && typeof data.day_offsets === "object") {
      const valid: Record<string, string> = {};
      for (const [key, value] of Object.entries(data.day_offsets as Record<string, unknown>)) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(key) && typeof value === "string" && OFFSET_PATTERN.test(value)) valid[key] = value;
      }
      dayOffsets = valid;
    }
    if (
      Number.isInteger(data.open_hour) &&
      Number.isInteger(data.close_hour) &&
      Number.isInteger(data.slot_step_minutes) &&
      data.slot_step_minutes > 0 &&
      data.close_hour > data.open_hour
    ) {
      deviceHours = { open: data.open_hour, close: data.close_hour, step: data.slot_step_minutes };
    }
  } catch {
    // بنكمل بالقيم الاحتياطية تحت — الحجز يفضل شغال في كل الأحوال.
  }
}

/** ساعات العمل وخطوة المواعيد زي ما جهاز العيادة مظبوط عليها (أو القيم الاحتياطية لو لسه مفيش مزامنة). */
export function clinicHours(): { open: number; close: number; step: number } {
  return deviceHours ?? { open: CLINIC_OPEN_HOUR, close: CLINIC_CLOSE_HOUR, step: SLOT_STEP_MINUTES };
}

// احتياطي أخير بس (الجهاز لسه مزامنش ولا مرة): إزاحة مصر من قاعدة بيانات المناطق الزمنية في المتصفح.
function cairoOffsetForInstant(utcMs: number): string {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Africa/Cairo",
      timeZoneName: "longOffset",
    }).formatToParts(new Date(utcMs));
    const tzPart = parts.find((p) => p.type === "timeZoneName")?.value ?? "";
    const match = tzPart.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/);
    if (!match) return "+02:00";
    const [, sign, hh, mm] = match;
    return `${sign}${hh!.padStart(2, "0")}:${(mm ?? "00").padStart(2, "0")}`;
  } catch {
    return "+02:00";
  }
}

function offsetMinutes(offset: string): number {
  const sign = offset.startsWith("-") ? -1 : 1;
  const [hh, mm] = offset.slice(1).split(":").map(Number) as [number, number];
  return sign * (hh * 60 + mm);
}

/** إزاحة توقيت العيادة في يوم معيّن (YYYY-MM-DD) — إزاحة اليوم ده نفسه من جهاز العيادة، مش إزاحة النهاردة. */
function offsetForDay(dateKey: string, approxUtcMs: number): string {
  return dayOffsets?.[dateKey] ?? deviceOffset ?? cairoOffsetForInstant(approxUtcMs);
}

export function buildCairoISOString(year: number, month: number, day: number, hour: number, minute: number): string {
  // بند: كان فيه باگ حقيقي هنا — بناء السترينج يدوي (بدون تطبيع) كان بيقبل "يوم 31" حتى لشهر فيه 30 يوم بس.
  // بنستخدم Date.UTC هنا كحاسبة تقويم بس (مش تحويل توقيت حقيقي) عشان يطبّع يوم 31 في شهر سبتمبر لأول أكتوبر صح.
  const normalized = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const y = normalized.getUTCFullYear();
  const mo = normalized.getUTCMonth() + 1;
  const d = normalized.getUTCDate();
  const h = normalized.getUTCHours();
  const mi = normalized.getUTCMinutes();
  const pad = (n: number) => String(n).padStart(2, "0");
  const offset = offsetForDay(`${y}-${pad(mo)}-${pad(d)}`, Date.UTC(y, mo - 1, d, h, mi) - 2 * 60 * 60 * 1000);
  return `${y}-${pad(mo)}-${pad(d)}T${pad(h)}:${pad(mi)}:00${offset}`;
}

/**
 * اللحظة الحالية الحقيقية (للمقارنة بمواعيد حقيقية). بند (باگ حقيقي، 2026-10-12): الدالة دي كانت بترجّع
 * "دلوقتي + فرق التوقيت" وتتقارن بمواعيد حقيقية — فمواعيد النهاردة اللي في أول ساعتين/تلاتة جايين كانت
 * بتعتبر "فاتت" وتختفي من الموقع (الساعة 8 بالليل مثلًا مكانش ممكن حد يحجز معاد 9 أو 10).
 */
export function nowInCairo(): Date {
  return new Date();
}

/** تاريخ النهاردة بتقويم العيادة (بساعة جهاز العيادة وإزاحته) — مش بتقويم جهاز المريض اللي ممكن يكون في بلد تاني. */
export function clinicToday(): { year: number; month: number; day: number } {
  const now = Date.now();
  const wall = new Date(now + offsetMinutes(deviceOffset ?? cairoOffsetForInstant(now)) * 60000);
  return { year: wall.getUTCFullYear(), month: wall.getUTCMonth() + 1, day: wall.getUTCDate() };
}

/** بيعرض لحظة حقيقية (معاد) بساعة العيادة نفسها — مش بساعة جهاز المريض. */
export function formatClinicDateTime(iso: string, options: Intl.DateTimeFormatOptions): string {
  const instant = Date.parse(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  const guess = new Date(instant + offsetMinutes(deviceOffset ?? cairoOffsetForInstant(instant)) * 60000);
  const key = `${guess.getUTCFullYear()}-${pad(guess.getUTCMonth() + 1)}-${pad(guess.getUTCDate())}`;
  const wall = new Date(instant + offsetMinutes(offsetForDay(key, instant)) * 60000);
  return wall.toLocaleString("ar-EG", { ...options, timeZone: "UTC" });
}

/** بيحول الساعة (24) لصيغة 12 ساعة بصباحًا/مساءً — بدل 16:00 بيطلع 4:00 م. */
export function formatTime12h(hour: number, minute: number): string {
  const period = hour >= 12 ? "م" : "ص";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
}
