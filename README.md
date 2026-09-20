# Dental Clinic Website

الموقع العام + الحجز الأونلاين لعيادة د. أحمد محمد الحسيني. مستضاف Static بالكامل على GitHub Pages —
مفيش سيرفر خلفي؛ الحجز بيتكلم مباشرة مع [Supabase](https://supabase.com) بمفتاح `anon` عام محمي بـRow
Level Security (راجع `supabase/schema.sql`).

الحجوزات بتتزامن تلقائيًا مع نظام العيادة الداخلي (مشروع منفصل، خاص) عن طريق Sync Service بيشتغل جوه
جهاز الاستقبال — بدون موافقة يدوية، وبدون أي سعر أو بيانات طبية موجودة هنا خالص.

## تشغيل محلي

```bash
pnpm install
cp .env.example .env.local   # واملأ القيم من Supabase
pnpm dev
```

## النشر

بيتنشر تلقائيًا على GitHub Pages عند أي push على `main` (`.github/workflows/deploy.yml`).
محتاج الـSecrets دي متظبطة في إعدادات الريبو (Settings → Secrets and variables → Actions):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

واختياريًا Variables: `NEXT_PUBLIC_CLINIC_NAME`, `NEXT_PUBLIC_CLINIC_PHONE`, `NEXT_PUBLIC_CLINIC_ADDRESS`.
