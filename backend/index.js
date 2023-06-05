require("dotenv").config();
const express = require("express");
const app = express();
const dataApi = require("./routes/dataFromApi");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("Aplikacja dziala");
});

app.use("/api/dataApi", dataApi);

app.listen(process.env.PORT, () => {
	console.log(`Serwer nasłuchuje na porcie ${process.env.PORT}`);
});
