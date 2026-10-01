// رابط الموقع الكامل (الدومين + المسار الفرعي الحالي بتاع GitHub Pages) — بيتستخدم في الـ sitemap،
// الـ robots.txt، والـ metadata (canonical/og). من env زي NEXT_PUBLIC_BASE_PATH بالظبط، عشان لما
// الدكتور يشتري دومين مخصص نضيف Variable واحد بس في إعدادات الريبو (NEXT_PUBLIC_SITE_URL) من غير أي
// تعديل كود — زي: https://clinicdomain.com.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://salmantawfeeq.github.io/dental-clinic-website"
).replace(/\/$/, "");
