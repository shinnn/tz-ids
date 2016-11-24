'use strict';

const {cyan, green} = require('chalk');
const getTzIds = require('get-tz-ids');
const rimrafPromise = require('rimraf-promise');
const stringifyObject = require('stringify-object');
const writeFileAtomically = require('write-file-atomically');

require('loud-rejection/register');

const pkg = require('./package.json');
const {main: bowerMain} = require('./bower.json');

rimrafPromise(`{${pkg.files.join(',')},${bowerMain}}`)
.then(() => getTzIds())
.then(ids => {
  return {
    'index.json': JSON.stringify(ids, null, '  ') + '\n',
    [pkg['jsnext:main']]: 'export default ' + JSON.stringify(ids, null, '  ') + ';\n',
    [bowerMain]: `window.tzIds = ${stringifyObject(ids, {indent: '  '})};\n`
  };
})
.then(files => {
  return Promise.all(Object.keys(files).map(filename => {
    console.log('Writing... ' + cyan(filename));
    return writeFileAtomically(filename, files[filename]);
  }));
})
.then(() => console.log(green('Build completed.')));
