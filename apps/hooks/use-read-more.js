import * as React from "react";

export const useReadMore = (text = "", maxLength = 400) => {
	const [isReadMore, setIsReadMore] = React.useState(true);

	const toggleReadMore = () => {
		setIsReadMore(!isReadMore);
	};

	const resultString = isReadMore
		? text.slice(0, maxLength) + (text.length > maxLength ? "..." : "")
		: text;
	const isLongText = text.length > maxLength;

	return {
		isReadMore,
		toggleReadMore,
		resultString,
		isLongText,
	};
};
