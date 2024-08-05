import { BACKEND_BASE_URL } from "@/utils/constants";
import { genHmacSignature } from "@/utils/gen-hmac-signature";
import { notFound } from "next/navigation";

export const getCommentByNovelId = async (novelId, parentId) => {
	try {
		const url = `${BACKEND_BASE_URL}/comments/${novelId}${
			parentId ? `?parentId=${parentId}` : ""
		}`;
		const res = await fetch(url);
		const result = await res.json();
		if (result.ok) {
			return result.data;
		}
		notFound();
	} catch (error) {
		return { ok: false, message: error.message };
	}
};

export const createComment = async ({ data, accessToken }) => {
	try {
		const res = await fetch(`${BACKEND_BASE_URL}/comments`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
				"x-hmac-sign": await genHmacSignature(data),
			},
			body: JSON.stringify(data),
		});
		const result = await res.json();
		return result;
	} catch (error) {
		return { ok: false, message: error.message };
	}
};

export const deleteComment = async ({ commentId, accessToken }) => {
	try {
		const res = await fetch(`${BACKEND_BASE_URL}/comments/${commentId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		});
		const result = await res.json();
		return result;
	} catch (error) {
		return { ok: false, message: error.message };
	}
};
