import { useState } from "react";
import "./App.css";
import axios from "axios";
import LineChart from "./components/LineChart";
import { elements } from "chart.js";

function App() {
	const [stockData, setStockData] = useState([]);
	const [cryptoData, setCryptoData] = useState([]);
	const [pobrano, setPobrano] = useState(false);
	const [showCharts, setShowCharts] = useState(false);

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

	const [totalRate, setTotalRate] = useState("0");
	const [averageRate, setAverageRate] = useState("0");
	function countAverageRateOfReturn(years, beginningValue, endValue) {
		return (endValue / beginningValue / (years - 1)) * 100 + "%";
	}
	function countTotalRateOfReturn(beginningValue, endValue) {
		return (endValue / (beginningValue - 1)) * 100 + "%";
	}

	const [chartData, setChartData] = useState({});
	var dates = [];
	var pricesC = [];
	var pricesS = [];
	const [size, setSize] = useState(0);
	const chartDataDivider = () => {
		setShowCharts(true);
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
			pricesS.push(stockData[j][1]);
		}
		setChartData({
			labels: dates,
			datasets: [
				{
					label: "Kryptowaluty",
					data: pricesC,
					backgroundColor: ["#f5b1aa"],
					borderColor: "#ff0000",
					borderWidth: 2,
					pointRadius: 0,
					hoverBackgroundColor: "#ff9a00",
				},
				{
					label: "Giełda",
					data: pricesS,
					backgroundColor: ["#f5b1aa"],
					borderColor: "blue",
					borderWidth: 2,
					pointRadius: 0,
					hoverBackgroundColor: "#ff9a00",
				},
			],
		});
	};

	const [buttonM, setButtonM] = useState(false);
	const [chartData2, setChartData2] = useState({});
	var splited = "";
	const showM = () => {
		dates = [];
		pricesC = [];
		pricesS = [];
		setSize(Object.values(cryptoData).length);
		for (var i = 0; i < size; i++) {
			splited = cryptoData[i][0].split("-");
			if (splited[0] === "2019" && splited[1] === "06") {
				dates.push(cryptoData[i][0]);
				pricesC.push(cryptoData[i][1]);
			}
		}
		setSize(Object.values(stockData).length);
		for (var j = 0; j < size; j++) {
			splited = stockData[j][0].split("-");
			if (splited[0] === "2019" && splited[1] === "06")
				pricesS.push(stockData[j][1]);
		}
		setChartData2({
			labels: dates,
			datasets: [
				{
					label: "Kryptowaluty",
					data: pricesC,
					backgroundColor: ["#f5b1aa"],
					borderColor: "#ff0000",
					borderWidth: 2,
					pointRadius: 0,
					hoverBackgroundColor: "#ff9a00",
				},
				{
					label: "Giełda",
					data: pricesS,
					backgroundColor: ["#f5b1aa"],
					borderColor: "blue",
					borderWidth: 2,
					pointRadius: 0,
					hoverBackgroundColor: "#ff9a00",
				},
			],
		});
		setButtonM(true);
	};
	return (
		<div className="App">
			<button onClick={handleGetData}>Pobierz dane</button>
			pobrano: {pobrano ? "tak" : "nie"}
			<br />
			<button onClick={chartDataDivider}>Pokaż wykresy</button>
			{pobrano && showCharts ? (
				<div>
					<h1>Wykres roczny</h1>
					<p style={{ width: 800 }}>
						<LineChart chartData={chartData} />
					</p>
				</div>
			) : (
				"Nie pobrano danych"
			)}
			<button onClick={showM}>Pokaz</button>
			{pobrano && buttonM ? <LineChart chartData={chartData2} /> : ""}
		</div>
	);
}
export default App;
