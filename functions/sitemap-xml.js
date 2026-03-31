/**
 * Google site haritası — GET /sitemap-xml (XML, Cloudflare Pages Function).
 */
export async function onRequestGet() {
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    "  <url>\n" +
    "    <loc>https://resulkilinc.com/</loc>\n" +
    "    <changefreq>weekly</changefreq>\n" +
    "    <priority>1.0</priority>\n" +
    "  </url>\n" +
    "</urlset>\n";

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=UTF-8",
      "cache-control": "public, max-age=3600",
    },
  });
}

export async function onRequestHead() {
  return new Response(null, {
    headers: {
      "content-type": "application/xml; charset=UTF-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
