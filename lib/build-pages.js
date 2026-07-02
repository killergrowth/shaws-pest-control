'use strict';
const { writePage, fill, localBusinessSchema, serviceSchema, breadcrumbSchema, faqSchema, reviewCards, faqBlock, page, client, services, cities } = require('./shared');

// â"€â"€â"€ HOME â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
function buildHome() {
  const faqs = [
    { q: "What areas does Shaw's Pest Control serve?", a: "Shaw's Pest Control serves Butler County and Sedgwick County and surrounding areas in Kansas, including Wichita, El Dorado, Derby, Andover, Augusta, Haysville, Maize, and Goddard." },
    { q: "Is Shaw's Pest Control licensed?", a: "Yes. Dave Shaw holds three state certifications plus a Master Tech Certification. Nathan has two state certifications, and Kara holds one state certification." },
    { q: "Do you serve both residential and commercial properties?", a: "Yes. Shaw's Pest Control provides structural pest control for both residential and commercial customers throughout Butler and Sedgwick County." },
    { q: "What pests do you treat?", a: "We treat spiders, ants, roaches, bed bugs, fleas, mosquitoes, and termites. We specialize in structural pest control for homes and businesses." },
    { q: "How do I get a free estimate?", a: "Call us at (316) 251-9461 or use our online contact form. We'll assess your situation and provide a customized plan at no cost." },
  ];
  const body = `
<section class="section-dark" style="padding:100px 0 80px;background:linear-gradient(180deg,rgba(18,18,18,0.78) 0%,rgba(18,18,18,0.68) 100%),url('/images/hero.png') center/cover no-repeat;display:flex;align-items:center;">
  <div class="container">
    <div style="max-width:680px;">
      <div class="section-label" style="color:#d4860a;">Faith-Based &bull; Family-Owned &bull; Since 1987</div>
      <h1 style="color:#fff;margin-bottom:20px;">Pest Control. <span style="color:#d4860a;">Under Control.</span></h1>
      <p style="color:rgba(255,255,255,0.88);font-size:1.18rem;max-width:560px;margin-bottom:36px;">Serving Butler and Sedgwick County since 1987. Residential and commercial structural pest control delivered with integrity.</p>
      <div style="display:flex;flex-wrap:wrap;gap:16px;">
        <a href="/contact/" class="btn btn-primary">Get a Free Estimate</a>
        <a href="tel:3162519461" class="btn btn-outline-white">&#9742; (316) 251-9461</a>
      </div>
      <div style="display:flex;gap:32px;margin-top:40px;flex-wrap:wrap;">
        <div style="color:rgba(255,255,255,0.8);font-size:0.9rem;"><strong style="color:#d4860a;font-size:1.5rem;display:block;">35+</strong>Years Experience</div>
        <div style="color:rgba(255,255,255,0.8);font-size:0.9rem;"><strong style="color:#d4860a;font-size:1.5rem;display:block;">3</strong>State Certifications</div>
        <div style="color:rgba(255,255,255,0.8);font-size:0.9rem;"><strong style="color:#d4860a;font-size:1.5rem;display:block;">1</strong>Master Tech Cert</div>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-title">
      <div class="section-label">Our Services</div>
      <h2>Pest Control. Under Control.</h2>
      <p>With 35+ years of experience, we develop a customized plan to eliminate pests from your home or commercial property.</p>
    </div>
    <div class="kg-grid kg-grid-3">
      <a href="/pestcontrol/" class="kg-card" style="text-decoration:none;"><img src="/images/3d-roach.jpg" alt="Pest Control" style="width:100%;height:180px;object-fit:cover;border-radius:var(--kg-radius) var(--kg-radius) 0 0;"><div style="padding:24px;"><h3>General Pest Control</h3><p style="color:var(--kg-text-light);">Spiders, ants, roaches, bed bugs, fleas &mdash; customized treatment plans.</p><span style="color:var(--kg-primary);font-weight:700;">Learn More &rarr;</span></div></a>
      <a href="/termites/" class="kg-card" style="text-decoration:none;"><img src="/images/termites.jpg" alt="Termite Control" style="width:100%;height:180px;object-fit:cover;border-radius:var(--kg-radius) var(--kg-radius) 0 0;"><div style="padding:24px;"><h3>Termite Control</h3><p style="color:var(--kg-text-light);">Advance Termite Bait System, liquid treatment, and hybrid approaches.</p><span style="color:var(--kg-primary);font-weight:700;">Learn More &rarr;</span></div></a>
      <a href="/mosquito-control/" class="kg-card" style="text-decoration:none;"><img src="/images/mosquitoes.jpg" alt="Mosquito Control" style="width:100%;height:180px;object-fit:cover;border-radius:var(--kg-radius) var(--kg-radius) 0 0;"><div style="padding:24px;"><h3>Mosquito Control</h3><p style="color:var(--kg-text-light);">In2Care stations, Mosquito Beads, and chemical treatments.</p><span style="color:var(--kg-primary);font-weight:700;">Learn More &rarr;</span></div></a>
    </div>
    <div style="text-align:center;margin-top:32px;"><a href="/pestcontrol/" class="btn btn-outline">View All Services</a></div>
  </div>
</section>

<section class="section-alt">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;">
      <div>
        <div class="section-label">Why Shaw's Pest Control</div>
        <h2>A Family Business Built on Trust</h2>
        <p>Dave Shaw has been in the pest control industry since 1987. He holds three state certifications and a Master Tech Certification &mdash; the highest level of professional training in the industry.</p>
        <p>His son Nathan carries on the tradition with two state certifications. Daughter Kara also holds a state certification. As a locally owned, faith-based company, Shaw's Pest Control brings honesty and integrity to every job.</p>
        <a href="/about/" class="btn btn-primary" style="margin-top:8px;">Meet the Team</a>
      </div>
      <div><img src="/images/shaws-sprayer.jpg" alt="Shaw's Pest Control team in Butler County Kansas" style="width:100%;border-radius:var(--kg-radius-lg);box-shadow:var(--kg-shadow);"></div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-title"><div class="section-label">Customer Reviews</div><h2>Our Customers Trust Us</h2></div>
    <div class="kg-grid kg-grid-3">${reviewCards()}</div>
  </div>
</section>

<section class="section-alt">
  <div class="container">
    <div class="section-title">
      <div class="section-label">Where We Serve</div>
      <h2>Butler &amp; Sedgwick County Pest Control</h2>
      <p>Shaw's Pest Control serves communities throughout Butler and Sedgwick County.</p>
    </div>
    <div class="kg-grid kg-grid-4" style="gap:16px;">
      ${cities.map(c => `<a href="/${c.slug}/" class="kg-card" style="padding:20px;text-align:center;text-decoration:none;"><strong style="color:var(--kg-primary);">${c.name}</strong><br><small style="color:var(--kg-text-light);">${c.county} County</small></a>`).join('')}
    </div>
    <div style="text-align:center;margin-top:32px;"><a href="/service-areas/" class="btn btn-outline">All Service Areas</a></div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-title"><div class="section-label">FAQs</div><h2>Common Questions About Pest Control</h2></div>
    ${faqBlock(faqs)}
  </div>
</section>`;

  writePage('index.html', page({
    title: "Pest Control in Butler & Sedgwick County, KS | Shaw's Pest Control",
    metaDesc: "Shaw's Pest Control - locally owned, faith-based pest control serving Butler and Sedgwick County since 1987. Free estimates. Call (316) 251-9461.",
    canonical: `https://${client.domain}/`,
    schema: localBusinessSchema() + '\n' + faqSchema(faqs),
    body,
  }));
  console.log('  Built: / (home)');
}

