import React from "react";
import styles from "./styles.module.css";

const ChartOptions = (props) => {
	const {
		setStartDate,
		setEndDate,
		setInvestment,
		investment,
		cryptoName,
		stockName,
		setCryptoName,
		setStockName,
		startDate,
		endDate,
	} = props;
	return (
		<div className={styles.opt}>
			<div className={styles.opt_container}>
				<label htmlFor="startDate">Od: </label>
				<input
					className={styles.date}
					id="startDate"
					type="date"
					name="startDate"
					min="2013-01-01"
					max="2023-06-14"
					value={startDate}
					onChange={(e) => setStartDate(e.target.value)}
				/>
				<label htmlFor="endDate">Do: </label>
				<input
					className={styles.date}
					id="endDate"
					type="date"
					name="endDate"
					min="2013-01-01"
					max="2023-06-14"
					value={endDate}
					onChange={(e) => setEndDate(e.target.value)}
				/>
			</div>
			<div className={styles.opt_container}>
				<input
					className={styles.inputStyle_white}
					id="cryptoName"
					placeholder="Nazwa kryptowaluty"
					name="cryptoName"
					type="text"
					value={cryptoName}
					onChange={(e) => setCryptoName(e.target.value)}
				/>
				<input
					className={styles.inputStyle_white}
					id="stockName"
					placeholder="Nazwa indeksu"
					name="stockName"
					type="text"
					value={stockName}
					onChange={(e) => setStockName(e.target.value)}
				/>
			</div>
			<div className={styles.opt_container}>
				<label htmlFor="investment">Zainwestowana kwota: </label>
				<input
					className={styles.inputStyle_white}
					type="number"
					name="investment"
					id="investment"
					step="50"
					min="0"
					value={investment}
					onChange={(e) => setInvestment(e.target.value)}
				/>
			</div>
		</div>
	);
};
export default ChartOptions;
