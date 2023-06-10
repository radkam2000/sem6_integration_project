const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, __dirname + "/../uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const uploads = multer({ storage: storage });

router.post("/json", uploads.single("file"), (req, res) => {
	try {
		res.status(200).send({ message: "File received succesfully" });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal server error" });
	}
});

router.post("/xml", uploads.single("file"), (req, res) => {
	try {
		res.status(200).send({ message: "File received succesfully" });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal server error" });
	}
});

module.exports = router;
