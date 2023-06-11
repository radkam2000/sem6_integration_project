const router = require("express").Router();
require("dotenv").config();
const jwt_auth = require("../middleware/jwt_auth");
const { validateCryptoData, CryptoData } = require("../models/CryptoData");
const { validateStockData, StockData } = require("../models/StockData");

router.post("/addNewData", async (req, res) => {
	try {
		var { error } = validateCryptoData(req.body.crypto);
		if (error) {
			console.error(error.details);
			return res.status(400).send({ message: error.details[0].message });
		}
		var { error } = validateStockData(req.body.stock);
		if (error) {
			console.error(error.details);
			return res.status(400).send({ message: error.details[0].message });
		}

		const stock = await StockData.findOne({
			stockName: req.body.stock.stockName.toUpperCase(),
		});
		if (stock)
			return res.status(409).send({ message: "Data already exists" });

		const crypto = await CryptoData.findOne({
			cryptoName: req.body.crypto.cryptoName.toLowerCase(),
		});
		if (crypto)
			return res.status(409).send({ message: "Data already exists" });

		await new StockData({ ...req.body.stock }).save();
		await new CryptoData({ ...req.body.crypto }).save();

		res.status(201).send({ message: "Data added successfull" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/crypto/:name", async (req, res) => {
	try {
		const cryptoData = await CryptoData.findOne({
			cryptoName: req.params.name.toLowerCase(),
		});
		console.log(cryptoData);
		return res.status(200).send({ cryptoData });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/stock/:name", async (req, res) => {
	try {
		const stockData = await StockData.findOne({
			stockName: req.params.name.toUpperCase(),
		});
		return res.status(200).send(stockData);
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
