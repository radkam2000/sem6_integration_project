import { useEffect, useState, useRef } from "react";
import axios from "axios";
import LineChart from "./LineChart";
import { elements, layouts } from "chart.js";
import DividedChart from "./DividedChart";
import Nav from "./Nav";
import styles from "./styles.module.css";

const Main = () => {
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
	function isBetween(splited, splitedStart, splitedEnd) {
		if (
			splited[0] >= splitedStart[0] &&
			splited[1] >= splitedStart[1] &&
			splited[2] >= splitedStart[2] &&
			splited[0] <= splitedEnd[0] &&
			splited[1] <= splitedEnd[1] &&
			splited[2] <= splitedEnd[2]
		)
			return true;
		return false;
	}
	const [buttonM, setButtonM] = useState(false);
	const [chartData2, setChartData2] = useState({});
	var splited = "";
	const showM = () => {
		let splitedStart = startDate.split("-");
		let splitedEnd = endDate.split("-");
		dates = [];
		pricesC = [];
		pricesS = [];
		setSize(Object.values(cryptoData).length);
		for (var i = 0; i < size; i++) {
			splited = cryptoData[i][0].split("-");
			if (isBetween(splited, splitedStart, splitedEnd)) {
				dates.push(cryptoData[i][0]);
				pricesC.push(cryptoData[i][1]);
			}
		}
		setSize(Object.values(stockData).length);
		for (var j = 0; j < size; j++) {
			if (stockData[j][1] === null) stockData[j][1] = stockData[j - 1][1];
			splited = stockData[j][0].split("-");
			if (isBetween(splited, splitedStart, splitedEnd)) {
				pricesS.push(stockData[j][1]);
				console.log(stockData[j][1]);
			}
		}
		setChartData2({
			labels: dates,
			datasets: [
				{
					label: "Kryptowaluty",
					data: pricesC,
					borderColor: "#007ACC",
					borderWidth: 2,
					pointRadius: 0,
					hoverBackgroundColor: "#FDB813",
				},
				{
					label: "Giełda",
					data: pricesS,
					borderColor: "#F47C7C",
					borderWidth: 2,
					pointRadius: 0,
					hoverBackgroundColor: "#FDB813",
				},
			],
		});
		setButtonM(true);
	};
	const [cryptoName, setCryptoName] = useState("");
	const [stockName, setStockName] = useState("");
	const sendNames = async (req, res) => {
		const data = { cryptoName: cryptoName, stockName: stockName };
		console.log(data);
		try {
			const response = await axios.post("http://localhost:5000/", data);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};
	const inputFile = useRef(null);
	const chooseFile = () => {
		inputFile.current.click();
	};
	const [fileType, setFileType] = useState("xml");
	const handleExport = async () => {
		try {
			const config = {
				method: "get",
				url: "http://localhost:5000/api/download/" + { fileType },
			};
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
	const saveToDB = async () => {};
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	return (
		<div className="App">
			<Nav />
			<div>
				<div className={styles.options}>
					<h2>Zarządzaj danymi</h2>
					<div className={styles.opt}>
						<p className={styles.opt_container}>
							<label>API</label>
							<button
								className={styles.optionStyle}
								onClick={handleGetData}
							>
								Pobierz dane
							</button>
						</p>
						<p className={styles.opt_container}>
							<label for="fileType">Plik</label>
							<select
								className={styles.selectStyle}
								id="fileType"
								onChange={(e) => setFileType(e.target.value)}
							>
								<option value="xml">XML</option>
								<option value="json">JSON</option>
							</select>
							<input
								type="file"
								id="file"
								ref={inputFile}
								style={{ display: "none" }}
							/>
							<button
								className={styles.optionStyle}
								onClick={chooseFile}
							>
								Importuj
							</button>
							<button
								className={styles.optionStyle}
								onClick={handleExport}
							>
								Eksportuj
							</button>
						</p>
						<p className={styles.opt_container}>
							<button
								onClick={saveToDB}
								className={styles.optionStyle}
							>
								Zapisz kopię do bazy danych
							</button>
						</p>
					</div>
				</div>
				<h2>Zakres czasowy</h2>
				<div className={styles.opt}>
					<div className={styles.opt_container}>
						<label for="startDate">Od: </label>
						<input
							id="startDate"
							type="date"
							name="startDate"
							min="2013-01-01"
							max="2023-06-14"
							onChange={(e) => setStartDate(e.target.value)}
						/>
						<label for="endDate">Do: </label>
						<input
							id="endDate"
							type="date"
							name="endDate"
							min="2013-01-01"
							max="2023-06-14"
							onChange={(e) => setEndDate(e.target.value)}
						/>
					</div>
					<div className={styles.opt_container}>
						<label for="investment">Zainwestowana kwota: </label>
						<input
							type="number"
							name="investment"
							id="investment"
							step="50"
							min="0"
						/>
					</div>
				</div>
				<br />
				<div className={styles.opt_container}>
					<h4>Wybierz swoje waluty</h4>
					<input
						className={styles.inputStyle}
						id="cryptoName"
						placeholder="Nazwa kryptowaluty"
						name="cryptoName"
						type="text"
						onChange={(e) => setCryptoName(e.target.value)}
					/>
					<input
						className={styles.inputStyle}
						id="stockName"
						placeholder="Nazwa indeksu"
						name="stockName"
						type="text"
						onChange={(e) => setStockName(e.target.value)}
					/>
					<button className={styles.optionStyle} onClick={sendNames}>
						Pokaż
					</button>
				</div>
				<br />
				<br />
				<button
					className={styles.optionStyle}
					onClick={chartDataDivider}
				>
					Pokaż
				</button>
			</div>
			{/* lalalal */}
			{/* pobrano: {pobrano ? "tak" : "nie"}
			<br /> */}
			{/* <button className={styles.optionStyle} onClick={chartDataDivider}>
				Pokaż wykresy
			</button> */}
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
				"Nie pobrano danych"
			)}
			{/* <button className={styles.optionStyle} onClick={showM}>
				Pokaz
			</button>
			{pobrano && buttonM ? <LineChart chartData={chartData2} /> : ""}
			<DividedChart crypto={cryptoData} stock={stockData} /> */}
		</div>
	);
};
export default Main;