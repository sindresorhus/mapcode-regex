# mapcode-regex

> Regular expression for matching [mapcodes](https://www.mapcode.com/about)

## Install

```sh
npm install mapcode-regex
```

## Usage

```js
import mapcodeRegex from 'mapcode-regex';

mapcodeRegex().test('4J.Q2');
//=> true

mapcodeRegex().test('Hawaii ZSR.3J');
//=> true

mapcodeRegex().exec('This is a mapcode FRA 4J.Q2')[0];
//=> 'FRA 4J.Q2'

'Multiple FRA 4J.Q2 Hawaii ZSR.3J mapcodes'.match(mapcodeRegex());
//=> ['FRA 4J.Q2', 'Hawaii ZSR.3J']
```

## Important

If you run the regex against untrusted user input in a server context, you should [give it a timeout](https://github.com/sindresorhus/super-regex).

**I do not consider ReDoS a valid vulnerability for this package.**

## Tip

You can use [clone-regexp](https://github.com/sindresorhus/clone-regexp) to change the flags. In this case, maybe remove the global flag.

## Related

- [mapcode](https://github.com/sindresorhus/mapcode) - Find mapcodes in a string
