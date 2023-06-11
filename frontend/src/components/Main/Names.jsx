import React from "react";
import styles from "./styles.module.css";

const Names = (props) => {
	const { setCryptoName, setStockName } = props;
	return (
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
		</div>
	);
};
export default Names;
