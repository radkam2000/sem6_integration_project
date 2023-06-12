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
		setCryptoGain,
		setStockGain,
		investment,
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
				setCryptoRate(res.cryptoRate.toFixed(2));
				setStockRate(res.stockRate.toFixed(2));
				props.notify(res.message);
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
		const loading = async () => {
			await defaultChart();
		};
		loading();
	}, [cryptoData, stockData]);
	useEffect(() => {
		setCryptoGain(((investment * cryptoRate) / 100).toFixed(2));
		setStockGain(((investment * stockRate) / 100).toFixed(2));
	});
	return (
		<div>
			<div className={styles.opt}>
				<div className={styles.opt_container}>
					<button
						className={styles.optionStyle_large}
						onClick={handleChart}
					>
						Pokaż
					</button>
				</div>
			</div>

			<div>
				{pobrano && showCharts ? (
					<div>
						<div>
							<div
								style={{
									width: 800,
									height: 400,
									margin: "auto",
								}}
							>
								<LineChart chartData={chartData} />
							</div>
						</div>
						<div
							className={styles.opt_container}
							style={{ marginLeft: "15px" }}
						>
							<label htmlFor="investment">
								Zainwestowana kwota (USD):{" "}
							</label>
							<input
								className={styles.inputStyle_white}
								type="number"
								name="investment"
								id="investment"
								step="50"
								min="0"
								value={investment}
								onChange={(e) =>
									props.setInvestment(e.target.value)
								}
							/>
						</div>
						<div className={styles.row}>
							<div className={styles.col_content}>
								<label htmlFor="stockGain">
									Zysk/strata z giełdy:{" "}
								</label>
								<div className={styles.inputStyle_white}>
									{stockGain}
								</div>
							</div>
							<div className={styles.col_content}>
								<label htmlFor="cryptoGain">
									Zysk/strata z kryptowaluty:
								</label>
								<div className={styles.inputStyle_white}>
									{cryptoGain}
								</div>
							</div>
							<div className={styles.col_content}>
								<label htmlFor="stockRate">
									Stopa zwrotu dla giełdy:{" "}
								</label>
								<div className={styles.inputStyle_white}>
									{stockRate + "%"}
								</div>
							</div>
							<div className={styles.col_content}>
								<label htmlFor="cryptoRate">
									Stopa zwrotu dla kryptowaluty:
								</label>
								<div className={styles.inputStyle_white}>
									{cryptoRate + "%"}
								</div>
							</div>
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
};
export default CustomCharts;
