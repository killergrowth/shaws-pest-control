'use strict';
// Shaw's Pest Control — build.js
// Orchestrates the full site build into dist/

const fs = require('fs');
const path = require('path');
const { copyAssets, DIST, services, cities } = require('./lib/shared');
const { buildHome, buildAbout, buildContact, buildServicePage } = require('./lib/build-pages');
const { buildLocationPage, buildComboPage, buildServiceAreasHub, buildPrivacyPolicy, build404 } = require('./lib/build-pages-2');

async function main() {
  console.log("\nShaw's Pest Control — Build Start");
  console.log('Cleaning dist/...');
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  console.log('Copying assets...');
  copyAssets();

  console.log('\nBuilding pages...');
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

  // Count built pages
  function countHtml(dir) {
    let n = 0;
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      if (f.isDirectory()) n += countHtml(path.join(dir, f.name));
      else if (f.name.endsWith('.html')) n++;
    }
    return n;
  }

  const pageCount = countHtml(DIST);
  console.log('\nBuild complete!');
  console.log('Pages built:', pageCount);
  console.log('Output:', DIST);
}

main().catch(err => { console.error('Build failed:', err); process.exit(1); });
