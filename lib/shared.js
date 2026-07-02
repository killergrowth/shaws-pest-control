'use strict';
const fs = require('fs');
const path = require('path');
const data = require('../_build-data.js');

let injectScripts, loadSiteScripts;
try {
  const lib = require('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\tools\\kg-site-builder\\lib\\inject-scripts');
  injectScripts = lib.injectScripts;
  loadSiteScripts = lib.loadSiteScripts;
} catch(e) {
  injectScripts = (html) => html;
  loadSiteScripts = () => ({});
}
const SITE_ID = 'shaws-pest-control';
const DIST = path.join(__dirname, '..', 'dist');
const PARTIALS = path.join(__dirname, '..', '_partials');

function read(p) {
  const buf = fs.readFileSync(p);
  const start = (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) ? 3 : 0;
  return buf.slice(start).toString('utf8');
}

function writePage(relPath, html) {
  html = injectScripts(html, loadSiteScripts(SITE_ID));
  const full = path.join(DIST, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html, 'utf8');
}

function fill(str, city, county) {
  if (!str) return '';
  return str.replace(/\{city\}/g, city).replace(/\{county\}/g, county || 'Butler');
}

const HEAD   = read(path.join(PARTIALS, 'head.html'));
const HEADER = read(path.join(PARTIALS, 'header.html'));
const FOOTER = read(path.join(PARTIALS, 'footer.html'));
const CTA    = read(path.join(PARTIALS, 'cta.html'));
const { client, services, cities, reviews } = data;

function localBusinessSchema() {
  return `<script type="application/ld+json">{"@context":"https://schema.org","@type":"LocalBusiness","@id":"https://${client.domain}/#organization","name":"${client.name}","url":"https://${client.domain}","telephone":"${client.phone}","foundingDate":"${client.founded}","address":{"@type":"PostalAddress","streetAddress":"303 Commerce St Ste 2","addressLocality":"${client.city}","addressRegion":"${client.state}","postalCode":"${client.zip}","addressCountry":"US"},"geo":{"@type":"GeoCoordinates","latitude":"${client.lat}","longitude":"${client.lng}"},"areaServed":[{"@type":"AdministrativeArea","name":"Butler County, Kansas"},{"@type":"AdministrativeArea","name":"Sedgwick County, Kansas"}],"description":"${client.description}","aggregateRating":{"@type":"AggregateRating","ratingValue":"${client.reviews.rating}","reviewCount":"${client.reviews.count}","bestRating":"5","worstRating":"1"}}</script>`;
}

function serviceSchema(name, url) {
  return `<script type="application/ld+json">{"@context":"https://schema.org","@type":"Service","serviceType":"${name}","provider":{"@type":"LocalBusiness","name":"${client.name}","url":"https://${client.domain}"},"areaServed":{"@type":"AdministrativeArea","name":"Butler and Sedgwick County, Kansas"},"url":"https://${client.domain}${url}"}</script>`;
}

function breadcrumbSchema(crumbs) {
  const items = crumbs.map((c,i) => `{"@type":"ListItem","position":${i+1},"name":"${c.name}","item":"https://${client.domain}${c.url}"}`);
  return `<script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[${items.join(',')}]}</script>`;
}

function faqSchema(faqs) {
  const items = faqs.map(f => `{"@type":"Question","name":"${f.q.replace(/"/g,'&quot;')}","acceptedAnswer":{"@type":"Answer","text":"${f.a.replace(/"/g,'&quot;')}"}}`);
  return `<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${items.join(',')}]}</script>`;
}

function reviewCards() {
  return reviews.map(r => `<div class="kg-review-card"><div style="color:var(--kg-accent);font-size:1.1rem;margin-bottom:8px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div><p style="font-style:italic;margin-bottom:12px;">"${r.text}"</p><strong>${r.author}</strong></div>`).join('');
}

function faqBlock(faqs) {
  const items = faqs.map(f => `<div class="faq-item" style="border-bottom:1px solid var(--kg-border);padding:16px 0;"><button class="faq-question" style="width:100%;text-align:left;font-weight:700;font-size:1rem;background:none;border:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;color:var(--kg-secondary);">${f.q} <span class="faq-icon" style="font-size:1.4rem;transition:transform 0.2s;">+</span></button><div class="faq-answer" style="display:none;padding-top:10px;color:var(--kg-text-light);">${f.a}</div></div>`).join('');
  return `<div class="faq-list" style="max-width:800px;margin:0 auto;">${items}</div><script>document.querySelectorAll('.faq-question').forEach(btn=>{btn.addEventListener('click',()=>{const item=btn.closest('.faq-item');const ans=item.querySelector('.faq-answer');const icon=item.querySelector('.faq-icon');const open=ans.style.display==='block';document.querySelectorAll('.faq-answer').forEach(a=>a.style.display='none');document.querySelectorAll('.faq-icon').forEach(i=>i.textContent='+');if(!open){ans.style.display='block';icon.textContent='\u2212';}});});<\/script>`;
}

function page({ title, metaDesc, canonical, schema, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
${HEAD}
<title>${title}</title>
<meta name="description" content="${metaDesc}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${metaDesc}">
<meta property="og:image" content="https://shaws-pest-control.pages.dev/images/og-image.jpg">
<meta property="og:url" content="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${client.name}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${metaDesc}">
<meta name="twitter:image" content="https://shaws-pest-control.pages.dev/images/og-image.jpg">
${schema || ''}
</head>
<body>
${HEADER}
<main>
${body}
</main>
${CTA}
${FOOTER}
</body>
</html>`;
}

function copyAssets() {
  const root = path.join(__dirname, '..');
  const copyDir = (src, dest) => {
    if (!fs.existsSync(src)) return;
    fs.mkdirSync(dest, { recursive: true });
    for (const f of fs.readdirSync(src)) {
      const s = path.join(src, f), d = path.join(dest, f);
      if (fs.statSync(s).isDirectory()) copyDir(s, d);
      else fs.copyFileSync(s, d);
    }
  };
  copyDir(path.join(root, 'assets'), path.join(DIST, 'assets'));
  copyDir(path.join(root, 'images'), path.join(DIST, 'images'));
  copyDir(path.join(root, 'functions'), path.join(DIST, 'functions'));
  for (const f of ['_redirects','_routes.json','_worker.js','robots.txt']) {
    const src = path.join(root, f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(DIST, f));
  }
}

module.exports = { writePage, fill, localBusinessSchema, serviceSchema, breadcrumbSchema, faqSchema, reviewCards, faqBlock, page, copyAssets, DIST, client, services, cities, reviews };
