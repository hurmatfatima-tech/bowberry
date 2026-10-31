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
/* Floating "Chat on WhatsApp" button on every page (adds its own style, nothing else to edit) */
(function () {
  const css = `
.wa-float{position:fixed;right:1.1rem;bottom:1.1rem;z-index:30;display:inline-flex;align-items:center;gap:.6rem;padding:.55rem 1.1rem .55rem .55rem;border-radius:999px;background:#0F7A44;color:#fff;text-decoration:none;font:700 .85rem/1 var(--font-body,system-ui,sans-serif);letter-spacing:.04em;box-shadow:0 14px 28px -12px rgba(15,122,68,.8);transition:transform .25s ease}
.wa-float:hover{transform:translateY(-3px)}
.wa-float:focus-visible{outline:3px solid #fff;outline-offset:3px;box-shadow:0 0 0 6px #0F7A44}
.wa-float .wa-icon{width:44px;height:44px;border-radius:50%;background:#25D366;display:grid;place-items:center;flex-shrink:0}
.wa-float svg{width:26px;height:26px;fill:#fff}
@media (max-width:600px){.wa-float{padding:0;gap:0}.wa-float .wa-label{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}}
@media (prefers-reduced-motion:reduce){.wa-float{transition:none}}`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.append(style);

  const a = document.createElement("a");
  a.className = "wa-float";
  a.href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi Bowberry! I have a question.")}`;
  a.target = "_blank"; a.rel = "noopener";
  a.setAttribute("aria-label", "Chat on WhatsApp");
  a.innerHTML = '<span class="wa-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg></span><span class="wa-label">Chat on WhatsApp</span>';
  document.body.append(a);
})();
