const userController = require("../controllers/UserController");
const router = require("express").Router();
const jwt_auth = require("../middleware/jwt_auth");

router.get("/", jwt_auth, async (req, res) => {
	try {
		result = await userController.getAccountData(req.user);
		res.status(result.status).send({
			message: result.message,
			data: result.data,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: error.message });
	}
});

router.delete("/", jwt_auth, async (req, res) => {
	try {
		const result = await userController.deleteAccount(req.user, req.body);
		if (result.redirect) {
			res.redirect("/");
		}
		res.status(result.status).send({ message: result.message });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: error.message });
	}
});

router.post("/password", jwt_auth, async (req, res) => {
	try {
		result = await userController.passwordChange(req.user, req.body);
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: error.message });
	}
});

router.post("/register", async (req, res) => {
	try {
		result = await userController.register(req.body);
		res.status(result.status).send({ message: result.message });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
