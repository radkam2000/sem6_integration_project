const getCryptoData = require("../apis/cryptoApi");
const getStockData = require("../apis/stockApi");
const humanReadableParser = require("../parsers/humanReadableParser");
const js2xmlparser = require("js2xmlparser");
const fs = require("fs").promises;

const downloadJSON = async () => {
	try {
		var stock = await getStockData();
		var crypto = await getCryptoData();
		stock = humanReadableParser.stock("NASDAQ", stock);
		crypto = humanReadableParser.crypto("BITCOIN", crypto);
		toWrite = { data: { ...stock, ...crypto } };
		toWrite = JSON.stringify(toWrite);
		await fs.writeFile(
			`${__dirname}/../downloads/data.json`,
			toWrite,
			"utf8"
		);
		return {
			status: 200,
			message: "Start download",
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const downloadXML = async () => {
	try {
		var stock = await getStockData();
		var crypto = await getCryptoData();
		stock = humanReadableParser.stock("NASDAQ", stock);
		crypto = humanReadableParser.crypto("BITCOIN", crypto);
		toWrite = { ...stock, ...crypto };
		toWrite = js2xmlparser.parse("data", toWrite);
		await fs.writeFile(
			`${__dirname}/../downloads/data.xml`,
			toWrite,
			"utf8"
		);
		return {
			status: 200,
			message: "Start download",
		};
	} catch (error) {
		console.error(error);
		throw error;
	}
};
module.exports = { downloadJSON, downloadXML };
