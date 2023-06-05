const mongoose = require("mongoose");
const Joi = require("joi");

const priceWithDate = new mongoose.Schema({
	date: { type: Date },
	price: { type: Float },
});

const stockDataSchema = new mongoose.Schema({
	stockName: { type: String, required: true },
	prices: { type: [priceWithDate] },
});

const StockData = mongoose.model("StockData", stockDataSchema, "stockData");

const validateStockData = (data) => {
	const schema = Joi.object({
		stockName: Joi.string().required().label("Crypto name"),
		prices: Joi.array()
			.items(
				Joi.object.keys({
					date: Joi.Date(),
					price: Joi.Number(),
				})
			)
			.label("Prices"),
	});
};

module.exports = { StockData, validateStockData };
