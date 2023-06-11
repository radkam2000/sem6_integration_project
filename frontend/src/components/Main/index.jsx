import { useEffect, useState } from "react";
import Nav from "./Nav";
import DataOptions from "./DataOptions";
import ChartOptions from "./ChartOptions";
import Names from "./Names";
import CustomCharts from "./CustomCharts";
import styles from "./styles.module.css";

const Main = () => {
	const [rate, setRate] = useState("0");

	const [stockData, setStockData] = useState([]);
	const [cryptoData, setCryptoData] = useState([]);
	const [cryptoName, setCryptoName] = useState("");
	const [stockName, setStockName] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [investment, setInvestment] = useState("");
	const [pobrano, setPobrano] = useState(false);
	const [showCharts, setShowCharts] = useState(false);

	const [chosenOptions, setChosenOptions] = useState({
		stockName,
		cryptoName,
		startDate,
		endDate,
		investment,
	});
	useEffect(() => {
		setChosenOptions({
			stockName,
			cryptoName,
			startDate,
			endDate,
			investment,
		});
	}, [stockName, cryptoName, startDate, endDate, investment]);

	return (
		<div className="App">
			<Nav />
			<div className={styles.content}>
				<DataOptions
					setStockData={setStockData}
					setCryptoData={setCryptoData}
					stockData={stockData}
					cryptoData={cryptoData}
					setPobrano={setPobrano}
					chosenOptions={chosenOptions}
				/>
				<h2 className={styles.margin}>Zakres czasowy</h2>
				<ChartOptions
					setStartDate={setStartDate}
					setEndDate={setEndDate}
					setInvestment={setInvestment}
					chosenOptions={chosenOptions}
				/>
				<br />
				<Names
					setCryptoName={setCryptoName}
					setStockName={setStockName}
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
				/>
			</div>
		</div>
	);
};
export default Main;
