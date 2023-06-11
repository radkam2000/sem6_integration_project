const mongoose = require("mongoose");
const Joi = require("joi");

const priceWithDate = new mongoose.Schema({
	date: { type: Date },
	price: { type: Number },
});

const stockDataSchema = new mongoose.Schema({
	stockName: { type: String, required: true },
	prices: { type: [priceWithDate] },
});

const StockData = mongoose.model("StockData", stockDataSchema, "stockData");

const validateStockData = (data) => {
	const schema = Joi.object({
		stockName: Joi.string().required().label("Stock name"),
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

module.exports = { StockData, validateStockData };
