// Single source for business details. Change here, it updates everywhere.
export const site = {
  name: 'West End Chiropractic',
  doctor: 'Dr. Casey Morgan',
  doctorFormal: 'Casey Morgan D.C.',
  url: 'https://www.austin-chiropractor.com',
  phone: '(512) 472-1116',
  phoneHref: 'tel:+15124721116',
  email: 'contact@austin-chiropractor.com',
  emailHref: 'mailto:contact@austin-chiropractor.com',
  address: {
    street: '1611 W. 5th St., STE 110',
    building: '5th Street Commons, ground floor',
    city: 'Austin',
    region: 'TX',
    postal: '78703',
  },
  parking: 'Free covered garage parking',
  addressLine: '1611 W. 5th St., STE 110, Austin, TX 78703',
  hoursShort: 'Monday–Thursday\n8am–1pm and 3pm–5pm',
  // Opening hours used by the "Open today until…" status (America/Chicago)
  openingHours: { days: [1, 2, 3, 4], open: '08:00', close: '17:00' },
  license: 'Casey Morgan, D.C. · Texas Chiropractic License No. 12254',
  disclaimer: 'does not accept Medicaid. HMO patients require a referral. CIGNA is out-of-network only.',
  social: {
    instagram: '#', // TODO: real profile URLs (not in Figma)
    x: '#',
    linkedin: '#',
    facebook: '#',
  },
  bookHref: '/schedule-appointment',
  bookLabel: 'Book Your Visit',
  insuranceHref: '/insurance',
  mapsHref: 'https://maps.google.com/?q=West+End+Chiropractic+1611+W+5th+St+Austin+TX',
  reviews: { rating: '5.0', count: '250+' },
  // TODO: replace with the clinic's Google Business review link
  googleReviewsHref: 'https://www.google.com/search?q=West+End+Chiropractic+Austin+reviews',
  assessmentHref: '/new-patients#assessment', // TODO: assessment/quiz page not designed yet
  // TODO: intake form links (online form URL to embed, and PDF). Not in Figma.
  forms: {
    intakeUrl: '',
    intakePdf: '',
    piIntakeUrl: '',
    piIntakePdf: '',
  },
  videos: {
    // TODO: YouTube or Vimeo link for "A minute with the doctor" (not in Figma)
    meetTheDoctor: '',
  },
};

export type NavLink = { label: string; href: string; short?: string; desc?: string; icon?: string; children?: NavLink[] };

export const conditionHubs: NavLink[] = [
  {
    label: 'Auto Accident',
    href: '/services-treatments/auto-accident/',
    icon: 'car-front',
    desc: 'Same-day care after a crash',
    children: [
      { label: 'Car Accident Injury Symptoms', short: 'Injury Symptoms', href: '/services-treatments/auto-accident/car-accident-injury-symptoms/' },
      { label: 'Car Accident Insurance Options', short: 'Insurance Options', href: '/services-treatments/auto-accident/car-accident-insurance-options/' },
      { label: 'What Doctor to See for Car Accident', short: 'Which Doctor to See', href: '/services-treatments/auto-accident/what-doctor-to-see-for-car-accident/' },
      { label: 'Why See a Chiropractor After an Accident', short: 'Why See a Chiropractor', href: '/services-treatments/auto-accident/why-see-chiropractor-after-accident/' },
    ],
  },
  {
    label: 'Lower Back Pain',
    href: '/conditions/lower-back-pain',
    icon: 'body',
    desc: 'Disc, nerve and hip-related pain',
    children: [
      { label: 'Herniated / Bulging Disc', href: '/conditions/herniated-bulging-disc' },
      { label: 'Sciatica', href: '/conditions/sciatica' },
      { label: 'Hip Pain', href: '/conditions/hip-pain' },
    ],
  },
  {
    label: 'Neck Pain',
    href: '/conditions/neck-pain',
    icon: 'person-standing',
    desc: 'Desk and posture-related pain',
    children: [
      { label: 'Tech Neck', href: '/conditions/neck-pain/tech-neck' },
      { label: 'Shoulder Pain', href: '/conditions/shoulder-pain' },
    ],
  },
  {
    label: 'Headaches',
    href: '/conditions/headaches',
    icon: 'brain',
    desc: 'Tension and recurring headaches',
    children: [{ label: 'Migraines', href: '/conditions/migraines' }],
  },
  { label: 'Pregnancy Care', href: '/conditions/pregnancy-chiropractic', icon: 'baby', desc: 'Gentle care before and after baby' },
];

export const services: NavLink[] = [
  { label: 'Chiropractic Adjustments', href: '/services/chiropractic-adjustments', icon: 'workout', desc: 'Manual, hands-on adjustments that get to the actual cause of pain.' },
  { label: 'Spinal Decompression', href: '/services/spinal-decompression', icon: 'spine', desc: 'Non-surgical care for herniated and bulging discs.' },
  { label: 'Digital X-ray', href: '/services/digital-x-ray', icon: 'trust-x-ray', desc: 'On-site imaging, so we see the problem before we treat it.' },
  { label: 'Personal Injury Care', href: '/services/personal-injury', icon: 'file-check', desc: 'Same-day intake, PIP and LOP billing, clear case notes.' },
];

export const areas: NavLink[] = [
  { label: 'Clarksville', href: '/chiropractor-clarksville-austin' },
  { label: 'Downtown Austin', href: '/chiropractor-downtown-austin' },
  { label: 'West Austin', href: '/chiropractor-west-austin' },
  { label: 'Rosedale', href: '/chiropractor-rosedale' },
];

export const mainNav: NavLink[] = [
  {
    label: 'About',
    href: '/about-dr-morgan',
    children: [
      { label: 'About Dr. Casey Morgan', href: '/about-dr-morgan', icon: 'stethoscope', desc: 'Meet the doctor who finds the cause first, then fixes it.' },
      { label: 'Meet Our Team', href: '/our-team', icon: 'person-standing', desc: 'Tai, Gabby and Alex keep your visits easy and on time.' },
    ],
  },
  { label: 'Services', href: '/services/chiropractic-adjustments', children: services },
  { label: 'Conditions', href: '/conditions/lower-back-pain', children: conditionHubs },
  { label: 'New Patients', href: '/new-patients' },
  { label: 'Insurance & Billing', href: '/insurance' },
];

export const legal: NavLink[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-and-conditions' },
  { label: 'Credentials & Compliance', href: '/credentials-compliance' },
  { label: 'New Patient Forms', href: '/forms' },
  { label: 'Personal Injury Forms', href: '/personal-injury-forms' },
  { label: 'Resources', href: '/resources' },
];

export const footerNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about-dr-morgan' },
  { label: 'Services', href: '/services/chiropractic-adjustments' },
  { label: 'Insurance & Billing', href: '/insurance' },
  { label: 'New Patients', href: '/new-patients' },
  { label: 'Schedule Appointment', href: '/schedule-appointment' },
];
