import * as React from "react";

export const useInfiniteMoving = (direction = "left", speed = "fast") => {
	const containerRef = React.useRef(null);
	const scrollerRef = React.useRef(null);
	const [start, setStart] = React.useState(false);

	React.useEffect(() => {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children);
			// biome-ignore lint/complexity/noForEach: <explanation>
			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true);
				scrollerRef.current.appendChild(duplicatedItem);
			});

			containerRef.current.style.setProperty(
				"--animation-direction",
				direction === "left" ? "forwards" : "reverse",
			);
			containerRef.current.style.setProperty(
				"--animation-duration",
				speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s",
			);
			setStart(true);
		}
	}, []);

	return { containerRef, scrollerRef, start };
};
