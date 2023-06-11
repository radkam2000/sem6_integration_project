import { useState, useRef } from "react";
import axios from "axios";
import styles from "./styles.module.css";
const DataOptions = (props) => {
	const {
		setStockData,
		setCryptoData,
		setStockName,
		setCryptoName,
		stockData,
		cryptoData,
		setPobrano,
		chosenOptions,
		setStartDate,
		setEndDate,
	} = props;
	const [fileType, setFileType] = useState("xml");

	const handleGetData = async () => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const config = {
					method: "get",
					url: "http://localhost:5000/api/general/getData",
					headers: {
						"Content-Type": "application/json",
						"x-access-token": token,
					},
				};
				const { data: res } = await axios(config);
				setCryptoName(res.crypto.cryptoName.toUpperCase());
				setStockName(res.stock.stockName.toUpperCase());
				setStockData(res.stock.prices);
				setCryptoData(res.crypto.prices);
				setStartDate(res.startDate);
				setEndDate(res.endDate);
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
		}
	};
	const handleExport = async () => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const config = {
					method: "post",
					url: "http://localhost:5000/api/download/" + fileType,
					headers: { "x-access-token": token },
					responseType: "blob",
					data: chosenOptions,
				};
				const res = await axios(config);
				const url = window.URL.createObjectURL(new Blob([res.data]));
				const link = document.createElement("a");
				link.href = url;
				link.setAttribute("download", "data." + fileType);
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				window.URL.revokeObjectURL(url);
			} catch (error) {
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status <= 500
				) {
					window.location.reload();
				}
			}
		}
	};
	const inputFile = useRef(null);
	const chooseFile = async () => {
		inputFile.current.click();
	};
	const handleImport = async (file) => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const formData = new FormData();
				formData.append("file", file);
				const config = {
					method: "post",
					url: "http://localhost:5000/api/upload/" + fileType,
					headers: {
						"Content-Type": "multipart/form-data",
						"x-access-token": token,
					},
					data: formData,
				};
				const res = await axios(config);
				setCryptoName(res.crypto.cryptoName.toUpperCase());
				setStockName(res.stock.stockName);
				setStockData(res.stock.prices);
				setCryptoData(res.crypto.prices);
				setStartDate(res.startDate);
				setEndDate(res.endDate);
			} catch (error) {
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status <= 500
				) {
					window.location.reload();
				}
			}
		}
	};
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const extension = file.name.split(".").pop().toLowerCase();
			if (extension === fileType) {
				handleImport(file);
			} else {
				console.log(
					"Invalid file type. Select " + { fileType } + "type file."
				);
			}
		}
	};
	const saveToDB = async () => {};
	return (
		<div className={styles.options}>
			<h2 className={styles.margin}>Zarządzaj danymi</h2>
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
