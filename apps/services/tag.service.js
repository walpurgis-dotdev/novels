import { BACKEND_BASE_URL } from "@/utils/constants";

const getAllTags = async () => {
	try {
		const response = await fetch(`${BACKEND_BASE_URL}/tags`);
		const result = await response.json();
		return result;
	} catch (error) {
		return {
			ok: false,
			message: error.message || "Không thể lấy dữ liệu tags...",
		};
	}
};

export { getAllTags };
