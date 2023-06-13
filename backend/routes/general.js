const router = require("express").Router();
require("dotenv").config();
const jwt_auth = require("../middleware/jwt_auth");
const generalController = require("../controllers/GeneralActionController");
const dbController = require("../controllers/DatabaseDataController");
const uploadController = require("../controllers/UploadController");

router.get("/getData", async (req, res) => {
	try {
		result = await generalController.getData(
			"bitcoin",
			"NASDAQ100",
			"2018-01-01",
			"2023-01-01"
		);
		res.status(result.status).send({
			startDate: "2018-01-01",
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
				endDate:
					result.crypto.prices[result.crypto.prices.length - 1][0],
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
	}
});

router.post("/getData", async (req, res) => {
	try {
		if (
			req.body.cryptoName === "" ||
			req.body.stockName === "" ||
			req.body.startDate === "" ||
			req.body.endDate === ""
		)
			return res.status(500).send({ message: "Internal Server Error" });
		result = await generalController.getData(
			req.body.cryptoName.toLowerCase(),
			req.body.stockName.toUpperCase(),
			req.body.startDate,
			req.body.endDate
		);
		res.status(result.status).send({
			stock: { stockName: req.body.stockName, prices: result.stock },
			crypto: {
				cryptoName: req.body.cryptoName,
				prices: result.crypto,
			},
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
		try {
			result = await dbController.getData(
				req.body.stockName !== ""
					? req.body.stockName.toUpperCase()
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
					cryptoName: result.crypto.cryptoName,
					prices: result.crypto.prices,
				},
				startDate: result.crypto.prices[0][0],
				endDate:
					result.crypto.prices[result.crypto.prices.length - 1][0],
				cryptoRate: generalController.calculateReturnRate(
					result.crypto.prices[0][1],
					result.crypto.prices[result.crypto.prices.length - 1][1]
				),
				stockRate: generalController.calculateReturnRate(
					result.stock.prices[0][1],
					result.stock.prices[result.stock.prices.length - 1][1]
				),
				message: result.message + " from database",
			});
		} catch (error) {
			console.error(error);
			res.status(500).send({ message: "Internal Server Error" });
		}
	}
});

router.get("/getUploadDataXML", async (req, res) => {
	try {
		result = await uploadController.getUploadXML();
		res.status(200).send({
			stock: {
				stockName: result.stock.stockName,
				prices: result.stock.prices,
			},
			crypto: {
				cryptoName: result.crypto.cryptoName,
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
			message: "File received succesfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal server error" });
	}
});

router.get("/getUploadDataJSON", async (req, res) => {
	try {
		result = await uploadController.getUploadJSON();
		res.status(200).send({
			stock: {
				stockName: result.stock.stockName,
				prices: result.stock.prices,
			},
			crypto: {
				cryptoName: result.crypto.cryptoName,
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
			message: "File received succesfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal server error" });
	}
});

module.exports = router;
