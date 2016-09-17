'use strict';
const fs = require('fs');
const download = require('download');
const neatCsv = require('neat-csv');
const arrayUniq = require('array-uniq');

download('http://www.mapcode.com/kader/isotables.zip', {extract: true})
	.then(files => neatCsv(files[0].data))
	.then(data => {
		const ret = [];

		for (const x of data) {
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

		const out = `'use strict';\nmodule.exports = () => (/(?:(${arrayUniq(ret).sort().join('|')}) )?[ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjklmnpqrstuvwxyz0-9]{2,}\.[ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjklmnpqrstuvwxyz0-9]{2,}(-[0-9]{1,8})?/g);\n`;

		fs.writeFileSync('index.js', out);
	});
