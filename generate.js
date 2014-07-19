'use strict';
var fs = require('fs');
var path = require('path');
var download = require('download');
var tempfile = require('tempfile');
var CSV = require('comma-separated-values');
var arrayUniq = require('array-uniq');
var tmp = tempfile();

var DB_URL = 'http://www.mapcode.com/kader/isotables.zip';

download(DB_URL, tmp, {extract: true}).on('close', function () {
	var data = fs.readFileSync(path.join(tmp, 'isotable.csv'), 'utf8');
	var items = new CSV(data, {header: true}).parse();

	var ret = [];

	items.forEach(function (el) {
		if (el.Territory !== '') {
			ret.push(el.Territory);
		}

		if (el['Local code'] !== '') {
			ret.push(el['Local code']);
		}

		if (el['Full code'] !== '') {
			ret.push(el['Full code']);
		}
	});

	var out = '\'use strict\';\nmodule.exports = function () {\n\treturn /(?:(' + arrayUniq(ret).sort().join('|') + ') )?[A-Z0-9]{2,}\.[A-Z0-9]{2,}/g;\n};';

	fs.writeFileSync('index.js', out);
});
