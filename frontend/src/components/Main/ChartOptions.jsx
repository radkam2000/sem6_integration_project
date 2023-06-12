import React from "react";
import styles from "./styles.module.css";

const ChartOptions = (props) => {
	const {
		setStartDate,
		setEndDate,
		cryptoName,
		stockName,
		setCryptoName,
		setStockName,
		startDate,
		endDate,
	} = props;
	return (
		<div className={styles.opt}>
			<div className={styles.row}>
				<div className={styles.opt_container}>
					<label htmlFor="startDate">Od: </label>
					<input
						className={styles.date}
						id="startDate"
						type="date"
						name="startDate"
						min="2018-01-01"
						max="2023-06-14"
						value={startDate}
						onChange={(e) => {
							setStartDate(e.target.value);
						}}
					/>
					<label htmlFor="endDate">Do: </label>
					<input
						className={styles.date}
						id="endDate"
						type="date"
						name="endDate"
						min="2018-01-01"
						max="2023-06-14"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
					/>
				</div>
				<div style={{ width: "100px" }}></div>
				<div className={styles.opt_container}>
					{/* <input
					className={styles.inputStyle_white}
					id="cryptoName"
					placeholder="Nazwa kryptowaluty"
					name="cryptoName"
					type="text"
					value={cryptoName}
					onChange={(e) => setCryptoName(e.target.value)}
				/> */}
					<select
						className={styles.inputStyle_white}
						id="cryptoName"
						placeholder="Nazwa kryptowaluty"
						name="cryptoName"
						type="text"
						value={cryptoName}
						onChange={(e) => setCryptoName(e.target.value)}
					>
						<option value="BITCOIN">BITCOIN</option>
						<option value="ETHEREUM">ETHEREUM</option>
						<option value="MONERO">MONERO</option>
						<option value="CARDANO">CARDANO</option>
						<option value="SOLANA">SOLANA</option>
					</select>
					<select
						className={styles.inputStyle_white}
						id="stockName"
						placeholder="Nazwa indeksu"
						name="stockName"
						type="text"
						value={stockName}
						onChange={(e) => setStockName(e.target.value)}
					>
						<option value="NASDAQ100">NASDAQ100</option>
						<option value="SP500">SP&500</option>
						<option value="RVXCLS">RUSSELL2000</option>
						<option value="DJIA">Dow Jones Industrial</option>
						<option value="NASDAQCOM">NASDAQ COMPOSITE</option>
					</select>
				</div>
			</div>
		</div>
	);
};
export default ChartOptions;
