import {
	BACKEND_BASE_URL,
	accessTokenExpiresIn,
	refreshTokenExpiresIn,
} from "@/utils/constants";
import { genHmacSignature } from "@/utils/gen-hmac-signature";
import { NextResponse } from "next/server";

export async function checkTokenExpirationMiddleware(request) {
	const accessToken = request.cookies.get("access_token")?.value;
	const refreshToken = request.cookies.get("refresh_token")?.value;
	if (!accessToken && refreshToken) {
		const hmacSignature = await genHmacSignature({ refreshToken });
		const data = await fetch(`${BACKEND_BASE_URL}/auth/refresh-token`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-hmac-sign": hmacSignature,
			},
			body: JSON.stringify({ refreshToken }),
		}).then((res) => res.json());
		if (data?.ok) {
			const accessTokenValue = data?.access_token.split(" ")[1];
			const refreshTokenValue = data?.refresh_token.split(" ")[1];
			const expiresATDate = new Date(
				Date.now() + accessTokenExpiresIn * 1000,
			).toUTCString();
			const expiresRTDate = new Date(
				Date.now() + refreshTokenExpiresIn * 1000,
			).toUTCString();

			const response = NextResponse.next();

			response.cookies.set("access_token", accessTokenValue, {
				path: "/",
				httpOnly: true,
				expires: new Date(expiresATDate),
				sameSite: "lax",
				secure: true,
			});
			response.cookies.set("refresh_token", refreshTokenValue, {
				path: "/",
				httpOnly: true,
				expires: new Date(expiresRTDate),
				sameSite: "lax",
				secure: true,
			});

			return response;
		}
		// Xoá cookie
		const response = NextResponse.next();
		response.cookies.delete("access_token", { path: "/" });
		response.cookies.delete("refresh_token", { path: "/" });
		// Redirect về trang login
		const { pathname } = request.nextUrl;
		if (pathname !== "/login") {
			return NextResponse.redirect(new URL("/login", request.url));
		}
		return response;
	}
}
