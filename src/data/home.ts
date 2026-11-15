// Home page content that is long enough to keep out of the template.
type Symptom = { label: string; href: string; half?: boolean };
const C = {
  headaches: '/conditions/headaches',
  migraines: '/conditions/migraines',
  neck: '/conditions/neck-pain',
  tech: '/conditions/neck-pain/tech-neck',
  auto: '/services-treatments/auto-accident/',
  back: '/conditions/lower-back-pain',
  disc: '/conditions/herniated-bulging-disc',
  sciatica: '/conditions/sciatica',
  hip: '/conditions/hip-pain',
  pregnancy: '/conditions/pregnancy-chiropractic',
  shoulder: '/conditions/shoulder-pain',
  adjust: '/services/chiropractic-adjustments',
};
export const symptoms: Symptom[][] = [
  [
    { label: 'Headaches', href: C.headaches, half: true },
    { label: 'Migraines', href: C.migraines, half: true },
    { label: 'Neck pain', href: C.neck, half: true },
    { label: 'Stiff neck', href: C.neck, half: true },
    { label: 'Whiplash', href: C.auto },
    { label: 'Tension headaches', href: C.headaches },
    { label: 'Tech neck (from desk work)', href: C.tech },
    { label: 'Post-surgery back or neck pain', href: C.back },
    { label: 'Poor posture', href: C.tech },
    { label: 'Car accident injuries', href: C.auto },
    { label: 'Workout or gym injuries', href: C.adjust },
  ],
  [
    { label: 'Lower back pain', href: C.back },
    { label: 'Herniated disc', href: C.disc },
    { label: 'Bulging disc', href: C.disc },
    { label: 'Slipped disc', href: C.disc },
    { label: 'Pinched nerve', href: C.sciatica },
    { label: 'Sciatica', href: C.sciatica },
    { label: 'Hip pain', href: C.hip },
    { label: 'Sciatic nerve pain', href: C.sciatica },
    { label: 'Muscle spasms in the lower back', href: C.back },
  ],
  [
    { label: 'Chronic pain from sitting all day', href: C.back },
    { label: 'Numbness in the legs or feet', href: C.sciatica },
    { label: 'Tingling down the leg', href: C.sciatica },
    { label: 'Pregnancy back pain', href: C.pregnancy },
    { label: 'Prenatal aches and pains', href: C.pregnancy },
    { label: 'Shoulder pain', href: C.shoulder },
    { label: 'Tension between the shoulder blades', href: C.shoulder },
    { label: 'Numbness or tingling in the arms or hands', href: C.neck },
    { label: 'Weakness in the arms', href: C.neck },
  ],
];

export const homeFaq = [
  { q: 'How much does it cost to be a new patient?', a: "If you're using insurance, send us your info when you book and we'll look into your coverage before your visit. We're in-network with most major carriers. If you're paying yourself, call us or ask when you book and we'll tell you the cost up front. Your first visit covers your exam, a consultation, and any necessary digital X-rays." },
  { q: 'Do I need a referral to book?', a: 'No, you can book directly. The one exception is certain HMO plans that require a referral from your primary care doctor. We’ll let you know when we look at your coverage.' },
  { q: 'What insurance do you take?', a: 'In-network with BCBS, UnitedHealthcare, UMR, Surest, Aetna, Meritain, Humana, Ambetter, Ascension SmartHealth, Curative, WebTPA, and Medicare. Send us your insurance info when you book and we’ll look into your coverage before your first visit, so we have a good idea of what your plan covers by the time you walk in.' },
  { q: 'Do I need X-rays?', a: "Only if your exam suggests it. If Dr. Morgan takes them, they happen on site at your first visit, so there's no separate imaging appointment and no separate bill. He reads them himself and shows them to you right then." },
  { q: "What if I'm nervous about being adjusted?", a: "Tell Dr. Morgan. He starts gentle on your first visit to get a feel for your spine before doing anything else. Most people describe an adjustment as relief. You might hear a pop, which is gas releasing from the joint, not bones cracking. If something's tender, he'll work around it." },
  { q: 'How many visits will I need?', a: "Dr. Morgan won't know until he's examined you and reviewed your imaging. A typical plan runs about 24 visits over 90 days, usually two to three times a week at the start. Some people need less. He'll give you a real recommendation on your second visit, once he's looked at everything." },
  { q: 'Do I have to keep coming forever?', a: "No. Once the problem is corrected, most patients move to maintenance, usually about once every two weeks. Some stop entirely. Dr. Morgan will tell you when you're there. He's not going to keep you on a schedule you don't need." },
  { q: 'How long does a visit take?', a: "Your first visit runs about 30 minutes because of the exam and imaging. After that, most visits take a few minutes. That's on purpose. Dr. Morgan built the practice around working people, so you can come in on a lunch break and still make your next meeting." },
];
