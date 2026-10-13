const https = require('https');

function fetch(url, label) {
  return new Promise(resolve => {
    https.get(url, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        // Find img tag near logo
        const imgs = [...d.matchAll(/<img[^>]+>/g)].slice(0, 5);
        console.log(`\n=== ${label} FIRST 5 IMAGES ===`);
        imgs.forEach(m => console.log(m[0]));
        resolve();
      });
    });
  });
}

async function run() {
  await fetch('https://staging.shaws-pest-control.pages.dev/pestcontrol/', 'STAGING');
  await fetch('https://shawspest.com/pestcontrol/', 'LIVE');
}
run();
