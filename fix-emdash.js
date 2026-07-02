const fs = require('fs');

const path = 'lib/build-pages.js';
let text = fs.readFileSync(path, 'utf8');

// Fix the specific broken string on line ~105
// Pattern: ends string prematurely with -" inside an answer
text = text.replace(
  'since 1987 -" over 35 years of trusted pest control service."',
  'since 1987 - over 35 years of trusted pest control service."'
);

// Also catch any other -" patterns inside answer strings that would break JS
// (stray closing quote after a hyphenated replacement)
text = text.replace(/-" /g, '- ');
text = text.replace(/-"\)/g, '-")');

fs.writeFileSync(path, text, 'utf8');
console.log('Patched line 105');

// Verify
const idx = text.indexOf('since 1987');
console.log('Context:', text.substring(idx, idx + 80));
