const { User, validate } = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (body) => {
	try {
		const { error } = validate(body);
		if (error) return { status: 400, message: error.details[0].message };
		const user = await User.findOne({ email: body.email });
		if (user)
			return {
				status: 409,
				message: "User with given email already Exist!",
			};
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(body.password, salt);
		await new User({ ...body, password: hashPassword }).save();
		return { status: 200, message: "User created successfully" };
	} catch (error) {
		throw error;
	}
};

const passwordChange = async (user, body) => {
	try {
		const user = await User.findOne({ _id: user._id });
		const salt = await bcrypt.genSalt(Number(process.env.SALT));

		const isValid = await bcrypt.compare(body.oldPassword, user.password);
		console.log(isValid);
		if (isValid) {
			const hashNewPassword = await bcrypt.hash(body.newPassword, salt);
			user.password = hashNewPassword;
			await user.save();
			return { status: 200, message: "Password changed succesfully" };
		} else {
			return { status: 409, message: "Wrong old Password" };
		}
	} catch (error) {
		throw error;
	}
};

const deleteAccount = async (user, body) => {
	try {
		const user = await User.findOne({ _id: user._id });

		const isValid = await bcrypt.compare(body.Password, user.password);
		console.log(isValid);
		if (isValid) {
			await User.deleteOne({ _id: user._id });
			return { redirect: true };
		} else {
			return {
				status: 409,
				message: "Wrong old Password",
				redirect: false,
			};
		}
	} catch (error) {
		throw error;
	}
};

const getAccountData = async (user) => {
	try {
		const user = await User.findOne({ _id: user._id });
		return { status: 200, message: "Account Data", data: user };
	} catch (error) {
		throw error;
	}
};

module.exports = { register, passwordChange, deleteAccount, getAccountData };
