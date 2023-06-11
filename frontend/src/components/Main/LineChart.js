import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
	const options = {
		plugins: {
			legend: {
				labels: {
					color: "white",
				},
			},
			tooltip: {
				titleColor: "white",
				bodyColor: "white",
			},
			title: {
				display: true,
				text: "Kryptowaluty a Giełda",
				color: "white",
			},
		},
		scales: {
			x: {
				ticks: {
					color: "white",
				},
			},
			y: {
				title: {
					display: true,
					text: "USD",
					color: "white",
				},
				ticks: {
					color: "white",
				},
			},
		},
	};
	return <Line data={chartData} options={options} />;
}
export default LineChart;
