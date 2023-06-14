const cryptoJSON = (data) => {
	const cryptoData = data.crypto.prices.map((item) => [
		item.date,
		item.price,
	]);
	return cryptoData;
};

const stockJSON = (data) => {
	const stockData = data.stock.prices.map((item) => [item.date, item.price]);
	return stockData;
};

const stockXML = (data) => {
	const stockData = data.stock.prices.map((item) => [
		item.date._text,
		item.price._text,
	]);
	return stockData;
};

const cryptoXML = (data) => {
	const cryptoData = data.crypto.prices.map((item) => [
		item.date._text,
		item.price._text,
	]);
	return cryptoData;
};

module.exports = { cryptoJSON, cryptoXML, stockJSON, stockXML };
