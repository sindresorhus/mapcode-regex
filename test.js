import test from 'ava';
import mapcodeRegex from './index.js';

const fixtures = [
	'4J.Q2',
	'France 4J.Q2',
	'FRA 4J.Q2',
	'Burkino Faso T98.DL',
	'Ireland 0C.T4',
	'Alaska 81.J4W',
	'Hawaii ZSR.3J',
	'Nederland 28.CK',
	'BR-AM 4J.Q2',
	'Netherlands 49.4V-K2',
];

test('match mapcodes', t => {
	for (const fixture of fixtures) {
		t.true(mapcodeRegex().test(fixture));
	}

	t.is(mapcodeRegex().exec('Foo BR-AM 4J.Q2 Bar')[0], 'BR-AM 4J.Q2');
	t.is(mapcodeRegex().exec('Foo BR-AM 4J.Q2-123 Bar')[0], 'BR-AM 4J.Q2-123');
});
