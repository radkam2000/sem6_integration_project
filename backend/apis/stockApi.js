const stockParser = require("../parsers/stockDataParser");
const getStockData = async () => {
	try {
		const res = await fetch(
			`https://api.stlouisfed.org/fred/series/observations?series_id=NASDAQ100&api_key=${process.env.STOCK_API_KEY}&file_type=json&observation_start=2013-04-29`
		);
		json = await res.json();
		return await stockParser(json);
	} catch (error) {
		console.error(error);
	}
};

module.exports = getStockData;
