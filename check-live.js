const https = require('https');

function checkPage(url) {
  return new Promise((resolve) => {
    https.get(url, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        console.log('\n=== ' + url + ' ===');
        const openCount = (data.match(/<script/g)||[]).length;
        const closeCount = (data.match(/<\/script>/g)||[]).length;
        console.log('Script tags open/close:', openCount, '/', closeCount);
        
        // Check for ld+json blocks
        const ldBlocks = [...data.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
        console.log('LD+JSON blocks found:', ldBlocks.length);
        ldBlocks.forEach((b, i) => {
          try { JSON.parse(b[1]); console.log('  Block', i, 'VALID JSON'); }
          catch(e) { console.log('  Block', i, 'INVALID:', e.message, '| Preview:', b[1].substring(0,100)); }
        });
        
        // Strip all script tags and check for JSON-like content
        const noScripts = data.replace(/<script[\s\S]*?<\/script>/g, '');
        const hasAcceptedAnswer = noScripts.includes('acceptedAnswer');
        const hasAtType = noScripts.includes('"@type"');
        console.log('acceptedAnswer outside scripts:', hasAcceptedAnswer);
        console.log('@type outside scripts:', hasAtType);
        
        if (hasAcceptedAnswer) {
          const idx = noScripts.indexOf('acceptedAnswer');
          console.log('Context:', noScripts.substring(Math.max(0, idx-200), idx+300));
        }
        
        resolve();
      });
    }).on('error', e => { console.log('Error:', e.message); resolve(); });
  });
}

checkPage('https://staging.shaws-pest-control.pages.dev/pest-control-bedbugs/')
  .then(() => checkPage('https://staging.shaws-pest-control.pages.dev/pestcontrol/'));
