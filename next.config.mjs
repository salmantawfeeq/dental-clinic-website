// لحد ما الدكتور يشتري دومين مخصص، الموقع شغال على مسار فرعي بتاع GitHub Pages
// (salmantawfeeq.github.io/dental-clinic-website) مش على الجذر — basePath بيظبط الروابط الداخلية تلقائيًا.
// لما الدومين المخصص يتظبط (ملف CNAME)، امسح NEXT_PUBLIC_BASE_PATH من إعدادات الريبو (Variables) خالص.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
