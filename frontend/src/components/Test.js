import React, { useState } from "react";

function Test({ data }) {
    const size = Object.values(data).length;
    const [dates, setDates] = useState([]);
    const [prices, setPrices] = useState([]);
    for (var i = 0; i < size; i++) {
        dates.push(data[i][0]);
        prices.push(data[i][1]);
    }
    return (
        <div>
            <h1>Data: {data[0][0]}</h1>
            <h1>Data: {dates[0]}</h1>
            <h1>Cena: {data[0][1]}</h1>
            <h1>Cena: {prices[0]}</h1>
            <h2>Typeof data: {typeof data}</h2>
            <h2>Typeof data[0]: {typeof data[0]}</h2>
            <h2>Typeof data[0][0]: {typeof data[0][0]}</h2>
        </div>
    );
}
export default Test;
