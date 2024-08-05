"use client";
import { useEffect, useState } from "react";

export const useHydration = (store) => {
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		const unsubHydrate = store.persist.onHydrate(() => setHydrated(false));
		const unsubFinishHydration = store.persist.onFinishHydration(() =>
			setHydrated(true),
		);

		// Kiểm tra xem hydration đã hoàn tất chưa
		setHydrated(store.persist.hasHydrated());

		// Dọn dẹp khi unmount
		return () => {
			unsubHydrate();
			unsubFinishHydration();
		};
	}, [store]);

	return hydrated;
};
