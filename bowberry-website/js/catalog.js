/* Builds product cards. Used on the home, shop and product pages. */
const Catalog = (() => {
  const byId = id => PRODUCTS.find(p => p.id === id);
  const url = p => `product.html?id=${encodeURIComponent(p.id)}`;

  function thumb(p) {
    const d = h("div", { class: "thumb" });
    d.style.setProperty("--img", `url("${p.image}")`);
    return d;
  }

  function card(p) {
    const add = h("button", { class: "btn btn-small", type: "button" }, "Add to cart");
    add.addEventListener("click", () => {
      const color = p.colors[0];
      Cart.add(p.id, color, 1);
      toast(`${p.name} (${color}) added`, "cart.html", "View cart");
    });
    return h("article", { class: "item" },
      h("a", { class: "thumb-link", href: url(p), "aria-label": `View ${p.name}` }, thumb(p)),
      h("h3", null, h("a", { href: url(p) }, p.name)),
      h("p", { class: "price" }, Cart.money(p.price)),
      h("p", null, p.short),
      h("div", { class: "card-actions" }, add, h("a", { class: "link", href: url(p) }, "Details"))
    );
  }

  function mount(container, list) {
    container.replaceChildren(...list.map(card));
  }

  return { byId, url, thumb, card, mount };
})();