// â"€â"€â"€ ABOUT â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
function buildAbout() {
  const faqs = [
    { q: "How long has Shaw's Pest Control been in business?", a: "Shaw's Pest Control has been serving Butler and Sedgwick County since 1987 â€" over 35 years of trusted pest control service." },
    { q: "Is Shaw's Pest Control licensed?", a: "Yes. Dave Shaw holds three Kansas state pest control certifications and a Master Tech Certification. Nathan Shaw has two state certifications, and Kara Shaw holds one state certification." },
    { q: "Is Shaw's Pest Control a faith-based company?", a: "Yes. Shaw's Pest Control is a locally owned, faith-based company. Our commitment to honesty and integrity is part of who we are." },
  ];
  const body = `
<section class="section-dark" style="padding:80px 0;background:linear-gradient(145deg,#1a1a1a 0%,#2d2d2d 100%);">
  <div class="container">
    <h1 style="color:#fff;">About Shaw's Pest Control</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:1.1rem;max-width:600px;margin-top:12px;">A family business built on integrity, faith, and 35+ years of pest control expertise.</p>
  </div>
</section>
<section>
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;">
      <div>
        <h2>Dave Shaw &mdash; Founder</h2>
        <p>Dave Shaw has been in the pest control industry since 1987. Over those years, he obtained three Kansas state certifications, as well as a Master Tech Certification &mdash; the highest professional designation in the field.</p>
        <p>Dave lives in El Dorado, Kansas with his wife Melinda. He's not just a technician &mdash; he's a neighbor who knows this community.</p>
        <h3 style="margin-top:32px;">Nathan Shaw</h3>
        <p>Dave's son Nathan holds two state certifications and is actively working toward his Master Tech Certification. He lives in El Dorado with his wife Lindsay and their three children.</p>
        <h3 style="margin-top:24px;">Kara Shaw</h3>
        <p>Dave's daughter Kara works part-time and holds a state certification. Pest control is a true family affair at Shaw's.</p>
        <h3 style="margin-top:24px;">A Faith-Based Company</h3>
        <p>Shaw's Pest Control is a locally owned, faith-based company providing quality pest control services with integrity. Countless people have come to us as customers with a problem and left as friends. We solve pest problems and give people peace of mind.</p>
      </div>
      <div>
        <img src="/images/shaws-sprayer.jpg" alt="Dave Shaw, Shaw's Pest Control, El Dorado Kansas" style="width:100%;border-radius:var(--kg-radius-lg);box-shadow:var(--kg-shadow);margin-bottom:24px;">
        <div class="kg-card" style="padding:28px;">
          <h4>Certifications</h4>
          <ul style="margin-top:12px;">
            <li>Three Kansas State Pest Control Certifications (Dave)</li>
            <li>Master Tech Certification (Dave)</li>
            <li>Two Kansas State Certifications (Nathan)</li>
            <li>One Kansas State Certification (Kara)</li>
          </ul>
          <p style="margin-top:16px;color:var(--kg-text-light);font-size:0.9rem;">Serving Butler and Sedgwick County since 1987.</p>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="section-alt">
  <div class="container">
    <div class="section-title"><h2>What Our Customers Say</h2></div>
    <div class="kg-grid kg-grid-3">${reviewCards()}</div>
  </div>
</section>
<section>
  <div class="container">
    <div class="section-title"><div class="section-label">FAQs</div><h2>About Our Company</h2></div>
    ${faqBlock(faqs)}
  </div>
</section>`;

  writePage('about/index.html', page({
    title: "About Shaw's Pest Control | El Dorado, KS | Since 1987",
    metaDesc: "Meet Dave Shaw and the Shaw family. Locally owned, faith-based pest control serving Butler and Sedgwick County, Kansas since 1987.",
    canonical: `https://${client.domain}/about/`,
    schema: localBusinessSchema() + '\n' + breadcrumbSchema([{name:'Home',url:'/'},{name:'About',url:'/about/'}]) + '\n' + faqSchema(faqs),
    body,
  }));
  console.log('  Built: /about/');
}

// â"€â"€â"€ CONTACT â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
function buildContact() {
  const body = `
<section class="section-dark" style="padding:80px 0;background:linear-gradient(145deg,#1a1a1a 0%,#2d2d2d 100%);">
  <div class="container">
    <h1 style="color:#fff;">Get a Free Estimate</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:1.1rem;max-width:600px;margin-top:12px;">Reach out with a question or request a quote. Or call us directly at <a href="tel:3162519461" style="color:#d4860a;font-weight:700;">(316) 251-9461</a>.</p>
  </div>
</section>
<section>
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:start;">
      <div>
        <h2>Send Us a Message</h2>
        <form action="/submit" method="POST" class="kg-form" id="contact-form">
          <input type="hidden" name="page" value="contact">
          <div class="kg-form-group">
            <label for="name">Your Name <span style="color:red;">*</span></label>
            <input type="text" id="name" name="name" required placeholder="Dave Smith">
          </div>
          <div class="kg-form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="you@example.com">
          </div>
          <div class="kg-form-group">
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" placeholder="(316) 555-0100">
          </div>
          <div class="kg-form-group">
            <label for="service">Service Needed</label>
            <select id="service" name="service">
              <option value="">Select a service...</option>
              <option>General Pest Control</option>
              <option>Termite Control</option>
              <option>Mosquito Control</option>
              <option>Spider Control</option>
              <option>Ant Control</option>
              <option>Roach Control</option>
              <option>Bed Bug Control</option>
              <option>Other</option>
            </select>
          </div>
          <div class="kg-form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Tell us about your pest problem..."></textarea>
          </div>
          <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer><\/script>
          <div class="cf-turnstile" data-sitekey="1x00000000000000000000AA" style="margin-bottom:16px;"></div>
          <button type="submit" class="btn btn-primary" style="width:100%;">Send Message</button>
          <div id="form-success" style="display:none;margin-top:16px;padding:16px;background:#d4edda;border-radius:8px;color:#155724;">&#10003; Message sent! We'll be in touch soon.</div>
          <div id="form-error" style="display:none;margin-top:16px;padding:16px;background:#f8d7da;border-radius:8px;color:#721c24;">Something went wrong. Please call (316) 251-9461.</div>
        </form>
        <script>
        document.getElementById('contact-form').addEventListener('submit', async function(e) {
          e.preventDefault();
          const btn = this.querySelector('button[type=submit]');
          btn.textContent = 'Sending...'; btn.disabled = true;
          try {
            const res = await fetch('/submit', { method:'POST', body: new FormData(this) });
            const d = await res.json();
            if (d.ok) { document.getElementById('form-success').style.display='block'; this.reset(); }
            else { throw new Error(d.error||'Error'); }
          } catch(err) {
            document.getElementById('form-error').style.display='block';
            if (window.turnstile) window.turnstile.reset();
          }
          btn.textContent='Send Message'; btn.disabled=false;
        });
        <\/script>
      </div>
      <div>
        <h2>Contact Info</h2>
        <div class="kg-card" style="padding:28px;margin-bottom:24px;">
          <p><strong>&#128222; Phone:</strong><br><a href="tel:3162519461" style="font-size:1.3rem;font-weight:700;color:var(--kg-primary);">(316) 251-9461</a></p>
          <p style="margin-top:16px;"><strong>&#128205; Address:</strong><br>303 Commerce St Ste 2<br>El Dorado, KS 67042</p>
          <p style="margin-top:16px;"><strong>Service Area:</strong><br>Butler and Sedgwick County and surrounding areas, Kansas</p>
          <p style="margin-top:16px;"><strong>Certifications:</strong><br>Three State Certifications &bull; Master Tech Certification</p>
        </div>
        <div class="kg-card" style="padding:28px;">
          <h4>Business Hours</h4>
          <p>Monday &mdash; Friday: 8:00 AM &ndash; 5:00 PM<br>Saturday: By appointment<br>Sunday: Closed</p>
        </div>
      </div>
    </div>
  </div>
</section>`;

  writePage('contact/index.html', page({
    title: "Contact Shaw's Pest Control | Free Estimate | (316) 251-9461",
    metaDesc: "Contact Shaw's Pest Control for a free estimate. Serving Butler and Sedgwick County, Kansas. Call (316) 251-9461 or fill out our form.",
    canonical: `https://${client.domain}/contact/`,
    schema: localBusinessSchema() + '\n' + breadcrumbSchema([{name:'Home',url:'/'},{name:'Contact',url:'/contact/'}]),
    body,
  }));
  console.log('  Built: /contact/');
}

// â"€â"€â"€ SERVICE PAGE â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
function buildServicePage(svc) {
  const faqs = [
    { q: `How much does ${svc.name.toLowerCase()} cost in Butler County?`, a: `Shaw's Pest Control provides free estimates for ${svc.name.toLowerCase()} in Butler and Sedgwick County. Cost depends on infestation severity and treatment type. Call (316) 251-9461 for your free quote.` },
    { q: `How long does ${svc.name.toLowerCase()} treatment take?`, a: `Treatment time varies by severity and property size. Most residential treatments complete in 1-2 hours. We'll give you a realistic timeline during your free estimate.` },
    { q: `Do you offer ${svc.name.toLowerCase()} for commercial properties?`, a: `Yes. Shaw's Pest Control provides ${svc.name.toLowerCase()} for both residential and commercial customers throughout Butler and Sedgwick County.` },
    { q: `Is ${svc.name.toLowerCase()} treatment safe for families and pets?`, a: `Shaw's Pest Control uses EPA-registered products applied by certified technicians. We follow all safety protocols and will provide specific guidance for your treatment.` },
  ];
  const body = `
<section class="section-dark" style="padding:80px 0;background:linear-gradient(145deg,#1a1a1a 0%,#2d2d2d 100%);">
  <div class="container">
    <nav aria-label="Breadcrumb" style="font-size:0.85rem;margin-bottom:16px;color:rgba(255,255,255,0.6);"><a href="/" style="color:rgba(255,255,255,0.7);">Home</a> / <span>${svc.name}</span></nav>
    <h1 style="color:#fff;">${svc.title} in Butler &amp; Sedgwick County, KS</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:1.1rem;max-width:600px;margin-top:12px;">${fill(svc.description, 'Butler and Sedgwick County', 'Butler')}</p>
    <div style="display:flex;gap:16px;margin-top:28px;flex-wrap:wrap;"><a href="/contact/" class="btn btn-primary">Get a Free Estimate</a><a href="tel:3162519461" class="btn btn-outline-white">&#9742; (316) 251-9461</a></div>
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
          <p style="color:var(--kg-text-light);margin-bottom:20px;">Call us or fill out a quick form.</p>
          <a href="tel:3162519461" class="btn btn-primary" style="width:100%;margin-bottom:12px;">&#9742; (316) 251-9461</a>
          <a href="/contact/" class="btn btn-outline" style="width:100%;">Contact Form</a>
          <div style="margin-top:20px;padding-top:20px;border-top:1px solid var(--kg-border);"><p style="font-size:0.88rem;color:var(--kg-text-light);">Three State Certifications &bull; Master Tech Cert &bull; Since 1987</p></div>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="section-alt">
  <div class="container">
    <div class="section-title"><h2>What Customers Say</h2></div>
    <div class="kg-grid kg-grid-3">${reviewCards()}</div>
  </div>
</section>
<section>
  <div class="container">
    <div class="section-title"><div class="section-label">Service Areas</div><h2>${svc.title} Near You</h2></div>
    <div class="kg-grid kg-grid-4" style="gap:16px;">
      ${cities.map(c => `<a href="/${svc.comboSlug}-${c.slug}/" class="kg-card" style="padding:20px;text-align:center;text-decoration:none;"><strong style="color:var(--kg-primary);">${c.name}</strong><br><small style="color:var(--kg-text-light);">${svc.name}</small></a>`).join('')}
    </div>
  </div>
</section>
<section class="section-alt">
  <div class="container">
    <div class="section-title"><div class="section-label">FAQs</div><h2>Common Questions</h2></div>
    ${faqBlock(faqs)}
  </div>
</section>`;

  writePage(`${svc.slug}/index.html`, page({
    title: `${svc.title} in Butler & Sedgwick County, KS | Shaw's Pest Control`,
    metaDesc: fill(svc.description, 'Butler and Sedgwick County').substring(0, 155),
    canonical: `https://${client.domain}/${svc.slug}/`,
    schema: localBusinessSchema() + '\n' + serviceSchema(svc.name, `/${svc.slug}/`) + '\n' + breadcrumbSchema([{name:'Home',url:'/'},{name:svc.name,url:`/${svc.slug}/`}]) + '\n' + faqSchema(faqs),
    body,
  }));
  console.log(`  Built: /${svc.slug}/`);
}

// â"€â"€â"€ LOCATION HUB â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

module.exports = { buildHome, buildAbout, buildContact, buildServicePage };
