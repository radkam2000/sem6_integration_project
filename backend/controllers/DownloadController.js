const getCryptoData = require("../apis/cryptoApi");
const getStockData = require("../apis/stockApi");
const humanReadableParser = require("../parsers/humanReadableParser");
const js2xmlparser = require("js2xmlparser");
const fs = require("fs").promises;

const downloadJSON = async (cryptoName, stockName, startDate, endDate) => {
	try {
		var stock = await getStockData(stockName);
		var crypto = await getCryptoData(cryptoName);

		filtered_stock = stock.filter((item) => {
			const currentDate = new Date(item[0]);
			const startDateObj = new Date(startDate);
			const endDateObj = new Date(endDate);
			return currentDate >= startDateObj && currentDate <= endDateObj;
		});

		filtered_crypto = crypto.filter((item) => {
			const currentDate = new Date(item[0]);
			const startDateObj = new Date(startDate);
			const endDateObj = new Date(endDate);
			return currentDate >= startDateObj && currentDate <= endDateObj;
		});

		filtered_stock = humanReadableParser.stock(stockName, filtered_stock);
		filtered_crypto = humanReadableParser.crypto(
			cryptoName,
			filtered_crypto
		);

		toWrite = { data: { ...filtered_stock, ...filtered_crypto } };
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

const downloadXML = async (cryptoName, stockName, startDate, endDate) => {
	try {
		var stock = await getStockData(stockName);
		var crypto = await getCryptoData(cryptoName);

		filtered_stock = stock.filter((item) => {
			const currentDate = new Date(item[0]);
			const startDateObj = new Date(startDate);
			const endDateObj = new Date(endDate);
			return currentDate >= startDateObj && currentDate <= endDateObj;
		});

		filtered_crypto = crypto.filter((item) => {
			const currentDate = new Date(item[0]);
			const startDateObj = new Date(startDate);
			const endDateObj = new Date(endDate);
			return currentDate >= startDateObj && currentDate <= endDateObj;
		});

		filtered_stock = humanReadableParser.stock(stockName, filtered_stock);
		filtered_crypto = humanReadableParser.crypto(
			cryptoName,
			filtered_crypto
		);
		toWrite = { ...filtered_stock, ...filtered_crypto };
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
