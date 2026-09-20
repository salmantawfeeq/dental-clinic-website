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
  patient_full_name text not null,
  patient_phone text not null,
  patient_date_of_birth date,
  service_id uuid not null references public.services(id),
  scheduled_at timestamptz not null,
  status text not null default 'pending_sync' check (status in ('pending_sync', 'synced', 'failed')),
  local_appointment_id uuid,
  local_booking_code text,
  sync_error text,
  created_at timestamptz not null default now(),
  synced_at timestamptz
);

create index if not exists online_bookings_status_idx on public.online_bookings (status);

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
