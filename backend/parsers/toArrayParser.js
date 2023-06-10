const crypto = (data) => {
	const result = {
		crypto: [],
	};

	for (const item of data.prices) {
		const date = item.date;
		const price = item.price;

		result.crypto.push([date, price]);
	}

	return result;
};

const stock = (data) => {
	const result = {
		stock: [],
	};

	for (const item of data.prices) {
		const date = item.date;
		const price = item.price;

		result.stock.push([date, price]);
	}

	return result;
};

module.exports = { stock, crypto };
