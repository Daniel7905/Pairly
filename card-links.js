// Used on index.html: clicking a product card, its name, its image or its Buy button
// opens product.html?id=<product-slug>

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

document.querySelectorAll(".product").forEach(function (card) {
  const title = card.querySelector("h3");
  const name = title.textContent;
  const url = "product.html?id=" + slugify(name);   // "Urban Runner" -> product.html?id=urban-runner

  card.style.cursor = "pointer";

  // product name becomes a real link (good for accessibility and right-click > open in new tab)
  title.innerHTML = '<a href="' + url + '" style="color:inherit;text-decoration:none">' + name + "</a>";

  // Buy button goes to the details page too
  card.querySelectorAll(".button").forEach(function (btn) {
    btn.setAttribute("href", url);
  });

  // clicking anywhere on the card opens the details page
  card.addEventListener("click", function () {
    window.location.href = url;
  });
});