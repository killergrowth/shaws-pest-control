'use strict';
// build-blog.js - Blog post builder for Shaw's Pest Control
// Reads markdown drafts from hyperlocal-pipeline, builds /blog/ pages

const fs   = require('fs');
const path = require('path');
const { writePage, page, breadcrumbSchema, faqSchema, client } = require('./shared');

const DRAFTS_DIR = 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\tools\\hyperlocal-pipeline\\drafts\\blogs';

// All 50 Shaw's blog slugs (file = {slug}-blog.md)
const SHAWS_SLUGS = [
  // Original 6
  'diy-pest-control',
  'german-cockroach-pest-control',
  'house-centipede-pest-control',
  'pest-control-for-stink-bugs',
  'spider-pest-control',
  'termite-control-cost',
  // Batch 1
  'mouse-pest-control',
  'rat-pest-control',
  'pest-control-cost',
  'flea-pest-control',
  'wasp-nest-removal',
  'carpenter-ant-pest-control',
  'ant-control',
  'ant-control-products',
  'ant-control-home-remedies',
  'mosquito-control',
  'mosquito-control-products',
  'outdoor-mosquito-control',
  'mosquito-control-for-home',
  'mosquito-control-chemicals',
  'spider-control-products',
  'types-of-spiders-in-kansas',
  'brown-recluse-spider-treatment',
  'termite-control-diy',
  'termite-control',
  'termite-control-products',
  'best-termite-control',
  'signs-of-termite-infestation',
  'how-to-prevent-termites',
  'bed-bug-treatment',
  'best-bed-bug-treatment',
  // Batch 2
  'bed-bug-signs',
  'how-to-get-rid-of-bed-bugs',
  'best-cockroach-control',
  'natural-cockroach-control',
  'roach-infestation-signs',
  'how-to-get-rid-of-cockroaches',
  'tick-pest-control',
  'cricket-pest-control',
  'silverfish-pest-control',
  'earwig-pest-control',
  'boxelder-bug-pest-control',
  'how-to-pest-proof-your-home',
  'pantry-pest-control',
  'fruit-fly-pest-control',
  'seasonal-pest-control-guide',
  'bed-bug-prevention',
  'termite-inspection-cost',
  'black-widow-spider-treatment',
  'bed-bug-treatment-cost',
];

const CLUSTER_LABELS = {
  'ant-control':       'Ants',
  'mosquito-control':  'Mosquitoes',
  'spider-control':    'Spiders',
  'termite-control':   'Termites',
  'bed-bug-treatment': 'Bed Bugs',
  'cockroach-control': 'Cockroaches',
  'pest-control':      'Pest Control',
};

// ---------------------------------------------------------------------------
// Markdown parser
// ---------------------------------------------------------------------------

