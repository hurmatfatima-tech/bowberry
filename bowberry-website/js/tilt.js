/* The logo card tilts toward the pointer and leans with scrolling. */
(function () {
  const card = document.getElementById("tilt");
  if (!card || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canHover = matchMedia("(hover: hover)").matches; // phones just float
  const t = { x: 0, y: 0 }, cur = { x: 0, y: 0, lean: 0 };
  if (canHover) {
    window.addEventListener("pointermove", e => {
      t.x = (e.clientX / window.innerWidth - 0.5) * 2;
      t.y = (e.clientY / window.innerHeight - 0.5) * 2;
    });
  }

  let visible = true;
  new IntersectionObserver(en => { visible = en[0].isIntersecting; }).observe(card);

  function frame() {
    if (visible) {
      cur.x += (t.x - cur.x) * 0.08;
      cur.y += (t.y - cur.y) * 0.08;
      const v = (window.BOWBERRY_SCROLL && window.BOWBERRY_SCROLL.v) || 0;      // scroll speed from smooth.js
      cur.lean += (Math.max(-1, Math.min(1, v * 0.05)) * 6 - cur.lean) * 0.08;
      card.style.setProperty("--ry", `${(cur.x * 11).toFixed(2)}deg`);
      card.style.setProperty("--rx", `${(-cur.y * 8 + cur.lean).toFixed(2)}deg`);
      card.style.setProperty("--gx", `${(50 + cur.x * 40).toFixed(1)}%`);
      card.style.setProperty("--gy", `${(50 + cur.y * 40).toFixed(1)}%`);
    }
    requestAnimationFrame(frame);
  }
  frame();
})();
