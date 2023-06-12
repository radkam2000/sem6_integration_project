const { User, validate } = require("../models/User");
const bcrypt = require("bcrypt");
dbSingleton = require("../db");
const mongoose = require("mongoose");
const register = async (body) => {
	const session = await mongoose.startSession();
	try {
		session.startTransaction();
		const { error } = validate(body);
		if (error) return { status: 400, message: error.details[0].message };

		const user = await User.findOne({ email: body.email });

		if (user) {
			session.endSession();
			return {
				status: 409,
				message: "User with given email already Exist!",
			};
		}
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(body.password, salt);

		await new User({ ...body, password: hashPassword }).save();
		await session.commitTransaction();
		session.endSession();
		return { status: 200, message: "User created successfully" };
	} catch (error) {
		session.abortTransaction();
		session.endSession();
		throw error;
	}
};

const passwordChange = async (user, body) => {
	const session = await mongoose.startSession();
	try {
		session.startTransaction();
		const user = await User.findOne({ _id: user._id });
		const salt = await bcrypt.genSalt(Number(process.env.SALT));

		const isValid = await bcrypt.compare(body.oldPassword, user.password);
		if (isValid) {
			await session.abortTransaction();
			session.endSession();
			const hashNewPassword = await bcrypt.hash(body.newPassword, salt);
			user.password = hashNewPassword;
			await user.save();
			await session.commitTransaction();
			session.endSession();
			return { status: 200, message: "Password changed succesfully" };
		} else {
			await session.abortTransaction();
			session.endSession();
			return { status: 409, message: "Wrong old Password" };
		}
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		throw error;
	}
};

const deleteAccount = async (user, body) => {
	const session = await mongoose.startSession();
	try {
		session.startTransaction();
		const user = await User.findOne({ _id: user._id });

		const isValid = await bcrypt.compare(body.Password, user.password);
		if (isValid) {
			await User.deleteOne({ _id: user._id });
			await session.commitTransaction();
			session.endSession();
			return { redirect: true };
		} else {
			await session.abortTransaction();
			session.endSession();
			return {
				status: 409,
				message: "Wrong old Password",
				redirect: false,
			};
		}
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		throw error;
	}
};

const getAccountData = async (user) => {
	const session = await mongoose.startSession();
	try {
		session.startTransaction();
		const user = await User.findOne({ _id: user._id });
		await session.commitTransaction();
		session.endSession();
		return { status: 200, message: "Account Data", data: user };
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		throw error;
	}
};

module.exports = { register, passwordChange, deleteAccount, getAccountData };
