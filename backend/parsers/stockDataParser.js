const stockDataParser = (json) => {
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
	return tmpObservations;
};

module.exports = stockDataParser;
