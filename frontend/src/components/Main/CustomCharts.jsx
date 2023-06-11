import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import LineChart from "./LineChart";
const CustomCharts = (props) => {
	const {
		cryptoData,
		stockData,
		chosenOptions,
		pobrano,
		setShowCharts,
		showCharts,
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
		for (var i = 0; i < size; i += 365) {
			dates.push(cryptoData[i][0]);
			pricesC.push(cryptoData[i][1]);
		}
		setSize(Object.values(stockData).length);
		for (var j = 0; j < size; j += 365) {
			if (stockData[j][1] === null) stockData[j][1] = stockData[j - 1][1];
			pricesS.push(stockData[j][1]);
		}
		setChartData({
			labels: dates,
			datasets: [
				{
					label: "Kryptowaluty",
					data: pricesC,
					color: "#fff",
					backgroundColor: "#007ACC",
					borderColor: "#007ACC",
					borderWidth: 2,
					pointRadius: 0,
					hoverBackgroundColor: "#00ffff",
				},
				{
					label: "Giełda",
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
	useEffect(() => {
		defaultChart();
	}, [cryptoData, stockData]);
	return (
		<div>
			<button className={styles.optionStyle} onClick={defaultChart}>
				Pokaż
			</button>
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
