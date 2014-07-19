'use strict';
var test = require('ava');
var mapcodeRegex = require('./');

var fixture = [
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

test('should match mapcodes', function (t) {
	fixture.forEach(function (el) {
		t.assert(mapcodeRegex().test(el), el);
	});

	t.assert(mapcodeRegex().exec('Foo BR-AM 4J.Q2 Bar')[0] === 'BR-AM 4J.Q2');
});
