import { useState } from "react";
import "./App.css";
import axios from "axios";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";

function App() {
	const [stockData, setStockData] = useState([]);
	const [cryptoData, setCryptoData] = useState([]);
	const [pobrano, setPobrano] = useState(false);
	const handleGetData = async () => {
		try {
			const config = {
				method: "get",
				url: "http://localhost:5000/api/data_api",
				headers: { "Content-Type": "application/json" },
			};
			const { data: res } = await axios(config);
			setStockData(res.stock);
			setCryptoData(res.crypto);
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
	};
	const [isButtonClicked, setButtonClicked] = useState(false);

	var dates = [];
	var prices = [];
	const [size, setSize] = useState(0);
	const [chartData, setChartData] = useState({});
	const [chartData2, setChartData2] = useState({});
	const [totalRate, setTotalRate] = useState("0");
	const [averageRate, setAverageRate] = useState("0");
	const groupData = () => {
		console.log("cos223hgdghfds");
		// setSize(Object.values(cryptoData).length);
		// for (var i = 0; i < size; i += 365) {
		// 	dates.push(cryptoData[i][0]);
		// 	prices.push(cryptoData[i][1]);
		// }
		// setChartData({
		// 	labels: dates,
		// 	datasets: [
		// 		{
		// 			label: "Crypto prices",
		// 			data: prices,
		// 			backgroundColor: ["#9c92ac"],
		// 			borderColor: "#c5c5c5",
		// 			borderWidth: 2,
		// 			hoverBackgroundColor: "#ff9a00",
		// 		},
		// 	],
		// });
		chartDataOverDivider(cryptoData, 365, "Crypto prices");
		dates = [];
		prices = [];
		setSize(Object.values(stockData).length);
		for (var j = 0; j < size; j += 365) {
			dates.push(stockData[j][0]);
			prices.push(stockData[j][1]);
		}
		setChartData2({
			labels: dates,
			datasets: [
				{
					label: "Stock prices",
					data: prices,
					backgroundColor: ["#f5b1aa"],
					borderColor: "#c5c5c5",
					borderWidth: 2,
					hoverBackgroundColor: "#ff9a00",
				},
			],
		});
		setButtonClicked(true);
		// chartDataFromYear(stockData, "2020", "Stock data");
		// chartDataFromYearAndMonth(stockData, "2019", "04", "Stock data");
		chartDataFromChosenYears(stockData, "2018", "2020", "Stock data");
		setTotalRate(
			countTotalRateOfReturn(
				stockData[0][1],
				stockData[Object.values(stockData).length - 1][1]
			)
		);
	};
	function chartDataOverDivider(data, divider, label) {
		dates = [];
		prices = [];
		setSize(Object.values(data).length);
		for (var i = 0; i < size; i += divider) {
			dates.push(data[i][0]);
			prices.push(data[i][1]);
		}
		setChartData({
			labels: dates,
			datasets: [
				{
					label: label,
					data: prices,
					backgroundColor: ["#f5b1aa"],
					borderColor: "#c5c5c5",
					borderWidth: 2,
					hoverBackgroundColor: "#ff9a00",
				},
			],
		});
	}
	function chartDataFromYear(data, year, label) {
		dates = [];
		prices = [];
		setSize(Object.values(data).length);
		var splited = "";
		for (var i = 0; i < size; i++) {
			splited = data[i][0].split("-");
			if (splited[0] === year) {
				dates.push(data[i][0]);
				prices.push(data[i][1]);
			}
		}
		setChartData2({
			labels: dates,
			datasets: [
				{
					label: label + " - " + year,
					data: prices,
					backgroundColor: ["#f5b1aa"],
					borderColor: "#c5c5c5",
					borderWidth: 2,
					hoverBackgroundColor: "#ff9a00",
				},
			],
		});
	}
	function chartDataFromYearAndMonth(data, year, month, label) {
		dates = [];
		prices = [];
		setSize(Object.values(data).length);
		var splited = "";
		for (var i = 0; i < size; i++) {
			splited = data[i][0].split("-");
			if (splited[0] === year && splited[1] === month) {
				dates.push(data[i][0]);
				prices.push(data[i][1]);
			}
		}
		setChartData2({
			labels: dates,
			datasets: [
				{
					label: label + " - " + year,
					data: prices,
					backgroundColor: ["#f5b1aa"],
					borderColor: "#c5c5c5",
					borderWidth: 2,
					hoverBackgroundColor: "#ff9a00",
				},
			],
		});
	}
	function chartDataFromChosenYears(data, year1, year2, label) {
		dates = [];
		prices = [];
		setSize(Object.values(data).length);
		var splited = "";
		for (var i = 0; i < size; i++) {
			splited = data[i][0].split("-");
			if (splited[0] >= year1 && splited[0] <= year2) {
				dates.push(data[i][0]);
				prices.push(data[i][1]);
			}
		}
		setChartData2({
			labels: dates,
			datasets: [
				{
					label: label + ": " + year1 + "-" + year2,
					data: prices,
					borderColor: "#c5c5c5",
					borderWidth: 2,
					hoverBackgroundColor: "#ff9a00",
				},
			],
		});
	}
	//stopy
	function countAverageRateOfReturn(years, beginningValue, endValue) {
		return (endValue / beginningValue / (years - 1)) * 100 + "%";
	}
	function countTotalRateOfReturn(beginningValue, endValue) {
		return (endValue / (beginningValue - 1)) * 100 + "%";
	}
	var prices2 = [];
	const [chartData3, setChartData3] = useState({});
	function twoCharts(data1, data2, divider) {
		dates = [];
		prices = [];
		setSize(Object.values(data1).length);
		for (var i = 0; i < size; i += divider) {
			dates.push(data1[i][0]);
			prices.push(data1[i][1]);
		}
		setSize(Object.values(data2).length);
		for (var j = 0; j < size; j += divider) {
			prices2.push(data2[j][1]);
		}
		setChartData3({
			labels: dates,
			datasets: [
				{
					label: "Krypto",
					data: prices,
					backgroundColor: ["#f5b1aa"],
					borderColor: "#c5c5c5",
					borderWidth: 2,
					hoverBackgroundColor: "#ff9a00",
				},
				{
					label: "Giełda",
					data: prices2,
					backgroundColor: ["#f5b1aa"],
					borderColor: "#c5c5c5",
					borderWidth: 2,
					hoverBackgroundColor: "#ff9a00",
				},
			],
		});
	}
	const [button2, setButton2Clicked] = useState(false);
	const joinedCharts = () => {
		twoCharts(cryptoData, stockData, 150);
		setButton2Clicked(true);
	};
	return (
		<div className="App">
			<h1>Frontend</h1>
			<button onClick={handleGetData}>Pobierz dane</button>
			pobrano: {pobrano ? "tak" : "nie"}
			<p></p>
			<button onClick={groupData}>Pokaż wykresy</button>
			<div>
				<h4>Wykresy kryptowaluty</h4>
				{pobrano ? (
					isButtonClicked ? (
						<div style={{ width: 800 }}>
							<LineChart chartData={chartData} />
						</div>
					) : (
						"nie kliknięto"
					)
				) : (
					"nie pobrano danych"
				)}
			</div>
			<p></p>
			<div>
				<h4>Wykresy giełda</h4>
				{pobrano ? (
					isButtonClicked ? (
						<div style={{ width: 800 }}>
							<LineChart chartData={chartData2} />
						</div>
					) : (
						"nie kliknięto"
					)
				) : (
					"nie pobrano danych"
				)}
				<p>{totalRate}</p>
			</div>
			<button onClick={joinedCharts}>Pokaż wykresy połączone</button>
			<div>
				<h4>Wykresy połączone</h4>
				{pobrano ? (
					button2 ? (
						<div style={{ width: 800 }}>
							<LineChart chartData={chartData3} />
						</div>
					) : (
						"nie kliknięto"
					)
				) : (
					"nie pobrano danych"
				)}
			</div>
		</div>
	);
}

export default App;
