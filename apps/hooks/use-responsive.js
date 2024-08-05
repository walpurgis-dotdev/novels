import * as React from "react";

export const useResponsive = ({
	initialMaxVisible,
	initialIsListOpen = false,
} = {}) => {
	const [isListOpen, setIsListOpen] = React.useState(initialIsListOpen);
	const [maxVisible, setMaxVisible] = React.useState(initialMaxVisible);
	const containerRef = React.useRef(null);

	React.useEffect(() => {
		const handleResize = () => {
			if (containerRef.current) {
				const { width } = containerRef.current.getBoundingClientRect();
				const maxVisible = Math.floor(width);
				setMaxVisible(maxVisible);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return { isListOpen, setIsListOpen, maxVisible, containerRef };
};
