import { useState } from "react";
import LineChart from "./LineChart";

const DividedChart = (props) => {
	const [chartData, setChartData] = useState({});
	var dates = [];
	var pricesC = [];
	var pricesS = [];
	const [size, setSize] = useState(0);
	function chartDataDivider(crypto, stock, divider) {
		dates = [];
		pricesC = [];
		pricesS = [];
		setSize(Object.values(crypto).length);
		for (var i = 0; i < size; i += divider) {
			dates.push(crypto[i][0]);
			pricesC.push(crypto[i][1]);
		}
		setSize(Object.values(stock).length);
		for (var j = 0; j < size; j += divider) {
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
			<h1>Wykres roczny</h1>
			<LineChart
				chartData={chartDataDivider(props.crypto, props.stock, 365)}
			/>
			<p></p>
			<h1>Wykres kwartalny</h1>
			<LineChart
				chartData={chartDataDivider(props.crypto, props.stock, 90)}
			/>
			<p></p>
			<h1>Wykres miesięczny</h1>
			<LineChart
				chartData={chartDataDivider(props.crypto, props.stock, 30)}
			/>
			<p></p>
			<h1>Wykres dniowy</h1>
			<LineChart
				chartData={chartDataDivider(props.crypto, props.stock, 1)}
			/>
			<p></p>
		</>
	);
};
export default DividedChart;
