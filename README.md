# Digital Store — Abonnements & Formations Premium

Boutique en ligne **orientée confiance client** : abonnements Netflix / CANAL+
et formations certifiées (Anglais, E-commerce, ChatGPT, Alibaba) jusqu'à **-70 %**.
Prix en FCFA, convertisseur EUR/USD, paiement via **Chariow** (Mobile Money & carte).

## ✨ Améliorations axées confiance

- 🛡️ **Garantie 30 jours** satisfait ou remboursé, visible sur tout le site
- 🔒 **Paiement sécurisé Chariow** + badges Mobile Money (Orange Money, Wave, Moov) et Visa/Mastercard
- ⭐ **1 240 avis vérifiés** et témoignages clients avec badge « ✔ Achat vérifié »
- 🖼️ **Nouveaux visuels produits premium** générés sur mesure (thème sombre cohérent)
- 📊 **Chiffres crédibles** (les statistiques gonflées ont été corrigées — elles nuisaient à la crédibilité)
- 💰 **Calculateur d'économies** (coût officiel vs offre Digital Store)
- ⚡ **Activation en 3 étapes** clairement expliquée
- ❓ **FAQ** : activation, légalité, multi-appareils, support, remboursement
- 🎁 Pop-up code promo (exit-intent) · 🔔 notifications d'achats récents
- 📱 Design responsive, thème sombre, canvas animé **sans dépendance lourde** (Three.js/Vanta supprimés)
- 🔧 Corrige les erreurs 404 des fichiers `js/global-stock-manager.js` et `js/user-stock-simulator.js`
  référencés mais absents de l'ancienne version

## 🗂️ Structure

```
├── index.html            # Page unique (français)
├── css/styles.css        # Thème sombre (#6C63FF / #FF6584 / #36D1DC)
├── js/main.js            # Produits, devises, calculateur, modales, promo
└── assets/products/      # 6 visuels produits générés
```

## 🚀 Lancer en local

Site 100 % statique, aucune dépendance :

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## 💳 Paiement

Les boutons « Commander » redirigent vers les pages de paiement **Chariow**
existantes (liens inchangés). Le code promo `OBCU1KPVRVVC` est repris de
l'ancienne version.
