const fs = require('fs');
let c = fs.readFileSync('lib/service-content.js', 'utf8');

const before = (c.match(/```json/g) || []).length;

// Pattern B: block WITHOUT --- separator
// Ends with: \\n```\\n</p>"  (escaped \n, then ```, then escaped \n, then </p>, then unescaped quote)
const reB = /\\n<p>\\n```json[\s\S]*?\\n```\\n<\/p>"/g;
c = c.replace(reB, '"');

const after = (c.match(/```json/g) || []).length;
fs.writeFileSync('lib/service-content.js', c, 'utf8');
console.log('Before:', before, '| After:', after);
