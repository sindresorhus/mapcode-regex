# mapcode-regex [![Build Status](https://travis-ci.org/sindresorhus/mapcode-regex.svg?branch=master)](https://travis-ci.org/sindresorhus/mapcode-regex)

> Regular expression for matching [mapcodes](http://www.mapcode.com/aboutmc.html)


## Install

```sh
$ npm install --save mapcode-regex
```


## Usage

```js
const mapcodeRegex = require('mapcode-regex');

mapcodeRegex().test('4J.Q2');
//=> true

mapcodeRegex().test('Hawaii ZSR.3J');
//=> true

mapcodeRegex().exec('This is a mapcode FRA 4J.Q2')[0];
//=> FRA 4J.Q2

'Multiple FRA 4J.Q2 Hawaii ZSR.3J mapcodes'.match(mapcodeRegex());
//=> ['FRA 4J.Q2', 'Hawaii ZSR.3J']
```


## Tip

You can use [clone-regexp](https://github.com/sindresorhus/clone-regexp) to change the flags. In this case maybe remove the global flag.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
