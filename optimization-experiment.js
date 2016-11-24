'use strict';

const getTzIds = require('get-tz-ids');
const gzipSize = require('gzip-size');
const {minify} = require('uglify-js');
const prettyBytes = require('pretty-bytes');
const stringifyObject = require('stringify-object');
const tzAeras = require('tz-areas');

require('loud-rejection/register');

function uglify(str) {
  return minify(`(function() {${str}})();`, {fromString: true}).code;
}

function formatSize(byte) {
  return prettyBytes(byte) + ` (${byte})`;
}

getTzIds().then(ids => {
  const original = `module.exports = ${stringifyObject(ids, {indent: '  '})};`;
  const uglified = uglify(original);

  console.log('no optimization + minified                 : ' + formatSize(uglified.length));
  console.log('no optimization + minified + gzipped       : ' + formatSize(gzipSize.sync(uglified)));

  const optimized = tzAeras.map(area => `var ${area} = '${area}/';`).join('\n') + '\n\n' +
                    original.replace(new RegExp(`'(${tzAeras.join('|')})/`, 'g'), '$1 + \'');
  const optimizedUglified = uglify(optimized);

  console.log('variable optimization + minified           : ' + formatSize(optimizedUglified.length));
  console.log('variable optimization + minified + gzipped : ' + formatSize(gzipSize.sync(optimizedUglified)));
});
