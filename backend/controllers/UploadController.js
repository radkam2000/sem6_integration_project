const arrayParser = require("../parsers/toArrayParser");
const fs = require("fs").promises;
const convert = require("xml-js");

const getUploadXML = async () => {
	try {
		let fileData = await fs.readFile(
			`${__dirname}/../uploads/data`,
			"utf8"
		);
		fileData = convert.xml2js(fileData, {
			compact: true,
			nativeType: true,
			spaces: 4,
			ignoreDeclaration: true,
			ignoreDoctype: true,
		});
		cryptoName = fileData.data.crypto.cryptoName._text;
		stockName = fileData.data.stock.stockName._text;
		const crypto = arrayParser.cryptoXML(fileData.data);
		const stock = arrayParser.stockXML(fileData.data);

		result = {
			crypto: {
				cryptoName: cryptoName,
				prices: crypto,
			},
			stock: { stockName: stockName, prices: stock },
		};
		return result;
	} catch (error) {
		throw error;
	}
};

const getUploadJSON = async () => {
	try {
		fileData = await fs.readFile(`${__dirname}/../uploads/data`, "utf8");
		fileData = JSON.parse(fileData);
		const crypto = arrayParser.cryptoJSON(fileData.data);
		const stock = arrayParser.stockJSON(fileData.data);
		result = {
			crypto: {
				cryptoName: fileData.data.crypto.cryptoName,
				prices: crypto,
			},
			stock: { stockName: fileData.data.stock.stockName, prices: stock },
		};
		return result;
	} catch (error) {
		throw error;
	}
};

module.exports = { getUploadJSON, getUploadXML };
