import { getSupabasePublic } from "./supabasePublic";

// نفس ثوابت ساعات العمل في النظام الداخلي (apps/desktop/local-server/src/scheduling.ts) —
// لازم يفضلوا متطابقين، لأن الموقع والنظام الداخلي بيتشاركوا نفس شبكة المواعيد.
export const CLINIC_OPEN_HOUR = 16;
export const CLINIC_CLOSE_HOUR = 23;
export const SLOT_STEP_MINUTES = 20;

// بند (طلب الدكتور 2026-10-11): عاوز مرجع واحد بس للوقت الصحيح — ساعة جهاز العيادة نفسه (اللي السكرتيرة
// والدكتور شايفينه قدامهم فعليًا)، مش حساب توقيت صيفي مستقل في كود الموقع. local-server بيبعت الإزاحة
// الحالية من ساعة الجهاز نفسها كل دورة مزامنة (pushClinicTimeOffset في syncService.ts) في جدول
// clinic_time_offset. بنحمّلها هنا مرة وقت ما صفحة الحجز تفتح، ونستخدمها بدل أي حساب تاني. لو السيرفر
// لسه مزامنش قبل كده (أول تركيب، أو مفيش نت لحظة الحجز)، بنرجع تلقائي لحساب Intl الاحتياطي عشان الحجز
// يفضل شغال صح في كل الأحوال.
let deviceOffset: string | null = null;

export async function loadClinicTimeOffset(): Promise<void> {
  try {
    const { data, error } = await getSupabasePublic().from("clinic_time_offset").select("utc_offset").maybeSingle();
    if (!error && data?.utc_offset) {
      deviceOffset = data.utc_offset as string;
    }
  } catch {
    // هيفضل deviceOffset = null، وbuildCairoISOString/nowInCairo هيرجعوا للحساب الاحتياطي تلقائي.
  }
}

// بند (باگ حقيقي اكتُشف 2026-10-11): مصر رجّعت توقيت صيفي فعليًا من إبريل 2023 (قرار رقم 24 لسنة 2023) —
// بيبدأ آخر جمعة في إبريل وبينتهي آخر خميس في أكتوبر، يعني مصر دلوقتي +03:00 مش +02:00 زي ما كان مفترض
// هنا كـoffset ثابت. النتيجة: أي حجز وقت التوقيت الصيفي كان بيتسجّل غلط بفارق ساعة كاملة (مثلاً حجز
// "11 م" كان بيتسجّل فعليًا كـ"12 منتصف الليل"). بدل ما نثبّت offset التاني (برضو هيبقى غلط تاني بعد
// نهاية التوقيت الصيفي)، بنسأل Intl نفسه عن إزاحة مصر الحقيقية في اللحظة دي بالظبط — ده بيتابع قانون
// التوقيت الصيفي المصري أوتوماتيك مهما اتغيّر تاريخه مستقبلًا، من غير ما نحتاج نصلّح الكود تاني كل مرة.
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

export function buildCairoISOString(year: number, month: number, day: number, hour: number, minute: number): string {
  // بند: كان فيه باگ حقيقي هنا — بناء السترينج يدوي (بدون تطبيع) كان بيقبل "يوم 31" حتى لشهر فيه 30 يوم بس،
  // فبينتج تاريخ مش موجود أصلًا زي "2026-09-31" (Postgres بيرفضه بخطأ 22008). بيحصل بالظبط آخر يوم في أي
  // شهر، لما fetchSlotsForDay بيحسب "بداية اليوم اللي بعده" بـday+1 عشان يحدد نهاية اليوم الحالي. بنستخدم
  // Date.UTC هنا كحاسبة تقويم بس (مش تحويل توقيت حقيقي) عشان يطبّع يوم 31 في شهر سبتمبر لأول أكتوبر صح.
  const normalized = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const y = normalized.getUTCFullYear();
  const mo = normalized.getUTCMonth() + 1;
  const d = normalized.getUTCDate();
  const h = normalized.getUTCHours();
  const mi = normalized.getUTCMinutes();

  // تخمين أولي بافتراض +02:00 (التوقيت الشتوي) عشان نوصل للحظة UTC تقريبية، وبعدين نسأل عن الإزاحة
  // الحقيقية في اللحظة دي بالظبط — فرق الدقيقتين ده مش حرج عمليًا لأن مواعيد العيادة بعد الظهر بس،
  // بعيد تمامًا عن لحظة تغيير التوقيت نفسها (منتصف الليل). بنستخدمه بس لو الإزاحة من جهاز العيادة لسه
  // مجاتش (راجع loadClinicTimeOffset فوق).
  const guessUtcMs = Date.UTC(y, mo - 1, d, h, mi) - 2 * 60 * 60 * 1000;
  const offset = deviceOffset ?? cairoOffsetForInstant(guessUtcMs);

  const pad = (n: number) => String(n).padStart(2, "0");
  return `${y}-${pad(mo)}-${pad(d)}T${pad(h)}:${pad(mi)}:00${offset}`;
}

export function nowInCairo(): Date {
  if (deviceOffset) {
    // بنبني وقت دلوقتي بإزاحة جهاز العيادة نفسها، مش حساب Intl مستقل.
    const nowUtc = Date.now();
    const sign = deviceOffset.startsWith("-") ? -1 : 1;
    const [oh, om] = deviceOffset.slice(1).split(":").map(Number) as [number, number];
    return new Date(nowUtc + sign * (oh! * 60 + om!) * 60000);
  }
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" }));
}

/** بيحول الساعة (24) لصيغة 12 ساعة بصباحًا/مساءً — بدل 16:00 بيطلع 4:00 م. */
export function formatTime12h(hour: number, minute: number): string {
  const period = hour >= 12 ? "م" : "ص";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
}
