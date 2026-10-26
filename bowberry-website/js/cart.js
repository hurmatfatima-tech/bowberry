/* Cart logic shared by every page. Items are saved in the browser (localStorage). */
const Cart = (() => {
  const KEY = "bowberry-cart";
  const MAX_QTY = 20;
  let items = load();

  function load() {
    try {
      const v = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(v) ? v.filter(i => i && i.id && i.color && i.qty > 0) : [];
    } catch (e) { return []; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { /* private mode: cart lasts for this visit only */ }
    document.dispatchEvent(new CustomEvent("cart:change"));
  }
  const find = (id, color) => items.find(i => i.id === id && i.color === color);
  const byId = id => PRODUCTS.find(p => p.id === id);

  window.addEventListener("storage", e => { if (e.key === KEY) { items = load(); document.dispatchEvent(new CustomEvent("cart:change")); } });

  return {
    items: () => items.filter(i => byId(i.id)).map(i => ({ ...i })),
    add(id, color, qty = 1) {
      const line = find(id, color);
      if (line) line.qty = Math.min(MAX_QTY, line.qty + qty);
      else items.push({ id, color, qty: Math.min(MAX_QTY, qty) });
      save();
    },
    setQty(id, color, qty) {
      if (qty <= 0) items = items.filter(i => !(i.id === id && i.color === color));
      else { const line = find(id, color); if (line) line.qty = Math.min(MAX_QTY, qty); }
      save();
    },
    remove(id, color) { items = items.filter(i => !(i.id === id && i.color === color)); save(); },
    clear() { items = []; save(); },
    count() { return this.items().reduce((n, i) => n + i.qty, 0); },
    total() { return this.items().reduce((sum, i) => sum + byId(i.id).price * i.qty, 0); },
    money: n => `${SITE.currency} ${n.toLocaleString("en-PK")}`,
    MAX_QTY
  };
})();
