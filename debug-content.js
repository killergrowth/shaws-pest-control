const fs = require('fs');
const c = fs.readFileSync('lib/service-content.js', 'utf8');
const bStart = c.indexOf('```json');
const faqsIdx = c.indexOf('"faqs"', bStart);
const segment = c.substring(bStart - 30, faqsIdx + 5);

const reB = /\\n<p>\\n```json[\s\S]*?\\n```\\n<\/p>\\"/;
console.log('Pattern B matches:', reB.test(segment));

// Check what the end actually looks like character by character
const endSnippet = segment.substring(segment.length - 30);
console.log('\nEnd snippet hex:');
for (let i = 0; i < endSnippet.length; i++) {
  process.stdout.write('<' + endSnippet.charCodeAt(i).toString(16).padStart(2,'0') + '>');
}
console.log('');
console.log('End snippet JSON:', JSON.stringify(endSnippet));

// Try the most basic possible match
const reSimple = /```\\n<\/p>/;
console.log('\nSimple match ```\\n</p>:', reSimple.test(segment));
const reSimple2 = /```\n<\/p>/;
console.log('Simple match ``` actual-newline </p>:', reSimple2.test(segment));
