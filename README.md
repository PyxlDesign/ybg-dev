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

Now that you have your layers set and the javascript file is properly set you will be all set. One other step which is used for solid colors but also good fo rhte speckles is to add them in the theme settings_data.json I recommend adding this VIA the GUI interface.

Theme Settings -> Collection Siderbar Color filters -> Color with rgb

**If there is a color with the same rgb value like Blush Speckle and Blushing Biege they will both get selected and cause issues in with the javascript**

