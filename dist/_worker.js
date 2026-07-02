// KillerGrowth -- pages.dev crawler block
// For *.pages.dev: block search engine crawlers but allow link preview bots
// For live domain: pass through to the static robots.txt asset

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/robots.txt') {
      return env.ASSETS.fetch(request);
    }
    if (url.hostname.endsWith('.pages.dev')) {
      // Block search engines but allow social/preview bots to unfurl pages
      const robots = [
        'User-agent: Slackbot',
        'Allow: /',
        '',
        'User-agent: Twitterbot',
        'Allow: /',
        '',
        'User-agent: facebookexternalhit',
        'Allow: /',
        '',
        'User-agent: LinkedInBot',
        'Allow: /',
        '',
        'User-agent: WhatsApp',
        'Allow: /',
        '',
        'User-agent: Googlebot',
        'Disallow: /',
        '',
        'User-agent: *',
        'Disallow: /',
      ].join('\n');
      return new Response(robots, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }
    return env.ASSETS.fetch(request);
  }
};
