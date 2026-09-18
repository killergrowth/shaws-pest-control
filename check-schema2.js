const fs = require('fs');

['dist/pestcontrol/index.html', 'dist/pest-control-bedbugs/index.html'].forEach(file => {
  console.log('\n=== ' + file + ' ===');
  const html = fs.readFileSync(file, 'utf8');
  
  // Find ALL script tags (both ld+json and regular)
  const allScripts = [...html.matchAll(/<script([^>]*)>/g)];
  const allCloses = [...html.matchAll(/<\/script>/g)];
  console.log('Open tags:', allScripts.length, 'Close tags:', allCloses.length);
  
  // Check the FAQPage schema block specifically - it's the big one
  const faqIdx = html.indexOf('"@type":"FAQPage"');
  if (faqIdx === -1) {
    console.log('No FAQPage schema found');
  } else {
    // Find the script tag containing it
    const scriptBefore = html.lastIndexOf('<script', faqIdx);
    const scriptClose = html.indexOf('</script>', faqIdx);
    const content = html.substring(scriptBefore, scriptClose + 9);
    console.log('FAQPage block length:', content.length);
    // Check for embedded </script> in the FAQ text
    const innerContent = html.substring(html.indexOf('>', scriptBefore)+1, scriptClose);
    if (innerContent.includes('</script>')) {
      console.log('PROBLEM: </script> embedded in FAQ content!');
    } else {
      console.log('FAQ schema: no embedded </script> found');
    }
    // Check each FAQ answer for problem chars
    const answers = [...innerContent.matchAll(/"text":"([\s\S]*?)"/g)];
    answers.forEach((a, i) => {
      if (a[1].length > 100) console.log('Answer', i, '(first 200):', a[1].substring(0,200));
    });
  }
  
  // Dump the last 500 chars of the file to see what's at the end
  console.log('\nLast 300 chars:');
  console.log(html.substring(html.length - 300));
});
