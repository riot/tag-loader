'use strict';

var compiler = require('@riotjs/compiler');
var loaderUtils = require('loader-utils');

/**
 * Generate the hmr code depending on the tag generated by the compiler
 * @param   {string} path - stringified, quote-enclosed path to the component file
 * @returns {string} the code needed to handle the riot hot reload
 */
function hotReload(path) {
  return `;(() => {
  if (module.hot) {
    const hotReload = require('@riotjs/hot-reload').default
    module.hot.accept()
    if (module.hot.data) {
      const component = require(${path}).default;
      hotReload(component)
    }
  }
})()`
}

function index(source) {
  // parse the user query
  const query = loaderUtils.getOptions(this) || {};

  // normalise the query object in case of question marks
  const opts = Object.keys(query).reduce(function(acc, key) {
    acc[key.replace('?', '')] = query[key];
    return acc
  }, {});

  // compile and generate sourcemaps
  const {code, map} = compiler.compile(
    source,
    {
      ...opts,
      file: this.resourcePath
    }
  );

  // generate the output code
  // convert webpack's absolute path to a script-friendly string for hotReload
  const escapedPath = loaderUtils.stringifyRequest(this, this.resourcePath);
  const output = `${code}${opts.hot ? hotReload(escapedPath) : ''}`;

  // cache this module
  if (this.cacheable) this.cacheable();

  // return code and sourcemap
  this.callback(null, output, map);
}

module.exports = index;
