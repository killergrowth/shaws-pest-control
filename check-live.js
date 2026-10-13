const https = require('https');
https.get('https://staging.shaws-pest-control.pages.dev/pestcontrol/', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const bodyStart = data.indexOf('<body');
    const body = data.slice(bodyStart);
    // Remove all script blocks
    const clean = body.replace(/<script[\s\S]*?<\/script>/g, '');
    // Look for raw JSON
    const marker = '@type';
    const idx = clean.indexOf(marker);
    if (idx > -1) {
      console.log('RAW JSON IN BODY at index:', idx);
      console.log(clean.slice(Math.max(0, idx - 100), idx + 500));
    } else {
      console.log('CLEAN - no raw JSON in body');
    }
    // Script balance
    const opens = (data.match(/<script/g) || []).length;
    const closes = (data.match(/<\/script>/g) || []).length;
    console.log('Script tag balance - opens:', opens, 'closes:', closes);

    // Find if any script tag closes too early (has </script> inside a ld+json block)
    const ldBlocks = [...data.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    console.log('LD+JSON blocks found:', ldBlocks.length);
    ldBlocks.forEach((m, i) => {
      try {
        JSON.parse(m[1]);
        console.log('Block', i, 'valid JSON');
      } catch(e) {
        console.log('Block', i, 'INVALID JSON:', e.message.slice(0,100));
        console.log('Content start:', m[1].slice(0, 200));
      }
    });
  });
});
