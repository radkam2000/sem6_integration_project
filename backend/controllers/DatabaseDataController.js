const fromMongoParser = require("../parsers/fromMongoparser");
const { validateCryptoData, CryptoData } = require("../models/CryptoData");
const { validateStockData, StockData } = require("../models/StockData");

const getData = async (stockName, cryptoName) => {
	try {
		const st = await StockData.findOne({
			stockName: (stockName ?? "NASDAQ100").toUpperCase(),
		});
		const cr = await CryptoData.findOne({
			cryptoName: (cryptoName ?? "bitcoin").toLowerCase(),
		});

		const stock = fromMongoParser.stock(st);
		const crypto = fromMongoParser.crypto(cr);
		return {
			status: 200,
			...crypto,
			...stock,
			message: "Data fetched successfully",
		};
	} catch (error) {
		throw error;
	}
};

module.exports = { getData };
