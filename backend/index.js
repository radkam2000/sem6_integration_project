require("dotenv").config();
const express = require("express");
const app = express();
app.get("/", (req, res) => {
	res.send("Aplikacja dziala");
});

let cryptoDataAfterParsing;
let stockDataAfterParsing;

const getStockData = () => {
	fetch(
		`https://api.stlouisfed.org/fred/series/observations?series_id=NASDAQ100&api_key=${process.env.STOCK_API_KEY}&file_type=json`
	)
		.then((res) => res.json())
		.then((json) => {
			let tmpObservations = [];
			json.observations.forEach((element) => {
				if (element.hasOwnProperty("realtime_start")) {
					delete element["realtime_start"];
				}
				if (element.hasOwnProperty("realtime_end")) {
					delete element["realtime_end"];
				}
				tmpObservations.push([
					element["date"],
					parseFloat(element["value"]),
				]);
			});
			stockDataAfterParsing = tmpObservations;
			console.log(stockDataAfterParsing);
		});
};

const getCryptoData = () => {
	fetch(
		`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max`
	)
		.then((res) => res.json())
		.then((json) => {
			json.prices.forEach((element) => {
				tmpDate = new Date(element[0]);
				element[0] =
					tmpDate.getFullYear() +
					"-" +
					(tmpDate.getMonth() + 1 < 10
						? "0" + (tmpDate.getMonth() + 1)
						: tmpDate.getMonth() + 1) +
					"-" +
					tmpDate.getDate();
			});
			cryptoDataAfterParsing = json.prices;
			console.log(cryptoDataAfterParsing);
		});
};

app.get("/data", (req, res) => {
	getStockData();
	getCryptoData();
	res.send("Pobrano dane");
});

app.listen(process.env.PORT, () => {
	console.log(`Serwer nasłuchuje na porcie ${process.env.PORT}`);
});
