const router = require("express").Router();
const multer = require("multer");

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
	res.status(200).send({
		message: "File received succesfully",
	});
});

router.post("/xml", uploads.single("file"), async (req, res) => {
	res.status(200).send({
		message: "File received succesfully",
	});
});

module.exports = router;
