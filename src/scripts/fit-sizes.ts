// Responsive images pick a file from `sizes`, which assumes the photo is drawn at the box width.
// Photos with object-fit: cover in tall boxes (pinned cards, split panels, full-bleed sections)
// are drawn wider than their box, so the browser picks a file that is too small and the photo
// looks soft. Once laid out, set each picture's `sizes` to the width it is really drawn at.
const done = new WeakMap<HTMLImageElement, number>();

function fit() {
  document.querySelectorAll<HTMLImageElement>('picture > img').forEach((img) => {
    const r = img.getBoundingClientRect();
    if (r.width < 40 || r.height < 40) return; // hidden (other breakpoint) or decorative
    const w = img.naturalWidth, h = img.naturalHeight;
    const ar = w && h ? w / h : 0;
    const cover = getComputedStyle(img).objectFit === 'cover';
    const drawn = Math.ceil(cover && ar ? Math.max(r.width, r.height * ar) : r.width);
    if ((done.get(img) ?? 0) >= drawn) return; // only ever grow, never trigger a smaller download
    done.set(img, drawn);
    const sizes = `${drawn}px`;
    img.parentElement!.querySelectorAll('source').forEach((s) => s.setAttribute('sizes', sizes));
    img.setAttribute('sizes', sizes);
  });
}

let t = 0;
const later = () => { clearTimeout(t); t = window.setTimeout(fit, 150); };
fit();
addEventListener('load', fit);
document.addEventListener('load', (e) => { if (e.target instanceof HTMLImageElement) later(); }, true); // lazy photos learn their shape on load
addEventListener('resize', later);
addEventListener('stepper:layout', later);
