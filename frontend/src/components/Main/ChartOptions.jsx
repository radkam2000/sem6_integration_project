import React from "react";
import styles from "./styles.module.css";

const ChartOptions = (props) => {
	const { setStartDate, setEndDate, setInvestment } = props;
	return (
		<div className={styles.opt}>
			<div className={styles.opt_container}>
				<label htmlFor="startDate">Od: </label>
				<input
					id="startDate"
					type="date"
					name="startDate"
					min="2013-01-01"
					max="2023-06-14"
					onChange={(e) => setStartDate(e.target.value)}
				/>
				<label htmlFor="endDate">Do: </label>
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
				<label htmlFor="investment">Zainwestowana kwota: </label>
				<input
					type="number"
					name="investment"
					id="investment"
					step="50"
					min="0"
					onChange={(e) => setInvestment(e.target.value)}
				/>
			</div>
		</div>
	);
};
export default ChartOptions;
