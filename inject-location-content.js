// inject-location-content.js
// Reads written location page drafts from the hyperlocal pipeline
// and writes lib/location-content.js for use in the site build.
'use strict';

const fs = require('fs');
const path = require('path');

const DRAFTS_DIR = path.resolve(__dirname, '../../tools/hyperlocal-pipeline/drafts');
const OUT_FILE   = path.join(__dirname, 'lib', 'location-content.js');

// City slug -> draft filename prefix
const CITIES = [
  { slug: 'wichita',   draftPrefix: 'wichita-ks' },
  { slug: 'el-dorado', draftPrefix: 'el-dorado-ks' },
  { slug: 'derby',     draftPrefix: 'derby-ks' },
  { slug: 'andover',   draftPrefix: 'andover-ks' },
  { slug: 'augusta',   draftPrefix: 'augusta-ks' },
  { slug: 'haysville', draftPrefix: 'haysville-ks' },
  { slug: 'maize',     draftPrefix: 'maize-ks' },
  { slug: 'goddard',   draftPrefix: 'goddard-ks' },
];

// ── Markdown → HTML converter (handles the subset we use) ──────────────────
function mdToHtml(md) {
  const lines = md.split('\n');
  const out   = [];
  let inList  = false;
  let inPara  = false;
  let buf     = [];

  function flushPara() {
    if (buf.length) {
      out.push(`<p>${buf.join(' ')}</p>`);
      buf = [];
    }
    inPara = false;
  }
  function closeList() {
    if (inList) { out.push('</ul>'); inList = false; }
  }

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // skip blank lines
    if (!line.trim()) {
      flushPara();
      closeList();
      continue;
    }

    // H3
    if (/^### /.test(line)) {
      flushPara(); closeList();
      out.push(`<h3>${inlineFormat(line.replace(/^### /, ''))}</h3>`);
      continue;
    }
    // H2
    if (/^## /.test(line)) {
      flushPara(); closeList();
      out.push(`<h2>${inlineFormat(line.replace(/^## /, ''))}</h2>`);
      continue;
    }
    // H1 – skip (rendered by the page template)
    if (/^# /.test(line)) { flushPara(); closeList(); continue; }

    // Bullet list
    if (/^[-*] /.test(line)) {
      flushPara();
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push(`<li>${inlineFormat(line.replace(/^[-*] /, ''))}</li>`);
      continue;
    }

    // Numbered list
    if (/^\d+\. /.test(line)) {
      flushPara();
      if (!inList) { out.push('<ol>'); inList = true; }
      out.push(`<li>${inlineFormat(line.replace(/^\d+\. /, ''))}</li>`);
      continue;
    }

    // Otherwise: paragraph line
    closeList();
    buf.push(inlineFormat(line.trim()));
  }

  flushPara();
  closeList();
  return out.join('\n');
}

function inlineFormat(str) {
  return str
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,     '<em>$1</em>')
    .replace(/`(.+?)`/g,       '<code>$1</code>');
}

// ── Parse a draft .md into sections ────────────────────────────────────────
function parseDraft(mdText) {
  // Strip YAML frontmatter
  const body = mdText.replace(/^---[\s\S]*?---\n+/, '').replace(/^---[\s\S]*?---\n+/, '');

  const sections = {};
  let current = '__intro__';
  sections[current] = [];

  for (const line of body.split('\n')) {
    if (/^## /.test(line)) {
      current = line.replace(/^## /, '').trim().toLowerCase();
      sections[current] = [];
    } else {
      sections[current] = sections[current] || [];
      sections[current].push(line);
    }
  }

  // Convert each section to HTML
  const html = {};
  for (const [key, lines] of Object.entries(sections)) {
    html[key] = mdToHtml(lines.join('\n')).trim();
  }
  return html;
}

// ── FAQ extractor ───────────────────────────────────────────────────────────
function extractFaqs(sections) {
  // Find the FAQ section key
  const faqKey = Object.keys(sections).find(k => k.includes('frequently asked') || k.includes('faq'));
  if (!faqKey) return [];

  const lines = [];
  for (const [key, html] of Object.entries(sections)) {
    if (key === faqKey) {
      // Pull H3 (questions) and following <p> (answers) pairs
      const chunks = html.split(/<h3>/);
      const faqs = [];
      for (const chunk of chunks) {
        const qMatch = chunk.match(/^(.+?)<\/h3>/);
        const aMatch = chunk.match(/<\/h3>\s*<p>([\s\S]+?)<\/p>/);
        if (qMatch && aMatch) {
          faqs.push({ q: qMatch[1].replace(/<\/?[^>]+>/g, ''), a: aMatch[1].replace(/<\/?[^>]+>/g, '') });
        }
      }
      return faqs;
    }
  }
  return [];
}

// ── Main content builder per city ──────────────────────────────────────────
function buildCityContent(sections, cityName) {
  // Sections to render in the main body (in order), skipping reviews/CTA/FAQs
  const SKIP = ['__intro__'];
  const REVIEWS_KEY = 'customers are saying';
  const FAQ_KEY     = 'frequently asked';
  const CTA_KEY     = 'get pest control';
  const CTA_KEY2    = 'get professional pest control';

  let body = '';

  // Intro (content before first H2)
  if (sections['__intro__']) {
    body += sections['__intro__'] + '\n';
  }

  for (const [key, html] of Object.entries(sections)) {
    if (SKIP.includes(key)) continue;
    if (key.includes(REVIEWS_KEY)) continue;
    if (key.includes(FAQ_KEY)) continue;
    if (key.includes(CTA_KEY) || key.includes(CTA_KEY2)) continue;

    // Render section heading + content
    const heading = toTitleCase(key);
    body += `<h2>${heading}</h2>\n${html}\n`;
  }

  return body;
}

function toTitleCase(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}

// ── Build the output module ─────────────────────────────────────────────────
const contentMap = {};

for (const { slug, draftPrefix } of CITIES) {
  const mdPath    = path.join(DRAFTS_DIR, `${draftPrefix}-location-page.md`);
  const scorePath = path.join(DRAFTS_DIR, `${draftPrefix}-location-page-score.json`);

  if (!fs.existsSync(mdPath)) {
    console.warn(`⚠️  Missing draft: ${mdPath}`);
    continue;
  }

  const md       = fs.readFileSync(mdPath, 'utf8');
  const sections = parseDraft(md);
  const faqs     = extractFaqs(sections);
  const body     = buildCityContent(sections);

  // Pull title tag + meta from frontmatter block
  const titleMatch  = md.match(/TITLE TAG:\s*(.+)/);
  const metaMatch   = md.match(/META DESCRIPTION:\s*(.+)/);
  const score       = fs.existsSync(scorePath) ? JSON.parse(fs.readFileSync(scorePath, 'utf8')) : null;

  contentMap[slug] = {
    title:    titleMatch ? titleMatch[1].trim() : null,
    metaDesc: metaMatch  ? metaMatch[1].trim()  : null,
    body,
    faqs,
    score:    score ? score.total_score : null,
  };

  console.log(`✅  ${slug} — score: ${contentMap[slug].score} — faqs: ${faqs.length}`);
}

// Write the module
const moduleCode = `// AUTO-GENERATED by inject-location-content.js — do not edit manually
// Source: tools/hyperlocal-pipeline/drafts/[city]-ks-location-page.md
'use strict';

module.exports = ${JSON.stringify(contentMap, null, 2)};
`;

fs.writeFileSync(OUT_FILE, moduleCode, 'utf8');
console.log(`\n✅  Written: ${OUT_FILE}`);
console.log(`   Cities: ${Object.keys(contentMap).join(', ')}`);
