# Performance-optimized Boilerplate for React Apps using Webpack, Redux, Mocha, Chai and Enzyme

### Webpack
* Module packaging
* Development
* Production pipeline automation

### Webpack configuration: main features
* See notes in webpack.config.js

### Webpack loaders
* css-loader: uses @import instead of require()
* postcss-loader: adds css post-processing capabilities
* style-loader: turns css into js modules that inject style tags
* json-loader: allows to import json files

### Webpack plugins
* html-webpack-plugin: generates index.html from a template
* copy-webpack-plugin: copy folders from source to build

### Other config files
* autoprefixer: automatic vendor prefixes for postcss
* normalize.css: cross-browser reset file
* precss: allows us to use variables and mixins in postcss
* postcss-easy-import: allows us to configure the @import statements via webpack

### Webpack development server
* webpack-development-server

### Babel configuration
* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-stage-1
* babel-preset-react
* babel-preset-airbnb (enzyme testing)
* babel-preset-hmre (hot reloading, required only during development)

### Performance optimization
* clean-webpack-plugin: clear build folder before each build
* extract-text-webpack-plugin: css in a single file
* html-minifier: html minification
* css minification: the css-loader uses css-nano
* see notes in webpack.prod.config.js: only dependencies (no devDependencies), add chunkhash to filenames (only updated files are
  downloaded: optimizes browser cache and CDN speed)
