const fs = require('fs');

['dist/pestcontrol/index.html', 'dist/pest-control-bedbugs/index.html'].forEach(file => {
  console.log('\n=== ' + file + ' ===');
  const html = fs.readFileSync(file, 'utf8');
  const matches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  console.log('Schema blocks found:', matches.length);
  matches.forEach((m, i) => {
    const content = m[1];
    try {
      JSON.parse(content);
      console.log('Block', i, ': VALID JSON, length', content.length);
    } catch(e) {
      console.log('Block', i, ': INVALID -', e.message);
      console.log('  Preview:', content.substring(0, 300));
    }
  });
  
  // Also check for unclosed script tags or </script> inside a schema block
  const raw = html;
  const schemaStart = raw.indexOf('<script type="application/ld+json">');
  if (schemaStart > -1) {
    // Find if there's a </script> inside the content before the real close
    const afterOpen = raw.indexOf('>', schemaStart) + 1;
    const firstClose = raw.indexOf('</script>', afterOpen);
    const secondClose = raw.indexOf('</script>', firstClose + 1);
    const blockContent = raw.substring(afterOpen, firstClose);
    if (blockContent.includes('</script>')) {
      console.log('WARNING: </script> found INSIDE first schema block content');
    }
  }
});
