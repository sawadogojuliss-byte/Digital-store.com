/* ══════════════════════════════════════════════════════════
   Digital Store — Interactions
   Panier persistant (localStorage), FAQ, animations,
   preuve sociale, compteurs statistiques.
   ══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const fmtEUR = (n) =>
    n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

  /* ── En-tête : ombre au défilement ───────────────────── */
  const header = $("#header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Menu mobile ─────────────────────────────────────── */
  const burger = $("#burger");
  const nav = $("#nav");
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  });
  $$("a", nav).forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    })
  );

  /* ── Apparition au défilement ────────────────────────── */
  const revealIO = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("visible"), revealIO.unobserve(e.target))),
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el) => revealIO.observe(el));

  /* ── Compteurs de statistiques ───────────────────────── */
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";
    const dur = 1600;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent =
        (decimals ? val.toLocaleString("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
                  : Math.round(val).toLocaleString("fr-FR")) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const countIO = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && (animateCount(e.target), countIO.unobserve(e.target))),
    { threshold: 0.6 }
  );
  $$("[data-count]").forEach((el) => countIO.observe(el));

  /* ── FAQ accordéon ───────────────────────────────────── */
  $$(".faq__item").forEach((item) => {
    const q = $(".faq__q", item);
    const a = $(".faq__a", item);
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      $$(".faq__item.open").forEach((o) => {
        o.classList.remove("open");
        $(".faq__q", o).setAttribute("aria-expanded", "false");
        $(".faq__a", o).style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        q.setAttribute("aria-expanded", "true");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  /* ── Toasts ──────────────────────────────────────────── */
  const toasts = $("#toasts");
  const toast = (msg) => {
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = "✔ " + msg;
    toasts.appendChild(el);
    setTimeout(() => {
      el.classList.add("out");
      setTimeout(() => el.remove(), 320);
    }, 2600);
  };

  /* ── Panier ──────────────────────────────────────────── */
  const KEY = "ds_cart_v1";
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { cart = []; }

  const overlay = $("#overlay");
  const drawer = $("#drawer");
  const itemsBox = $("#drawer-items");
  const emptyBox = $("#drawer-empty");
  const footBox = $("#drawer-foot");
  const countEl = $("#cart-count");
  const drawerCount = $("#drawer-count");
  const totalEl = $("#drawer-total");
  const modal = $("#modal");

  const save = () => localStorage.setItem(KEY, JSON.stringify(cart));
  const totalQty = () => cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = () => cart.reduce((s, i) => s + i.qty * i.price, 0);

  function renderCart() {
    const qty = totalQty();
    countEl.textContent = qty;
    countEl.classList.toggle("on", qty > 0);
    drawerCount.textContent = qty ? `(${qty} article${qty > 1 ? "s" : ""})` : "";

    itemsBox.innerHTML = "";
    const has = cart.length > 0;
    emptyBox.style.display = has ? "none" : "grid";
    footBox.hidden = !has;

    cart.forEach((item) => {
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <img src="${item.img}" alt="" width="64" height="64">
        <div>
          <div class="cart-item__name">${item.name}</div>
          <div class="cart-item__price">${fmtEUR(item.price)}</div>
        </div>
        <div class="cart-item__right">
          <span class="qty">
            <button data-dec="${item.id}" aria-label="Diminuer">−</button>
            <span>${item.qty}</span>
            <button data-inc="${item.id}" aria-label="Augmenter">+</button>
          </span>
          <button class="cart-item__remove" data-remove="${item.id}">Retirer</button>
        </div>`;
      itemsBox.appendChild(row);
    });
    totalEl.textContent = fmtEUR(totalPrice());
    save();
  }

  const addToCart = (btn) => {
    const id = btn.dataset.add;
    const found = cart.find((i) => i.id === id);
    if (found) found.qty += 1;
    else cart.push({ id, name: btn.dataset.name, price: parseFloat(btn.dataset.price), img: btn.dataset.img, qty: 1 });
    renderCart();
    toast(`« ${btn.dataset.name} » ajouté au panier`);
    openDrawer();
  };

  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add]");
    if (addBtn) return addToCart(addBtn);

    const inc = e.target.closest("[data-inc]");
    if (inc) {
      const it = cart.find((i) => i.id === inc.dataset.inc);
      if (it) it.qty += 1;
      return renderCart();
    }
    const dec = e.target.closest("[data-dec]");
    if (dec) {
      const it = cart.find((i) => i.id === dec.dataset.dec);
      if (it) it.qty = Math.max(1, it.qty - 1);
      return renderCart();
    }
    const rm = e.target.closest("[data-remove]");
    if (rm) {
      cart = cart.filter((i) => i.id !== rm.dataset.remove);
      return renderCart();
    }
  });

  function openDrawer() {
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add("show"));
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    overlay.classList.remove("show");
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(() => (overlay.hidden = true), 260);
  }

  $("#cart-open").addEventListener("click", openDrawer);
  $("#cart-close").addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);
  $("#drawer-browse").addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => e.key === "Escape" && (closeDrawer(), closeModal()));

  /* ── Commande (simulation) ───────────────────────────── */
  const closeModal = () => (modal.hidden = true);
  $("#checkout-btn").addEventListener("click", () => {
    if (!cart.length) return;
    const total = fmtEUR(totalPrice());
    cart = [];
    renderCart();
    closeDrawer();
    $("#modal-text").textContent =
      `Merci pour votre confiance ! Votre commande de ${total} est confirmée : vos liens de téléchargement viennent d'être envoyés par e-mail. (Démo — aucun paiement réel n'a été effectué.)`;
    modal.hidden = false;
  });
  $("#modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => e.target === modal && closeModal());

  /* ── Preuve sociale (achats récents) ─────────────────── */
  const proof = $("#social-proof");
  const proofText = $("#social-proof-text");
  const buyers = [
    ["Marie", "Paris", "l'ebook « Lancer son Business en Ligne »"],
    ["Karim", "Marseille", "le Pack 50 Templates Notion Pro"],
    ["Awa", "Dakar", "la Formation Marketing Digital 2026"],
    ["Thomas", "Bruxelles", "les 15 Presets Lightroom Cinéma"],
    ["Fatou", "Ouagadougou", "le Pack 200 Templates Réseaux Sociaux"],
    ["Julie", "Genève", "la Suite Excel Gestion Financière"],
    ["Nicolas", "Toulouse", "l'ebook « Lancer son Business en Ligne »"],
    ["Aïcha", "Abidjan", "le Pack 50 Templates Notion Pro"],
  ];
  let proofTimer = null;
  const showProof = () => {
    const [name, city, product] = buyers[Math.floor(Math.random() * buyers.length)];
    const mins = 2 + Math.floor(Math.random() * 40);
    proofText.innerHTML = `<strong>${name}</strong> (${city}) a acheté ${product} <br><small>il y a ${mins} min · ✔ Achat vérifié</small>`;
    proof.hidden = false;
    proofTimer = setTimeout(() => (proof.hidden = true), 6500);
  };
  setTimeout(() => {
    showProof();
    setInterval(showProof, 22000);
  }, 7000);
  $("#social-proof-close").addEventListener("click", () => {
    proof.hidden = true;
    clearTimeout(proofTimer);
  });

  renderCart();
})();
