'use strong';

const requireFromString = require('require-from-string');
const {rollup} = require('rollup');
const test = require('tape');

const expected = require('.');

function runTest(description, main) {
  test(description, t => {
    t.plan(1);
    t.deepEqual(main, expected, 'should expose an array of time zone IDs.');
  });
}

rollup({entry: require('./package.json')['jsnext:main']}).then(bundle => {
  runTest('require(\'tz-ids\')', require('.'));

  global.window = {};
  require('./' + require('./bower.json').main);

  runTest('window.tzIds', global.window.tzIds);

  runTest('Module exports', requireFromString(bundle.generate({format: 'cjs'}).code));
});
