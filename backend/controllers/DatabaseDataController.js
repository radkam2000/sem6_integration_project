const fromMongoParser = require("../parsers/fromMongoparser");
const { validateCryptoData, CryptoData } = require("../models/CryptoData");
const { validateStockData, StockData } = require("../models/StockData");
const mongoose = require("mongoose");

const getData = async (stockName, cryptoName) => {
	const session = await mongoose.startSession();
	try {
		session.startTransaction();
		const st = await StockData.findOne({
			stockName: (stockName ?? "NASDAQ100").toUpperCase(),
		});
		const cr = await CryptoData.findOne({
			cryptoName: (cryptoName ?? "bitcoin").toLowerCase(),
		});

		const stock = fromMongoParser.stock(st);
		const crypto = fromMongoParser.crypto(cr);

		await session.commitTransaction();
		session.endSession();

		return {
			status: 200,
			...crypto,
			...stock,
			message: "Data fetched successfully",
		};
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		throw error;
	}
};

module.exports = { getData };
