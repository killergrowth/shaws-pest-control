const https = require('https');
https.get('https://staging.shaws-pest-control.pages.dev/pestcontrol/', r => {
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => {
    // Find all </script> closes and check which ones are in the body (not head)
    const bodyStart = d.indexOf('<body');
    const allCloses = [];
    let pos = 0;
    while ((pos = d.indexOf('</script>', pos)) !== -1) {
      allCloses.push(pos);
      pos += 9;
    }
    process.stdout.write('Body starts at: ' + bodyStart + '\n');
    process.stdout.write('All </script> positions: ' + allCloses.join(', ') + '\n\n');
    
    // Check: is there visible text content between </script> and the next <script tag
    // that looks like JSON?
    allCloses.forEach(cp => {
      const nextTag = d.indexOf('<', cp + 9);
      const gap = d.slice(cp + 9, nextTag);
      if (gap.trim().length > 0 && gap.trim()[0] === '{') {
        process.stdout.write('JSON LEAK after close at ' + cp + ':\n' + gap.slice(0,300) + '\n\n');
      }
    });
    
    // Also: find the FAQPage block and show its full content
    const faqIdx = d.indexOf('"FAQPage"');
    if (faqIdx > -1) {
      const blockStart = d.lastIndexOf('<script', faqIdx);
      const blockEnd = d.indexOf('</script>', faqIdx);
      process.stdout.write('FAQPage block:\n' + d.slice(blockStart, blockEnd + 9) + '\n');
    }
  });
});
