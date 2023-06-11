import styles from "./styles.module.css";
const DataOptions = (
	handleGetData,
	setFileType,
	handleFileChange,
	chooseFile,
	handleExport,
	saveToDB,
	inputFile
) => {
	return (
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
					<label htmlFor="fileType">Plik</label>
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
						onChange={handleFileChange}
					/>
					<button className={styles.optionStyle} onClick={chooseFile}>
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
					<button onClick={saveToDB} className={styles.optionStyle}>
						Zapisz kopię do bazy danych
					</button>
				</p>
			</div>
		</div>
	);
};
export default DataOptions;
