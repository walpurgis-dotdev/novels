import { BACKEND_BASE_URL } from "@/utils/constants";

export const getNovelAnalytics = async ({ novelId, accessToken }) => {
	try {
		const res = await fetch(
			`${BACKEND_BASE_URL}/analytics?novelId=${novelId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);
		const data = await res.json();
		return data;
	} catch (error) {
		return { ok: false, message: error.message };
	}
};
