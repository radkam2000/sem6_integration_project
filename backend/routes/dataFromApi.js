const router = require("express").Router();
require("dotenv").config();
const jwt_auth = require("../middleware/jwt_auth");

const cryptoParser = require("../parsers/cryptoDataParser");
const stockParser = require("../parsers/stockDataParser");

const getStockData = async () => {
	try {
		const res = await fetch(
			`https://api.stlouisfed.org/fred/series/observations?series_id=NASDAQ100&api_key=${process.env.STOCK_API_KEY}&file_type=json&observation_start=2013-04-29`
		);
		json = await res.json();
		return await stockParser(json);
	} catch (error) {
		console.error(error);
	}
};

const getCryptoData = async () => {
	try {
		const res = await fetch(
			`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max`
		);
		json = await res.json();
		return await cryptoParser(json);
	} catch (error) {
		console.error(error);
	}
};

router.get("/", async (req, res) => {
	try {
		const stock = await getStockData();
		const crypto = await getCryptoData();
		res.status(200).send({
			stock: stock,
			crypto: crypto,
			message: "Data fetched successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
