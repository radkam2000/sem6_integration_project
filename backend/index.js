require("dotenv").config();
const express = require("express");
const app = express();
const dataApiRouter = require("./routes/dataFromApi");
const dataDbRouter = require("./routes/dataFromDB");
const userRouter = require("./routes/user");
const authUser = require("./routes/auth");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const connection = require("./db");
connection();

app.get("/", (req, res) => {
	res.send("Aplikacja dziala");
});

app.use("/api/data_api", dataApiRouter);
app.use("/api/data_db", dataDbRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authUser);

app.listen(process.env.PORT, () => {
	console.log(`Serwer nasłuchuje na porcie ${process.env.PORT}`);
});
