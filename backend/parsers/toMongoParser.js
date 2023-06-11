const crypto = (inputData) => {
	const parsedData = {
		crypto: {
			cryptoName: inputData.crypto.cryptoName.toLowerCase(),
			prices: [],
		},
	};

	for (const price of inputData.crypto.prices) {
		const [date, value] = price;
		parsedData.crypto.prices.push({
			date: date,
			price: value,
		});
	}

	return parsedData;
};

const stock = (inputData) => {
	const parsedData = {
		stock: {
			stockName: inputData.stock.stockName.toUpperCase(),
			prices: [],
		},
	};

	for (const price of inputData.stock.prices) {
		const [date, value] = price;
		parsedData.stock.prices.push({
			date: date,
			price: value,
		});
	}

	return parsedData;
};

module.exports = { stock, crypto };
