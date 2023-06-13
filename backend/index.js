require("dotenv").config();
const express = require("express");
const app = express();
const generalRouter = require("./routes/general");
const dataDbRouter = require("./routes/dbOperations");
const userRouter = require("./routes/user");
const authUser = require("./routes/auth");
const downloadRouter = require("./routes/downloads");
const uploadRouter = require("./routes/uploads");
const cors = require("cors");
const jwt_auth = require("./middleware/jwt_auth");

app.use(express.json());
app.use(cors());

const connection = require("./db");
connection();

app.get("/", (req, res) => {
	res.send("Aplikacja dziala");
});

app.use("/api/auth", authUser);
app.get("/api/user/", jwt_auth);
app.delete("/api/user/", jwt_auth);
app.post("/api/user/password", jwt_auth);
app.use("/api/user", userRouter);

app.use(jwt_auth);
app.use("/api/general", generalRouter);
app.use("/api/data_db", dataDbRouter);
app.use("/api/download", downloadRouter);
app.use("/api/upload", uploadRouter);

app.use((err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		res.status(500).send({ message: "Upload file error occured" });
	} else if (err) {
		next(err);
	}
});

app.listen(process.env.PORT, () => {
	console.log(`Serwer nasłuchuje na porcie ${process.env.PORT}`);
});
