const router = require("express").Router();
require("dotenv").config();
const { validateCryptoData, CryptoData } = require("../models/CryptoData");
const { validateStockData, StockData } = require("../models/StockData");
const getCryptoData = require("../apis/cryptoApi");
const getStockData = require("../apis/stockApi");
const toMongoParser = require("../parsers/toMongoParser");
const dbController = require("../controllers/DatabaseDataController");
const generalController = require("../controllers/GeneralActionController");
const mongoose = require("mongoose");

router.post("/addNewData", async (req, res) => {
	const session = await mongoose.startSession();
	console.log(req.body);
	try {
		session.startTransaction();
		const crt = {
			crypto: {
				cryptoName:
					req.body.cryptoName !== ""
						? req.body.cryptoName.toLowerCase()
						: "bitcoin",
				prices: await getCryptoData(
					req.body.cryptoName !== ""
						? req.body.cryptoName.toLowerCase()
						: "bitcoin"
				),
			},
		};

		const stk = {
			stock: {
				stockName:
					req.body.stockName !== ""
						? req.body.stockName
						: "NASDAQ100",
				prices: await getStockData(
					req.body.stockName !== "" ? req.body.stockName : "NASDAQ100"
				),
			},
		};

		const cr = toMongoParser.crypto(crt);
		const st = toMongoParser.stock(stk);
		var { error } = validateCryptoData(cr.crypto);
		if (error) {
			console.error(error.details);
			await session.abortTransaction();
			session.endSession();
			return res.status(400).send({ message: error.details[0].message });
		}
		var { error } = validateStockData(st.stock);
		if (error) {
			console.error(error.details);
			await session.abortTransaction();
			session.endSession();
			return res.status(400).send({ message: error.details[0].message });
		}
		const stock = await StockData.findOne({
			stockName: (req.body.stockName !== ""
				? req.body.stockName
				: "NASDAQ100"
			).toUpperCase(),
		});
		const crypto = await CryptoData.findOne({
			cryptoName: (req.body.cryptoName !== ""
				? req.body.cryptoName.toLowerCase()
				: "bitcoin"
			).toLowerCase(),
		});

		if (stock && crypto) {
			stock.prices = st.stock.prices;
			stock.save();
			crypto.prices = cr.crypto.prices;
			crypto.save();
			await session.commitTransaction();
			session.endSession();
			return res.status(200).send({ message: "Database data updated" });
		}

		await new StockData({ ...st.stock }).save();
		await new CryptoData({ ...cr.crypto }).save();
		await session.commitTransaction();
		session.endSession();
		console.log("database copy done");
		res.status(200).send({ message: "Data added successfull" });
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/getData", async (req, res) => {
	try {
		result = await dbController.getData(
			req.body.stockName !== ""
				? req.body.cryptoName.toUppperCase()
				: "NASDAQ100",
			req.body.cryptoName !== ""
				? req.body.cryptoName.toLowerCase()
				: "bitcoin"
		);
		res.status(result.status).send({
			stock: {
				stockName: result.stock.stockName,
				prices: result.stock.prices,
			},
			crypto: {
				cryptoName: result.stock.cryptoName,
				prices: result.crypto.prices,
			},
			startDate: result.crypto.prices[0][0],
			endDate: result.crypto.prices[result.crypto.prices.length - 1][0],
			cryptoRate: generalController.calculateReturnRate(
				result.crypto.prices[0][1],
				result.crypto.prices[result.crypto.prices.length - 1][1]
			),
			stockRate: generalController.calculateReturnRate(
				result.stock.prices[0][1],
				result.stock.prices[result.stock.prices.length - 1][1]
			),
			message: result.message,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
