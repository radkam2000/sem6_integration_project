const getCryptoData = require("../apis/cryptoApi");
const getStockData = require("../apis/stockApi");

const calculateReturnRate = (startDate, endDate) => {};

const calculateReturnRateFromValue = (value, startDate, EndDate) => {};

const getData = async (cryptoName, stockName, startDate, endDate) => {
	try {
		const stock = await getStockData(stockName);
		const crypto = await getCryptoData(cryptoName);

		filtered_stock = stock.filter((item) => {
			const currentDate = new Date(item[0]);
			const startDateObj = new Date(startDate);
			const endDateObj = new Date(endDate);
			return currentDate >= startDateObj && currentDate <= endDateObj;
		});

		filtered_crypto = crypto.filter((item) => {
			const currentDate = new Date(item[0]);
			const startDateObj = new Date(startDate);
			const endDateObj = new Date(endDate);
			return currentDate >= startDateObj && currentDate <= endDateObj;
		});

		return {
			status: 200,
			crypto: filtered_crypto,
			stock: filtered_stock,
			message: "Data fetched successfully",
		};
	} catch (error) {
		throw error;
	}
};

module.exports = { getData };
