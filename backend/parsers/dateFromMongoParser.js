const dateFromMongoParser = (date) => {
	result = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
};

module.exports = dateFromMongoParser;
