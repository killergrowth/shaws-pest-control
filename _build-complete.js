// This script completes build.js by appending the remaining page builders
'use strict';
const fs = require('fs');
const path = require('path');

const buildPath = path.join(__dirname, 'build.js');
let existing = fs.readFileSync(buildPath, 'utf8');

// Find cutoff and trim
const cutoff = existing.lastIndexOf('<p style="margin-top:16px;"><strong>&#128205; Service Area:');
const base = existing.substring(0, cutoff);

// Append the rest of contact + all remaining page builders + main runner
const rest = `          <p style="margin-top:16px;"><strong>&#128205; Service Area:</strong><br>Butler and Sedgwick County and surrounding areas in Kansas</p>
          <p style="margin-top:16px;"><strong>Certifications:</strong><br>Three State Certifications &bull; Master Tech Certification</p>
        </div>
        <div class="kg-card" style="padding:28px;">
          <h4>Business Hours</h4>
          <p>Monday &mdash; Friday: 8:00 AM &ndash; 5:00 PM<br>Saturday: By appointment<br>Sunday: Closed</p>
        </div>
      </div>
    </div>
  </div>
</section>
`;
  writePage('contact/index.html', page({
    title: `Contact Shaw's Pest Control | Free Estimate | (316) 251-9461`,
    metaDesc: `Contact Shaw's Pest Control for a free estimate. Serving Butler and Sedgwick County, Kansas. Call (316) 251-9461 or fill out our online form.`,
    canonical: `https://${client.domain}/contact/`,
    schema: localBusinessSchema() + '\n' + breadcrumbSchema([{name:'Home',url:'/'},{name:'Contact',url:'/contact/'}]),
    body: rest,
  }));
  console.log('  Built: /contact/');
}

// ─── SERVICE PAGE (generic) ───────────────────────────────────────────────────
function buildServicePage(svc) {
  const faqs = [
    { q: `How much does ${svc.name.toLowerCase()} cost in Butler County, KS?`, a: `Shaw's Pest Control provides free estimates for ${svc.name.toLowerCase()} in Butler and Sedgwick County. Cost depends on the size of the infestation and the type of treatment required. Call (316) 251-9461 for your free quote.` },
    { q: `How long does ${svc.name.toLowerCase()} treatment take?`, a: `Treatment time varies by severity and property size. Most residential treatments can be completed in 1-2 hours. Shaw's Pest Control will give you a realistic timeline during your free estimate.` },
    { q: `Do you offer ${svc.name.toLowerCase()} for commercial properties?`, a: `Yes. Shaw's Pest Control provides ${svc.name.toLowerCase()} for both residential and commercial customers throughout Butler and Sedgwick County.` },
    { q: `Is ${svc.name.toLowerCase()} safe for my family and pets?`, a: `Shaw's Pest Control uses EPA-registered products applied by certified technicians. We follow all safety protocols and will provide specific guidance for your treatment.` },
  ];

  const body = `
<section class="section-dark" style="padding:80px 0;background:linear-gradient(145deg,#1a2a24 0%,#2a5c45 100%);">
  <div class="container">
    <nav aria-label="Breadcrumb" style="font-size:0.85rem;margin-bottom:16px;color:rgba(255,255,255,0.6);">
      <a href="/" style="color:rgba(255,255,255,0.7);">Home</a> / <span>${svc.name}</span>
    </nav>
    <h1 style="color:#fff;">${svc.title} in Butler &amp; Sedgwick County, KS</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:1.1rem;max-width:600px;margin-top:12px;">${fill(svc.description, 'Butler and Sedgwick County', 'Butler')}</p>
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
        <h2>${svc.title} Services in Kansas</h2>
        ${fill(svc.body, 'Butler and Sedgwick County', 'Butler')}

        <h3 style="margin-top:36px;">Why Choose Shaw's Pest Control?</h3>
        <ul>
          <li><strong>35+ years of experience</strong> &mdash; serving Butler and Sedgwick County since 1987</li>
          <li><strong>Licensed and certified</strong> &mdash; three state certifications plus a Master Tech Certification</li>
          <li><strong>Family-owned and faith-based</strong> &mdash; honest work with integrity on every job</li>
          <li><strong>Residential and commercial</strong> &mdash; we treat homes and businesses of all sizes</li>
          <li><strong>Free estimates</strong> &mdash; no obligation, no pressure</li>
        </ul>
      </div>
      <div>
        <div class="kg-card" style="padding:28px;position:sticky;top:90px;">
          <h4>Get a Free Estimate</h4>
          <p style="color:var(--kg-text-light);margin-bottom:20px;">Call us or fill out a quick form and we'll be in touch.</p>
          <a href="tel:3162519461" class="btn btn-primary" style="width:100%;margin-bottom:12px;">&#9742; (316) 251-9461</a>
          <a href="/contact/" class="btn btn-outline" style="width:100%;">Contact Form</a>
          <div style="margin-top:20px;padding-top:20px;border-top:1px solid var(--kg-border);">
            <p style="font-size:0.88rem;color:var(--kg-text-light);">Three State Certifications &bull; Master Tech Certification &bull; Since 1987</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Reviews -->
<section class="section-alt">
  <div class="container">
    <div class="section-title"><h2>What Customers Say About Shaw's</h2></div>
    <div class="kg-grid kg-grid-3">${reviewCards()}</div>
  </div>
</section>

<!-- Service Areas for this service -->
<section>
  <div class="container">
    <div class="section-title">
      <div class="section-label">Service Areas</div>
      <h2>${svc.title} Near You</h2>
      <p>Shaw's serves communities throughout Butler and Sedgwick County.</p>
    </div>
    <div class="kg-grid kg-grid-4" style="gap:16px;">
      ${cities.map(c => `<a href="/${svc.comboSlug}-${c.slug}/" class="kg-card" style="padding:20px;text-align:center;text-decoration:none;"><strong style="color:var(--kg-primary);">${c.name}</strong><br><small style="color:var(--kg-text-light);">${svc.name}</small></a>`).join('\n      ')}
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section-alt">
  <div class="container">
    <div class="section-title"><div class="section-label">FAQs</div><h2>Common Questions</h2></div>
    ${faqBlock(faqs)}
  </div>
</section>
`;

  writePage(`${svc.slug}/index.html`, page({
    title: `${svc.title} in Butler & Sedgwick County, KS | Shaw's Pest Control`,
    metaDesc: fill(svc.description, 'Butler and Sedgwick County').substring(0, 155),
    canonical: `https://${client.domain}/${svc.slug}/`,
    schema: localBusinessSchema() + '\n' + serviceSchema(svc.name, `/${svc.slug}/`) + '\n' + breadcrumbSchema([{name:'Home',url:'/'},{name:svc.name,url:`/${svc.slug}/`}]) + '\n' + faqSchema(faqs),
    body,
  }));
  console.log(`  Built: /${svc.slug}/`);
}

