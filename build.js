'use strict';

const {join} = require('path');

const {cyan, green} = require('chalk');
const getTzIds = require('get-tz-ids');
const rimrafPromise = require('rimraf-promise');
const stringifyObject = require('stringify-object');
const writeFileAtomically = require('write-file-atomically');

require('loud-rejection/register');

const pkg = require('./package.json');
const browserMain = join(__dirname, 'browser.js');

rimrafPromise(`{${pkg.files.join(',')},browser.js}`)
.then(() => getTzIds())
.then(ids => {
  return {
    'index.json': JSON.stringify(ids, null, '  ') + '\n',
    [pkg['jsnext:main']]: 'export default ' + JSON.stringify(ids, null, '  ') + ';\n',
    [browserMain]: `window.tzIds = ${stringifyObject(ids, {indent: '  '})};\n`
  };
})
.then(files => {
  return Promise.all(Object.keys(files).map(filename => {
    console.log('Writing... ' + cyan(filename));
    return writeFileAtomically(filename, files[filename]);
  }));
})
.then(() => console.log(green('Build completed.')));
