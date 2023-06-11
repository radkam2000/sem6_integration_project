import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import LineChart from "./LineChart";
import axios from "axios";
const CustomCharts = (props) => {
	const {
		cryptoData,
		stockData,
		chosenOptions,
		pobrano,
		setShowCharts,
		showCharts,
		rate,
		setRate,
		setStockData,
		setCryptoData,
		setPobrano,
		setStockName,
		setCryptoName,
		stockName,
		cryptoName,
		setStartDate,
		setEndDate,
	} = props;
	const [chartData, setChartData] = useState({});
	var dates = [];
	var pricesC = [];
	var pricesS = [];
	const [size, setSize] = useState(0);
	const defaultChart = () => {
		dates = [];
		pricesC = [];
		pricesS = [];
		setSize(Object.values(cryptoData).length);
		for (var i = 0; i < size; i++) {
			dates.push(cryptoData[i][0]);
			pricesC.push(cryptoData[i][1]);
			pricesS.push(stockData[i][1]);
		}
		setChartData({
			labels: dates,
			datasets: [
				{
					label: cryptoName.toUpperCase(),
					data: pricesC,
					color: "#fff",
					backgroundColor: "#007ACC",
					borderColor: "#007ACC",
					borderWidth: 2,
					pointRadius: 0,
					hoverBackgroundColor: "#00ffff",
				},
				{
					label: stockName,
					data: pricesS,
					color: "#fff",
					backgroundColor: "#F47C7C",
					borderColor: "#F47C7C",
					borderWidth: 2,
					pointRadius: 0,
					hoverBackgroundColor: "#FF1493",
				},
			],
		});
		setShowCharts(true);
	};
	const handleChart = async () => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				console.log(chosenOptions);
				const config = {
					method: "post",
					url: "http://localhost:5000/api/general/getData",
					headers: {
						"Content-Type": "application/json",
						"x-access-token": token,
					},
					data: chosenOptions,
				};
				const { data: res } = await axios(config);
				setStockData(res.stock.prices);
				setCryptoData(res.crypto.prices);
				setStockName(res.stock.stockName.toUpperCase());
				setCryptoName(res.crypto.cryptoName.toUpperCase());
				setStartDate(res.startDate);
				setEndDate(res.endDate);
				if (stockData !== [] && cryptoData !== []) setPobrano(true);
			} catch (error) {
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status <= 500
				) {
					window.location.reload();
				}
			}
		}
	};
	useEffect(() => {
		defaultChart();
	}, [cryptoData, stockData]);

	// function isBetween(splited, splitedStart, splitedEnd) {
	// 	if (
	// 		splited[0] >= splitedStart[0] &&
	// 		splited[1] >= splitedStart[1] &&
	// 		splited[2] >= splitedStart[2] &&
	// 		splited[0] <= splitedEnd[0] &&
	// 		splited[1] <= splitedEnd[1] &&
	// 		splited[2] <= splitedEnd[2]
	// 	)
	// 		return true;
	// 	return false;
	// }
	// var splited = "";
	// const setupChart = (startDate, endDate) => {
	// 	//todo setRate, wysyłanie danych
	// 	let splitedStart = startDate.split("-");
	// 	let splitedEnd = endDate.split("-");
	// 	dates = [];
	// 	pricesC = [];
	// 	pricesS = [];
	// 	setSize(Object.values(cryptoData).length);
	// 	for (var i = 0; i < size; i++) {
	// 		splited = cryptoData[i][0].split("-");
	// 		if (isBetween(splited, splitedStart, splitedEnd)) {
	// 			dates.push(cryptoData[i][0]);
	// 			pricesC.push(cryptoData[i][1]);
	// 		}
	// 	}
	// 	setSize(Object.values(stockData).length);
	// 	for (var j = 0; j < size; j++) {
	// 		if (stockData[j][1] === null) stockData[j][1] = stockData[j - 1][1];
	// 		splited = stockData[j][0].split("-");
	// 		if (isBetween(splited, splitedStart, splitedEnd)) {
	// 			pricesS.push(stockData[j][1]);
	// 			console.log(stockData[j][1]);
	// 		}
	// 	}
	// 	setChartData({
	// 		labels: dates,
	// 		datasets: [
	// 			{
	// 				label: "Kryptowaluty",
	// 				data: pricesC,
	// 				borderColor: "#007ACC",
	// 				borderWidth: 2,
	// 				pointRadius: 0,
	// 				hoverBackgroundColor: "#FDB813",
	// 			},
	// 			{
	// 				label: "NASDAQ",
	// 				data: pricesS,
	// 				borderColor: "#F47C7C",
	// 				borderWidth: 2,
	// 				pointRadius: 0,
	// 				hoverBackgroundColor: "#FDB813",
	// 			},
	// 		],
	// 	});
	// 	setShowCharts(true);
	// };
	return (
		<div>
			<div className={styles.opt}>
				<div className={styles.opt_container}>
					<button
						className={styles.optionStyle}
						onClick={handleChart}
					>
						Pokaż
					</button>
				</div>
				<div className={styles.opt_container}>
					<label htmlFor="rate">Zysk: </label>
					<div className={styles.inputStyle_white}>{rate}</div>
				</div>
			</div>
			{pobrano && showCharts ? (
				<div>
					<div
						className={styles.center}
						style={{ width: 1600, height: 400 }}
					>
						<LineChart chartData={chartData} />
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
};
export default CustomCharts;
