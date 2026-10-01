import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { clinicInfo } from "@/lib/clinicInfo";
import { SITE_URL } from "@/lib/siteConfig";

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo" });

const toothFavicon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctext y='19' font-size='20'%3E%F0%9F%A6%B7%3C/text%3E%3C/svg%3E";

const description = `احجز موعدك في ${clinicInfo.name} أونلاين في أقل من دقيقة، بدون دفع وبدون انتظار موافقة. عيادة أسنان في ${clinicInfo.address}.`;

// SITE_URL بيمثّل جذر الموقع الحقيقي اللي الملفات بتتقدّم منه (الدومين + المسار الفرعي لو موجود)،
// فمفيش داعي لـasset()/basePath هنا تاني — ده كان بيسبب تكرار المسار الفرعي مرتين في الرابط.
const ogImageUrl = `${SITE_URL}/hero-clinic.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${clinicInfo.name} — حجز أونلاين`,
    template: `%s | ${clinicInfo.name}`,
  },
  description,
  keywords: [
    "عيادة أسنان",
    "دكتور أسنان",
    "طبيب أسنان دكرنس",
    "عيادة أسنان الدقهلية",
    "حجز موعد أسنان أونلاين",
    "زراعة أسنان",
    "تقويم أسنان",
    "علاج عصب",
    clinicInfo.name,
    clinicInfo.doctorName,
  ],
  authors: [{ name: clinicInfo.doctorName }],
  icons: { icon: toothFavicon },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: SITE_URL,
    siteName: clinicInfo.name,
    title: clinicInfo.name,
    description,
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: clinicInfo.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: clinicInfo.name,
    description,
    images: [ogImageUrl],
  },
};

export const viewport = {
  themeColor: "#0d9488",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinicInfo.name,
  image: ogImageUrl,
  url: SITE_URL,
  telephone: clinicInfo.phoneHref.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: "منشأة عبد الرحمن",
    addressLocality: "دكرنس",
    addressRegion: "الدقهلية",
    addressCountry: "EG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: clinicInfo.mapCoords.lat,
    longitude: clinicInfo.mapCoords.lng,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    opens: "16:00",
    closes: "23:00",
  },
  sameAs: [clinicInfo.facebookUrl],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={cairo.variable}>{children}</body>
    </html>
  );
}
