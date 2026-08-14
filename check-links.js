const fs = require('fs');
const path = require('path');

const pages = [
  'termite-control-wichita',
  'ant-control-derby',
  'mosquito-control-andover',
  'pest-control-wichita',
  'spider-control-goddard'
];

pages.forEach(p => {
  const filePath = path.join('./dist', p, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  const allLinks = html.match(/href="\/[^"]+"/g) || [];
  const internalLinks = allLinks.filter(l => l.indexOf('tel:') === -1 && l.indexOf('mailto:') === -1);
  console.log('\n/' + p + '/');
  console.log('  Internal links: ' + internalLinks.length);
  internalLinks.slice(0, 10).forEach(l => console.log('    ' + l));
});
