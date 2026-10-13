var fs = require('fs');
var h = fs.readFileSync('dist/pestcontrol/index.html', 'utf8');
var schemaTag = '<script type="application/ld+json">';
var closeTag = '</script>';

// Find ALL </script> positions
var closePositions = [];
var pos = 0;
while ((pos = h.indexOf(closeTag, pos)) !== -1) {
  closePositions.push(pos);
  pos += closeTag.length;
}
process.stdout.write('All </script> positions: ' + closePositions.join(', ') + '\n\n');

// Find all schema open positions
var openPositions = [];
pos = 0;
while ((pos = h.indexOf(schemaTag, pos)) !== -1) {
  openPositions.push(pos);
  pos += schemaTag.length;
}
process.stdout.write('All schema open positions: ' + openPositions.join(', ') + '\n\n');

// Show context around each extra </script>
closePositions.forEach(function(cp) {
  // Check if this close is inside a schema block that hasn't been properly closed
  var snippet = h.slice(Math.max(0, cp-100), cp+50);
  process.stdout.write('--- close at ' + cp + ' ---\n' + snippet + '\n\n');
});
