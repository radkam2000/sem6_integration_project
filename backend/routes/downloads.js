const router = require("express").Router();
const jwt_auth = require("../middleware/jwt_auth");
downloadController = require("../controllers/DownloadController");

router.post("/xml", async (req, res) => {
	try {
		result = await downloadController.downloadXML(
			req.body.cryptoName.toLowerCase(),
			req.body.stockName.toUpperCase(),
			req.body.startDate,
			req.body.endDate
		);
		res.status(result.status).download(
			`${__dirname}/../downloads/data.xml`
		);
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.post("/json", async (req, res) => {
	try {
		result = await downloadController.downloadJSON(
			req.body.cryptoName.toLowerCase(),
			req.body.stockName.toUpperCase(),
			req.body.startDate,
			req.body.endDate
		);
		res.status(result.status).download(
			`${__dirname}/../downloads/data.json`
		);
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
