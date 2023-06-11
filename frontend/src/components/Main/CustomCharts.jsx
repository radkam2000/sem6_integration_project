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
		cryptoRate,
		stockRate,
		setCryptoRate,
		setStockRate,
		setStockData,
		setCryptoData,
		setPobrano,
		setStockName,
		setCryptoName,
		stockName,
		cryptoName,
		setStartDate,
		setEndDate,
		stockGain,
		cryptoGain,
	} = props;
	const [chartData, setChartData] = useState({});
	var dates = [];
	var pricesC = [];
	var pricesS = [];
	const defaultChart = () => {
		dates = [];
		pricesC = [];
		pricesS = [];
		for (var i = 0; i < cryptoData.length; i++) {
			dates.push(cryptoData[i][0]);
			pricesC.push(cryptoData[i][1]);
		}
		for (var j = 0; j < stockData.length; j++) {
			pricesS.push(stockData[j][1]);
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
					label: stockName.toUpperCase(),
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
				setCryptoRate(res.cryptoRate);
				setStockRate(res.stockRate);
				if (stockData !== [] && cryptoData !== []) setPobrano(true);
				// defaultChart();
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
		const loading = async () => {
			await defaultChart();
		};
		loading();
	}, [cryptoData, stockData]);
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
			</div>
			<div className={styles.row}>
				{pobrano && showCharts ? (
					<div>
						<div style={{ width: 1200, height: 400 }}>
							<LineChart chartData={chartData} />
						</div>
					</div>
				) : (
					""
				)}
				<div className={styles.col}>
					<div className={styles.col_content}>
						<label htmlFor="stockGain">Zysk z akcji: </label>
						<div className={styles.inputStyle_white}>
							{stockGain}
						</div>
					</div>
					<div className={styles.col_content}>
						<label htmlFor="cryptoGain">Zysk z kryptowaluty:</label>
						<div className={styles.inputStyle_white}>
							{cryptoGain}
						</div>
					</div>
					<div className={styles.col_content}>
						<label htmlFor="stockRate">
							Stopa zwrotu dla akcji:{" "}
						</label>
						<div className={styles.inputStyle_white}>
							{stockRate}
						</div>
					</div>
					<div className={styles.col_content}>
						<label htmlFor="cryptoRate">
							Stopa zwrotu dla kryptowaluty:
						</label>
						<div className={styles.inputStyle_white}>
							{cryptoRate}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CustomCharts;
