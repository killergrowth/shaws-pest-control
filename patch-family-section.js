'use strict';
const fs = require('fs');
const txt = fs.readFileSync('./lib/build-pages.js', 'utf8');

const oldSection = `<section class="section-alt">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;">
      <div>
        <div class="section-label">Why Shaw's Pest Control</div>
        <h2>A Family Business Built on Trust</h2>
        <p>Dave Shaw has been in the pest control industry since 1987. He holds three state certifications and a Master Tech Certification &mdash; the highest level of professional training in the industry.</p>
        <p>His son Nathan carries on the tradition with two state certifications. Daughter Kara also holds a state certification. As a locally owned, faith-based company, Shaw's Pest Control brings honesty and integrity to every job.</p>
        <a href="/about/" class="btn btn-primary" style="margin-top:8px;">Meet the Team</a>
      </div>
      <div><img src="/images/shaws-family-group.jpg" alt="Dave Shaw and the Shaw family, Shaw's Pest Control, El Dorado Kansas" style="width:100%;border-radius:var(--kg-radius-lg);box-shadow:var(--kg-shadow);"></div>
    </div>
  </div>
</section>`;

const newSection = `<section class="section-alt">
  <div class="container">
    <div style="text-align:center;margin-bottom:32px;">
      <div class="section-label">Why Shaw's Pest Control</div>
      <h2>A Family Business Built on Trust</h2>
    </div>
    <img src="/images/shaws-family-group.jpg" alt="The Shaw family, Shaw's Pest Control, El Dorado Kansas" style="width:100%;border-radius:var(--kg-radius-lg);box-shadow:var(--kg-shadow);margin-bottom:32px;">
    <div style="max-width:820px;">
      <p>Dave Shaw has been in the pest control industry since 1987. He holds three state certifications and a Master Tech Certification &mdash; the highest level of professional training in the industry.</p>
      <p>His son Nathan carries on the tradition with two state certifications. Daughter Kara also holds a state certification. As a locally owned, faith-based company, Shaw's Pest Control brings honesty and integrity to every job.</p>
      <a href="/about/" class="btn btn-primary" style="margin-top:8px;">Meet the Team</a>
    </div>
  </div>
</section>`;

if (txt.indexOf(oldSection) === -1) {
  console.error('NOT FOUND — section not matched');
  process.exit(1);
}
const result = txt.replace(oldSection, newSection);
fs.writeFileSync('./lib/build-pages.js', result, 'utf8');
console.log('REPLACED OK');
