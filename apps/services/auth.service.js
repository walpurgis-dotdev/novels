import { BACKEND_BASE_URL } from "@/utils/constants";
import { genHmacSignature } from "@/utils/gen-hmac-signature";
export const handleLogOut = async () => {
	try {
		const res = await fetch("/api/auth/logout", {
			method: "POST",
		});
		if (res.ok) {
			return true;
		}
		return false;
	} catch (error) {
		return false;
	}
};

export const sendOTP = async ({ email, accessToken }) => {
	try {
		const res = await fetch(`${BACKEND_BASE_URL}/auth/send-otp`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
				"x-hmac-sign": await genHmacSignature({ email }),
			},
			body: JSON.stringify({ email }),
		});
		const data = await res.json();
		return data;
	} catch (error) {
		return { ok: false, message: error.message };
	}
};

export const verifyOTP = async ({ email, otp, accessToken }) => {
	try {
		const res = await fetch(`${BACKEND_BASE_URL}/auth/verify-otp`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
				"x-hmac-sign": await genHmacSignature({
					email,
					otp,
				}),
			},
			body: JSON.stringify({ email, otp }),
		});
		const data = await res.json();
		return data;
	} catch (error) {
		return { ok: false, message: error.message };
	}
};
