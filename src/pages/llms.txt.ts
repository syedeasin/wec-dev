// /llms.txt: a plain-text brief of the practice for AI assistants and answer engines
// (ChatGPT, Perplexity, Gemini, Claude…), following the llmstxt.org format. Built from the same
// data as the site, so facts stay in sync.
import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { routes } from '../data/routes';
import { homeFaq as faqs } from '../data/home';

const u = (p: string) => `${site.url}/${p.replace(/^\/|\/$/g, '')}${p === '/' ? '' : '/'}`.replace(/\/\/$/, '/');
const strip = (h: string) => h.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
const group = (prefix: RegExp) => routes.filter((r) => prefix.test(r.path)).map((r) => `- [${r.title.split(' | ')[0]}](${u(r.path)}): ${r.description}`).join('\n');

export const GET: APIRoute = () => {
  const body = `# ${site.name}

> Chiropractic clinic in downtown Austin, Texas, run by ${site.doctor}, D.C. (Texas Chiropractic License No. 12254). The practice finds the structural cause of back, neck and headache pain with an exam and on-site digital X-rays, then treats it with chiropractic adjustments and spinal decompression. It also treats car accident and personal injury patients.

## Key facts
- Address: ${site.addressLine} (${site.address.building}). ${site.parking}, just off MoPac near West 5th Street.
- Phone: ${site.phone}. Email: ${site.email}.
- Hours: Monday to Thursday, 8am to 1pm and 3pm to 5pm. Closed Friday to Sunday.
- Booking: ${u(site.bookHref)}. Same-day appointments are usually available. No referral needed, except for some HMO plans.
- Insurance: in-network with BCBS, UnitedHealthcare, UMR, Surest, Aetna, Meritain, Humana, Ambetter, Ascension SmartHealth, Curative, WebTPA and Medicare. CIGNA is out-of-network only. Medicaid is not accepted. Self-pay is available; spinal decompression is a cash service at $75 per session.
- Car accidents: PIP, Letter of Protection (LOP) and third-party claims handled in house.
- First visit: about 30 minutes, including history, exam and any necessary digital X-rays taken on site. Later visits take a few minutes.
- Doctor: ${site.doctor}, D.C., Parker University graduate, practicing downtown since 2016 in a practice his family has run since 1994.
- Areas served: Downtown Austin, Clarksville, West Austin, and Rosedale.

## Conditions treated
${group(/^conditions\//)}

## Services
${group(/^services\//)}

## Car accident care
${group(/^services-treatments\//)}

## Locations
${group(/^chiropractor-/)}

## Patients
${group(/^(new-patients|insurance)$/)}
- [Book your visit](${u('/schedule-appointment')}): request a first visit online.
- [About Dr. Casey Morgan](${u('/about-dr-morgan')}): background, training and approach.
- [Our team](${u('/our-team')})
- [Patient forms](${u('/forms')})
- [Articles and videos](${u('/resources')}): plain-English articles on back pain, sciatica, neck pain and car accident injuries.

## Common questions
${faqs.map((f: { q: string; a: string }) => `### ${f.q}\n${strip(f.a)}`).join('\n\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
