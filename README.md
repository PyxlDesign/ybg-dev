This repo contains the Yeah Baby Goods theme wrapped around a custom React app for the highchair customizer. The Customizer app is completely contained in the `react` folder, and is integrated with the Shopify theme in `templates/page.customizer-custom.liquid` file.

To start the app run `shopify theme serve` from the root and `npm install && npm run build` from the `react` folder.

## How to add new placemat color dots

To add the Speckle or Terrazo color swatches on the side bar you will need to add svg lsyers 1-5 to the collowing pages.

If it is a Terrazzo or a Speckle you will need to make sure to add the SVG's in the assets folder.

Once added there you will need to add the color to the utilities.js so it can show and hide the correct layer.

You will need to add the layers to the following .liquid files

- product-template-default-highchair-cushions.liquid
- product-template-default-patter-VL-cushions.liquid
- product-grid-item-2.liquid

Now that you have your layers set and the javascript file is properly set you have one step left. This last step is mostly done for Solid Colors but also good for the Terrazzo and Speckles - use the base color in RGB and add them in the theme `settings_data.json` I recommend adding this VIA the GUI interface.

Theme Settings -> Collection Siderbar Color filters -> Color with rgb

**If there is a color with the same rgb value like Blush Speckle and Blushing Biege they will both get selected and cause issues in with the javascript**

### Add a Terrazzo or Speckle Swatch

To get the color swatches you will need to go to Content -> Files and upload the image there and make sure that it lines up with the name of the image/color being added. e.g. Blush Speckle ended up being blush-speckle.jpg

## Clarity

The Cookie consent has been added to layout->theme.liquid. There is 2 script tags and 1 style in the head. The cookie banner itself is just inside the `body`.

## Fonts

The Karla Font has been moved to local instead of pulling from fonts.google.com. This leaves halyard the only external font that is being pulled in from adobe fonts.

### Checkout page

Roboto and Montserrat

## Scripts

ella.min.js
halo.js
jquery.currency.min.js
jquery.products.min.js

### New Currency

new-currency.liquid is reloading every page by adding a currency=USD
