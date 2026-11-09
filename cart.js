// Shared cart code. Load this on every page that has the header cart button.
// The cart is saved in the browser (localStorage), so it stays after refresh and between pages.

const CART_KEY = "myshop-cart";

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (e) { return []; }
}

function saveCart(cart) {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
  updateCartCount();
}

// Add a product. Same product + same size increases the quantity instead of adding a new row.
function addToCart(id, size, qty) {
  const cart = getCart();
  const found = cart.find(function (item) { return item.id === id && item.size === size; });
  if (found) { found.qty = Math.min(found.qty + qty, 10); }
  else { cart.push({ id: id, size: size, qty: qty }); }
  saveCart(cart);
}

function cartCount() {
  return getCart().reduce(function (total, item) { return total + item.qty; }, 0);
}

// Draws the header cart button (icon + count badge). Edit the icon here and it
// changes on every page, so index.html, product.html and cart.html stay untouched.
function buildCartLink() {
  const link = document.querySelector(".cart-link");
  if (!link) return;
  link.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M5.5 8.5h13l-1 11.5a1 1 0 0 1-1 .9H7.5a1 1 0 0 1-1-.9L5.5 8.5z"/>' +
      '<path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"/>' +
    '</svg>' +
    '<span class="cart-count" id="cartCount">0</span>';
}

let lastCount = null;

// Shows the number on the header cart button (hidden when the cart is empty)
function updateCartCount() {
  const badge = document.getElementById("cartCount");
  if (!badge) return;
  const n = cartCount();
  badge.textContent = n;
  badge.style.display = n ? "" : "none";

  const link = badge.closest(".cart-link");
  if (link) link.setAttribute("aria-label", "Cart, " + n + (n === 1 ? " item" : " items"));

  // small pop animation when something is added
  if (lastCount !== null && n > lastCount) {
    badge.classList.remove("bump");
    void badge.offsetWidth;            // restarts the animation
    badge.classList.add("bump");
  }
  lastCount = n;
}

// Keep the number correct if the cart changes in another browser tab
window.addEventListener("storage", updateCartCount);
buildCartLink();
updateCartCount();