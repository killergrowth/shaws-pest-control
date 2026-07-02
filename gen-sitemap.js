'use strict';
// gen-sitemap.js — Shaw's Pest Control
// Generates sitemap.xml from dist/ HTML files
// Run: node gen-sitemap.js

const fs = require('fs');
const path = require('path');
const DOMAIN = 'https://shawspest.com';
const DIST = path.join(__dirname, 'dist');
const TODAY = new Date().toISOString().split('T')[0];

// Pages to exclude from sitemap
const EXCLUDE = new Set(['/404', '/privacy-policy']);

function collectPages(dir, base) {
  const urls = [];
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base + '/' + f.name;
    if (f.isDirectory()) {
      urls.push(...collectPages(path.join(dir, f.name), rel));
    } else if (f.name === 'index.html') {
      const slug = base === '' ? '/' : base + '/';
      if (EXCLUDE.has(base)) continue;
      urls.push(slug);
    }
  }
  return urls;
}

const pages = collectPages(DIST, '').sort();

const entries = pages.map(slug => {
  const isHome = slug === '/';
  return `  <url>
    <loc>${DOMAIN}${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${isHome ? '1.0' : '0.8'}</priority>
  </url>`;
}).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml, 'utf8');
console.log(`Sitemap written: ${pages.length} URLs`);
pages.forEach(p => console.log(' ', p));
