# Bowberry website

Plain HTML, CSS and JavaScript. No build step, so Vercel hosts it as is.

## Pages
- index.html    home (3D bow, favourites, how to order, about, contact)
- shop.html     all products with category filter
- product.html  one product (opened with product.html?id=...)
- cart.html     cart and order form; sends the order to WhatsApp

## Files you will edit
- js/config.js    your WhatsApp number, Instagram and email
- js/products.js  your products, prices and colours
- assets/         photos (see assets/README.txt)
- css/style.css   colours are at the top

## Deploy on Vercel
Push this folder to GitHub, import the repo in Vercel, set Framework Preset to "Other", click Deploy.

## Orders in a Google Sheet
1. Create a Google Sheet, open Extensions > Apps Script, paste google-apps-script/Code.gs.
2. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
3. Copy the web app link (ends with /exec) into `ordersUrl` in js/config.js.
Until `ordersUrl` is filled in, the cart sends orders to WhatsApp instead.
