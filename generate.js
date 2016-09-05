'use strict';
var fs = require('fs');
var download = require('download');
var CSV = require('comma-separated-values');
var arrayUniq = require('array-uniq');

download('http://www.mapcode.com/kader/isotables.zip', {extract: true}).then(function (files) {
	var data = files[0].contents.toString();
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

	var out = '\'use strict\';\nmodule.exports = function () {\n\treturn /(?:(' + arrayUniq(ret).sort().join('|') + ') )?[A-Z0-9]{2,5}.[A-Z0-9]{2,4}/g;\n};\n';

	fs.writeFileSync('index.js', out);
});
