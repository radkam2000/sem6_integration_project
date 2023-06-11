import { useEffect, useState } from "react";
import Nav from "./Nav";
import DataOptions from "./DataOptions";
import ChartOptions from "./ChartOptions";
import CustomCharts from "./CustomCharts";
import styles from "./styles.module.css";

const Main = () => {
	const [cryptoRate, setCryptoRate] = useState("0");
	const [stockRate, setStockRate] = useState("0");
	const [stockData, setStockData] = useState([]);
	const [cryptoData, setCryptoData] = useState([]);
	const [cryptoName, setCryptoName] = useState("");
	const [stockName, setStockName] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [investment, setInvestment] = useState("");
	const [pobrano, setPobrano] = useState(false);
	const [showCharts, setShowCharts] = useState(false);
	const [cryptoGain, setCryptoGain] = useState("0");
	const [stockGain, setStockGain] = useState("0");

	const [chosenOptions, setChosenOptions] = useState({
		stockName,
		cryptoName,
		startDate,
		endDate,
	});
	useEffect(() => {
		setChosenOptions({
			stockName,
			cryptoName,
			startDate,
			endDate,
		});
	}, [stockName, cryptoName, startDate, endDate]);

	const setDataProps = {
		setCryptoRate,
		setStockRate,
		setStockData,
		setCryptoData,
		setCryptoName,
		setStockName,
		setStartDate,
		setEndDate,
		setInvestment,
		setPobrano,
		setShowCharts,
		setCryptoGain,
		setStockGain,
	};

	return (
		<div className="App">
			<Nav />
			<div className={styles.content}>
				<DataOptions
					setStockData={setStockData}
					setCryptoData={setCryptoData}
					setStockName={setStockName}
					setCryptoName={setCryptoName}
					stockData={stockData}
					cryptoData={cryptoData}
					setPobrano={setPobrano}
					chosenOptions={chosenOptions}
					setStartDate={setStartDate}
					setEndDate={setEndDate}
					setCryptoRate={setCryptoRate}
					setStockRate={setStockRate}
				/>
				<h2 className={styles.margin}>Zakres czasowy</h2>
				<ChartOptions
					setStartDate={setStartDate}
					setEndDate={setEndDate}
					setInvestment={setInvestment}
					chosenOptions={chosenOptions}
					setCryptoName={setCryptoName}
					setStockName={setStockName}
					investment={investment}
					cryptoName={cryptoName}
					stockName={stockName}
				/>
				<br />
				<br />
				<CustomCharts
					cryptoData={cryptoData}
					stockData={stockData}
					chosenOptions={chosenOptions}
					pobrano={pobrano}
					setShowCharts={setShowCharts}
					showCharts={showCharts}
					cryptoRate={cryptoRate}
					stockRate={stockRate}
					setCryptoRate={setCryptoRate}
					setStockRate={setStockRate}
					setStockData={setStockData}
					setCryptoData={setCryptoData}
					setPobrano={setPobrano}
					setStockName={setStockName}
					setCryptoName={setCryptoName}
					stockName={stockName}
					cryptoName={cryptoName}
					setStartDate={setStartDate}
					setEndDate={setEndDate}
					stockGain={stockGain}
					cryptoGain={cryptoGain}
					setCryptoGain={setCryptoGain}
					setStockGain={setStockGain}
					investment={investment}
				/>
			</div>
		</div>
	);
};
export default Main;
