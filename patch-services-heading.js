'use strict';
const fs = require('fs');
const txt = fs.readFileSync('./lib/build-pages.js', 'utf8');

const old = `      <h2>Pest Control. Under Control.</h2>`;
const rep = `      <h2>What We Do For You</h2>`;

if (txt.indexOf(old) === -1) {
  console.error('NOT FOUND');
  process.exit(1);
}
fs.writeFileSync('./lib/build-pages.js', txt.replace(old, rep), 'utf8');
console.log('REPLACED OK');