// ─── LOCATION HUB PAGE ────────────────────────────────────────────────────────
function buildLocationPage(city) {
  const faqs = [
    { q: `Does Shaw's Pest Control serve ${city.name}, KS?`, a: `Yes. Shaw's Pest Control serves ${city.name} and surrounding ${city.county} County communities. Call (316) 251-9461 for a free estimate.` },
    { q: `What pests are common in ${city.name}, Kansas?`, a: `Common pests in ${city.name} include spiders (including Brown Recluse and Black Widow), ants, German cockroaches, termites, mosquitoes, and bed bugs. Shaw's Pest Control treats all of these.` },
    { q: `How quickly can Shaw's Pest Control come to ${city.name}?`, a: `Shaw's Pest Control serves ${city.name} regularly. Contact us at (316) 251-9461 to schedule service. We'll work to accommodate your schedule.` },
    { q: `Do you offer termite inspections in ${city.name}?`, a: `Yes. Shaw's Pest Control offers termite inspections in ${city.name} for homeowners and prospective buyers. If active termites are found, we offer treatment options including the Advance Termite Bait System.` },
  ];
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
        <p>Shaw's Pest Control has served ${city.name} and the surrounding ${city.county} County area since 1987. Whether you're dealing with ants in the kitchen, spiders in the basement, termites under the foundation, or mosquitoes ruining your backyard, our team has the certifications and experience to solve the problem.</p>
        <p>As a locally owned, faith-based company, we approach every job with honesty and integrity. Dave Shaw and his family have built their business on relationships — customers come to us with a pest problem and often leave as friends.</p>

        <h3 style="margin-top:32px;">Services Available in ${city.name}</h3>
        <div class="kg-grid kg-grid-2" style="gap:16px;margin-top:16px;">
          ${services.map(s => `<a href="/${s.comboSlug}-${city.slug}/" class="kg-card" style="padding:16px 20px;text-decoration:none;"><strong style="color:var(--kg-primary);">${s.name}</strong><br><small style="color:var(--kg-text-light);">in ${city.name}, KS</small></a>`).join('\n          ')}
        </div>

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
          <p style="color:var(--kg-text-light);margin-bottom:20px;">${city.county} County, KS &bull; Population ~${city.population}</p>
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
</section>
`;

  writePage(`${city.slug}/index.html`, page({
    title: `Pest Control in ${city.name}, KS | Shaw's Pest Control`,
    metaDesc: `Shaw's Pest Control serves ${city.name}, Kansas. 35+ years of experience, licensed technicians, free estimates. Call (316) 251-9461.`,
    canonical: `https://${client.domain}/${city.slug}/`,
    schema: localBusinessSchema() + '\n' + breadcrumbSchema([{name:'Home',url:'/'},{name:'Service Areas',url:'/service-areas/'},{name:city.name,url:`/${city.slug}/`}]) + '\n' + faqSchema(faqs),
    body,
  }));
  console.log(`  Built: /${city.slug}/`);
}