function parseBlogFile(slug) {
  const filePath = path.join(DRAFTS_DIR, `${slug}-blog.md`);
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠️  Missing draft: ${slug}-blog.md — skipping`);
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

  // Extract YAML frontmatter (first --- block)
  let yamlCluster = 'pest-control';
  const yamlMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (yamlMatch) {
    const clusterLine = yamlMatch[1].match(/target_cluster:\s*(.+)/);
    if (clusterLine) yamlCluster = clusterLine[1].trim();
  }

  // Extract meta block (second --- block: TITLE TAG / META DESCRIPTION / SLUG)
  const metaMatch = raw.match(/---\n(TITLE TAG:[^\n]*\nMETA DESCRIPTION:[^\n]*[\s\S]*?)\n---/);
  let title = `${slug.replace(/-/g,' ')} | Shaw's Pest Control`;
  let metaDesc = `Pest control tips and resources from Shaw's Pest Control — serving Wichita and south-central Kansas since 1987.`;

  if (metaMatch) {
    const titleLine = metaMatch[1].match(/TITLE TAG:\s*(.+)/);
    const descLine  = metaMatch[1].match(/META DESCRIPTION:\s*(.+)/);
    if (titleLine) title    = titleLine[1].trim();
    if (descLine)  metaDesc = descLine[1].trim();
  }

  // Strip both frontmatter blocks to get pure markdown content
  let md = raw
    .replace(/^---\n[\s\S]*?\n---\n*/,'')   // strip first ---block
    .replace(/^---\n[\s\S]*?\n---\n*/,'')   // strip second ---block
    .trim();

  // Fix mojibake artifacts from pipeline output
  md = md.replace(/\uFFFD\uFFFD\uFFFD/g, '—').replace(/â€"/g, '—').replace(/â€™/g, "'");

  // Convert markdown to HTML
  const html = mdToHtml(md);

  // Extract excerpt: first non-empty paragraph (plain text, ≤ 200 chars)
  const firstPara = md.split(/\n\n+/).find(p => p.trim() && !p.startsWith('#') && !p.startsWith('-'));
  const excerpt = firstPara
    ? firstPara.replace(/[*_`\[\]#]/g,'').replace(/\(https?:\/\/[^)]+\)/g,'').trim().slice(0, 200) + '…'
    : metaDesc;

  // Extract FAQs from markdown (### Q followed by paragraph A)
  const faqs = [];
  const faqSection = md.match(/## Frequently Asked Questions([\s\S]*?)(?=\n## |\n# |$)/i);
  if (faqSection) {
    const faqMd = faqSection[1];
    const qMatches = [...faqMd.matchAll(/### (.+)\n\n([\s\S]*?)(?=\n### |\n## |$)/g)];
    for (const m of qMatches) {
      const q = m[1].trim();
      const a = m[2].trim().replace(/\*\*([^*]+)\*\*/g,'$1').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/\n/g,' ').slice(0, 400);
      if (q && a) faqs.push({ q, a });
    }
  }

  return { slug, title, metaDesc, excerpt, cluster: yamlCluster, html, faqs };
}

// Minimal but sufficient markdown → HTML converter
function mdToHtml(md) {
  const lines = md.split('\n');
  const out = [];
  let inList = false;
  let inParagraph = false;
  let i = 0;

  function closeParagraph() {
    if (inParagraph) { out.push('</p>'); inParagraph = false; }
  }
  function closeList() {
    if (inList) { out.push('</ul>'); inList = false; }
  }

  while (i < lines.length) {
    const line = lines[i];

    // Blank line — close open blocks
    if (!line.trim()) {
      closeParagraph();
      closeList();
      i++; continue;
    }

    // H1
    if (/^# /.test(line)) {
      closeParagraph(); closeList();
      out.push(`<h1>${inlineFormat(line.slice(2))}</h1>`);
      i++; continue;
    }
    // H2
    if (/^## /.test(line)) {
      closeParagraph(); closeList();
      out.push(`<h2>${inlineFormat(line.slice(3))}</h2>`);
      i++; continue;
    }
    // H3
    if (/^### /.test(line)) {
      closeParagraph(); closeList();
      out.push(`<h3>${inlineFormat(line.slice(4))}</h3>`);
      i++; continue;
    }

    // Unordered list item
    if (/^[-*] /.test(line)) {
      closeParagraph();
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push(`<li>${inlineFormat(line.slice(2))}</li>`);
      i++; continue;
    }

    // Ordered list item
    if (/^\d+\. /.test(line)) {
      closeParagraph(); closeList();
      out.push(`<li>${inlineFormat(line.replace(/^\d+\. /,''))}</li>`);
      i++; continue;
    }

    // Regular paragraph text
    closeList();
    if (!inParagraph) { out.push('<p>'); inParagraph = true; }
    else out.push('<br>');
    out.push(inlineFormat(line));
    i++;
  }

  closeParagraph();
  closeList();

  return out.join('\n');
}

function inlineFormat(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;')  // escape first
    // Restore anchor tags after escaping (links in md become safe HTML)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Unescape link angle brackets from our escape above
    .replace(/href="&lt;/g, 'href="<').replace(/"&gt;/g, '">')
    .replace(/—/g, '&mdash;')
    .replace(/–/g, '&ndash;');
}

// ---------------------------------------------------------------------------
// Individual blog post page builder
// ---------------------------------------------------------------------------

function buildBlogPost(post) {
  const { slug, title, metaDesc, cluster, html, faqs } = post;
  const categoryLabel = CLUSTER_LABELS[cluster] || 'Pest Control';
  const url = `/blog/${slug}/`;
  const canonical = `https://${client.domain}${url}`;

  const blogSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': title,
    'description': metaDesc,
    'url': canonical,
    'datePublished': new Date().toISOString().split('T')[0],
    'author': { '@type': 'Organization', 'name': client.name, 'url': `https://${client.domain}` },
    'publisher': { '@type': 'Organization', 'name': client.name, 'url': `https://${client.domain}` },
    'mainEntityOfPage': { '@type': 'WebPage', '@id': canonical },
  });

  const faqSchemaHtml = faqs.length ? faqSchema(faqs) : '';

  const body = `
<section class="section-dark" style="padding:64px 0 48px;background:linear-gradient(145deg,#1a1a1a 0%,#2d2d2d 100%);">
  <div class="container">
    <nav aria-label="Breadcrumb" style="font-size:0.85rem;margin-bottom:16px;color:rgba(255,255,255,0.6);">
      <a href="/" style="color:rgba(255,255,255,0.7);">Home</a> /
      <a href="/blog/" style="color:rgba(255,255,255,0.7);">Blog</a> /
      <span style="color:rgba(255,255,255,0.5);">${categoryLabel}</span>
    </nav>
    <span style="display:inline-block;background:var(--kg-accent);color:#fff;font-size:0.75rem;font-weight:700;padding:4px 12px;border-radius:20px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:16px;">${categoryLabel}</span>
    <h1 style="color:#fff;max-width:760px;">${escHtml(title.replace(/ \| Shaw's Pest Control$/, ''))}</h1>
    <p style="color:rgba(255,255,255,0.7);font-size:0.9rem;margin-top:12px;">By Shaw's Pest Control &nbsp;·&nbsp; Wichita, KS</p>
  </div>
</section>

<section>
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 300px;gap:56px;align-items:start;">
      <article class="blog-content" style="max-width:760px;">
        ${html}
        ${faqs.length ? `<div style="margin-top:48px;"><div class="section-title" style="text-align:left;margin-bottom:0;"><h2>Frequently Asked Questions</h2></div></div>` : ''}
      </article>
      <aside>
        <div class="kg-card" style="padding:28px;position:sticky;top:90px;">
          <h4 style="margin-bottom:8px;">Get a Free Estimate</h4>
          <p style="color:var(--kg-text-light);font-size:0.9rem;margin-bottom:20px;">Shaw's Pest Control serves Wichita and surrounding communities since 1987.</p>
          <a href="tel:3162519461" class="btn btn-primary" style="width:100%;margin-bottom:12px;text-align:center;">&#9742; (316) 251-9461</a>
          <a href="/contact/" class="btn btn-outline" style="width:100%;text-align:center;">Free Estimate</a>
          <hr style="margin:24px 0;border-color:var(--kg-border);">
          <h5 style="margin-bottom:12px;">Our Services</h5>
          <ul style="list-style:none;padding:0;margin:0;">
            <li style="margin-bottom:8px;"><a href="/pestcontrol/" style="color:var(--kg-text-light);font-size:0.9rem;">General Pest Control</a></li>
            <li style="margin-bottom:8px;"><a href="/termites/" style="color:var(--kg-text-light);font-size:0.9rem;">Termite Treatment</a></li>
            <li style="margin-bottom:8px;"><a href="/mosquito-control/" style="color:var(--kg-text-light);font-size:0.9rem;">Mosquito Control</a></li>
            <li style="margin-bottom:8px;"><a href="/pest-control-spiders/" style="color:var(--kg-text-light);font-size:0.9rem;">Spider Control</a></li>
            <li style="margin-bottom:8px;"><a href="/pest-control-bedbugs/" style="color:var(--kg-text-light);font-size:0.9rem;">Bed Bug Treatment</a></li>
            <li><a href="/pest-control-roaches/" style="color:var(--kg-text-light);font-size:0.9rem;">Cockroach Control</a></li>
          </ul>
          <hr style="margin:24px 0;border-color:var(--kg-border);">
          <a href="/blog/" style="color:var(--kg-text-light);font-size:0.85rem;">← Back to Blog</a>
        </div>
      </aside>
    </div>
  </div>
</section>`;

  writePage(`blog/${slug}/index.html`, page({
    title,
    metaDesc,
    canonical,
    schema: `<script type="application/ld+json">${blogSchema}</script>\n` +
            breadcrumbSchema([{name:'Home',url:'/'},{name:'Blog',url:'/blog/'},{name:categoryLabel,url:url}]) +
            (faqSchemaHtml ? '\n' + faqSchemaHtml : ''),
    body,
  }));
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ---------------------------------------------------------------------------
// Blog index page
// ---------------------------------------------------------------------------

function buildBlogIndex(posts) {
  // Group by cluster
  const grouped = {};
  for (const p of posts) {
    const label = CLUSTER_LABELS[p.cluster] || 'Pest Control';
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(p);
  }

  const categoryOrder = ['Pest Control','Ants','Mosquitoes','Spiders','Termites','Bed Bugs','Cockroaches'];

  function postCard(p) {
    const label = CLUSTER_LABELS[p.cluster] || 'Pest Control';
    const displayTitle = p.title.replace(/ \| Shaw's Pest Control$/, '');
    return `<div class="kg-card" style="padding:0;overflow:hidden;display:flex;flex-direction:column;">
      <div style="padding:24px 24px 20px;flex:1;">
        <span style="display:inline-block;background:var(--kg-accent);color:#fff;font-size:0.7rem;font-weight:700;padding:3px 10px;border-radius:20px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">${escHtml(label)}</span>
        <h3 style="font-size:1.05rem;margin:0 0 10px;line-height:1.3;">${escHtml(displayTitle)}</h3>
        <p style="color:var(--kg-text-light);font-size:0.88rem;line-height:1.6;margin:0;">${escHtml(p.excerpt)}</p>
      </div>
      <div style="padding:16px 24px;border-top:1px solid var(--kg-border);">
        <a href="/blog/${p.slug}/" style="color:var(--kg-primary);font-weight:700;font-size:0.9rem;text-decoration:none;">Read More &rarr;</a>
      </div>
    </div>`;
  }

  let sectionsHtml = '';
  for (const cat of categoryOrder) {
    if (!grouped[cat]) continue;
    sectionsHtml += `
<section id="${cat.toLowerCase().replace(/ /g,'-')}" style="padding:48px 0 24px;">
  <div class="container">
    <div class="section-title" style="text-align:left;margin-bottom:32px;">
      <div class="section-label">${escHtml(cat)}</div>
      <h2 style="font-size:1.6rem;">${escHtml(cat)} Resources</h2>
    </div>
    <div class="kg-grid kg-grid-3">${grouped[cat].map(postCard).join('')}</div>
  </div>
</section>`;
  }

  // Category nav
  const catNav = categoryOrder.filter(c => grouped[c]).map(c =>
    `<a href="#${c.toLowerCase().replace(/ /g,'-')}" style="display:inline-block;padding:8px 18px;border:1px solid var(--kg-border);border-radius:24px;font-size:0.85rem;font-weight:600;color:var(--kg-secondary);text-decoration:none;white-space:nowrap;">${escHtml(c)}</a>`
  ).join('');

  const body = `
<section class="section-dark" style="padding:72px 0 56px;background:linear-gradient(145deg,#1a1a1a 0%,#2d2d2d 100%);">
  <div class="container">
    <div class="section-label" style="color:rgba(255,255,255,0.6);">Resources</div>
    <h1 style="color:#fff;max-width:640px;">Pest Control Tips &amp; Resources</h1>
    <p style="color:rgba(255,255,255,0.8);font-size:1.1rem;max-width:600px;margin-top:16px;">Expert guides from Shaw's Pest Control — helping Wichita-area homeowners identify, prevent, and eliminate pests since 1987.</p>
  </div>
</section>

<section style="padding:32px 0 16px;">
  <div class="container">
    <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
      <span style="font-size:0.85rem;font-weight:600;color:var(--kg-text-light);">Browse by topic:</span>
      ${catNav}
    </div>
  </div>
</section>

${sectionsHtml}

<section class="section-alt" style="padding:56px 0;">
  <div class="container" style="text-align:center;max-width:640px;">
    <h2>Dealing with a pest problem right now?</h2>
    <p style="color:var(--kg-text-light);margin:16px 0 28px;">Shaw's Pest Control has served Wichita, El Dorado, Derby, Andover, Augusta, Haysville, Maize, and Goddard since 1987. Call for a free estimate — no pressure, no obligation.</p>
    <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
      <a href="tel:3162519461" class="btn btn-primary">&#9742; (316) 251-9461</a>
      <a href="/contact/" class="btn btn-outline">Free Estimate</a>
    </div>
  </div>
</section>`;

  writePage('blog/index.html', page({
    title: `Pest Control Tips & Resources | Shaw's Pest Control Blog`,
    metaDesc: `Expert pest control guides for Kansas homeowners. Termites, bed bugs, ants, mosquitoes, spiders, and more — from Shaw's Pest Control in Wichita, KS.`,
    canonical: `https://${client.domain}/blog/`,
    schema: breadcrumbSchema([{name:'Home',url:'/'},{name:'Blog',url:'/blog/'}]),
    body,
  }));

  console.log(`  Built: /blog/ (${posts.length} posts)`);
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

function buildBlog() {
  console.log('\nBuilding blog...');
  const posts = [];
  for (const slug of SHAWS_SLUGS) {
    const post = parseBlogFile(slug);
    if (post) posts.push(post);
  }

  for (const post of posts) {
    buildBlogPost(post);
    console.log(`  Built: /blog/${post.slug}/`);
  }

  buildBlogIndex(posts);
  console.log(`  Blog complete: ${posts.length} posts + index`);
  return posts.length;
}

module.exports = { buildBlog };
