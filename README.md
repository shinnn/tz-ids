# tz-ids

[![NPM version](https://img.shields.io/npm/v/tz-ids.svg)](https://www.npmjs.com/package/tz-ids)
[![Bower version](https://img.shields.io/bower/v/tz-ids.svg)](https://github.com/shinnn/tz-ids/releases)
[![Build Status](https://travis-ci.org/shinnn/tz-ids.svg?branch=master)](https://travis-ci.org/shinnn/tz-ids)
[![devDependency Status](https://david-dm.org/shinnn/tz-ids/dev-status.svg)](https://david-dm.org/shinnn/tz-ids#info=devDependencies)

An array of [time zone IDs](https://en.wikipedia.org/wiki/Tz_database#Names_of_time_zones)

```js
[
  'Africa/Abidjan',
  'Africa/Accra',
  'Africa/Addis_Ababa',
  'Africa/Algiers',
  'Africa/Asmara',
  'Africa/Bamako',
  'Africa/Bangui',
  'Africa/Banjul',
  'Africa/Bissau',
  'Africa/Blantyre',
  'Africa/Brazzaville',
  'Africa/Bujumbura',
  'Africa/Cairo',
  'Africa/Casablanca',
  'Africa/Ceuta',
  'Africa/Conakry',
  'Africa/Dakar',
  //...
]
```

## Installation

### Package managers

#### [npm](https://www.npmjs.com/)

```
npm install tz-ids
```

#### [bower](https://bower.io/)

```
bower install tz-ids
```

### Standalone

[Download the script file directly.](https://raw.githubusercontent.com/shinnn/tz-ids/master/browser.js)

## API

### tzIds

Type: `Array`  

```javascript
import tzIds from 'tz-ids';

Array.isArray(tzIds); //=> true
```

IDs are sorted in alphabetical order.

## License

[The Unlicense](./LICENSE)
