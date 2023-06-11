const { validateCryptoData, CryptoData } = require("../models/CryptoData");
const getCryptoData = require("../apis/cryptoApi");
const parser = require("../parsers/humanReadableParser");

const addData = async () => {
	try {
		var { error } = validateCryptoData(req.body.crypto);
		if (error) {
			console.error(error);
			return { status: 409, message: error.details[0].message };
		}
		const crypto = await CryptoData.findOne({
			cryptoName: req.body.crypto.cryptoName,
		});
		if (crypto)
			return res.status(409).send({ message: "Data already exists" });
		data = await getCryptoData();
		data = parser.crypto(data);
		await new CryptoData({ ...req.body.crypto }).save();
	} catch (error) {
		throw error;
	}
};
