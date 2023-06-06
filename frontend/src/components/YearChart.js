import { useState } from "react";
import LineChart from "./LineChart";
const YearChart = (props) => {
	const [chartData, setChartData] = useState({});
	var dates = [];
	var pricesC = [];
	var pricesS = [];
	const [size, setSize] = useState(0);
	var splited = "";
	function chartDataYear(crypto, stock, year) {
		var dates = [];
		var pricesC = [];
		var pricesS = [];
		setSize(Object.values(crypto).length);
		for (var i = 0; i < size; i++) {
			splited = crypto[i][0].split("-");
			if (splited[0] === year) {
				dates.push(crypto[i][0]);
				pricesC.push(crypto[i][1]);
			}
		}
		setSize(Object.values(stock).length);
		for (var j = 0; j < size; j += divider) {
			splited = stock[j][0].split("-");
			if (splited[0] === year) pricesS.push(stock[j][1]);
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
			<h1>Wykres z 2020 roku</h1>
			<LineChart
				chartData={chartDataYear(props.crypto, props.stock, "2020")}
			/>
		</>
	);
};
