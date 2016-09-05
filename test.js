import test from 'ava';
import m from './';

const fixtures = [
	'4J.Q2',
	'France 4J.Q2',
	'FRA 4J.Q2',
	'Burkino Faso T98.DL',
	'Ireland 0C.T4',
	'Alaska 81.J4W',
	'Hawaii ZSR.3J',
	'Nederland 28.CK',
	'BR-AM 4J.Q2'
];

test('match mapcodes', t => {
	for (const x of fixtures) {
		t.true(m().test(x));
	}

	t.is(m().exec('Foo BR-AM 4J.Q2 Bar')[0], 'BR-AM 4J.Q2');
});
