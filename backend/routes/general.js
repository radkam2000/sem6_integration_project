const router = require("express").Router();
require("dotenv").config();
const jwt_auth = require("../middleware/jwt_auth");
const generalController = require("../controllers/GeneralActionController");

router.get("/getData", async (req, res) => {
	try {
		result = await generalController.getData(
			"bitcoin",
			"NASDAQ100",
			"2013-04-29",
			"2023-01-01"
		);
		res.status(result.status).send({
			startDate: "2013-04-29",
			endDate: "2023-01-01",
			stock: { stockName: "NASDAQ100", prices: result.stock },
			crypto: { cryptoName: "bitcoin", prices: result.crypto },
			cryptoRate: generalController.calculateReturnRate(
				result.crypto[0][1],
				result.crypto[result.crypto.length - 1][1]
			),
			stockRate: generalController.calculateReturnRate(
				result.stock[0][1],
				result.stock[result.stock.length - 1][1]
			),
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
		console.log(result);
		res.status(result.status).send({
			stock: { stockName: req.body.stockName, prices: result.stock },
			crypto: { cryptoName: req.body.cryptoName, prices: result.crypto },
			startDate: result.crypto[0][0],
			endDate: result.crypto[result.crypto.length - 1][0],
			cryptoRate: generalController.calculateReturnRate(
				result.crypto[0][1],
				result.crypto[result.crypto.length - 1][1]
			),
			stockRate: generalController.calculateReturnRate(
				result.stock[0][1],
				result.stock[result.stock.length - 1][1]
			),
			message: result.message,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/rate_of_return", async (req, res) => {});

module.exports = router;
