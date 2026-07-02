'use strict';
// build-pages-2.js — continuation: location page (completion), combo pages, hub pages, misc
const { writePage, fill, localBusinessSchema, serviceSchema, breadcrumbSchema, faqSchema, reviewCards, faqBlock, page, client, services, cities } = require('./shared');

function buildLocationPage(city) {
  const faqs = [
    { q: `Does Shaw's Pest Control serve ${city.name}, KS?`, a: `Yes. Shaw's Pest Control serves ${city.name} and ${city.county} County. Call (316) 251-9461 for a free estimate.` },
    { q: `What pests are common in ${city.name}, Kansas?`, a: `Common pests in ${city.name} include spiders (Brown Recluse, Black Widow), ants, German cockroaches, termites, mosquitoes, and bed bugs.` },
    { q: `Do you offer termite inspections in ${city.name}?`, a: `Yes. Shaw's Pest Control offers termite inspections in ${city.name} for homeowners and prospective buyers.` },
    { q: `How quickly can Shaw's come to ${city.name}?`, a: `Shaw's Pest Control serves ${city.name} regularly. Contact us at (316) 251-9461 to schedule service.` },
  ];
  const serviceLinks = services.map(s => `<a href="/${s.comboSlug}-${city.slug}/" class="kg-card" style="padding:16px 20px;text-decoration:none;"><strong style="color:var(--kg-primary);">${s.name}</strong><br><small style="color:var(--kg-text-light);">in ${city.name}, KS</small></a>`).join('');
  const body = `
<section class="section-dark" style="padding:80px 0;background:linear-gradient(145deg,#1a2a24 0%,#2a5c45 100%);">
  <div class="container">
    <nav aria-label="Breadcrumb" style="font-size:0.85rem;margin-bottom:16px;color:rgba(255,255,255,0.6);">
      <a href="/" style="color:rgba(255,255,255,0.7);">Home</a> / <a href="/service-areas/" style="color:rgba(255,255,255,0.7);">Service Areas</a> / <span>${city.name}</span>
    </nav>
    <h1 style="color:#fff;">Pest Control in ${city.name}, KS</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:1.1rem;max-width:640px;margin-top:12px;">Shaw's Pest Control has been serving ${city.name} and ${city.county} County since 1987. Residential and commercial pest control with integrity and expertise.</p>
    <div style="display:flex;gap:16px;margin-top:28px;flex-wrap:wrap;">
      <a href="/contact/" class="btn btn-primary">Get a Free Estimate</a>
      <a href="tel:3162519461" class="btn btn-outline-white">&#9742; (316) 251-9461</a>
    </div>
  </div>
</section>
<section>
  <div class="container">
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:48px;align-items:start;">
      <div>
        <h2>Pest Control Services in ${city.name}, Kansas</h2>
        <p>Shaw's Pest Control has served ${city.name} and ${city.county} County since 1987. Whether you're dealing with ants, spiders, termites, mosquitoes, or bed bugs, our licensed and certified team has the experience to solve the problem.</p>
        <p>As a locally owned, faith-based company, we approach every job with honesty. Customers come to us with a pest problem and often leave as friends.</p>
        <h3 style="margin-top:32px;">Services in ${city.name}</h3>
        <div class="kg-grid kg-grid-2" style="gap:16px;margin-top:16px;">${serviceLinks}</div>
        <h3 style="margin-top:36px;">Why ${city.name} Residents Choose Shaw's</h3>
        <ul>
          <li>35+ years serving ${city.county} and Sedgwick County</li>
          <li>Three state certifications and a Master Tech Certification</li>
          <li>Family-owned, faith-based operation</li>
          <li>Residential and commercial treatment plans</li>
          <li>Free estimates, no-pressure service</li>
        </ul>
      </div>
      <div>
        <div class="kg-card" style="padding:28px;position:sticky;top:90px;">
          <h4>Serving ${city.name}</h4>
          <p style="color:var(--kg-text-light);margin-bottom:20px;">${city.county} County, KS</p>
          <a href="tel:3162519461" class="btn btn-primary" style="width:100%;margin-bottom:12px;">&#9742; (316) 251-9461</a>
          <a href="/contact/" class="btn btn-outline" style="width:100%;">Free Estimate</a>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="section-alt">
  <div class="container">
    <div class="section-title"><h2>Customer Reviews</h2></div>
    <div class="kg-grid kg-grid-3">${reviewCards()}</div>
  </div>
</section>
<section>
  <div class="container">
    <div class="section-title"><div class="section-label">FAQs</div><h2>Pest Control in ${city.name}, KS</h2></div>
    ${faqBlock(faqs)}
  </div>
</section>`;

  writePage(`${city.slug}/index.html`, page({
    title: `Pest Control in ${city.name}, KS | Shaw's Pest Control`,
    metaDesc: `Shaw's Pest Control serves ${city.name}, Kansas. 35+ years experience, licensed technicians, free estimates. Call (316) 251-9461.`,
    canonical: `https://${client.domain}/${city.slug}/`,
    schema: localBusinessSchema() + '\n' + breadcrumbSchema([{name:'Home',url:'/'},{name:'Service Areas',url:'/service-areas/'},{name:city.name,url:`/${city.slug}/`}]) + '\n' + faqSchema(faqs),
    body,
  }));
  console.log(`  Built: /${city.slug}/`);
}

