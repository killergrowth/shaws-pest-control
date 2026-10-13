var fs = require('fs');
var h = fs.readFileSync('dist/pestcontrol/index.html', 'utf8');
var opens = (h.split('<script type="application/ld+json">').length - 1);
var closes = (h.split('</script>').length - 1);
process.stdout.write('opens: ' + opens + '\ncloses: ' + closes + '\n');

// Find mismatched script tags — if a schema block is unclosed, browser renders body
var idx = 0;
var schemaTag = '<script type="application/ld+json">';
var closeTag = '</script>';
var pos = 0;
while ((pos = h.indexOf(schemaTag, pos)) !== -1) {
  var closePos = h.indexOf(closeTag, pos + schemaTag.length);
  var nextOpen = h.indexOf(schemaTag, pos + schemaTag.length);
  if (nextOpen !== -1 && nextOpen < closePos) {
    process.stdout.write('UNCLOSED block at offset ' + pos + '\n');
  }
  pos = closePos + closeTag.length;
}
process.stdout.write('done\n');
