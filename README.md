# Digital Store — Boutique de produits numériques

Site vitrine e-commerce premium, conçu pour **inspirer confiance** et convertir :
ebooks, templates Notion & Canva, formations vidéo, presets photo et tableurs Excel.

## ✨ Points forts (orientés confiance client)

- 🛡️ **Garantie 30 jours** satisfait ou remboursé, mise en avant partout
- 🔒 **Paiement sécurisé** : badges SSL 256 bits, Visa / Mastercard / PayPal / Apple Pay
- ⭐ **Preuve sociale** : 2 480 avis vérifiés, témoignages, notifications d'achats récents
- ⚡ **Téléchargement instantané** expliqué étape par étape
- 💬 **FAQ** complète (paiement, remboursement, formats, licence, support)
- 🛒 **Panier fonctionnel** persistant (localStorage) avec tiroir latéral
- 📱 Design responsive, animations soignées, palette indigo → violet

## 🗂️ Structure

```
├── index.html            # Page unique (français)
├── css/styles.css        # Feuille de style
├── js/main.js            # Panier, FAQ, animations, preuve sociale
└── assets/
    ├── hero.jpg          # Visuel principal (généré)
    └── products/         # 6 visuels produits (générés)
```

## 🚀 Lancer en local

Aucune dépendance, site 100 % statique :

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

## 📝 Note

Le bouton « Commander » est une **démo** : aucun paiement réel n'est traité.
Brancher Stripe / PayPal / Gumroad / Lemon Squeezy pour la mise en production.
