'use strict';
// Shaw's Pest Control — Contact Form Handler
// Cloudflare Pages Function (POST /submit)
// Sends via Gmail API using Google Service Account

const JSON_HEADERS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

function base64url(str) {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function getAccessToken(serviceAccountJson) {
  const sa = JSON.parse(serviceAccountJson);
  const privateKeyPem = sa.private_key.replace(/\\n/g, '\n');
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/gmail.send',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
    sub: 'notifications@killergrowth.com',
  };
  const enc = str => base64url(typeof str === 'string' ? str : JSON.stringify(str));
  const sigInput = `${enc(header)}.${enc(claim)}`;
  const keyData = Uint8Array.from(atob(privateKeyPem.replace(/-----[^-]+-----/g, '').replace(/\s/g, '')), c => c.charCodeAt(0));
  const key = await crypto.subtle.importKey('pkcs8', keyData, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(sigInput));
  const jwt = `${sigInput}.${base64url(String.fromCharCode(...new Uint8Array(sig)))}`;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('Token fetch failed: ' + JSON.stringify(data));
  return data.access_token;
}

function buildEmail({ name, email, phone, service, message, page }) {
  const to = 'info@shawspest.com';
  const replyTo = email ? `${name} <${email}>` : '';
  const subject = `New Lead from ShawsPest.com${service ? ' — ' + service : ''}`;
  const body = [
    `Name: ${name}`,
    email ? `Email: ${email}` : '',
    phone ? `Phone: ${phone}` : '',
    service ? `Service Needed: ${service}` : '',
    message ? `\nMessage:\n${message}` : '',
    `\n---\nPage: ${page || 'unknown'}`,
  ].filter(Boolean).join('\n');
  const mime = [
    `From: Shaw's Pest Control Website <notifications@killergrowth.com>`,
    replyTo ? `Reply-To: ${replyTo}` : '',
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    '',
    body,
  ].filter(l => l !== null && l !== undefined).join('\r\n');
  return base64url(mime);
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const form = await request.formData();
    const name = (form.get('name') || '').trim();
    const email = (form.get('email') || '').trim();
    const phone = (form.get('phone') || '').trim();
    const service = (form.get('service') || '').trim();
    const message = (form.get('message') || '').trim();
    const page = (form.get('page') || '').trim();
    const turnstileToken = form.get('cf-turnstile-response') || '';

    if (!name || (!email && !phone)) {
      return new Response(JSON.stringify({ ok: false, error: 'Name and email or phone are required.' }), { status: 400, headers: JSON_HEADERS });
    }

    // Turnstile verification
    if (env.TURNSTILE_SECRET) {
      const tv = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${encodeURIComponent(env.TURNSTILE_SECRET)}&response=${encodeURIComponent(turnstileToken)}`,
      });
      const td = await tv.json();
      if (!td.success) return new Response(JSON.stringify({ ok: false, error: 'Bot check failed.' }), { status: 400, headers: JSON_HEADERS });
    }

    const token = await getAccessToken(env.GOOGLE_SA_JSON);
    const raw = buildEmail({ name, email, phone, service, message, page });
    const gmailRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ raw }),
    });
    const gmailData = await gmailRes.json();
    if (!gmailRes.ok) throw new Error('Gmail error: ' + JSON.stringify(gmailData));

    return new Response(JSON.stringify({ ok: true }), { headers: JSON_HEADERS });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500, headers: JSON_HEADERS });
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
}
