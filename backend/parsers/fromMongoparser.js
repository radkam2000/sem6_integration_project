const crypto = (inputData) => {
	const convertedData = {
		crypto: {
			cryptoName: inputData.cryptoName,
			prices: [],
		},
	};

	for (const price of inputData.prices) {
		const { date, price: value } = price;
		const formattedDate = formatDate(date);
		convertedData.crypto.prices.push([formattedDate, value]);
	}

	return convertedData;
};

const stock = (inputData) => {
	const convertedData = {
		stock: {
			stockName: inputData.stockName,
			prices: [],
		},
	};

	for (const price of inputData.prices) {
		const { date, price: value } = price;
		const formattedDate = formatDate(date);
		convertedData.stock.prices.push([formattedDate, value]);
	}

	return convertedData;
};

const formatDate = (date) => {
	const year = date.getUTCFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const day = String(date.getUTCDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
};

module.exports = { stock, crypto };
