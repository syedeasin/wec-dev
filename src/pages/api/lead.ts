import type { APIRoute } from 'astro';

export const prerender = false;

/**
 * Receives every site form (booking, insurance check, contact, PI forms).
 * - On Cloudflare: forwards the lead as JSON to LEAD_WEBHOOK_URL, then redirects to the thank-you page.
 * - Locally (npm run dev) or when the variable is missing: skips sending and redirects straight away.
 */
export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const data: Record<string, string> = {};
  for (const [key, value] of form.entries()) {
    if (typeof value === 'string') data[key] = value.trim();
  }

  // Honeypot: bots fill the hidden "company" field. Pretend success.
  const thankYou = safeRedirect(data._redirect) ?? '/thank-you';
  if (data.company) return redirect(thankYou, 303);

  let webhook: string | undefined;
  try {
    const { env } = await import('cloudflare:workers');
    webhook = (env as Record<string, string | undefined>).LEAD_WEBHOOK_URL;
  } catch {
    webhook = undefined;
  }

  if (webhook && !import.meta.env.DEV) {
    const { _redirect, company, ...fields } = data;
    const payload = {
      ...fields,
      source_page: request.headers.get('referer') ?? '',
      submitted_at: new Date().toISOString(),
    };
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return new Response('Sorry, something went wrong sending your request. Please call us at (512) 472-1116.', {
        status: 502,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      });
    }
  }

  return redirect(thankYou, 303);
};

function safeRedirect(path?: string) {
  return path && /^\/[a-z0-9\-\/]*$/i.test(path) ? path : undefined;
}
