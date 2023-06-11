const router = require("express").Router();
require("dotenv").config();
const jwt_auth = require("../middleware/jwt_auth");
const { validateCryptoData, CryptoData } = require("../models/CryptoData");
const { validateStockData, StockData } = require("../models/StockData");
const getCryptoData = require("../apis/cryptoApi");
const getStockData = require("../apis/stockApi");
const toMongoParser = require("../parsers/toMongoParser");
const dbController = require("../controllers/DatabaseDataController");
const generalController = require("../controllers/GeneralActionController");

router.post("/addNewData", async (req, res) => {
	try {
		const crt = {
			crypto: {
				cryptoName: req.body.cryptoName ?? "bitcoin",
				prices: await getCryptoData(req.body.cryptoName ?? "bitcoin"),
			},
		};

		const stk = {
			stock: {
				stockName: req.body.stockName ?? "NASDAQ100",
				prices: await getStockData(req.body.stockName ?? "NASDAQ100"),
			},
		};

		const cr = toMongoParser.crypto(crt);
		const st = toMongoParser.stock(stk);
		var { error } = validateCryptoData(cr.crypto);
		if (error) {
			console.error(error.details);
			return res.status(400).send({ message: error.details[0].message });
		}
		var { error } = validateStockData(st.stock);
		if (error) {
			console.error(error.details);
			return res.status(400).send({ message: error.details[0].message });
		}
		const stock = await StockData.findOne({
			stockName: (req.body.stockName ?? "NASDAQ100").toUpperCase(),
		});
		if (stock) {
			stock.prices = st.stock.prices;
			stock.save();
			return res.status(409).send({ message: "Data updated" });
		}
		const crypto = await CryptoData.findOne({
			cryptoName: (req.body.cryptoName ?? "bitcoin").toLowerCase(),
		});
		if (crypto) {
			crypto.prices = cr.crypto.prices;
			crypto.save();
			return res.status(409).send({ message: "Data updated" });
		}
		console.log(st);
		await new StockData({ ...st.stock }).save();
		await new CryptoData({ ...cr.crypto }).save();

		res.status(201).send({ message: "Data added successfull" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/getData", async (req, res) => {
	try {
		result = await dbController.getData(
			req.body.stockName ?? "NASDAQ100",
			req.body.cryptoName ?? "bitcoin"
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
