const fs = require('fs');

const html = fs.readFileSync('dist/pest-control-bedbugs/index.html', 'utf8');

// Look for raw FAQPage text outside script tags
const idx = html.indexOf('"@type": "FAQPage"');
console.log('FAQPage (formatted with spaces) at:', idx);

// Also check without spaces
const idx2 = html.indexOf('"@type":"FAQPage"');
console.log('FAQPage (no spaces) at:', idx2);

// Check all occurrences of FAQPage
let pos = 0;
let count = 0;
while(true) {
  const found = html.indexOf('FAQPage', pos);
  if (found === -1) break;
  // Is it inside a script tag?
  const prevScript = html.lastIndexOf('<script', found);
  const prevScriptClose = html.lastIndexOf('</script>', found);
  const inScript = prevScript > prevScriptClose;
  console.log('FAQPage at', found, '- inside script tag:', inScript);
  if (!inScript) {
    console.log('  Context:', html.substring(found-100, found+200));
  }
  pos = found + 1;
  count++;
  if (count > 20) break;
}

// Also search for <br> near JSON
const brJson = html.indexOf('"@type":<br>');
const brJson2 = html.indexOf('"@type": "FAQPage"');
console.log('\nbr+JSON at:', brJson, brJson2);

// Search for acceptedAnswer
const aa = html.indexOf('acceptedAnswer');
console.log('acceptedAnswer at:', aa);
if (aa > -1) {
  const prevScript = html.lastIndexOf('<script', aa);
  const prevClose = html.lastIndexOf('</script>', aa);
  console.log('In script?', prevScript > prevClose);
  console.log('Context:', html.substring(aa-200, aa+300));
}
