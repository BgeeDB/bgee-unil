# Requirement

- Node 16.x.x or fewer

# Build

before building, we need to change the configuration of one of the library 
`node_modules/resolve-url-loader` to avoid the following issue.
````
./src/styles/global.scss
Error: resolve-url-loader: CSS error
  source-map information is not available at url() declaration (found orphan CR, try removeCR option)

````

In the `index.js`, under `var options` change `removeCR` from "false" to "true".

# FAQ

### Use of Node 17.x.x

Node 17.x.x doesn't work with create-react-app. So it will be impossible to build the app.
It's recommended to use 

### Font size matrix

````
$size-7: 12px;
$size-6: 1rem (= 14px)
$size-5: 1.1rem (= 15.4px)
$size-4: 1.2rem (= 16.8px)
$size-3: 1.5rem (= 21px)
````