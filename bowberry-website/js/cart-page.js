```javascript
/* Cart page: list, change quantities, delivery charges, place the order */
(function () {

  /* Delivery settings */
  const DELIVERY_FEE = 250;
  const HOME_CITY = /nankana|ننکانہ/i;

  const lines = document.getElementById("cart-lines");
  const layout = document.getElementById("cart-layout");
  const emptyBox = document.getElementById("cart-empty");
  const thanks = document.getElementById("thanks");
  const title = document.getElementById("cart-title");
  const subtotal = document.getElementById("subtotal");
  const form = document.getElementById("checkout");
  const status = document.getElementById("status");
  const placeBtn = document.getElementById("place");
  const cityInput = document.getElementById("city");

  const useSheet = /^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(SITE.ordersUrl || "");

  const validWhatsapp = /^\d{10,15}$/.test(SITE.whatsapp);

  const idleLabel = useSheet
    ? "Place order"
    : "Send order on WhatsApp";

  placeBtn.textContent = idleLabel;

  let done = false;

  /* Delivery and total rows */

  const subtotalRow = document.querySelector(".summary > .total");
  const deliveryNote = document.querySelector(".summary > .small-note");

  const deliveryEl = h("span", null, "");
  const grandEl = h("span", null, "");

  subtotalRow.after(
    h(
      "div",
      {
        class: "total",
        style: "font-size:1rem;font-weight:400;color:var(--ink)"
      },
      h("span", null, "Delivery"),
      deliveryEl
    ),

    h(
      "div",
      {
        class: "total",
        style: "margin-top:.6rem;padding-top:.7rem;border-top:1px solid var(--line)"
      },
      h("span", null, "Total"),
      grandEl
    )
  );

  deliveryNote.textContent =
    `Delivery is free in Nankana Sahib. Other cities pay ${Cart.money(DELIVERY_FEE)}.`;


  function delivery() {

    const city = cityInput.value.trim();

    if (!city) {
      return { fee: 0, text: "Enter your city" };
    }

    if (HOME_CITY.test(city)) {
      return { fee: 0, text: "Free" };
    }

    return {
      fee: DELIVERY_FEE,
      text: Cart.money(DELIVERY_FEE)
    };
  }


  function updateTotals() {

    const d = delivery();

    deliveryEl.textContent = d.text;

    grandEl.textContent = Cart.money(
      Cart.total() + d.fee
    );
  }


  cityInput.addEventListener("input", updateTotals);


  /* Cart item */

  function lineEl(i) {

    const p = Catalog.byId(i.id);

    const minus = h(
      "button",
      { type: "button", "aria-label": `Fewer ${p.name}` },
      "−"
    );

    const plus = h(
      "button",
      { type: "button", "aria-label": `More ${p.name}` },
      "+"
    );

    const remove = h(
      "button",
      { class: "link-btn", type: "button" },
      "Remove"
    );

    minus.addEventListener("click", () =>
      Cart.setQty(i.id, i.color, i.qty - 1)
    );

    plus.addEventListener("click", () =>
      Cart.setQty(i.id, i.color, i.qty + 1)
    );

    remove.addEventListener("click", () =>
      Cart.remove(i.id, i.color)
    );

    return h(
      "div",
      { class: "cart-line" },

      Catalog.thumb(p),

      h(
        "div",
        null,
        h(
          "h3",
          null,
          h("a", { href: Catalog.url(p) }, p.name)
        ),
        h("p", null, `Colour: ${i.color}`),
        h("p", null, `${Cart.money(p.price)} each`)
      ),

      h(
        "div",
        { class: "line-end" },

        h(
          "div",
          { class: "stepper" },
          minus,
          h("output", null, String(i.qty)),
          plus
        ),

        h("strong", null, Cart.money(p.price * i.qty)),

        remove
      )
    );
  }


  /* Render cart */

  function render() {

    const items = Cart.items();

    const has = items.length > 0;

    layout.hidden = !has;

    emptyBox.hidden = has || done;

    lines.replaceChildren(...items.map(lineEl));

    subtotal.textContent = Cart.money(Cart.total());

    updateTotals();
  }


  document.addEventListener("cart:change", render);

  render();


  /* Prepare order */

  function orderFrom(data) {

    const d = delivery();

    const items = Cart.items().map(i => {

      const p = Catalog.byId(i.id);

      return {
        name: p.name,
        color: i.color,
        qty: i.qty,
        price: p.price
      };

    });

    if (d.fee > 0) {

      items.push({
        name: "Delivery charges",
        color: "Outside Nankana Sahib",
        qty: 1,
        price: d.fee
      });

    }

    return {

      name: data.get("name"),
      phone: data.get("phone"),
      city: data.get("city"),
      address: data.get("address"),

      phoneModel: data.get("phoneModel"),

      note: data.get("note"),
      payment: data.get("payment"),

      website: data.get("website"),

      items: items,

      delivery: d.fee,

      total: Cart.total() + d.fee

    };
  }


  /* Thank you message */

  function showThanks(orderNumber, order) {

    done = true;

    title.hidden = true;
    layout.hidden = true;
    emptyBox.hidden = true;

    thanks.hidden = false;

    const inc = order.delivery
      ? ` (including ${Cart.money(order.delivery)} delivery)`
      : " (free delivery)";

    document.getElementById("thanks-text").textContent =
      `Your order number is #${orderNumber}. The total is ${Cart.money(order.total)}${inc}. We will contact you on ${order.phone} to confirm the colours and delivery time.`;

    const wa = document.getElementById("thanks-wa");

    if (validWhatsapp) {

      wa.href =
        `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Hi Bowberry! I just placed order #${orderNumber}.`)}`;

      wa.target = "_blank";
      wa.rel = "noopener";

      wa.hidden = false;
    }

    thanks.querySelector("h1").focus();
  }


  /* WhatsApp fallback */

  function sendToWhatsApp(order) {

    if (!validWhatsapp) {

      status.textContent =
        "Ordering isn't set up yet. Add your WhatsApp number in js/config.js.";

      return;
    }

    const rows = order.items.map((i, n) =>
      `${n + 1}. ${i.name} (${i.color}) x ${i.qty} = ${Cart.money(i.price * i.qty)}`
    );

    const inc = order.delivery
      ? ` (including ${Cart.money(order.delivery)} delivery)`
      : " (free delivery)";

    const msg = [

      "Hi Bowberry! I'd like to place an order.",

      "",

      ...rows,

      "",

      `Total: ${Cart.money(order.total)}${inc}`,

      `Payment: ${order.payment}`,

      "",

      `Name: ${order.name}`,
      `Phone: ${order.phone}`,
      `City: ${order.city}`,
      `Address: ${order.address}`,

      order.phoneModel
        ? `Phone model (for cover): ${order.phoneModel}`
        : null,

      order.note
        ? `Note: ${order.note}`
        : null

    ].filter(l => l !== null).join("\n");

    window.open(
      `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener"
    );

    status.textContent =
      "WhatsApp is opening. Press send in WhatsApp to place your order.";
  }


  /* Submit order */

  form.addEventListener("submit", async function (e) {

    e.preventDefault();

    if (!Cart.count() || placeBtn.disabled) {
      return;
    }

    const order = orderFrom(new FormData(form));

    if (!useSheet) {
      return sendToWhatsApp(order);
    }

    placeBtn.disabled = true;

    placeBtn.textContent = "Sending order...";

    status.textContent = "";

    try {

      await fetch(SITE.ordersUrl, {

        method: "POST",

        mode: "no-cors",

        body: JSON.stringify(order)

      });

      /*
        no-cors does not allow reading Google's response.
        Therefore, successful fetch does NOT guarantee
        that the order was saved in Google Sheets.
      */

      status.textContent =
        "Your order request was sent, but confirmation is pending. Please contact us on WhatsApp to verify your order.";

      placeBtn.disabled = false;

      placeBtn.textContent = idleLabel;

    } catch (err) {

      console.error("Bowberry order error:", err);

      status.textContent =
        "We couldn't send your order. Please try again or contact us on WhatsApp.";

      placeBtn.disabled = false;

      placeBtn.textContent = idleLabel;

    }

  });


  /* Clear cart */

  document.getElementById("clear").addEventListener("click", function () {

    Cart.clear();

    status.textContent = "";

  });

})();
```
