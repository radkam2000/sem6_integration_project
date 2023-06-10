const getCryptoData = require("../apis/cryptoApi");
const getStockData = require("../apis/stockApi");

const calculateReturnRate = (startDate, endDate) => {};

const calculateReturnRateFromValue = (value, startDate, EndDate) => {};

const getData = async () => {
	try {
		const stock = await getStockData();
		const crypto = await getCryptoData();
		return {
			status: 200,
			crypto: crypto,
			stock: stock,
			message: "Data fetched successfully",
		};
	} catch (error) {
		throw error;
	}
};

module.exports = { getData };
