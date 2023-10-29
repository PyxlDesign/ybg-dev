# Shopify//React Starter

Ensure you remove ties to this repo when copying files (don't copy `.git` directory).
Drop these files into your shopify theme's root, run `npm i` and start development.

Output file defaults to `assets/rps-app.min.js` - change this in `webpack.config.js`.

## Development
```
npm run build
```
Watches files and outputs un-minified file

## Production
```
npm run build-prod
```
Watches files and outputs minified file.


### Quick start for other packages:

#### dotenv:
```
npm i --save-dev dotenv
```

Uncomment the applicable lines in `webpack.config.js`


#### Redux:
```
npm i --save-dev react-redux redux redux-thunk

```

Uncomment the applicable lines in `src/index.js`.


#### Axios:
```
npm i --save-dev axios
```

#### Proptypes:
```
npm i --save-dev prop-types
```

#### Font Awesome:
```
npm i --save-dev @fortawesome/fontawesome-svg-core @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
```
Usage:

```jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
// ...
<FontAwesomeIcon icon={faAngleDown} />
```