// ─── SERVICE+CITY COMBO ───────────────────────────────────────────────────────
function buildComboPage(svc, city) {
  const slug = `${svc.comboSlug}-${city.slug}`;
  const faqs = [
    { q: `Does Shaw's offer ${svc.name.toLowerCase()} in ${city.name}, KS?`, a: `Yes. Shaw's Pest Control provides ${svc.name.toLowerCase()} in ${city.name} and ${city.county} County. Call (316) 251-9461 for a free estimate.` },
    { q: `How much does ${svc.name.toLowerCase()} cost in ${city.name}?`, a: `Shaw's Pest Control offers free estimates. Cost varies by severity and property size. Contact us at (316) 251-9461 or fill out our contact form.` },
    { q: `How quickly can you respond to a ${svc.name.toLowerCase()} call in ${city.name}?`, a: `Shaw's Pest Control serves ${city.name} regularly. Call (316) 251-9461 to discuss your situation and schedule service.` },
  ];
  const otherServices = services.filter(s => s.slug !== svc.slug).map(s => `<li><a href="/${s.comboSlug}-${city.slug}/">${s.name} in ${city.name}</a></li>`).join('');
  const body = `
<section class="section-dark" style="padding:80px 0;background:linear-gradient(145deg,#1a2a24 0%,#2a5c45 100%);">
  <div class="container">
    <nav aria-label="Breadcrumb" style="font-size:0.85rem;margin-bottom:16px;color:rgba(255,255,255,0.6);">
      <a href="/" style="color:rgba(255,255,255,0.7);">Home</a> / <a href="/${svc.slug}/" style="color:rgba(255,255,255,0.7);">${svc.name}</a> / <span>${city.name}</span>
    </nav>
    <h1 style="color:#fff;">${svc.title} in ${city.name}, KS</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:1.1rem;max-width:640px;margin-top:12px;">${fill(svc.description, city.name, city.county)}</p>
    <div style="display:flex;gap:16px;margin-top:28px;flex-wrap:wrap;">
      <a href="/contact/" class="btn btn-primary">Get a Free Estimate</a>
      <a href="tel:3162519461" class="btn btn-outline-white">&#9742; (316) 251-9461</a>
    </div>
  </div>
</section>
<section>
  <div class="container">
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:48px;align-items:start;">
      <div>
        <h2>${svc.title} in ${city.name}, Kansas</h2>
        ${fill(svc.body, city.name, city.county)}
        <h3 style="margin-top:32px;">Serving ${city.name} Since 1987</h3>
        <p>${city.name} is a ${city.county} County community that Shaw's Pest Control has been proud to serve for decades. As a family-owned company based in the same region, we know the pest challenges that ${city.name} homeowners and businesses face.</p>
        <h3 style="margin-top:28px;">Why Choose Shaw's for ${svc.name} in ${city.name}?</h3>
        <ul>
          <li>35+ years of pest control experience in ${city.county} County</li>
          <li>Certified technicians (three state certs + Master Tech Certification)</li>
          <li>Locally owned, faith-based company</li>
          <li>Residential and commercial service</li>
          <li>Free estimates, no obligation</li>
        </ul>
        <h3 style="margin-top:28px;">More Services in ${city.name}</h3>
        <ul>${otherServices}</ul>
      </div>
      <div>
        <div class="kg-card" style="padding:28px;position:sticky;top:90px;">
          <h4>${svc.name} in ${city.name}</h4>
          <p style="color:var(--kg-text-light);margin-bottom:20px;">Free estimates. Licensed technicians. No-pressure service.</p>
          <a href="tel:3162519461" class="btn btn-primary" style="width:100%;margin-bottom:12px;">&#9742; (316) 251-9461</a>
          <a href="/contact/" class="btn btn-outline" style="width:100%;">Contact Form</a>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="section-alt">
  <div class="container">
    <div class="section-title"><h2>Customer Reviews</h2></div>
    <div class="kg-grid kg-grid-3">${reviewCards()}</div>
  </div>
</section>
<section>
  <div class="container">
    <div class="section-title"><div class="section-label">FAQs</div><h2>${svc.name} in ${city.name}, KS</h2></div>
    ${faqBlock(faqs)}
  </div>
</section>`;

  writePage(`${slug}/index.html`, page({
    title: `${svc.title} in ${city.name}, KS | Shaw's Pest Control | (316) 251-9461`,
    metaDesc: fill(svc.description, city.name, city.county).substring(0, 155),
    canonical: `https://${client.domain}/${slug}/`,
    schema: serviceSchema(svc.name, `/${slug}/`) + '\n' + breadcrumbSchema([{name:'Home',url:'/'},{name:svc.name,url:`/${svc.slug}/`},{name:city.name,url:`/${slug}/`}]) + '\n' + faqSchema(faqs),
    body,
  }));
  console.log(`  Built: /${slug}/`);
}

