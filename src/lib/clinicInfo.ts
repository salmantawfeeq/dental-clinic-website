// معلومات العيادة الحقيقية (زي ما بعتها الدكتور 2026-09-20) — مش من env، لأن المحتوى ده ثابت
// وخاص بالعيادة دي بالظبط، مش قيمة إعداد بتتغير حسب البيئة.
export const clinicInfo = {
  name: "عيادة د/أحمد محمد الحسيني",
  doctorName: "د. أحمد محمد الحسيني",
  doctorTitle: "أخصائي طب الفم والأسنان",
  doctorQualification: "ماجستير جراحة الوجه والفم والفكين وزراعة الأسنان",
  // للاتصال المباشر.
  phoneDisplay: "01093464072",
  phoneHref: "tel:+201093464072",
  // واتساب — رقم مختلف عن رقم الاتصال.
  whatsappDisplay: "01090076485",
  whatsappHref: "https://wa.me/201090076485",
  hours: "يوميًا (السبت–الجمعة) من 4 عصرًا حتى 11 مساءً",
  // النص المكتوب للعنوان (شارع/منطقة) لسه هيتبعت من الدكتور — الإحداثيات والخريطة تحت موجودة فعلاً.
  address: "",
  facebookUrl: "https://www.facebook.com/share/1CFK58r1kW/?mibextid=wwXIfr",
  // من لينك خرائط جوجل اللي بعته الدكتور (محافظة الدقهلية).
  mapCoords: { lat: 31.1085659, lng: 31.7548881 },
  mapDirectionsUrl: "https://www.google.com/maps?q=31.1085659,31.7548881",
  mapEmbedUrl: "https://www.google.com/maps?q=31.1085659,31.7548881&output=embed",
};
