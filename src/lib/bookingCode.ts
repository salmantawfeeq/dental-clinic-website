// نفس صيغة كود الحجز بالظبط اللي بيولّدها local-server (DN- + 6 خانات من نفس الأبجدية) — عشان الكود اللي
// المريض شافه هنا في شاشة التأكيد يبقى هو نفسه المحفوظ فعليًا على الجهاز بعد المزامنة (راجع bookingCode.ts
// و syncService.ts في التطبيق الرئيسي).
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateBookingCode(): string {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return `DN-${code}`;
}
