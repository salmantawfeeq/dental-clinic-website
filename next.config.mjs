/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // مستضاف على GitHub Pages — Static export بالكامل، مفيش سيرفر Node شغال. راجع src/lib/supabasePublic.ts
  // للسبب اللي خلانا نستخدم مفتاح anon عام بدل service_role هنا.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
