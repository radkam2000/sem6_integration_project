const router = require("express").Router();
require("dotenv").config();
const jwt_auth = require("../middleware/jwt_auth");
const generalController = require("../controllers/GeneralActionController");

router.get("/getData", async (req, res) => {
	try {
		result = await generalController.getData();
		res.status(result.status).send({
			stock: result.stock,
			crypto: result.crypto,
			message: result.message,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/rate_of_return", async (req, res) => {});

module.exports = router;