// ─── SERVICE+CITY COMBO PAGE ──────────────────────────────────────────────────
function buildComboPage(svc, city) {
  const slug = `${svc.comboSlug}-${city.slug}`;
  const faqs = [
    { q: `Does Shaw's offer ${svc.name.toLowerCase()} in ${city.name}, KS?`, a: `Yes. Shaw's Pest Control provides ${svc.name.toLowerCase()} in ${city.name} and ${city.county} County. Call (316) 251-9461 for a free estimate.` },
    { q: `How much does ${svc.name.toLowerCase()} cost in ${city.name}?`, a: `Shaw's Pest Control offers free estimates. Cost varies by infestation severity and property size. Contact us at (316) 251-9461 or fill out our contact form.` },
    { q: `How quickly can you respond to a ${svc.name.toLowerCase()} call in ${city.name}?`, a: `Shaw's Pest Control serves ${city.name} regularly. We'll work to schedule your appointment as quickly as possible. Call (316) 251-9461 to discuss your situation.` },
  ];
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
        <h2>${svc.title} Services in ${city.name}, Kansas</h2>
        ${fill(svc.body, city.name, city.county)}

        <h3 style="margin-top:32px;">Serving ${city.name} Since 1987</h3>
        <p>${city.name} is a ${city.county} County community that Shaw's Pest Control has been proud to serve for decades. As a family-owned company based in the same region, we know the pest challenges that ${city.name} homeowners and businesses face — and we have the expertise to solve them.</p>

        <h3 style="margin-top:28px;">Why Choose Shaw's for ${svc.name} in ${city.name}?</h3>
        <ul>
          <li>35+ years of pest control experience in ${city.county} County</li>
          <li>Certified technicians (three state certifications + Master Tech Certification)</li>
          <li>Locally owned, faith-based company</li>
          <li>Residential and commercial service</li>
          <li>Free estimates &mdash; no obligation</li>
        </ul>

        <h3 style="margin-top:28px;">More Services in ${city.name}</h3>
        <ul>
          ${services.filter(s => s.slug !== svc.slug).map(s => `<li><a href="/${s.comboSlug}-${city.slug}/">${s.name} in ${city.name}</a></li>`).join('\n          ')}
        </ul>
      </div>
      <div>
        <div class="kg-card" style="padding:28px;position:sticky;top:90px;">
          <h4>${svc.name} in ${city.name}</h4>
          <p style="color:var(--kg-text-light);margin-bottom:20px;">Free estimates. No-pressure service. Licensed technicians.</p>
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
</section>
`;

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
  const body = `
<section class="section-dark" style="padding:80px 0;background:linear-gradient(145deg,#1a2a24 0%,#2a5c45 100%);">
  <div class="container">
    <h1 style="color:#fff;">Pest Control Service Areas in Kansas</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:1.1rem;max-width:640px;margin-top:12px;">Shaw's Pest Control serves Butler and Sedgwick County and surrounding areas. Find your city below for local pest control services.</p>
  </div>
</section>
<section>
  <div class="container">
    <div class="section-title"><h2>Communities We Serve</h2></div>
    <div class="kg-grid kg-grid-4" style="gap:20px;">
      ${cities.map(c => `<a href="/${c.slug}/" class="kg-card" style="padding:24px;text-align:center;text-decoration:none;">
        <strong style="font-size:1.1rem;color:var(--kg-primary);">${c.name}</strong>
        <br><small style="color:var(--kg-text-light);">${c.county} County, KS</small>
        <br><small style="color:var(--kg-text-light);">Pop. ${c.population}</small>
      </a>`).join('\n      ')}
    </div>
    <p style="text-align:center;margin-top:32px;color:var(--kg-text-light);">Don't see your city? Call us at <a href="tel:3162519461">(316) 251-9461</a> &mdash; we likely serve your area too.</p>
  </div>
</section>
`;
  writePage('service-areas/index.html', page({
    title: `Pest Control Service Areas in Butler & Sedgwick County, KS | Shaw's Pest Control`,
    metaDesc: `Shaw's Pest Control serves Wichita, El Dorado, Derby, Andover, Augusta, Haysville, Maize, Goddard, and surrounding Butler and Sedgwick County communities.`,
    canonical: `https://${client.domain}/service-areas/`,
    schema: localBusinessSchema() + '\n' + breadcrumbSchema([{name:'Home',url:'/'},{name:'Service Areas',url:'/service-areas/'}]),
    body,
  }));
  console.log('  Built: /service-areas/');
}

