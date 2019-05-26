'use strict';

const requireFromString = require('require-from-string');
const {rollup} = require('rollup');
const test = require('tape');

const expected = require('.');

function runTest(description, main) {
  test(description, t => {
    t.deepEqual(main, expected, 'should expose an array of time zone IDs.');
    t.end();
  });
}

rollup({entry: require('./package.json')['jsnext:main']}).then(bundle => {
  runTest('require(\'tz-ids\')', require('.'));
  runTest('Module exports', requireFromString(bundle.generate({format: 'cjs'}).code));
});
