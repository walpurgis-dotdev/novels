import { useCallback, useState } from "react";
import { toast } from "sonner";

export function useCopyToClipboard() {
	const [state, setState] = useState(null);

	const copyToClipboard = useCallback((value) => {
		const handleCopy = async () => {
			try {
				if (navigator?.clipboard?.writeText) {
					await navigator.clipboard.writeText(value);
					setState(value);
				} else {
					toast.error("Trình duyệt không hỗ trợ sao chép vào clipboard");
				}
			} catch (e) {
				oldSchoolCopy(value);
				setState(value);
			}
		};

		handleCopy();
	}, []);

	return [state, copyToClipboard];
}
