// Resource library. Articles with a Markdown file in src/articles/<slug>.md get a page at /resources/<slug>.
// The rest are titles from the Figma design: add a Markdown file with the same slug to publish one.
export type ArticleMeta = { slug: string; title: string; topic: string; minutes: number; date?: string; image: string; dek?: string; video?: boolean };

export const topics = ['Back Pain', 'Neck Pain & Headaches', 'Sciatica', 'Auto Accident', 'Pregnancy', 'Posture & Desk Work'];

// Images and dates follow the Figma resource library (14030:31003).
export const articles: ArticleMeta[] = [
  { slug: 'herniated-vs-bulging-disc-mri', title: 'Herniated disc vs. bulging disc: what your MRI is really telling you', topic: 'Back Pain', minutes: 7, date: '2026-10-14', image: 'resources/lead', dek: 'Most MRI reports sound scarier than they are. Dr. Morgan breaks down the words on the page and what they mean for your pain.' },
  { slug: 'why-lower-back-hurts-after-sitting', title: 'Why your lower back hurts more after sitting all day', topic: 'Back Pain', minutes: 5, date: '2026-10-08', image: 'resources/why-lower-back-hurts-after-sitting' },
  { slug: 'first-72-hours-after-car-wreck', title: 'What to do in the first 72 hours after a car wreck', topic: 'Auto Accident', minutes: 6, date: '2026-10-03', image: 'resources/first-72-hours-after-car-wreck' },
  { slug: 'is-chiropractic-safe-during-pregnancy', title: 'Is chiropractic safe during pregnancy?', topic: 'Pregnancy', minutes: 4, date: '2026-09-26', image: 'resources/is-chiropractic-safe-during-pregnancy' },
  { slug: 'do-you-need-an-x-ray', title: 'Do you really need an X-ray? When imaging helps and when it does not', topic: 'X-rays & Imaging', minutes: 6, date: '2026-10-16', image: 'resources/do-you-need-an-x-ray', dek: 'X-rays are not automatic at West End. Dr. Morgan explains when they change your care plan and when they would only add cost.' },
  { slug: 'sciatica-or-pulled-muscle', title: 'Sciatica or a pulled muscle? How to tell the difference', topic: 'Sciatica', minutes: 5, date: '2026-10-12', image: 'resources/sciatica-or-pulled-muscle', dek: 'Both can make the back of your leg hurt. Three quick signs point to a nerve, not a muscle, and what to do about each.' },
  { slug: 'why-you-wake-up-with-stiff-neck', title: 'Why you wake up with a stiff neck (and how to stop it)', topic: 'Neck Pain & Headaches', minutes: 4, date: '2026-10-10', image: 'resources/why-you-wake-up-with-stiff-neck', dek: 'Pillow height, sleep position, and the one stretch worth doing before bed.' },
  { slug: 'headaches-that-start-in-your-neck', title: 'Headaches that start in your neck: 4 signs to look for', topic: 'Neck Pain & Headaches', minutes: 5, date: '2026-10-06', image: 'resources/headaches-that-start-in-your-neck', dek: 'If your headache starts at the base of your skull and gets worse at your desk, your neck may be the source.' },
  { slug: 'your-first-visit-step-by-step', title: 'Your first visit, step by step', topic: 'New Patients', minutes: 4, date: '2026-10-01', image: 'resources/your-first-visit-step-by-step', dek: 'From paperwork to your first adjustment, here is what happens at West End and how long each part takes.' },
  { slug: 'desk-stretches-under-two-minutes', title: '5 desk stretches that take less than two minutes', topic: 'Back Pain', minutes: 3, date: '2026-09-28', image: 'resources/desk-stretches-under-two-minutes' },
  { slug: 'herniated-disc-recovery-normal-week', title: 'Herniated disc recovery: what a normal week looks like', topic: 'Back Pain', minutes: 6, date: '2026-09-21', image: 'resources/herniated-disc-recovery-normal-week' },
  { slug: 'is-spinal-decompression-right-for-you', title: 'Is spinal decompression right for your back?', topic: 'Back Pain', minutes: 5, date: '2026-09-14', image: 'resources/is-spinal-decompression-right-for-you' },
  { slug: 'how-to-lift-without-hurting-your-back', title: 'How to lift without hurting your lower back', topic: 'Back Pain', minutes: 4, date: '2026-09-07', image: 'resources/how-to-lift-without-hurting-your-back' },
  { slug: 'whiplash-symptoms-days-later', title: 'Whiplash symptoms can show up days after a wreck', topic: 'Auto Accident', minutes: 5, date: '2026-09-30', image: 'resources/whiplash-symptoms-days-later' },
  { slug: 'how-pip-works-in-texas', title: 'How PIP coverage works in Texas after a car accident', topic: 'Auto Accident', minutes: 5, date: '2026-09-23', image: 'resources/how-pip-works-in-texas' },
  { slug: 'chiropractor-or-er-after-car-accident', title: 'Chiropractor or ER? Where to go after a car accident', topic: 'Auto Accident', minutes: 4, date: '2026-09-16', image: 'resources/chiropractor-or-er-after-car-accident' },
  { slug: 'document-injuries-insurance-claim', title: 'How to document your injuries for an insurance claim', topic: 'Auto Accident', minutes: 5, date: '2026-09-09', image: 'resources/document-injuries-insurance-claim' },
];

export const videos = [
  { title: 'Text neck: a 3-minute check you can do at your desk', topic: 'Posture & Desk Work', length: '3:42', date: 'Oct 15, 2026', image: 'resources/vid1', url: '' },
  { title: 'What an adjustment actually does to your spine', topic: 'Adjustments', length: '2:15', date: 'Oct 2, 2026', image: 'resources/vid2', url: '' },
  { title: 'Meet the team: what to expect at West End', topic: 'New Patients', length: '1:48', date: 'Sep 18, 2026', image: 'resources/vid3', url: '' },
];

const written = import.meta.glob('../articles/*.md');
export const isWritten = (slug: string) => `../articles/${slug}.md` in written;
export const articleHref = (slug: string) => (isWritten(slug) ? `/resources/${slug}` : undefined);
export const fmtDate = (d?: string | Date) => {
  if (!d) return '';
  const date = d instanceof Date ? d : new Date(d + 'T12:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
};
