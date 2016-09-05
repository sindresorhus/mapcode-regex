'use strict';
const fs = require('fs');
const download = require('download');
const CSV = require('comma-separated-values');
const arrayUniq = require('array-uniq');

download('http://www.mapcode.com/kader/isotables.zip', {extract: true}).then(files => {
	const data = files[0].data.toString();
	const items = new CSV(data, {header: true}).parse();
	const ret = [];

	for (const x of items) {
		if (x.Territory !== '') {
			ret.push(x.Territory);
		}

		if (x['Local code'] !== '') {
			ret.push(x['Local code']);
		}

		if (x['Full code'] !== '') {
			ret.push(x['Full code']);
		}
	}

	const out = `'use strict';\nmodule.exports = () => {\n\treturn /(?:(${arrayUniq(ret).sort().join('|')}) )?[A-Z0-9]{2,5}.[A-Z0-9]{2,4}/g;\n};\n`;

	fs.writeFileSync('index.js', out);
});
