// Helpers that turn the page JSON (src/data/pages/*.json, pulled from Figma mobile frames)
// into things components can use: images, links for buttons and cards, paragraph groups.
import { site, services, conditionHubs } from '../data/site';

export type Para = { w: number; t: string };
export type Img = { src: string; w: number; h: number; pos?: string; flip?: boolean };
export type Btn = { variant: string; label: string };
export type Card = { icon?: string; title: string; text?: string };
export type Section = {
  name: string; title?: string; tag?: string;
  paras?: Para[]; callouts?: { title: string; text: string }[];
  bullets?: { icon?: string | null; text: string; body?: string }[];
  cards?: Card[]; steps?: { title: string; text: string }[];
  faqs?: { q: string; a: string }[]; tags?: { tag: string; text: string }[];
  buttons?: Btn[]; images?: Img[]; logos?: boolean;
};
export type PageData = { sections: Section[] };

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/images/**/*.webp', { eager: true });
export function img(src: string): ImageMetadata {
  const m = files[`../assets/images/${src}.webp`];
  if (!m) throw new Error(`Image not found: ${src}`);
  return m.default;
}

/** Alt text from the clean file name ("photos/xray-review-couple" → "X-ray review couple"). */
export function altFor(src: string): string {
  const base = src.split('/').pop()!.replace(/-(alt|small)$/, '').replace(/-/g, ' ');
  return (base.charAt(0).toUpperCase() + base.slice(1)).replace(/xray/gi, 'X-ray').replace(/casey morgan/i, 'Dr. Casey Morgan');
}

export const strip = (s = '') => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
export const nl2br = (s = '') => s.replace(/\n/g, '<br>');

/** Link for a button label from the design. */
export function btnHref(label: string): string {
  const l = label.toLowerCase();
  if (l.startsWith('call') || l.includes('472-1116')) return site.phoneHref;
  if (l.includes('insurance') || l.includes('every plan')) return site.insuranceHref;
  if (l.includes('google review')) return site.googleReviewsHref;
  if (l.includes('direction')) return site.mapsHref;
  if (l.includes('team')) return '/our-team';
  if (l.includes('full story')) return '/about-dr-morgan';
  if (l.includes('car accident')) return '/services-treatments/auto-accident/';
  if (l.includes('first visit looks')) return '/new-patients';
  if (l.includes('download pdf')) return '#intake-form';
  if (l.includes('fill out')) return '#intake-form';
  if (l.includes('existing patient')) return site.bookHref;
  return site.bookHref; // Book Your Visit / Get Seen Today / Book Your Evaluation …
}
export function btnIcon(label: string): string | undefined {
  const l = label.toLowerCase();
  if (l.startsWith('call') || l.includes('472-1116')) return 'phone';
  if (l.includes('verify')) return 'clipboard-check';
  if (l.includes('direction')) return 'navigation';
  if (l.includes('google')) return 'google';
  if (l.includes('download')) return 'download';
  return undefined;
}
/** Second button is the light/secondary style on light sections, outline on dark ones. */
export function btnVariant(b: Btn, i: number, dark = false): 'primary' | 'secondary' | 'outline-light' | 'tertiary' {
  const v = b.variant.toLowerCase();
  if (v.startsWith('tert')) return 'tertiary';
  const isCall = /^call|472-1116/i.test(b.label);
  if (i === 0 && !isCall) return 'primary';
  if (v.startsWith('primary') && !isCall) return 'primary';
  return dark ? 'outline-light' : 'secondary';
}
export const cleanLabel = (l: string) => l.replace(/\s*[→↗]$/, '');

/** Card title → page link (related conditions, "What we see", "Keep reading"). */
const linkMap: [RegExp, string][] = [
  [/tech neck/i, '/conditions/neck-pain/tech-neck'],
  [/sciatica/i, '/conditions/sciatica'],
  [/hip/i, '/conditions/hip-pain'],
  [/disc/i, '/conditions/herniated-bulging-disc'],
  [/lower back|low back|back pain/i, '/conditions/lower-back-pain'],
  [/neck/i, '/conditions/neck-pain'],
  [/shoulder/i, '/conditions/shoulder-pain'],
  [/migraine/i, '/conditions/migraines'],
  [/headache/i, '/conditions/headaches'],
  [/pregnan/i, '/conditions/pregnancy-chiropractic'],
  [/decompression/i, '/services/spinal-decompression'],
  [/x-ray/i, '/services/digital-x-ray'],
  [/adjustment/i, '/services/chiropractic-adjustments'],
  [/personal injury/i, '/services/personal-injury'],
  [/insurance option/i, '/services-treatments/auto-accident/car-accident-insurance-options/'],
  [/what doctor|doctor to see/i, '/services-treatments/auto-accident/what-doctor-to-see-for-car-accident/'],
  [/why see/i, '/services-treatments/auto-accident/why-see-chiropractor-after-accident/'],
  [/symptom/i, '/services-treatments/auto-accident/car-accident-injury-symptoms/'],
  [/car accident|auto|whiplash|crash/i, '/services-treatments/auto-accident/'],
];
export function cardHref(title: string): string | undefined {
  for (const [re, href] of linkMap) if (re.test(title)) return href;
  return undefined;
}

