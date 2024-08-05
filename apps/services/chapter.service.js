import { BACKEND_BASE_URL } from "@/utils/constants";
import { decodeUnicode } from "@/utils/decode-unicode";
import { genHmacSignature } from "@/utils/gen-hmac-signature";

export async function getChapterByNovelId(novelId) {
	try {
		const res = await fetch(`${BACKEND_BASE_URL}/chapters?novelId=${novelId}`);
		const result = await res.json();
		if (result.ok) {
			return result.data;
		}
		return { ok: false, error: result.error };
	} catch (error) {
		return { ok: false, error: result.error };
	}
}

export async function addChapter({
	novelId,
	title,
	content,
	chapterNo,
	accessToken,
}) {
	try {
		const data = {
			novelId,
			title,
			content,
			chapterNo,
		};
		const res = await fetch(`${BACKEND_BASE_URL}/chapters`, {
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
		return { ok: false, error: error.message };
	}
}

export async function translateChapter({ from, data }) {
	switch (from) {
		case "dichnhanh":
			return await translateChapterDichNhanh(data);
		// case "vietphrase":
		// 	return await translateChapterVietPhrase(data);
		// case "Bot":
		// 	return await translateChapterBot(data);
		default:
			return await translateChapterDichNhanh(data);
	}
}

export async function translateChapterDichNhanh(content) {
	try {
		const data = new TextEncoder().encode(
			`type=Ancient&enable_analyze=1&enable_fanfic=0&mode=qt&text=${content}&remove=`,
		);
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Content-Length": data.length,
			},
			body: data,
		};
		const res = await fetch("https://api.dichnhanh.com", options);
		const responseBody = await res.text();
		const decodedResponse = decodeUnicode(responseBody);
		const textOnly = decodedResponse.replace(/<.*?>/g, "");
		const rsContent = JSON.parse(textOnly)?.data?.content;
		return rsContent;
	} catch (error) {
		return null;
	}
}
