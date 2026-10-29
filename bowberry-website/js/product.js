/* Displays an individual product page. */

(function () {
  const container = document.getElementById("product");
  const related = document.getElementById("related");

  const id = new URLSearchParams(window.location.search).get("id");
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    container.textContent = "Sorry, this product could not be found.";
    return;
  }

  document.title = product.name + " | Bowberry";

  const image = document.createElement("img");
  image.src = "/" + String(product.image || "").replace(/^\/+/, "");
  image.alt = product.name;
  image.style.width = "100%";
  image.style.height = "auto";
  image.style.objectFit = "contain";

  image.onerror = function () {
    console.error("Product image not found:", image.src);
    image.alt = "Product image unavailable: " + product.name;
  };

  const picture = document.createElement("div");
  picture.className = "product-image";
  picture.appendChild(image);

  const details = document.createElement("div");
  details.className = "product-details";

  const title = document.createElement("h1");
  title.textContent = product.name;

  const price = document.createElement("p");
  price.className = "price";
  price.textContent = SITE.currency + " " +
    Number(product.price).toLocaleString("en-PK");

  const description = document.createElement("p");
  description.textContent = product.description || product.short || "";

  const colorLabel = document.createElement("label");
  colorLabel.textContent = "Choose colour: ";

  const colors = document.createElement("select");

  (product.colors && product.colors.length
    ? product.colors
    : ["Default"]
  ).forEach(color => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    colors.appendChild(option);
  });

  colorLabel.appendChild(colors);

  const addButton = document.createElement("button");
  addButton.className = "btn";
  addButton.textContent = "Add to cart";

  addButton.addEventListener("click", function () {
    Cart.add(product.id, colors.value, 1);
    toast(product.name + " added to cart", "cart.html", "View cart");
  });

  details.append(title, price, description, colorLabel, addButton);
  container.replaceChildren(picture, details);
const otherProducts = PRODUCTS
  .filter(p => p.id !== product.id)
  .slice(0, 4);

if (related) {
  if (typeof Catalog !== "undefined") {
    Catalog.mount(related, otherProducts);
  } else {
    console.error("Catalog is not loaded. Check catalog.js.");
  }
}

})();