const knownIcons = new Set(Object.keys(import.meta.glob('../assets/icons/*.svg')).map((k) => k.split('/').pop()!.replace('.svg', '')));
export const icon = (n?: string | null, fallback = 'check') => (n && knownIcons.has(n) ? n : fallback);

export const isUpper = (t: string) => { const s = strip(t); return s.length > 1 && s === s.toUpperCase() && /[A-Z]/.test(s); };

/** Group paragraphs into renderable blocks:
 *  - run of ≥2 short semibold lines → check list
 *  - semibold line followed by regular text → definition item (title + text)
 *  - everything else → paragraph (semibold paragraphs keep their weight) */
export type Block = { kind: 'p'; w: number; t: string } | { kind: 'list'; items: string[] } | { kind: 'def'; title: string; text: string[] };
export function groupParas(paras: Para[] = []): Block[] {
  const out: Block[] = [];
  for (let i = 0; i < paras.length; i++) {
    const p = paras[i];
    // "• one • two • three" written inline in the design → real list
    if (strip(p.t).startsWith('•')) {
      out.push({ kind: 'list', items: p.t.split('•').map((x) => x.trim()).filter(Boolean) });
      continue;
    }
    const short = strip(p.t).length < 90 && !/[.:]$/.test(strip(p.t));
    if (p.w === 600 && short) {
      // list run
      let j = i; const run: string[] = [];
      while (j < paras.length && paras[j].w === 600 && strip(paras[j].t).length < 90 && !/[.:]$/.test(strip(paras[j].t))) { run.push(paras[j].t); j++; }
      if (run.length >= 2) { out.push({ kind: 'list', items: run }); i = j - 1; continue; }
      const next = paras[i + 1];
      if (next && next.w === 400) {
        const text: string[] = [];
        let k = i + 1;
        while (k < paras.length && paras[k].w === 400) { text.push(paras[k].t); k++; }
        out.push({ kind: 'def', title: p.t, text }); i = k - 1; continue;
      }
    }
    if (p.w === 600 && /[.]$/.test(strip(p.t)) && strip(p.t).length < 60 && paras[i + 1]?.w === 400) {
      const text: string[] = []; let k = i + 1;
      while (k < paras.length && paras[k].w === 400) { text.push(paras[k].t); k++; }
      out.push({ kind: 'def', title: p.t, text }); i = k - 1; continue;
    }
    out.push({ kind: 'p', w: p.w, t: p.t });
  }
  return out;
}

export function sectionKind(s: Section, i: number): string {
  const n = s.name;
  if (i === 0) return 'hero';
  if (s.faqs?.length) return 'faq';
  if (/CTA Band|^Wrapper/.test(n)) return 'cta';
  if (/Reviews/.test(n) && /patients/i.test(strip(s.title)) ) return 'reviews';
  if (s.logos) return 'logos';
  if (s.paras?.some((p) => p.t === 'IN-NETWORK PLANS')) return 'planlist';
  if (s.paras?.some((p) => p.t === 'Employer plans vary')) return 'employers';
  if (/Where We Are/.test(n)) return 'where';
  if (/Finding Us|Location/.test(n)) return 'findus';
  if (s.paras?.some((p) => p.t === 'OPTIMAL HEALTH')) return 'findings';
  if (s.tags?.length) return 'timeline';
  if ((s.images?.length ?? 0) >= 3 && (s.bullets?.some((b) => b.body) || /Find|How it works|From exam/.test(n))) return 'ffk';
  if (s.steps?.length && s.images?.length && s.images[0].h > 900) return 'stepsdark';
  if (/Warning/.test(n)) return 'warning';
  if (s.cards?.length && s.images?.length && s.buttons?.length && /Conditions/.test(n)) return 'cost';
  if (s.cards?.length && !s.images?.length && !s.buttons?.length) {
    if (/Conditions Section|What We See|Keep Reading|Related/i.test(n)) return 'related';
    return 'cards';
  }
  return 'split';
}

export const sizes = {
  full: '100vw',
  half: '(min-width: 1680px) 760px, (min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw',
  small: '(min-width: 1280px) 280px, 45vw',
};

/** Paragraphs that are only an orange span in the design are text links. */
export function textLink(t: string): { label: string; href: string } | undefined {
  const m = t.match(/^<span class="hl">(.*)<\/span>$/);
  if (!m) return undefined;
  const label = m[1];
  if (/^[A-Z0-9 &]+$/.test(strip(label))) return undefined; // orange eyebrow, not a link
  const l = label.toLowerCase();
  let href = '#';
  if (l.includes('personal injury forms')) href = '/personal-injury-forms';
  else if (l.includes('plan')) href = '/insurance';
  else if (l.includes('self pay') || l.includes('new patient forms')) href = '/forms';
  else if (l.includes('texas board') && l.includes('verification')) href = 'https://www.tbce.texas.gov/';
  else if (l.includes('tbce.texas.gov')) href = 'https://www.tbce.texas.gov/complaint.html';
  else if (l.includes('telehealth')) href = 'https://flhealthsource.gov/telehealth/';
  else if (l.includes('back pain articles') || l.includes('see all')) href = '/resources';
  return { label, href };
}
