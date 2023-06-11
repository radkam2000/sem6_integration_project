const router = require("express").Router();
require("dotenv").config();
const jwt_auth = require("../middleware/jwt_auth");
const generalController = require("../controllers/GeneralActionController");

router.get("/getData", async (req, res) => {
	try {
		result = await generalController.getData(
			"bitcoin",
			"NASDAQ100",
			"2013-01-01",
			"2023-01-01"
		);
		res.status(result.status).send({
			startDate: "2013-01-01",
			endDate: "2023-01-01",
			stock: { stockName: req.body.stockName, prices: result.stock },
			crypto: { cryptoName: req.body.cryptoName, prices: result.crypto },
			message: result.message,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/getData", async (req, res) => {
	try {
		result = await generalController.getData(
			req.body.cryptoName.toLowerCase(),
			req.body.stockName.toUpperCase(),
			req.body.startDate,
			req.body.endDate
		);
		res.status(result.status).send({
			stock: { stockName: req.body.stockName, prices: result.stock },
			crypto: { cryptoName: req.body.cryptoName, prices: result.crypto },
			message: result.message,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/rate_of_return", async (req, res) => {});

module.exports = router;
