/* Cart page: list, change quantities, place the order */
(function () {
  const lines = document.getElementById("cart-lines");
  const layout = document.getElementById("cart-layout");
  const emptyBox = document.getElementById("cart-empty");
  const thanks = document.getElementById("thanks");
  const title = document.getElementById("cart-title");
  const subtotal = document.getElementById("subtotal");
  const form = document.getElementById("checkout");
  const status = document.getElementById("status");
  const placeBtn = document.getElementById("place");

  const useSheet = /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(SITE.ordersUrl || "");
  const validWhatsapp = /^\d{10,15}$/.test(SITE.whatsapp);
  const idleLabel = useSheet ? "Place order" : "Send order on WhatsApp";
  placeBtn.textContent = idleLabel;
  let done = false;

  function lineEl(i) {
    const p = Catalog.byId(i.id);
    const minus = h("button", { type: "button", "aria-label": `Fewer ${p.name}` }, "−");
    const plus = h("button", { type: "button", "aria-label": `More ${p.name}` }, "+");
    const remove = h("button", { class: "link-btn", type: "button" }, "Remove");
    minus.addEventListener("click", () => Cart.setQty(i.id, i.color, i.qty - 1));
    plus.addEventListener("click", () => Cart.setQty(i.id, i.color, i.qty + 1));
    remove.addEventListener("click", () => Cart.remove(i.id, i.color));
    return h("div", { class: "cart-line" },
      Catalog.thumb(p),
      h("div", null,
        h("h3", null, h("a", { href: Catalog.url(p) }, p.name)),
        h("p", null, `Colour: ${i.color}`),
        h("p", null, `${Cart.money(p.price)} each`)),
      h("div", { class: "line-end" },
        h("div", { class: "stepper" }, minus, h("output", null, String(i.qty)), plus),
        h("strong", null, Cart.money(p.price * i.qty)),
        remove));
  }

  function render() {
    const items = Cart.items();
    const has = items.length > 0;
    layout.hidden = !has;
    emptyBox.hidden = has || done;
    lines.replaceChildren(...items.map(lineEl));
    subtotal.textContent = Cart.money(Cart.total());
  }
  document.addEventListener("cart:change", render);
  render();

  function orderFrom(data) {
    return {
      name: data.get("name"), phone: data.get("phone"), city: data.get("city"),
      address: data.get("address"), phoneModel: data.get("phoneModel"), note: data.get("note"), payment: data.get("payment"),
      website: data.get("website"), // hidden spam trap, real people leave it empty
      items: Cart.items().map(i => {
        const p = Catalog.byId(i.id);
        return { name: p.name, color: i.color, qty: i.qty, price: p.price };
      }),
      total: Cart.total()
    };
  }

  function showThanks(orderNumber, total, phone) {
    done = true;
    title.hidden = true;
    layout.hidden = true;
    emptyBox.hidden = true;
    thanks.hidden = false;
    document.getElementById("thanks-text").textContent =
      `Your order number is #${orderNumber}. The total is ${Cart.money(total)}. We will contact you on ${phone} to confirm the colours, delivery charges and delivery time.`;
    const wa = document.getElementById("thanks-wa");
    if (validWhatsapp) {
      wa.href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Hi Bowberry! I just placed order #${orderNumber}.`)}`;
      wa.target = "_blank"; wa.rel = "noopener"; wa.hidden = false;
    }
    thanks.querySelector("h1").focus();
  }

  function sendToWhatsApp(order) {
    if (!validWhatsapp) {
      status.textContent = "Ordering isn’t set up yet. Add your WhatsApp number in js/config.js.";
      return;
    }
    const rows = order.items.map((i, n) => `${n + 1}. ${i.name} (${i.color}) x ${i.qty} = ${Cart.money(i.price * i.qty)}`);
    const msg = [
      "Hi Bowberry! I’d like to place an order.", "",
      ...rows, "",
      `Total: ${Cart.money(order.total)} (delivery charges to be confirmed)`,
      `Payment: ${order.payment}`, "",
      `Name: ${order.name}`, `Phone: ${order.phone}`, `City: ${order.city}`, `Address: ${order.address}`,
      order.phoneModel ? `Phone model (for cover): ${order.phoneModel}` : null,
      order.note ? `Note: ${order.note}` : null
    ].filter(l => l !== null).join("\n");
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    status.textContent = "WhatsApp is opening. Press send in WhatsApp to place your order.";
  }

  form.addEventListener("submit", async e => {
    e.preventDefault();
    if (!Cart.count()) return;
    const order = orderFrom(new FormData(form));
    if (!useSheet) return sendToWhatsApp(order);

    placeBtn.disabled = true;
    placeBtn.textContent = "Placing order…";
    status.textContent = "";
    try {
      const res = await fetch(SITE.ordersUrl, { method: "POST", body: JSON.stringify(order) });
      const result = await res.json();
      if (!result.ok) throw new Error(result.error || "Order failed");
      showThanks(result.orderNumber, order.total, order.phone);
      Cart.clear();
    } catch (err) {
      status.textContent = "We couldn’t place your order. Please try again, or message us on WhatsApp.";
      placeBtn.disabled = false;
      placeBtn.textContent = idleLabel;
    }
  });

  document.getElementById("clear").addEventListener("click", () => { Cart.clear(); status.textContent = ""; });
})();
