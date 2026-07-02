const fs = require('fs');
const path = 'lib/build-pages.js';
let text = fs.readFileSync(path, 'utf8');

// The mangled sequence \u00e2\u20ac\u201d is the Windows-1252 double-encoded em dash
// Replace with a clean hyphen
text = text.replace(/\u00e2\u20ac\u201d/g, '-');
text = text.replace(/\u00e2\u20ac\u201c/g, '-');
text = text.replace(/--"/g, '-');  // clean up any leftover artifact from prior fix

fs.writeFileSync(path, text, 'utf8');
console.log('Done. Checking metaDesc:');
const idx = text.indexOf('metaDesc: "Shaw');
console.log(text.substring(idx, idx + 130));
