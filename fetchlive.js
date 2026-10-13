const https = require('https');
https.get('https://staging.shaws-pest-control.pages.dev/pestcontrol/', r => {
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => {
    const opens = d.split('<script type="application/ld+json">').length - 1;
    const closes = d.split('</script>').length - 1;
    process.stdout.write('LIVE opens=' + opens + ' closes=' + closes + '\n');
    
    // Find where mainEntity appears and whether it's inside a script tag
    const idx = d.indexOf('"mainEntity"');
    if (idx > -1) {
      const lastOpen = d.lastIndexOf('<script', idx);
      const lastClose = d.lastIndexOf('</script>', idx);
      const inScript = lastOpen > lastClose;
      process.stdout.write('mainEntity at ' + idx + ', inScript=' + inScript + '\n');
      if (!inScript) {
        process.stdout.write('LEAKED content around idx:\n' + d.slice(idx-200, idx+500) + '\n');
      }
    }
    
    // Check for </script> inside a schema block (the real bug)
    const schemaBlocks = d.split('<script type="application/ld+json">');
    schemaBlocks.slice(1).forEach((block, i) => {
      const closeIdx = block.indexOf('</script>');
      const content = block.slice(0, closeIdx);
      // If there's a </script> before the first one found, that's the bug
      process.stdout.write('Block ' + (i+1) + ' length=' + content.length + '\n');
    });
  });
});
