function stockDataParser(json) {
	let tmpObservations = [];
	json.observations.forEach((element) => {
		if (element.hasOwnProperty("realtime_start")) {
			delete element["realtime_start"];
		}
		if (element.hasOwnProperty("realtime_end")) {
			delete element["realtime_end"];
		}
		tmpObservations.push([element["date"], parseFloat(element["value"])]);
	});

	const stockData = tmpObservations;
	const filledStockData = [];

	for (let i = 0; i < stockData.length; i++) {
		const currentDate = new Date(stockData[i][0]);
		const currentValue = stockData[i][1];

		if (isNaN(currentValue)) {
			const lastValidValue = findLastValidValue(stockData, i);
			filledStockData.push([formatDate(currentDate), lastValidValue]);
		} else {
			filledStockData.push([formatDate(currentDate), currentValue]);
		}

		if (i < stockData.length - 1) {
			const nextDate = new Date(stockData[i + 1][0]);
			const dateDiff = (nextDate - currentDate) / (1000 * 60 * 60 * 24);

			if (dateDiff > 1) {
				const lastPrice =
					filledStockData[filledStockData.length - 1][1];
				for (let j = 1; j < dateDiff; j++) {
					const missingDate = new Date(
						currentDate.getTime() + j * 24 * 60 * 60 * 1000
					);
					filledStockData.push([formatDate(missingDate), lastPrice]);
				}
			}
		}
	}

	return filledStockData;
}

function findLastValidValue(stockData, currentIndex) {
	for (let i = currentIndex - 1; i >= 0; i--) {
		const value = stockData[i][1];
		if (!isNaN(value)) {
			return value;
		}
	}
	return null; // If no valid value is found, return null or any desired default value
}

function formatDate(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

module.exports = stockDataParser;
