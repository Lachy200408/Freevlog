const util = {
	arrayToJson : (array) => {
		return (array.length === 1)? array[0] : array[0] + util.arrayToJson(util._shift(array));
	},

	_shift : (array) => {
		array.shift();
		return array;
	},
};

module.exports = util;