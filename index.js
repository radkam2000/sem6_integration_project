require("dotenv").config();
const express = require("express");
const app = express();
const https = require("https");
app.get("/", (req, res) => {
	res.send("Aplikacja dziala");
});

const getStockData = () => {
	https.get(
		`https://api.stlouisfed.org/fred/series/observations?series_id=NASDAQ100&api_key=${process.env.STOCK_API_KEY}&file_type=json`,
		(res) => {
			let body = "";

			res.on("data", (chunk) => {
				body += chunk;
			});

			res.on("end", () => {
				try {
					let json = JSON.parse(body.prices);
					console.log(json);
					// do something with JSON
				} catch (error) {
					console.error(error.message);
				}
			});
		}
	);
};

const getCryptoData = () => {
	https.get(
		`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max`,
		(res) => {
			let body = "";

			res.on("data", (chunk) => {
				body += chunk;
			});

			res.on("end", () => {
				try {
					let json = JSON.parse(body);
					console.log(json.prices);
					// do something with JSON
				} catch (error) {
					console.error(error.message);
				}
			});
		}
	);
};

app.get("/data", (req, res) => {
	getCryptoData();
	res.send("Pobrano dane");
});

app.listen(process.env.PORT, () => {
	console.log(`Serwer nasłuchuje na porcie ${process.env.PORT}`);
});
