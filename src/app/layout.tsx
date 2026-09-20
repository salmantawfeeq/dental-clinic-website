import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo" });

const clinicName = process.env.NEXT_PUBLIC_CLINIC_NAME ?? "عيادة الأسنان";

export const metadata: Metadata = {
  title: `${clinicName} — احجز موعدك أونلاين`,
  description: `احجز موعدك في ${clinicName} أونلاين في أقل من دقيقة، بدون دفع وبدون انتظار موافقة.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.variable}>{children}</body>
    </html>
  );
}
