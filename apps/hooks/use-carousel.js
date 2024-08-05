import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

export const useCarousel = ({ delay = 5000, ...opts } = {}) => {
	const [api, setApi] = React.useState(null);
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const plugins = [Autoplay({ delay: delay })];
	const options = {
		align: "center",
		loop: true,
		containScroll: "keepSnaps",
		draggable: false,
		...opts,
	};

	const handleSelect = (index) => {
		api.scrollTo(index);
	};

	React.useEffect(() => {
		if (!api) {
			return;
		}

		setSelectedIndex(api.selectedScrollSnap());

		api.on("select", () => {
			setSelectedIndex(api.selectedScrollSnap());
		});
	}, [api]);

	return {
		api,
		setApi,
		selectedIndex,
		plugins,
		options,
		handleSelect,
	};
};
