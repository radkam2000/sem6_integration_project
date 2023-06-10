import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/api/auth/login";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};
	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.center}>
					<form
						className={styles.form_container}
						onSubmit={handleSubmit}
					>
						<h1>Witaj z powrotem</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Hasło"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && (
							<div className={styles.error_msg}>{error}</div>
						)}
						<button type="submit" className={styles.btn}>
							Zaloguj się
						</button>
					</form>
				</div>
				<div className={styles.center2}>
					<div className={styles.padding}>
						Nie posiadasz jeszcze konta?
					</div>
					<Link to="/signup">
						<div className={styles.link}>Zarejestruj się</div>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default Login;
