// function chartDataFromYearAndMonth(data, year, month, label) {
// 	dates = [];
// 	prices = [];
// 	setSize(Object.values(data).length);
// 	var splited = "";
// 	for (var i = 0; i < size; i++) {
// 		splited = data[i][0].split("-");
// 		if (splited[0] === year && splited[1] === month) {
// 			dates.push(data[i][0]);
// 			prices.push(data[i][1]);
// 		}
// 	}
import { useState } from "react";
import LineChart from "./LineChart";

const MonthChart = (props) => {
	const [chartData, setChartData] = useState({});
	var dates = [];
	var pricesC = [];
	var pricesS = [];
	const [size, setSize] = useState(0);
	var splited = "";
	function chartDataMonth(crypto, stock, year, month) {
		dates = [];
		pricesC = [];
		pricesS = [];
		setSize(Object.values(crypto).length);
		for (var i = 0; i < size; i++) {
			splited = crypto[i][0].split("-");
			if (splited[0] === year && splited[1] === month) {
				dates.push(crypto[i][0]);
				pricesC.push(crypto[i][1]);
			}
		}
		setSize(Object.values(stock).length);
		for (var j = 0; j < size; j += divider) {
			splited = stock[j][0].split("-");
			if (splited[0] === year && splited[1] === month)
				pricesS.push(stock[j][1]);
		}
		setChartData({
			labels: dates,
			datasets: [
				{
					label: "Kryptowaluty",
					data: pricesC,
					backgroundColor: ["#f5b1aa"],
					borderColor: "#c5c5c5",
					borderWidth: 2,
					hoverBackgroundColor: "#ff9a00",
				},
				{
					label: "Giełda",
					data: pricesS,
					backgroundColor: ["#f5b1aa"],
					borderColor: "#c5c5c5",
					borderWidth: 2,
					hoverBackgroundColor: "#ff9a00",
				},
			],
		});
		return chartData;
	}
	return (
		<>
			<h1>Wykres z kwietnia 2019</h1>
			<LineChart
				chartData={chartDataMonth(
					props.crypto,
					props.stock,
					"2019",
					"04"
				)}
			/>
		</>
	);
};
