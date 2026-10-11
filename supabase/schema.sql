-- Cloud DB schema (Supabase) — Phase 6: الموقع العام + الحجز الأونلاين.
--
-- قرار معماري أساسي (docs/ARCHITECTURE.md §5): الجدول ده مفيهوش أي بيانات طبية أو مالية،
-- ومفيهوش أي عمود سعر خالص — الفصل ده على مستوى الـSchema نفسه مش مجرد إخفاء في الواجهة.
--
-- الموقع مستضاف على GitHub Pages (Static فقط، مفيش سيرفر) — فالمتصفح بيتكلم مع Supabase مباشرة
-- بمفتاح anon العام. الحماية كلها هنا في RLS: قراءة عامة للخدمات والأوقات المشغولة بس، وإدخال حجز
-- جديد بس (بدون قراءة بيانات حجوزات تانية — بيانات المرضى فيها أسماء وأرقام موبايل حقيقية).

create table if not exists public.services (
  id uuid primary key,
  name text not null,
  duration_min_minutes int not null,
  duration_max_minutes int not null,
  is_active boolean not null default true,
  display_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.busy_slots (
  scheduled_at timestamptz primary key,
  service_id uuid not null references public.services(id)
);

create table if not exists public.online_bookings (
  id uuid primary key default gen_random_uuid(),
  -- بند (طلب الدكتور 2026-09-22، وعُدّل 2026-10-11): الاسم الثلاثي وتاريخ الميلاد إجباريين — المطابقة مع
  -- النظام الداخلي بقت بالاسم الثلاثي والرقم مع بعض (الاتنين لازم يتطابقوا على ملف موجود، وإلا يترفض الحجز
  -- ويتوضح للسكرتيرة يدويًا — راجع syncService.ts) بعد باگ التباس حقيقي حصل من المطابقة بالاسم بس.
  patient_full_name text not null check (array_length(regexp_split_to_array(trim(patient_full_name), '\s+'), 1) >= 3),
  patient_phone text not null,
  -- بند (طلب الدكتور 2026-09-22): عمر المريض لازم يكون سنة على الأقل (منع كتابة تاريخ اليوم أو تاريخ قريب غلط).
  patient_date_of_birth date not null check (patient_date_of_birth <= current_date - interval '1 year'),
  service_id uuid not null references public.services(id),
  scheduled_at timestamptz not null,
  status text not null default 'pending_sync' check (status in ('pending_sync', 'synced', 'failed')),
  -- بند (2026-10-11): الموقع بيولّد الكود ده بنفسه وقت الحجز (نفس صيغة DN-XXXXXX بتاعة local-server)
  -- عشان المريض يشوفه فورًا في شاشة التأكيد من غير ما يستنى المزامنة. local-server بيستعمل نفس الكود ده
  -- بالظبط وقت المزامنة (مش بيولّد كود جديد) عشان الكود اللي المريض شافه يبقى هو نفسه المحفوظ فعليًا.
  booking_code text,
  local_appointment_id uuid,
  local_booking_code text,
  sync_error text,
  created_at timestamptz not null default now(),
  synced_at timestamptz
);

create index if not exists online_bookings_status_idx on public.online_bookings (status);

-- يمنع تكرار الكود (فرصة التصادم شبه مستحيلة أصلاً — 6 خانات من 32 حرف — بس خط دفاع إضافي مجاني).
create unique index if not exists online_bookings_booking_code_idx
  on public.online_bookings (booking_code)
  where booking_code is not null;

-- Unique جزئي — خط دفاع أخير على مستوى الداتابيز ضد إن حجزين يوصلوا لنفس المعاد بالظبط في نفس اللحظة.
create unique index if not exists online_bookings_active_slot_idx
  on public.online_bookings (scheduled_at)
  where status in ('pending_sync', 'synced');

-- View بس بالأعمدة اللي مش حساسة (وقت الحجز + الخدمة)، عشان الموقع يقدر يحسب الأوقات المتاحة
-- من غير ما يشوف اسم أو موبايل أي مريض حجز أونلاين.
create or replace view public.public_busy_online_slots as
  select scheduled_at, service_id
  from public.online_bookings
  where status in ('pending_sync', 'synced');

alter table public.services enable row level security;
alter table public.busy_slots enable row level security;
alter table public.online_bookings enable row level security;

-- قراءة عامة للخدمات النشطة بس (بدون سعر — العمود أصلاً مش موجود في الجدول).
create policy "anon can read active services" on public.services
  for select to anon
  using (is_active = true);

-- قراءة عامة للأوقات المشغولة (بدون أي بيانات مريض — الجدول ده أصلاً مفيهوش غير الوقت والخدمة).
create policy "anon can read busy slots" on public.busy_slots
  for select to anon
  using (true);

-- الموقع يقدر يضيف حجز جديد بس — مينفعش يقرا حجوزات تانية (بيانات مرضى حقيقية) ولا يعدّل/يمسح حاجة.
create policy "anon can insert pending bookings" on public.online_bookings
  for insert to anon
  with check (status = 'pending_sync');

grant select on public.public_busy_online_slots to anon;

-- بند: "متابعة الموعد" — المريض بيدخل برقم تليفونه + (اسمه أو كود الحجز) ويشوف معاده، ولو داخل العيادة
-- فعليًا النهاردة يشوف كمان "قدامه كام واحد" في الطابور. الجدول ده مفيهوش أي بيانات طبية أو مالية —
-- بس الاسم/التليفون (لازمين للمطابقة) والتاريخ وحالة الطابور، زي باقي الجداول هنا بالظبط.
-- بيتبنى بالكامل من الصفر كل دورة مزامنة (local-server، كل 15 ثانية تقريبًا) — راجع syncService.ts.
create table if not exists public.appointment_status (
  booking_code text primary key,
  patient_full_name text not null,
  patient_phone text not null,
  scheduled_at timestamptz not null,
  checked_in boolean not null default false,
  queue_ahead_count int
);

alter table public.appointment_status enable row level security;

-- مفيش أي policy بتسمح بقراءة الجدول ده مباشرة لـanon عمدًا (ده فيه اسم وتليفون حقيقي) — القراءة
-- بس عن طريق الدالة تحت، اللي بترجّع صف واحد بس لو الاتنين (التليفون + الاسم أو الكود) متطابقين صحيح.
create or replace function public.lookup_appointment_status(p_phone text, p_identifier text)
returns table (
  scheduled_at timestamptz,
  checked_in boolean,
  queue_ahead_count int
)
language sql
security definer
set search_path = public
as $$
  select scheduled_at, checked_in, queue_ahead_count
  from public.appointment_status
  where patient_phone = trim(p_phone)
    and (
      booking_code = trim(p_identifier)
      or lower(regexp_replace(patient_full_name, '\s+', ' ', 'g')) = lower(regexp_replace(trim(p_identifier), '\s+', ' ', 'g'))
    )
  order by scheduled_at asc
  limit 1;
$$;

revoke all on function public.lookup_appointment_status(text, text) from public;
grant execute on function public.lookup_appointment_status(text, text) to anon;
