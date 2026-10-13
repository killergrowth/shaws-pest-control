const https = require('https');
https.get('https://staging.shaws-pest-control.pages.dev/pestcontrol/', r => {
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => {
    const body = d.slice(d.indexOf('<body'));
    // Find any raw JSON object text outside of script/style tags in the body
    // Strip all script tags
    const stripped = body.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
    // Check for JSON-like patterns
    const jsonLike = stripped.match(/"\@type"\s*:/g);
    process.stdout.write('Raw @type occurrences in body (outside script tags): ' + (jsonLike ? jsonLike.length : 0) + '\n');
    if (jsonLike && jsonLike.length > 0) {
      const idx = stripped.indexOf('"@type"');
      process.stdout.write('Context:\n' + stripped.slice(Math.max(0,idx-100), idx+300) + '\n');
    } else {
      process.stdout.write('LIVE PAGE IS CLEAN - no JSON leaking into visible body\n');
    }
  });
});
