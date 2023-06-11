import styles from "./styles.module.css";
const Nav = () => {
	//logout
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	return (
		<div className={styles.nav}>
			<button className={styles.nav_link} onClick={handleLogout}>
				Wyloguj się
			</button>
			<button className={styles.nav_link}>Zmień hasło</button>
			<button className={styles.nav_link}>Sczegóły konta</button>
		</div>
	);
};
export default Nav;
