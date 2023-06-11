const router = require("express").Router();
const jwt_auth = require("../middleware/jwt_auth");
downloadController = require("../controllers/DownloadController");

router.get("/xml", async (req, res) => {
	try {
		result = await downloadController.downloadXML();
		res.status(result.status).download(
			`${__dirname}/../downloads/data.xml`
		);
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/json", async (req, res) => {
	try {
		result = await downloadController.downloadJSON();
		res.status(result.status).download(
			`${__dirname}/../downloads/data.json`
		);
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
