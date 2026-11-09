// Demo accounts for a static website.
// Everything is stored in THIS browser only (localStorage). A real shop needs a server
// and a database for accounts. See the notes in the chat.
//
// Load this on every page. It adds a "Log in" button (or the user's avatar menu) to the header.

const Auth = (function () {
  const USERS_KEY = "myshop-users";
  const SESSION_KEY = "myshop-session";

  // ---------- small helpers ----------
  function readUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
    catch (e) { return []; }
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function toHex(bytes) {
    return Array.from(bytes, function (b) { return b.toString(16).padStart(2, "0"); }).join("");
  }

  function newSalt() {
    const a = new Uint8Array(16);
    crypto.getRandomValues(a);
    return toHex(a);
  }

  // Passwords are never stored as plain text: we save a salted SHA-256 hash.
  async function hash(password, salt) {
    const text = salt + ":" + password;
    if (window.crypto && crypto.subtle) {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
      return toHex(new Uint8Array(buf));
    }
    // Fallback for pages not opened over https/localhost (much weaker, demo only)
    let h = 5381;
    for (const ch of text) h = ((h << 5) + h + ch.charCodeAt(0)) >>> 0;
    return "weak" + h.toString(16);
  }

  // ---------- session ----------
  function setSession(email, remember) {
    try {
      sessionStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(SESSION_KEY);
      (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, email);
    } catch (e) {}
  }

  function currentUser() {
    let email = null;
    try { email = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY); } catch (e) {}
    if (!email) return null;
    const u = readUsers().find(function (x) { return x.email === email; });
    return u ? { name: u.name, email: u.email, phone: u.phone } : null;
  }

  function logout() {
    try { sessionStorage.removeItem(SESSION_KEY); localStorage.removeItem(SESSION_KEY); } catch (e) {}
  }

  // ---------- register / login ----------
  async function register(info) {
    const email = info.email.trim().toLowerCase();
    const list = readUsers();
    if (list.some(function (u) { return u.email === email; })) {
      return { ok: false, error: "An account with this email already exists. Try logging in." };
    }
    const salt = newSalt();
    list.push({
      name: info.name.trim(), email: email, phone: info.phone || "",
      salt: salt, hash: await hash(info.password, salt), created: new Date().toISOString()
    });
    try { localStorage.setItem(USERS_KEY, JSON.stringify(list)); }
    catch (e) { return { ok: false, error: "Could not save your account. Is browser storage blocked?" }; }
    setSession(email, true);
    return { ok: true };
  }

  async function login(emailInput, password, remember) {
    const email = emailInput.trim().toLowerCase();
    const u = readUsers().find(function (x) { return x.email === email; });
    const ok = u && (await hash(password, u.salt)) === u.hash;
    if (!ok) return { ok: false, error: "Incorrect email or password." };
    setSession(email, remember);
    return { ok: true };
  }

  // After login we may send the visitor back where they came from (?next=product.html?id=...).
  // Only plain page names are allowed, so nobody can redirect to another website.
  function safeNext(fallback) {
    const n = new URLSearchParams(location.search).get("next");
    return n && /^[\w\-]+\.html(\?[\w\-=&%.]*)?(#[\w\-]*)?$/.test(n) ? n : (fallback || "index.html");
  }

  function pageForNext() {
    const file = location.pathname.split("/").pop() || "index.html";
    if (file === "login.html" || file === "register.html") return "index.html";
    return file + location.search;
  }

  // ---------- header button ----------
  function buildAccountButton() {
    const cart = document.querySelector(".cart-link");
    if (!cart) return;

    const old = document.getElementById("accountWrap");
    if (old) old.remove();

    const wrap = document.createElement("div");
    wrap.id = "accountWrap";
    wrap.className = "account";
    const user = currentUser();

    if (!user) {
      const next = encodeURIComponent(pageForNext());
      wrap.innerHTML =
        '<a class="login-link" href="login.html?next=' + next + '">Log in</a>' +
        '<a class="signup-link" href="register.html?next=' + next + '">Sign up</a>';
    } else {
      const first = user.name.trim().split(" ")[0];
      wrap.innerHTML =
        '<button type="button" class="avatar" id="accountBtn" aria-haspopup="true" aria-expanded="false" aria-label="Account menu">' +
          esc(first.charAt(0).toUpperCase()) + '</button>' +
        '<div class="menu" id="accountMenu" hidden>' +
          '<div class="menu-head"><p class="menu-name">Hi, ' + esc(first) + '</p><p class="menu-email">' + esc(user.email) + '</p></div>' +
          '<a href="orders.html">My orders</a>' +
          '<button type="button" class="logout" id="logoutBtn">Log out</button>' +
        '</div>';
    }
    cart.parentNode.insertBefore(wrap, cart);

    if (!user) return;
    const btn = document.getElementById("accountBtn");
    const menu = document.getElementById("accountMenu");

    function toggle(open) {
      menu.hidden = !open;
      btn.setAttribute("aria-expanded", open);
    }
    btn.addEventListener("click", function (e) { e.stopPropagation(); toggle(menu.hidden); });
    menu.addEventListener("click", function (e) { e.stopPropagation(); });
    document.addEventListener("click", function () { toggle(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") toggle(false); });

    document.getElementById("logoutBtn").addEventListener("click", function () {
      logout();
      window.location.reload();
    });
  }

  // Show/hide buttons next to password fields (class "pw-toggle")
  function wirePasswordToggles() {
    document.querySelectorAll(".pw-toggle").forEach(function (b) {
      b.addEventListener("click", function () {
        const input = b.parentElement.querySelector("input");
        const show = input.type === "password";
        input.type = show ? "text" : "password";
        b.textContent = show ? "Hide" : "Show";
        b.setAttribute("aria-label", show ? "Hide password" : "Show password");
      });
    });
  }

  buildAccountButton();
  window.addEventListener("storage", buildAccountButton);   // log in/out in another tab

  return {
    register: register, login: login, logout: logout,
    currentUser: currentUser, safeNext: safeNext, wirePasswordToggles: wirePasswordToggles
  };
})();