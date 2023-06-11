const arrayParser = require("../parsers/toArrayParser");
const fs = require("fs").promises;
const convert = require("xml-js");

const XMLupload = async () => {
	data = await fs.readFile(`${__dirname}/../uploads/data`, "utf8");
	console.log(convert.xml2js);
};

const JSONupload = () => {};

module.exports = { XMLupload, JSONupload };
