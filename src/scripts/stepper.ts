// Scroll-driven steppers: every block with the blue progress bar (the 81px accent on an item's
// rule) becomes a step sequence. On desktop the block pins while you scroll; each item's bar
// fills left -> right, one after the other, and the photo cross-fades to that item's slide.
// Phones, short windows and reduced-motion users get the unpinned version: bars fill as each
// item scrolls past (or stay static for reduced motion).
//
// Markup contract:
//   [data-stepper="card"]     element pinned inside its section (centred under the fixed header)
//   [data-stepper="section"]  full-bleed section pinned at full viewport height
//   [data-step]               the items, in order (a .stepbar is injected into each)
//   [data-step-slide]         optional photos stacked in the block; slide i shows for item i

const STEP_VH = 0.55; // scroll distance per step, in viewport heights
const desktop = matchMedia('(min-width: 1024px)');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);

type Stepper = { root: HTMLElement; track: HTMLElement; items: HTMLElement[]; slides: HTMLElement[]; mode: string; pinned: boolean; active: number };
const all: Stepper[] = [];

// Height of the header once it has turned into the fixed bar (--nav-h is the taller top-of-page header).
const navH = () => 88;

function layout(s: Stepper) {
  const vh = window.innerHeight;
  s.root.classList.remove('is-pinned', 'is-compact');
  s.root.style.top = '';
  s.track.style.height = '';
  s.pinned = false;
  if (reduced.matches || !desktop.matches) return;
  const head = navH();
  if (s.mode === 'section') {
    s.root.classList.add('is-pinned');
    if (s.root.offsetHeight > vh + 1) { s.root.classList.remove('is-pinned'); return; }
    s.root.style.top = '0px';
  } else {
    let h = s.root.offsetHeight;
    s.root.classList.remove('is-compact');
    if (h > vh - head) {
      // Too tall for this window: try the tighter spacing before giving up on pinning.
      s.root.classList.add('is-compact');
      h = s.root.offsetHeight;
      if (h > vh - head) { s.root.classList.remove('is-compact'); return; }
    }
    s.root.classList.add('is-pinned');
    s.root.style.top = `${Math.round(head + (vh - head - h) / 2)}px`;
  }
  s.track.style.height = `${s.root.offsetHeight + s.items.length * STEP_VH * vh}px`;
  s.pinned = true;
}

function progress(s: Stepper): number {
  const vh = window.innerHeight;
  if (s.pinned) {
    const r = s.track.getBoundingClientRect();
    return (parseFloat(s.root.style.top) - r.top) / (STEP_VH * vh);
  }
  // Unpinned: an item's bar fills while it travels from 85% to 55% of the viewport height.
  let p = 0;
  s.items.forEach((it, i) => {
    const t = it.getBoundingClientRect().top;
    const f = clamp((vh * 0.85 - t) / (vh * 0.3), 0, 1);
    if (f > 0) p = Math.max(p, i + f);
  });
  return p;
}

function update(s: Stepper) {
  const n = s.items.length;
  const p = clamp(progress(s), 0, n);
  const active = Math.min(Math.floor(p), n - 1);
  s.items.forEach((it, i) => {
    it.style.setProperty('--fill', clamp(p - i, 0, 1).toFixed(4));
    it.classList.toggle('is-active', i === active);
  });
  if (active !== s.active && s.slides.length > 1) {
    s.slides.forEach((sl, i) => sl.classList.toggle('is-active', i === Math.min(active, s.slides.length - 1)));
  }
  s.active = active;
}

function init() {
  if (reduced.matches) return; // keep the static design (first item's accent) for reduced motion
  document.querySelectorAll<HTMLElement>('[data-stepper]').forEach((root) => {
    const items = [...root.querySelectorAll<HTMLElement>('[data-step]')];
    if (items.length < 2) return;
    for (const it of items) {
      const bar = document.createElement('span');
      bar.className = 'stepbar';
      bar.setAttribute('aria-hidden', 'true');
      bar.innerHTML = '<span class="stepbar__fill"></span>';
      it.append(bar);
    }
    const track = document.createElement('div');
    track.className = `stepper-track stepper-track--${root.dataset.stepper}`;
    root.before(track);
    track.append(root);
    root.classList.add('is-stepper');
    all.push({ root, track, items, slides: [...root.querySelectorAll<HTMLElement>('[data-step-slide]')], mode: root.dataset.stepper || 'card', pinned: false, active: 0 });
  });
  if (!all.length) return;

  let ticking = false;
  const frame = () => { ticking = false; all.forEach(update); };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  const relayout = () => { all.forEach(layout); frame(); window.dispatchEvent(new Event('stepper:layout')); };

  relayout();
  addEventListener('scroll', onScroll, { passive: true });
  let t = 0;
  addEventListener('resize', () => { clearTimeout(t); t = window.setTimeout(relayout, 150); });
  desktop.addEventListener('change', relayout);
  addEventListener('load', relayout); // images and fonts can change block heights
}

init();
