const mongoose = require("mongoose");
const Joi = require("joi");

const priceWithDate = new mongoose.Schema({
	date: { type: Date },
	price: { type: Number },
});

const cryptoDataSchema = new mongoose.Schema({
	cryptoName: { type: String, required: true },
	prices: { type: [priceWithDate] },
});

const CryptoData = mongoose.model("CryptoData", cryptoDataSchema, "cryptoData");

const validateCryptoData = (data) => {
	const schema = Joi.object({
		cryptoName: Joi.string().required().label("Crypto name"),
		prices: Joi.array()
			.items(
				Joi.object({
					date: Joi.date(),
					price: Joi.number(),
				})
			)
			.label("Prices"),
	});
	return schema.validate(data);
};

module.exports = { CryptoData, validateCryptoData };
