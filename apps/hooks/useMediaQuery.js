import { useEffect, useState } from "react";

export function useMediaQuery(query) {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);
		const handleMediaChange = (e) => {
			setMatches(e.matches);
		};

		// Đăng ký sự kiện khi trạng thái media query thay đổi
		mediaQuery.addListener(handleMediaChange);

		// Kiểm tra trạng thái ban đầu
		setMatches(mediaQuery.matches);

		// Hủy đăng ký sự kiện khi component bị unmount
		return () => {
			mediaQuery.removeListener(handleMediaChange);
		};
	}, [query]);

	return matches;
}