// ─── SERVICE AREAS HUB ────────────────────────────────────────────────────────
function buildServiceAreasHub() {
  const cityCards = cities.map(c => `<a href="/${c.slug}/" class="kg-card" style="padding:24px;text-align:center;text-decoration:none;"><strong style="font-size:1.1rem;color:var(--kg-primary);">${c.name}</strong><br><small style="color:var(--kg-text-light);">${c.county} County, KS</small></a>`).join('');
  const body = `
<section class="section-dark" style="padding:80px 0;background:linear-gradient(145deg,#1a2a24 0%,#2a5c45 100%);">
  <div class="container">
    <h1 style="color:#fff;">Pest Control Service Areas in Kansas</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:1.1rem;max-width:640px;margin-top:12px;">Shaw's Pest Control serves Butler and Sedgwick County and surrounding areas.</p>
  </div>
</section>
<section>
  <div class="container">
    <div class="section-title"><h2>Communities We Serve</h2></div>
    <div class="kg-grid kg-grid-4" style="gap:20px;">${cityCards}</div>
    <p style="text-align:center;margin-top:32px;color:var(--kg-text-light);">Don't see your city? Call us at <a href="tel:3162519461">(316) 251-9461</a> &mdash; we likely serve your area too.</p>
  </div>
</section>`;

  writePage('service-areas/index.html', page({
    title: "Pest Control Service Areas in Butler & Sedgwick County, KS | Shaw's Pest Control",
    metaDesc: "Shaw's Pest Control serves Wichita, El Dorado, Derby, Andover, Augusta, Haysville, Maize, Goddard, and surrounding Butler and Sedgwick County communities.",
    canonical: `https://${client.domain}/service-areas/`,
    schema: localBusinessSchema() + '\n' + breadcrumbSchema([{name:'Home',url:'/'},{name:'Service Areas',url:'/service-areas/'}]),
    body,
  }));
  console.log('  Built: /service-areas/');
}

// ─── PRIVACY POLICY ───────────────────────────────────────────────────────────
function buildPrivacyPolicy() {
  const body = `<section style="padding:60px 0;"><div class="container" style="max-width:800px;"><h1>Privacy Policy</h1><p><em>Last updated: ${new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</em></p><p>Shaw's Pest Control operates shawspest.com. This Privacy Policy explains how we collect and use information you provide.</p><h2>Information We Collect</h2><p>We collect information you voluntarily provide via our contact form: name, email, phone, and message. We do not sell or share this information.</p><h2>Analytics</h2><p>We use Google Analytics to understand how visitors use our site. This collects anonymized data only.</p><h2>Contact</h2><p>Questions? Call us at <a href="tel:3162519461">(316) 251-9461</a>.</p></div></section>`;
  writePage('privacy-policy/index.html', page({
    title: "Privacy Policy | Shaw's Pest Control",
    metaDesc: "Privacy policy for shawspest.com — Shaw's Pest Control.",
    canonical: `https://${client.domain}/privacy-policy/`,
    schema: '',
    body,
  }));
  console.log('  Built: /privacy-policy/');
}

// ─── 404 ──────────────────────────────────────────────────────────────────────
function build404() {
  const body = `<section style="padding:120px 0;text-align:center;"><div class="container"><h1 style="font-size:5rem;color:var(--kg-primary);margin-bottom:16px;">404</h1><h2>Page Not Found</h2><p style="margin-bottom:32px;">The page you're looking for doesn't exist.</p><div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;"><a href="/" class="btn btn-primary">Go Home</a><a href="/contact/" class="btn btn-outline">Contact Us</a></div></div></section>`;
  writePage('404.html', page({
    title: "Page Not Found | Shaw's Pest Control",
    metaDesc: "Page not found — Shaw's Pest Control.",
    canonical: `https://${client.domain}/404`,
    schema: '',
    body,
  }));
  console.log('  Built: 404.html');
}

module.exports = { buildLocationPage, buildComboPage, buildServiceAreasHub, buildPrivacyPolicy, build404 };
