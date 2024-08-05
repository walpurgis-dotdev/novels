import { BACKEND_BASE_URL } from "@/utils/constants";

const getAllGenres = async () => {
	try {
		const response = await fetch(`${BACKEND_BASE_URL}/genres`);
		const result = await response.json();
		return result;
	} catch (error) {
		return {
			ok: false,
			message: error.message || "Không thể lấy dữ liệu thể loại...",
		};
	}
};

export { getAllGenres };
