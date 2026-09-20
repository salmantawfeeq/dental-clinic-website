// GitHub Pages project sites (قبل ما يتظبط دومين مخصص) بتتخدم من مسار فرعي زي
// /dental-clinic-website/ مش من الجذر. next/link بيتعامل مع الموضوع أوتوماتيك عن طريق basePath في
// next.config.mjs، لكن أي <img src> عادي لازم يتحط له المسار ده يدويًا.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE_PATH}/${path.replace(/^\//, "")}`;
}
