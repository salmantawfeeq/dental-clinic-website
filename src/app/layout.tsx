import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { clinicInfo } from "@/lib/clinicInfo";

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo" });

const toothFavicon =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ctext y='19' font-size='20'%3E%F0%9F%A6%B7%3C/text%3E%3C/svg%3E";

export const metadata: Metadata = {
  title: `${clinicInfo.name} — احجز موعدك أونلاين`,
  description: `احجز موعدك في ${clinicInfo.name} أونلاين في أقل من دقيقة، بدون دفع وبدون انتظار موافقة.`,
  icons: { icon: toothFavicon },
};

export const viewport = {
  themeColor: "#0d9488",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.variable}>{children}</body>
    </html>
  );
}
