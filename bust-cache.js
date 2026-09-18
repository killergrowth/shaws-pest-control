const fs = require('fs');
const path = require('path');

const timestamp = Date.now();
let count = 0;

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(full);
    } else if (entry.name.endsWith('.html')) {
      let content = fs.readFileSync(full, 'utf8');
      // Remove any existing bust comment
      content = content.replace(/<!-- bust:\d+ -->\n?/g, '');
      // Add new bust comment before </html>
      content = content.replace('</html>', `<!-- bust:${timestamp} -->\n</html>`);
      fs.writeFileSync(full, content, 'utf8');
      count++;
    }
  }
}

processDir(path.join(__dirname, 'dist'));
console.log(`Cache busted ${count} HTML files with timestamp ${timestamp}`);
