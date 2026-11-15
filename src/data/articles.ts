// Resource library. Articles with a Markdown file in src/articles/<slug>.md get a page at /resources/<slug>.
// The rest are titles from the Figma design: add a Markdown file with the same slug to publish one.
export type ArticleMeta = { slug: string; title: string; topic: string; minutes: number; date?: string; image: string; video?: boolean };

export const topics = ['Back Pain', 'Neck Pain & Headaches', 'Sciatica', 'Auto Accident', 'Pregnancy'];

export const articles: ArticleMeta[] = [
  { slug: 'herniated-vs-bulging-disc-mri', title: 'Herniated disc vs. bulging disc: what your MRI is really telling you', topic: 'Back Pain', minutes: 7, image: 'photos/exam-patient-teal-shirt' },
  { slug: 'why-lower-back-hurts-after-sitting', title: 'Why your lower back hurts more after sitting all day', topic: 'Back Pain', minutes: 5, date: '2026-10-08', image: 'photos/spine-model-consult-man-alt' },
  { slug: 'first-72-hours-after-car-wreck', title: 'What to do in the first 72 hours after a car wreck', topic: 'Auto Accident', minutes: 6, image: 'photos/shoulder-assessment-man' },
  { slug: 'is-chiropractic-safe-during-pregnancy', title: 'Is chiropractic safe during pregnancy?', topic: 'Pregnancy', minutes: 4, image: 'photos/casey-morgan-family' },
  { slug: 'do-you-need-an-x-ray', title: 'Do you really need an X-ray? When imaging helps and when it does not', topic: 'X-rays & Imaging', minutes: 6, date: '2026-10-16', image: 'photos/xray-explain-older-man' },
  { slug: 'sciatica-or-pulled-muscle', title: 'Sciatica or a pulled muscle? How to tell the difference', topic: 'Sciatica', minutes: 5, date: '2026-10-12', image: 'home/video-thumb-adjustment' },
  { slug: 'why-you-wake-up-with-stiff-neck', title: 'Why you wake up with a stiff neck (and how to stop it)', topic: 'Neck Pain & Headaches', minutes: 4, image: 'photos/consult-woman-standing' },
  { slug: 'headaches-that-start-in-your-neck', title: 'Headaches that start in your neck: 4 signs to look for', topic: 'Neck Pain & Headaches', minutes: 5, image: 'photos/adjustment-neck-woman' },
  { slug: 'your-first-visit-step-by-step', title: 'Your first visit, step by step', topic: 'New Patients', minutes: 4, image: 'photos/casey-tablet-patient' },
  { slug: 'desk-stretches-under-two-minutes', title: '5 desk stretches that take less than two minutes', topic: 'Back Pain', minutes: 3, date: '2026-09-28', image: 'photos/casey-consult-clipboard' },
  { slug: 'herniated-disc-recovery-normal-week', title: 'Herniated disc recovery: what a normal week looks like', topic: 'Back Pain', minutes: 6, date: '2026-09-21', image: 'photos/adjustment-thoracic-woman' },
  { slug: 'is-spinal-decompression-right-for-you', title: 'Is spinal decompression right for your back?', topic: 'Back Pain', minutes: 5, date: '2026-09-14', image: 'photos/decompression-assistant' },
  { slug: 'how-to-lift-without-hurting-your-back', title: 'How to lift without hurting your lower back', topic: 'Back Pain', minutes: 4, date: '2026-09-07', image: 'home/hero-casey-with-patient' },
  { slug: 'whiplash-symptoms-days-later', title: 'Whiplash symptoms can show up days after a wreck', topic: 'Auto Accident', minutes: 5, image: 'photos/xray-review-older-patient' },
  { slug: 'how-pip-works-in-texas', title: 'How PIP coverage works in Texas after a car accident', topic: 'Auto Accident', minutes: 5, image: 'photos/assistant-xray-machine' },
  { slug: 'chiropractor-or-er-after-car-accident', title: 'Chiropractor or ER? Where to go after a car accident', topic: 'Auto Accident', minutes: 4, image: 'photos/adjustment-table-patient' },
];

export const videos = [
  { title: 'Text neck: a 3-minute check you can do at your desk', topic: 'Posture & Desk Work', length: '3:42', date: 'Oct 15, 2026', image: 'shared/doctor-adjusting-patient-table', url: '' },
];

const written = import.meta.glob('../articles/*.md');
export const isWritten = (slug: string) => `../articles/${slug}.md` in written;
export const articleHref = (slug: string) => (isWritten(slug) ? `/resources/${slug}` : undefined);
export const fmtDate = (d?: string | Date) => {
  if (!d) return '';
  const date = d instanceof Date ? d : new Date(d + 'T12:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
};
