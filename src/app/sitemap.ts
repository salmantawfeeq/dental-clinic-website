import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteConfig";

const paths = ["/", "/about/", "/services/", "/contact/", "/book/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
