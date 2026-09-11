'use strict';
const fs = require('fs');
const path = require('path');
const { client, services, cities } = require('./shared');

function buildSitemap() {
  const domain = `https://${client.domain}`;
  const today = new Date().toISOString().split('T')[0];
  const urls = [];

  // Static pages
  [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/about/', priority: '0.7', changefreq: 'monthly' },
    { loc: '/contact/', priority: '0.8', changefreq: 'monthly' },
    { loc: '/service-areas/', priority: '0.7', changefreq: 'monthly' },
    { loc: '/blog/', priority: '0.8', changefreq: 'weekly' },
  ].forEach(p => urls.push({ ...p, lastmod: today }));

  // Main service pages
  services.forEach(svc => {
    urls.push({ loc: `/${svc.slug}/`, priority: '0.9', changefreq: 'monthly', lastmod: today });
  });

  // City hub pages
  cities.forEach(city => {
    urls.push({ loc: `/${city.slug}/`, priority: '0.9', changefreq: 'monthly', lastmod: today });
  });

  // Service + city combo pages
  services.forEach(svc => {
    cities.forEach(city => {
      urls.push({ loc: `/${svc.comboSlug}-${city.slug}/`, priority: '0.7', changefreq: 'monthly', lastmod: today });
    });
  });

  // Blog posts — scan dist/blog/ for built dirs
  const blogDir = path.join(__dirname, '..', 'dist', 'blog');
  if (fs.existsSync(blogDir)) {
    fs.readdirSync(blogDir).forEach(slug => {
      const full = path.join(blogDir, slug, 'index.html');
      if (fs.existsSync(full) && slug !== 'index.html') {
        urls.push({ loc: `/blog/${slug}/`, priority: '0.6', changefreq: 'yearly', lastmod: today });
      }
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${domain}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const out = path.join(__dirname, '..', 'dist', 'sitemap.xml');
  fs.writeFileSync(out, xml, 'utf8');
  console.log(`  Sitemap: ${urls.length} URLs → dist/sitemap.xml`);
}

module.exports = { buildSitemap };
