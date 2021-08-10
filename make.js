import fs from 'node:fs';
import download from 'download';
import neatCsv from 'neat-csv';
import arrayUniq from 'array-uniq';

(async () => {
	// From https://www.mapcode.com/documentation
	const files = await download('https://s3.eu-central-1.amazonaws.com/download.mapcode.com/kader/isotables.zip', {extract: true});

	const data = await neatCsv(files[0].data);

	const items = [];

	for (const item of data) {
		if (item.Territory !== '') {
			items.push(item.Territory);
		}

		if (item['Local code'] !== '') {
			items.push(item['Local code']);
		}

		if (item['Full code'] !== '') {
			items.push(item['Full code']);
		}
	}

	const regex = `/(?:(${arrayUniq(items).sort().join('|')}) )?[ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjklmnpqrstuvwxyz\\d]{2,}\\.[ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjklmnpqrstuvwxyz\\d]{2,}(-\\d{1,8})?/g`;

	const source = `export default function mapcodeRegex() {\n\treturn ${regex};\n}\n`;

	fs.writeFileSync('index.js', source);
})();
