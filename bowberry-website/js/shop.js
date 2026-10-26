/* Shop page: all products with category filter */
(function () {
  const grid = document.getElementById("grid");
  const filters = document.getElementById("filters");
  const categories = ["All", ...new Set(PRODUCTS.map(p => p.category))];
  const wanted = new URLSearchParams(location.search).get("cat");
  let current = categories.includes(wanted) ? wanted : "All";

  function render() {
    Catalog.mount(grid, PRODUCTS.filter(p => current === "All" || p.category === current));
    filters.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.cat === current)));
  }
  categories.forEach(cat => {
    const b = h("button", { class: "filter", type: "button", "data-cat": cat }, cat);
    b.addEventListener("click", () => { current = cat; render(); });
    filters.append(b);
  });
  render();
})();
