/* ══════════════════════════════════════════════════════════
   Digital Store — Logique de l'application
   Produits, convertisseur de devises, calculateur d'économies,
   modale produit, FAQ, pop-up promo, preuve sociale,
   arrière-plan animé (canvas, sans dépendance externe).
   ══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /* ══ DONNÉES PRODUITS (prix en FCFA, liens Chariow réels) ══ */
  const products = [
    {
      id: 1,
      name: "Abonnement Netflix Premium",
      category: "Divertissement",
      price: 14999,
      oldPrice: 59999,
      badge: "best",
      image: "assets/products/netflix-premium.jpg",
      shortDesc: "Toutes vos séries et films en 4K, 4 écrans simultanés, sans abonnement mensuel.",
      description: "🚀 Accédez à TOUTES vos séries et films préférés en qualité 4K, sans payer d'abonnement mensuel. Activation immédiate après paiement.",
      features: [
        "Accès complet et illimité à Netflix Premium",
        "Qualité 4K Ultra HD sur tous vos appareils",
        "4 écrans simultanés — toute la famille profite",
        "Nouveautés ajoutées chaque semaine",
        "Téléchargement hors ligne illimité",
        "Profils personnalisés pour chaque membre",
        "Support technique prioritaire 24h/24"
      ],
      specs: [
        ["Qualité vidéo", "4K Ultra HD"],
        ["Écrans simultanés", "4 appareils"],
        ["Activation", "Immédiate"],
        ["Support", "24h/24"]
      ],
      rating: 4.9,
      reviewsCount: 1247,
      purchaseLink: "https://szxmmgor.mychariow.shop/prd_ywxd8i/checkout",
      monthlyOfficial: 8500
    },
    {
      id: 2,
      name: "Abonnement CANAL+ Complet",
      category: "Divertissement",
      price: 12999,
      oldPrice: 49999,
      badge: "promo",
      image: "assets/products/canal-plus.jpg",
      shortDesc: "Tous les programmes CANAL+ : sport en direct, films et séries en HD/4K, 3 écrans.",
      description: "📺 TOUS les programmes CANAL+ inclus : matchs en direct, films exclusifs et séries sans aucune restriction. Activation en 3 minutes.",
      features: [
        "Tous les programmes CANAL+ sans restriction",
        "Films, séries, sports, documentaires, jeunesse",
        "Événements sportifs en direct",
        "Qualité HD et 4K sur tous appareils",
        "3 écrans simultanés inclus",
        "Rediffusions 7 jours après diffusion",
        "Application mobile et TV incluse"
      ],
      specs: [
        ["Contenu", "Complet"],
        ["Écrans simultanés", "3 appareils"],
        ["Qualité", "HD / 4K"],
        ["Rediffusion", "7 jours"]
      ],
      rating: 4.9,
      reviewsCount: 982,
      purchaseLink: "https://szxmmgor.mychariow.shop/prd_f7195a/checkout",
      monthlyOfficial: 15000
    },
    {
      id: 3,
      name: "Formation Anglais Accéléré",
      category: "Formation",
      price: 12999,
      oldPrice: 49999,
      badge: null,
      image: "assets/products/formation-anglais.jpg",
      shortDesc: "De débutant à bilingue en 90 jours : 25 modules, coach vocal IA, certificat international.",
      description: "🌍 Maîtrisez l'anglais en 90 jours : voyagez, travaillez à l'international et gagnez plus grâce à un anglais fluide. Une méthode qui a déjà transformé des milliers de vies.",
      features: [
        "Méthode accélérée : débutant → bilingue en 90 jours",
        "25 modules progressifs avec exercices pratiques",
        "Coach vocal IA pour une prononciation parfaite",
        "300+ exercices interactifs avec corrections",
        "Certificat international reconnu",
        "Support pédagogique personnalisé",
        "Communauté exclusive d'apprenants"
      ],
      specs: [
        ["Niveaux", "Débutant à avancé"],
        ["Durée", "90 jours"],
        ["Modules", "25 leçons"],
        ["Certificat", "Inclus"]
      ],
      rating: 4.9,
      reviewsCount: 864,
      purchaseLink: "https://szxmmgor.mychariow.shop/prd_5oe2ty/checkout"
    },
    {
      id: 4,
      name: "Formation E-commerce Digital",
      category: "Business",
      price: 17999,
      oldPrice: 69999,
      badge: null,
      image: "assets/products/formation-ecommerce.jpg",
      shortDesc: "Créez un business en ligne rentable en 30 jours : méthode complète + 12 études de cas.",
      description: "💻 Créez votre boutique en ligne rentable en 30 jours, guidé pas à pas de la création à la monétisation, avec des études de cas réelles.",
      features: [
        "Méthode complète : création → monétisation en 30 jours",
        "12 études de cas réelles avec chiffres concrets",
        "Templates de sites e-commerce prêts à l'emploi",
        "Stratégies marketing Facebook / Instagram",
        "Optimisation des conversions (CRO) avancée",
        "Accompagnement personnalisé 30 jours",
        "Certification Expert E-commerce"
      ],
      specs: [
        ["Durée", "30 jours"],
        ["Revenus potentiels", "100K–500K/mois"],
        ["Études de cas", "12 exemples"],
        ["Certification", "Incluse"]
      ],
      rating: 4.9,
      reviewsCount: 731,
      purchaseLink: "https://szxmmgor.mychariow.shop/prd_5wlzxq/checkout"
    },
    {
      id: 5,
      name: "Formation ChatGPT Expert",
      category: "Productivité",
      price: 19999,
      oldPrice: 79999,
      badge: "new",
      image: "assets/products/formation-chatgpt.jpg",
      shortDesc: "Automatisez 80% de vos tâches : 25 modules, 150+ prompts prêts à l'emploi, certification.",
      description: "🤖 Devenez expert ChatGPT : automatisez 80% de vos tâches et gagnez jusqu'à 4 heures par jour grâce aux techniques avancées de l'IA.",
      features: [
        "25 modules, de débutant à expert ChatGPT",
        "150+ prompts optimisés prêts à l'emploi",
        "Automatisation marketing complète",
        "Création de contenu 5× plus rapide",
        "Analyse de données avancée",
        "Intégration avec tous vos outils",
        "Certification ChatGPT Expert"
      ],
      specs: [
        ["Modules", "25 leçons"],
        ["Prompts", "150+ modèles"],
        ["Gain de temps", "4 h/jour"],
        ["Certification", "Expert"]
      ],
      rating: 4.9,
      reviewsCount: 655,
      purchaseLink: "https://szxmmgor.mychariow.shop/prd_s7yioh/checkout"
    },
    {
      id: 6,
      name: "Formation Alibaba Business",
      category: "Business",
      price: 21999,
      oldPrice: 89999,
      badge: null,
      image: "assets/products/formation-alibaba.jpg",
      shortDesc: "Importez de Chine et revendez avec 200-300% de marge : fournisseurs vérifiés inclus.",
      description: "🚀 Masterclass Alibaba : importez des produits de Chine à prix imbattables et revendez avec jusqu'à 300% de marge grâce aux secrets des importateurs expérimentés.",
      features: [
        "Méthode complète import-export Chine-Afrique",
        "Contacts directs avec fournisseurs vérifiés",
        "Stratégies de négociation gagnantes",
        "Calcul des coûts et marges optimisés",
        "Gestion logistique et douanière simplifiée",
        "Accompagnement personnalisé 45 jours",
        "Certification Expert Alibaba"
      ],
      specs: [
        ["Durée", "45 jours"],
        ["Marge potentielle", "200–300 %"],
        ["Fournisseurs", "50+ vérifiés"],
        ["Certification", "Expert"]
      ],
      rating: 4.9,
      reviewsCount: 512,
      purchaseLink: "https://szxmmgor.mychariow.shop/prd_h68v26/checkout"
    }
  ];

  /* ══ TÉMOIGNAGES ══ */
  const testimonials = [
    { text: "J'ai commandé l'abonnement Netflix hier soir et j'ai reçu mes identifiants en 3 minutes ! Tout fonctionne parfaitement. Le support m'a aidé pour l'installation sur ma TV.", author: "Marie D.", date: "15/03/2026", c1: "#6C63FF", c2: "#36D1DC" },
    { text: "La formation ChatGPT a révolutionné ma productivité. En 2 semaines, j'automatise déjà mes e-mails et mes rapports. Le formateur répond rapidement. Je recommande à 100% !", author: "Thomas K.", date: "08/03/2026", c1: "#2ECC71", c2: "#36D1DC" },
    { text: "Canal+ fonctionne impeccablement sur tous mes appareils. Je regarde tous les programmes en direct sans coupure. Économie énorme par rapport à l'offre officielle.", author: "Sophie M.", date: "22/02/2026", c1: "#FF9F1C", c2: "#FF6584" },
    { text: "En tant qu'étudiant à Abidjan, l'abonnement Netflix m'a permis de me divertir sans me ruiner. Qualité excellente, jamais de problème de connexion.", author: "Kofi M.", date: "18/03/2026", c1: "#8B5CF6", c2: "#EC4899" },
    { text: "La formation e-commerce m'a permis de lancer ma boutique en ligne en 3 semaines. Aujourd'hui, je génère un revenu passif grâce aux produits digitaux. Merci Digital Store !", author: "Amina D.", date: "12/03/2026", c1: "#FF6584", c2: "#6C63FF" },
    { text: "Impressionné par la rapidité d'activation : accès Canal+ reçus en moins de 5 minutes après paiement. Je peux suivre tous mes programmes préférés !", author: "Jean N.", date: "25/03/2026", c1: "#0891B2", c2: "#22D3EE" },
    { text: "La formation anglais a transformé ma carrière : en 2 mois, je suis passé de débutant à un niveau conversationnel. Je communique maintenant avec des clients internationaux !", author: "Anna Martin", date: "11/03/2026", c1: "#B45309", c2: "#FBBF24" },
    { text: "Service exceptionnel : Canal+ pour une fraction du prix, sans aucune restriction. Qualité HD impeccable et support très réactif. Recommandé à 1000% !", author: "Hans Schmidt", date: "10/03/2026", c1: "#059669", c2: "#34D399" }
  ];

  /* ══ DEVISES ══ */
  const rates = { XOF: 1, EUR: 655, USD: 600 };
  const symbols = { XOF: "FCFA", EUR: "€", USD: "$" };
  let currency = localStorage.getItem("ds_currency") || "XOF";

  const fmt = (fcfa) => {
    const val = fcfa / rates[currency];
    const num = currency === "XOF"
      ? Math.round(val).toLocaleString("fr-FR")
      : val.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return currency === "EUR" ? num + " €" : num + " " + symbols[currency];
  };

  /* ══ Étoiles ══ */
  const stars = (rating) => {
    const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
    return `<span class="stars stars--sm" aria-label="${rating}/5"><i style="width:${pct}%"></i></span>`;
  };

  const discount = (p) => Math.round((1 - p.price / p.oldPrice) * 100);

  /* ══ Rendu des produits ══ */
  function renderProducts() {
    const grid = $("#productsGrid");
    grid.innerHTML = products.map((p) => `
      <article class="pcard reveal" data-id="${p.id}">
        <div class="pcard__media">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <div class="pcard__badges">
            ${p.badge === "best" ? '<span class="badge badge--best">★ Bestseller</span>' : ""}
            ${p.badge === "new" ? '<span class="badge badge--new">Nouveau</span>' : ""}
            <span class="badge badge--promo">-${discount(p)}%</span>
          </div>
        </div>
        <div class="pcard__body">
          <span class="pcard__cat">${p.category}</span>
          <h3>${p.name}</h3>
          <div class="pcard__rating">
            ${stars(p.rating)}
            <span><strong>${p.rating.toLocaleString("fr-FR")}</strong> · ${p.reviewsCount.toLocaleString("fr-FR")} <span class="verified">✔ avis vérifiés</span></span>
          </div>
          <p class="pcard__desc">${p.shortDesc}</p>
          <div class="pcard__foot">
            <div class="pcard__prices">
              <span class="pcard__price" data-price="${p.price}">${fmt(p.price)}</span>
              <s class="pcard__old" data-price="${p.oldPrice}">${fmt(p.oldPrice)}</s>
              <span class="pcard__save">-${discount(p)}%</span>
            </div>
            <div class="pcard__actions">
              <a class="btn btn--primary" href="${p.purchaseLink}" target="_blank" rel="noopener">
                Commander
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>
              </a>
              <button class="btn btn--details" data-details="${p.id}">Détails</button>
            </div>
          </div>
        </div>
      </article>`).join("");
    observeReveals();
  }

  /* ══ Rendu des témoignages ══ */
  function renderTestimonials() {
    const initials = (name) => name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    $("#reviewsGrid").innerHTML = testimonials.map((t) => `
      <figure class="review reveal">
        ${stars(5)}
        <blockquote>« ${t.text} »</blockquote>
        <figcaption>
          <span class="avatar" style="--c1:${t.c1};--c2:${t.c2}">${initials(t.author)}</span>
          <div><strong>${t.author}</strong><small><span class="verified">✔ Achat vérifié</span> · ${t.date}</small></div>
        </figcaption>
      </figure>`).join("");
  }

  /* ══ Convertisseur de devises ══ */
  function refreshPrices() {
    $$("[data-price]").forEach((el) => {
      el.textContent = fmt(parseFloat(el.dataset.price));
    });
    updateSavings();
  }
  function setCurrency(cur) {
    currency = cur;
    localStorage.setItem("ds_currency", cur);
    $$(".currency__btn").forEach((b) => b.classList.toggle("active", b.dataset.currency === cur));
    refreshPrices();
    toast(`Devise : ${cur === "XOF" ? "FCFA" : cur}`);
  }
  $$(".currency__btn").forEach((b) => b.addEventListener("click", () => setCurrency(b.dataset.currency)));
  $$(".currency__btn").forEach((b) => b.classList.toggle("active", b.dataset.currency === currency));

  /* ══ Calculateur d'économies ══ */
  const savProduct = $("#savProduct");
  const savMonths = $("#savMonths");
  const subs = products.filter((p) => p.monthlyOfficial);

  savProduct.innerHTML = subs.map((p) => `<option value="${p.id}">${p.name}</option>`).join("");
  function updateSavings() {
    const p = subs.find((x) => x.id === parseInt(savProduct.value, 10)) || subs[0];
    if (!p) return;
    const m = parseInt(savMonths.value, 10);
    const official = p.monthlyOfficial * m;
    const saved = Math.max(0, official - p.price);
    $("#savMonthsLabel").textContent = `${m} mois`;
    $("#savPeriod2").textContent = `${m} mois`;
    $("#savOfficial").textContent = fmt(official);
    $("#savOurs").textContent = fmt(p.price);
    $("#savAmount").textContent = fmt(saved);
  }
  savProduct.addEventListener("change", updateSavings);
  savMonths.addEventListener("input", updateSavings);

  /* ══ Modale détails produit ══ */
  const modal = $("#productModal");
  const modalContent = $("#productModalContent");

  function openProductModal(id) {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    modalContent.innerHTML = `
      <img class="pm__img" src="${p.image}" alt="${p.name}">
      <div class="pm__body">
        <span class="pm__cat">${p.category} · <span class="badge badge--promo" style="position:static">-${discount(p)}%</span></span>
        <h3>${p.name}</h3>
        <div class="pm__rating">${stars(p.rating)} <span><strong>${p.rating.toLocaleString("fr-FR")}</strong> · ${p.reviewsCount.toLocaleString("fr-FR")} <span class="verified">✔ avis vérifiés</span></span></div>
        <p class="pm__desc">${p.description}</p>
        <ul class="pm__features">${p.features.map((f) => `<li>${f}</li>`).join("")}</ul>
        <div class="pm__specs">${p.specs.map(([k, v]) => `<div class="pm__spec"><small>${k}</small><strong>${v}</strong></div>`).join("")}</div>
        <div class="pm__prices">
          <span class="pm__price" data-price="${p.price}">${fmt(p.price)}</span>
          <s class="pm__old" data-price="${p.oldPrice}">${fmt(p.oldPrice)}</s>
        </div>
        <a class="btn btn--primary btn--lg btn--block" href="${p.purchaseLink}" target="_blank" rel="noopener">Commander — paiement sécurisé</a>
        <p class="pm__secure">🔒 Transaction chiffrée via Chariow · ⚡ Activation en 5 min · 🛡️ Garantie 30 jours</p>
      </div>`;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeProductModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-details]");
    if (btn) openProductModal(parseInt(btn.dataset.details, 10));
  });
  $("#productModalClose").addEventListener("click", closeProductModal);
  modal.addEventListener("click", (e) => e.target === modal && closeProductModal());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeProductModal(); closePromo(); }
  });

  /* ══ FAQ ══ */
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

  /* ══ En-tête + menu mobile ══ */
  const header = $("#header");
  window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 10), { passive: true });
  const burger = $("#burger");
  const nav = $("#nav");
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  });
  $$("a", nav).forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }));

  /* ══ Date du jour ══ */
  $("#currentDate").textContent = new Date().toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });

  /* ══ Statistiques vivantes (incrément léger) ══ */
  function liveStat(id, step, everyMs) {
    let val = parseInt($(id).textContent.replace(/\s/g, ""), 10);
    setInterval(() => {
      val += Math.floor(Math.random() * step) + 1;
      $(id).textContent = val.toLocaleString("fr-FR");
    }, everyMs);
  }
  liveStat("#statVisitors", 4, 9000);
  liveStat("#statSales", 2, 21000);
  liveStat("#statReviews", 1, 45000);

  /* ══ Toasts ══ */
  const toasts = $("#toasts");
  function toast(msg) {
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = "✔ " + msg;
    toasts.appendChild(el);
    setTimeout(() => { el.classList.add("out"); setTimeout(() => el.remove(), 320); }, 2600);
  }

  /* ══ Pop-up promo (exit intent + session unique) ══ */
  const promo = $("#promoPopup");
  const PROMO_CODE = "OBCU1KPVRVVC";
  let promoShown = sessionStorage.getItem("ds_promo_shown") === "1";
  let promoCountdown = null;

  function showPromo() {
    if (promoShown) return;
    promoShown = true;
    sessionStorage.setItem("ds_promo_shown", "1");
    promo.hidden = false;
    let secs = 600;
    const timerEl = $("#promoTimer");
    promoCountdown = setInterval(() => {
      secs--;
      if (secs <= 0) { clearInterval(promoCountdown); closePromo(); return; }
      const m = String(Math.floor(secs / 60)).padStart(2, "0");
      const s = String(secs % 60).padStart(2, "0");
      timerEl.textContent = `${m}:${s}`;
    }, 1000);
  }
  function closePromo() {
    promo.hidden = true;
    if (promoCountdown) clearInterval(promoCountdown);
  }
  $("#promoClose").addEventListener("click", closePromo);
  promo.addEventListener("click", (e) => e.target === promo && closePromo());
  $("#promoCopy").addEventListener("click", () => {
    const done = () => {
      toast("Code promo copié : " + PROMO_CODE);
      $("#promoCopy").textContent = "✔ Code copié !";
      setTimeout(closePromo, 1400);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(PROMO_CODE).then(done).catch(done);
    } else {
      const ta = document.createElement("textarea");
      ta.value = PROMO_CODE;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (err) { /* ignore */ }
      ta.remove();
      done();
    }
  });

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  if (isMobile) {
    setTimeout(showPromo, 45000);
    let lastY = 0;
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      if (lastY - y > 250 && y < 150) showPromo();
      lastY = y;
    }, { passive: true });
  } else {
    document.addEventListener("mouseout", (e) => {
      if (!e.relatedTarget && e.clientY < 12) showPromo();
    });
  }

  /* ══ Preuve sociale (achats récents) ══ */
  const proof = $("#socialProof");
  const proofText = $("#socialProofText");
  const buyers = [
    ["Awa", "Ouagadougou", "l'abonnement Netflix Premium"],
    ["Ibrahim", "Abidjan", "la Formation ChatGPT Expert"],
    ["Fatou", "Dakar", "l'abonnement CANAL+ Complet"],
    ["Yannick", "Cotonou", "la Formation Anglais Accéléré"],
    ["Aïcha", "Bamako", "la Formation E-commerce Digital"],
    ["David", "Lomé", "la Formation Alibaba Business"],
    ["Marie", "Paris", "l'abonnement Netflix Premium"],
    ["Sekou", "Conakry", "l'abonnement CANAL+ Complet"]
  ];
  function showProof() {
    if (sessionStorage.getItem("ds_proof_off") === "1") return;
    const [name, city, product] = buyers[Math.floor(Math.random() * buyers.length)];
    const mins = 2 + Math.floor(Math.random() * 40);
    proofText.innerHTML = `<strong>${name}</strong> (${city}) vient de commander ${product}<br><small>il y a ${mins} min · ✔ Achat vérifié</small>`;
    proof.hidden = false;
    setTimeout(() => (proof.hidden = true), 6500);
  }
  setTimeout(() => { showProof(); setInterval(showProof, 26000); }, 9000);
  $("#socialProofClose").addEventListener("click", () => {
    proof.hidden = true;
    sessionStorage.setItem("ds_proof_off", "1");
  });

  /* ══ Apparition au défilement ══ */
  let revealIO;
  function observeReveals() {
    if (!revealIO) {
      revealIO = new IntersectionObserver((entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("visible"); revealIO.unobserve(e.target); }
        }), { threshold: 0.1 });
    }
    $$(".reveal:not(.visible)").forEach((el) => revealIO.observe(el));
  }

  /* ══ Arrière-plan animé (réseau de points, canvas pur) ══ */
  (function netBackground() {
    const canvas = $("#net-bg");
    if (!canvas || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    let W, H, pts = [], mouse = { x: -9999, y: -9999 };
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const r = canvas.parentElement.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * DPR; canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const n = Math.min(70, Math.floor((W * H) / 16000));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35
      }));
    }
    resize();
    window.addEventListener("resize", resize);
    canvas.parentElement.addEventListener("mousemove", (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    canvas.parentElement.addEventListener("mouseleave", () => { mouse.x = -9999; mouse.y = -9999; });

    const LINK = 130;
    (function frame() {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(108, 99, 255, .8)";
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(108, 99, 255, ${(1 - d / LINK) * .35})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        const dm = Math.hypot(pts[i].x - mouse.x, pts[i].y - mouse.y);
        if (dm < 160) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 101, 132, ${(1 - dm / 160) * .45})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      requestAnimationFrame(frame);
    })();
  })();

  /* ══ Init ══ */
  renderProducts();
  renderTestimonials();
  refreshPrices();
  updateSavings();
  observeReveals();
})();