// ─── PRIVACY POLICY ───────────────────────────────────────────────────────────
function buildPrivacyPolicy() {
  const body = `
<section style="padding:60px 0;">
  <div class="container" style="max-width:800px;">
    <h1>Privacy Policy</h1>
    <p><em>Last updated: ${new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</em></p>
    <p>Shaw's Pest Control ("we", "us", or "our") operates shawspest.com. This Privacy Policy explains how we collect, use, and protect information you provide when using our website.</p>
    <h2>Information We Collect</h2>
    <p>We collect information you voluntarily provide when filling out our contact form: your name, email address, phone number, and message. We do not sell or share this information with third parties.</p>
    <h2>How We Use Your Information</h2>
    <p>We use the information you provide solely to respond to your pest control inquiry and schedule service. We may follow up by phone or email regarding your request.</p>
    <h2>Cookies &amp; Analytics</h2>
    <p>We use Google Analytics to understand how visitors use our website. This tool collects anonymized data (browser type, pages visited, time on site). No personally identifiable information is collected by analytics.</p>
    <h2>Contact Us</h2>
    <p>Questions about this policy? Call us at <a href="tel:3162519461">(316) 251-9461</a>.</p>
  </div>
</section>
`;
  writePage('privacy-policy/index.html', page({
    title: `Privacy Policy | Shaw's Pest Control`,
    metaDesc: `Privacy policy for shawspest.com — Shaw's Pest Control, El Dorado, KS.`,
    canonical: `https://${client.domain}/privacy-policy/`,
    schema: '',
    body,
  }));
  console.log('  Built: /privacy-policy/');
}

// ─── 404 PAGE ─────────────────────────────────────────────────────────────────
function build404() {
  const body = `
<section style="padding:120px 0;text-align:center;">
  <div class="container">
    <h1 style="font-size:5rem;color:var(--kg-primary);margin-bottom:16px;">404</h1>
    <h2>Page Not Found</h2>
    <p style="color:var(--kg-text-light);margin-bottom:32px;">The page you're looking for doesn't exist. Let us help you find what you need.</p>
    <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
      <a href="/" class="btn btn-primary">Go Home</a>
      <a href="/contact/" class="btn btn-outline">Contact Us</a>
    </div>
  </div>
</section>
`;
  writePage('404.html', page({
    title: `Page Not Found | Shaw's Pest Control`,
    metaDesc: `Page not found.`,
    canonical: `https://${client.domain}/404`,
    schema: '',
    body,
  }));
  console.log('  Built: 404.html');
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\\nShaw\\'s Pest Control — Build Start');
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  copyAssets();
  console.log('  Assets copied');

  buildHome();
  buildAbout();
  buildContact();

  for (const svc of services) buildServicePage(svc);

  for (const city of cities) buildLocationPage(city);

  for (const svc of services) {
    for (const city of cities) buildComboPage(svc, city);
  }

  buildServiceAreasHub();
  buildPrivacyPolicy();
  build404();

  console.log('\\nBuild complete!');
  console.log('Pages built:', fs.readdirSync(DIST, { recursive: true }).filter(f => f.endsWith('.html')).length);
}

main().catch(console.error);
`;

fs.writeFileSync(buildPath, base + rest, 'utf8');
console.log('build.js completed. Size:', (base + rest).length, 'bytes');
