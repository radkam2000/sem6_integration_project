const stockParser = require("../parsers/stockDataParser");
const getStockData = async (stockName) => {
	try {
		const res = await fetch(
			`https://api.stlouisfed.org/fred/series/observations?series_id=${stockName}&api_key=${process.env.STOCK_API_KEY}&file_type=json&observation_start=2013-04-29`
		);
		json = await res.json();
		return await stockParser(json);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

module.exports = getStockData;
