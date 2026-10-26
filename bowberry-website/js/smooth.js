/* Smooth scrolling (Lenis, from github.com/darkroomengineering/lenis),
   a thin progress line, and gentle reveal-on-scroll. */
(function () {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !window.Lenis) return;

  const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
  window.lenis = lenis;

  /* Progress line at the top + scroll speed for the 3D bow (read in scene.js) */
  const bar = document.createElement("div");
  bar.className = "progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.append(bar);
  window.BOWBERRY_SCROLL = { v: 0 };
  lenis.on("scroll", ({ scroll, limit, velocity }) => {
    bar.style.transform = `scaleX(${limit > 0 ? scroll / limit : 0})`;
    window.BOWBERRY_SCROLL.v = velocity;
  });

  /* Links to a section on this same page glide there */
  const norm = p => p.replace(/index\.html$/, "").replace(/\.html$/, "").replace(/\/$/, "");
  document.addEventListener("click", e => {
    const a = e.target.closest("a[href*='#']");
    if (!a || a.target === "_blank") return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || norm(url.pathname) !== norm(location.pathname) || url.hash.length < 2) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -70 });
    history.pushState(null, "", url.hash);
  });

  /* Text areas scroll on their own */
  document.querySelectorAll("textarea").forEach(t => t.setAttribute("data-lenis-prevent", ""));

  /* Reveal: only things that start below the fold */
  const selector = ".wrap > h2, .wrap > .section-lead, .page-title, .item, .steps li, .about-grid > *, .contact > *, .product > *";
  const targets = [...document.querySelectorAll(selector)].filter(el => el.getBoundingClientRect().top > innerHeight * 0.92);
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  targets.forEach(el => {
    const siblings = [...el.parentElement.children].filter(c => targets.includes(c));
    el.style.setProperty("--d", `${Math.min(siblings.indexOf(el), 5) * 90}ms`);
    el.classList.add("reveal");
    io.observe(el);
  });
})();
