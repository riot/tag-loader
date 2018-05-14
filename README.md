# tag-loader

[![Build Status][travis-image]][travis-url]
[![Issue Count][codeclimate-image]][codeclimate-url]
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![MIT License][license-image]][license-url]

Riot official webpack loader

## Installation

```shell
npm i riot-tag-loader riot-compiler -D
```

## Usage in webpack <= 3

Add the riot-tag-loader in your `webpack.config.js` file
```js
module.exports = {
  module: {
    loaders: [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        loader: 'riot-tag-loader',
        query: {
          hot: false, // set it to true if you are using hmr
          // add here all the other riot-compiler options riot.js.org/guide/compiler/
          // template: 'pug' for example
        }
      }
    ]
  }
}
```

## Usage in webpack >= 4

Add the riot-tag-loader in your `webpack.config.js` file
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        use: [{
          loader: 'riot-tag-loader',
          options: {
            hot: false, // set it to true if you are using hmr
            // add here all the other riot-compiler options riot.js.org/guide/compiler/
            // template: 'pug' for example
          }
        }]
      }
    ]
  }
}
```

If you want to enable hmr you will need to install [`riot-hot-reload`](https://www.npmjs.com/package/riot-hot-reload)

```shell
npm i riot-hot-reload -D
```

And afterwards you should import the `riot-hot-reload` API (only once in your bootstrap file) in your project in order to enhance the default riot api

```js
import riot from 'riot'
import 'riot-hot-reload'

// riot will have now a new riot.reload method!!
```

## Modular usage

By default the loader prepends `var riot = require('riot')` to the compiled file to support CommonJS. If you need to turn this off just set the option `commonjs: false`.

Alternatively you can use the option `modular: true`. This will wrap the compiled code in a function and includes AMD and CommonJS support if possible. The output will then look like this:

```js
(function(tagger) {
  if (typeof define === 'function' && define.amd) {
    define(['riot'], function(riot) { tagger(riot); });
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    tagger(require('riot'));
  } else {
    tagger(window.riot);
  }
})(function(riot) {

  // compiled tag code here

});
```

## Examples

Please check [this simple example](https://github.com/riot/examples/tree/gh-pages/webpack) to see how it's easy to configure webpack with riot

[travis-image]:  https://img.shields.io/travis/riot/tag-loader.svg?style=flat-square
[travis-url]:    https://travis-ci.org/riot/tag-loader
[license-image]: https://img.shields.io/badge/license-MIT-000000.svg?style=flat-square
[license-url]:   LICENSE.txt
[npm-version-image]:   https://img.shields.io/npm/v/riot-tag-loader.svg?style=flat-square
[npm-downloads-image]: https://img.shields.io/npm/dm/riot-tag-loader.svg?style=flat-square
[npm-url]:             https://npmjs.org/package/riot-tag-loader
[codeclimate-image]: https://codeclimate.com/github/riot/tag-loader/badges/issue_count.svg
[codeclimate-url]:   https://codeclimate.com/github/riot/tag-loader
