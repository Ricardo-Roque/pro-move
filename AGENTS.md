# ProMove quiz funnel

- Static site: `index.html` + `script.js` + `styles.css`, no framework and no build step. Deploy as static files (Vercel config in `vercel.json`, Netlify/Cloudflare in `_headers`).
- The funnel is the `steps` array at the top of `script.js`. `render()` dispatches on `step.kind`; moving between screens is `next()`/`back()`, never manual DOM changes elsewhere. The URL never changes while the user moves through the funnel.
- The first question is prerendered in `index.html` so it shows before the script loads. If you change the first step in `script.js`, change the HTML too.
- Offer data (price, checkout URL, countdown) lives in the `offer` object in `script.js`. Never simulate a successful payment: the buy buttons only link to the Payt checkout.
- After checkout: `up1/` (Acesso Vitalício), then `up2/` (Grupo VIP), then `obrigado/`. Each upsell is a short TSL card (`up1-*` classes in `styles.css`) with Payt one-click buy (`payt_action="oneclick_buy"` + `data-object` offer code, script `multiple-oneclickbuyscript/LJXW3R.js`). Where the buyer goes after accepting is set in Payt; the decline link target is `declineUrl` in each `upsell.js`. Price shown on the page must match the Payt offer.
- Images go in `images/` as WebP, resized to display size. Fonts are self-hosted in `fonts/`.
- Meta Pixel and UTMify, when added, go at the top of `<head>` before any CSS or font.
- Local test: `python -m http.server 5173`, then `http://127.0.0.1:5173/?step=<id>` opens a screen directly (extras: `name`, `xp`, `goal`). This shortcut only works on localhost.
