const capitalizeFirstLetter = (str) => {
	const words = str.split(" ");
	const result = words.map((word) => {
		return word.replace(word[0], word[0].toUpperCase());
	});
	return result.join(" ");
};

export default capitalizeFirstLetter;
