const router = require("express").Router();
require("dotenv").config();
const { User, validate } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt_auth = require("../middleware/jwt_auth");

router.get("/", jwt_auth, async (req, res) => {
	User.find()
		.exec()
		.then(async () => {
			const user = await User.find({ _id: req.user._id });
			//konfiguracja odpowiedzi res z przekazaniem listy użytkowników:
			res.status(200).send({
				data: user,
				message: "Account Data",
			});
			console.log(user);
		})
		.catch((error) => {
			res.status(500).send({ message: error.message });
		});
});

router.delete("/", jwt_auth, (req, res) => {
	User.find()
		.exec()
		.then(async () => {
			const user = await User.findOne({ _id: req.user._id });

			const isValid = await bcrypt.compare(
				req.body.Password,
				user.password
			);
			console.log(isValid);
			if (isValid) {
				await User.deleteOne({ _id: req.user._id });
				es.redirect("/");
			} else {
				res.status(409).send({ message: "Wrong old Password" });
			}
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send({ message: error.message });
		});
});

router.post("/password", jwt_auth, (req, res) => {
	User.find()
		.exec()
		.then(async () => {
			const user = await User.findOne({ _id: req.user._id });
			const salt = await bcrypt.genSalt(Number(process.env.SALT));

			const isValid = await bcrypt.compare(
				req.body.oldPassword,
				user.password
			);
			console.log(isValid);
			if (isValid) {
				const hashNewPassword = await bcrypt.hash(
					req.body.newPassword,
					salt
				);
				user.password = hashNewPassword;
				await user.save();
				res.status(200).send({
					message: "Password changed succesfully",
				});
			} else {
				res.status(409).send({ message: "Wrong old Password" });
			}
		})
		.catch((error) => {
			console.error(error);
			res.status(500).send({ message: error.message });
		});
});

router.post("/register", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });
		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
