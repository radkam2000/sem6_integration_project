const cryptoDataParser = (json) => {
	json.prices.forEach((element) => {
		tmpDate = new Date(element[0]);
		element[0] =
			tmpDate.getFullYear() +
			"-" +
			(tmpDate.getMonth() + 1 < 10
				? "0" + (tmpDate.getMonth() + 1)
				: tmpDate.getMonth() + 1) +
			"-" +
			(tmpDate.getDate() + 1 < 10
				? "0" + (tmpDate.getDate() + 1)
				: tmpDate.getDate() + 1);
	});
	return json.prices;
};

module.exports = cryptoDataParser;
