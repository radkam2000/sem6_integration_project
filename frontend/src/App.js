import { useState } from "react";
import "./App.css";
import Test from "./components/Test";
import { CryptoData } from "./CryptoData";
import BarChart from "./components/BarChart";

function App() {
    const [testData, setTestData] = useState(CryptoData);
    const size = Object.values(testData).length;
    const [dates, setDates] = useState([]);
    const [prices, setPrices] = useState([]);
    for (var i = 0; i < 10; i++) {
        dates.push(testData[i][0]);
        prices.push(testData[i][1]);
    }
    const [chartData, setChartData] = useState({
        labels: dates,
        datasets: [
            {
                label: "Price",
                data: prices,
                backgroundColor: [
                    "#9c92ac",
                    "#f5b1aa",
                    "#8fd3f4",
                    "#c6e2e9",
                    "#e4c1f9",
                ],
                borderColor: "#c5c5c5",
                borderWidth: 2,
                hoverBackgroundColor: "#ff9a00",
            },
        ],
    });
    return (
        <div className="App">
            <Test data={testData} />
            <div style={{ width: 800 }}>
                <BarChart chartData={chartData} />
            </div>
        </div>
    );
}

export default App;
