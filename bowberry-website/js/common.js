/* Helpers and behaviour used on every page */

/* Small DOM helper: h("div", {class: "x"}, "text", childNode) */
function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  Object.entries(attrs || {}).forEach(([k, v]) => { if (v !== null && v !== undefined && v !== false) el.setAttribute(k, v); });
  children.flat().forEach(c => { if (c !== null && c !== undefined) el.append(c); });
  return el;
}

/* Message that slides up after something happens (like adding to cart) */
function toast(message, href, linkText) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.replaceChildren(h("span", null, message), href ? h("a", { href }, linkText) : null);
  t.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove("show"), 3500);
}

/* Contact links (set from js/config.js) */
document.querySelectorAll("[data-wa]").forEach(a => {
  a.href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(a.dataset.waText || "Hi Bowberry!")}`;
  a.target = "_blank"; a.rel = "noopener";
});
document.querySelectorAll("[data-ig]").forEach(a => { a.href = `https://instagram.com/${SITE.instagram}`; a.target = "_blank"; a.rel = "noopener"; });
document.querySelectorAll("[data-mail]").forEach(a => { a.href = `mailto:${SITE.email}`; });
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Cart count in the header */
function updateBadge() {
  const n = Cart.count();
  document.querySelectorAll("[data-cart-count]").forEach(b => {
    b.textContent = n;
    b.dataset.empty = String(n === 0);
    b.setAttribute("aria-label", `${n} items in cart`);
  });
}
document.addEventListener("cart:change", updateBadge);
updateBadge();

/* Mobile menu */
(function () {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.getElementById("nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", e => {
    if (e.target.closest("a")) { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
  });
})();
