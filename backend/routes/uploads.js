const router = require("express").Router();
const multer = require("multer");
const uploadController = require("../controllers/UploadController");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, __dirname + "/../uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, "data");
	},
});

const uploads = multer({ storage: storage });

router.post("/json", uploads.single("file"), async (req, res) => {
	try {
		result = await uploadController.JSONupload();
		res.status(200).send({
			stock: {
				stockName: req.body.stockName.toUppercase(),
				prices: result.stock,
			},
			crypto: {
				cryptoName: req.body.cryptoName.toLowerCase(),
				prices: result.crypto,
			},
			message: "File received succesfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal server error" });
	}
});

router.post("/xml", uploads.single("file"), async (req, res) => {
	try {
		result = await uploadController.XMLupload();
		res.status(200).send({
			stock: {
				stockName: req.body.stockName.toUpperCase(),
				prices: result.stock,
			},
			crypto: {
				cryptoName: req.body.cryptoName.toLowerCase(),
				prices: result.crypto,
			},
			message: "File received succesfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal server error" });
	}
});

module.exports = router;
