const crypto = (name, data) => {
	const result = {
		crypto: {
			cryptoName: name,
			prices: [],
		},
	};

	for (const item of data) {
		const date = item[0];
		const price = item[1];

		result.crypto.prices.push({
			date,
			price,
		});
	}

	return result;
};

const stock = (name, data) => {
	const result = {
		stock: {
			stockName: name,
			prices: [],
		},
	};

	for (const item of data) {
		const date = item[0];
		const price = item[1];

		result.stock.prices.push({
			date,
			price,
		});
	}

	return result;
};

module.exports = { crypto, stock };
