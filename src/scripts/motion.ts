// Scroll reveal for the site-wide motion system (styles in src/styles/motion.css).
// Every page is main > section > .container > blocks, so one rule covers the site:
// each block (or each item of a card grid/list) fades up when it enters the viewport.
// Items that enter together get a short 80ms stagger; the hero has its own CSS entrance.
const root = document.documentElement;

if (root.classList.contains('js-motion')) {
  const STAGGER = 80, MAX_DELAY = 400;
  const vh = window.innerHeight;

  // A run of 3+ siblings with the same tag and class is a grid/list: reveal items one by one.
  const isGroup = (el: Element) => {
    const kids = [...el.children];
    return kids.length >= 3 && kids.every((k) => k.tagName === kids[0].tagName && k.className === kids[0].className);
  };

  const targets: Element[] = [];
  document.querySelectorAll('main > section:not(:first-of-type) .container').forEach((container) => {
    if (container.parentElement?.closest('.container')) return; // only the outer container
    for (const block of container.children) {
      if (isGroup(block)) targets.push(...block.children);
      else targets.push(block);
    }
  });

  const io = new IntersectionObserver((entries) => {
    const entering = entries.filter((e) => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
    entering.forEach((e, i) => {
      const el = e.target as HTMLElement;
      el.style.transitionDelay = `${Math.min(i * STAGGER, MAX_DELAY)}ms`;
      el.classList.add('is-in');
      io.unobserve(el);
      // Hand the element back to its own styles once revealed (hover transitions etc.)
      setTimeout(() => { el.removeAttribute('data-reveal'); el.classList.remove('is-in'); el.style.transitionDelay = ''; }, 1200 + MAX_DELAY);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  for (const el of targets) {
    // Leave anything already on screen at load alone, so nothing visible blinks out.
    if (el.getBoundingClientRect().top < vh * 0.92) continue;
    el.setAttribute('data-reveal', '');
    io.observe(el);
  }
}
