export const decodeUnicode = (str) => {
	return str.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => {
		return String.fromCharCode(Number.parseInt(grp, 16));
	});
};
