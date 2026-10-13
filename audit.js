// Audit: find em dash corruption and button link issues across all dist HTML files
const fs = require('fs');
const path = require('path');

function getAllHtml(dir) {
  let files = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) files = files.concat(getAllHtml(full));
    else if (f.endsWith('.html')) files.push(full);
  }
  return files;
}

const distDir = path.join(__dirname, 'dist');
const files = getAllHtml(distDir);
process.stdout.write('Total HTML files: ' + files.length + '\n\n');

// 1. Check for encoding issues
const badPatterns = [
  /\ufffd/g,           // replacement character
  /â€"/g,             // mojibake for em dash
  /â€™/g,             // mojibake for right single quote
  /&amp;mdash;/g,      // double-encoded em dash
  /\u00e2\u20ac/g,    // UTF-8 mojibake prefix
];

let encodingIssues = [];
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  for (const pat of badPatterns) {
    const matches = content.match(pat);
    if (matches) {
      encodingIssues.push({ file: f.replace(distDir, ''), pattern: pat.toString(), count: matches.length });
    }
  }
}

if (encodingIssues.length === 0) {
  process.stdout.write('ENCODING: No issues found\n\n');
} else {
  process.stdout.write('ENCODING ISSUES:\n');
  encodingIssues.forEach(i => process.stdout.write('  ' + i.file + ' | ' + i.pattern + ' x' + i.count + '\n'));
  process.stdout.write('\n');
}

// 2. Audit buttons — find all <a class="btn..." and check href
const buttonIssues = [];
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const btnRegex = /<a[^>]*class="[^"]*btn[^"]*"[^>]*href="([^"]*)"[^>]*>([^<]*)</g;
  let m;
  while ((m = btnRegex.exec(content)) !== null) {
    const href = m[1];
    const text = m[2].trim();
    // Flag suspicious hrefs
    if (!href || href === '#' || href === '' || href.includes('undefined') || href.includes('null')) {
      buttonIssues.push({ file: f.replace(distDir, ''), href, text });
    }
  }
}

if (buttonIssues.length === 0) {
  process.stdout.write('BUTTONS: All buttons have valid hrefs\n\n');
} else {
  process.stdout.write('BUTTON ISSUES:\n');
  buttonIssues.forEach(i => process.stdout.write('  ' + i.file + ' | href="' + i.href + '" text="' + i.text + '"\n'));
  process.stdout.write('\n');
}

// 3. Check contact form for Turnstile sitekey placeholder
const contactFile = path.join(distDir, 'contact', 'index.html');
if (fs.existsSync(contactFile)) {
  const content = fs.readFileSync(contactFile, 'utf8');
  const turnstile = content.match(/data-sitekey="([^"]+)"/);
  process.stdout.write('CONTACT FORM Turnstile sitekey: ' + (turnstile ? turnstile[1] : 'NOT FOUND') + '\n');
  const action = content.match(/action="([^"]+)"/);
  process.stdout.write('CONTACT FORM action: ' + (action ? action[1] : 'NOT FOUND') + '\n');
}
