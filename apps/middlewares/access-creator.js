import { NextResponse } from "next/server";

const ACCESSROLES = ["ADMIN", "MOD", "CREATOR"];
const ACCESSPERS = ["CREATE", "UPDATE", "DELETE"];
const CACHE = new Map();
const CACHE_EXPIRATION_SECONDS = 3600; // 1 giờ
const CACHE_CLEANUP_INTERVAL = 600000; // 10 phút (600000 milliseconds)

// Khởi tạo một cron job để quét và xóa các mục nhập đã hết hạn trong cache
setInterval(clearExpiredCacheEntries, CACHE_CLEANUP_INTERVAL);

export async function accessCreator(request) {
	const accessToken = request.cookies.get("access_token")?.value;
	if (!accessToken) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	const cacheKey = `${accessToken}`;
	const cachedData = CACHE.get(cacheKey);

	if (cachedData && !isExpired(cachedData)) {
		const { roles, permissions } = cachedData.data;
		if (hasAccess(roles, permissions, request)) {
			return NextResponse.next();
		}
		return NextResponse.redirect(new URL("/403", request.url));
	}

	try {
		const response = await fetch("http://localhost:3000/user/access-details", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (response.ok) {
			const data = await response.json();
			const { role, permissions } = data;

			const cacheEntry = {
				data: { role, permissions },
				expirationTime: Date.now() + CACHE_EXPIRATION_SECONDS * 1000,
			};

			CACHE.set(cacheKey, cacheEntry);

			if (hasAccess(role, permissions, request)) {
				return NextResponse.next();
			}
			return NextResponse.redirect(new URL("/upgrade", request.url));
		}
		return NextResponse.redirect(
			new URL(
				`/error?e=${encodeURIComponent(
					"Đã có lỗi hệ thống xảy ra, hãy thử lại.",
				)}`,
				request.url,
			),
		);
	} catch (error) {
		console.error("Khong the get quyen nguoi dung:", error);
		return NextResponse.redirect(
			new URL(
				`/error?e=${encodeURIComponent(
					"Đã có lỗi hệ thống xảy ra, hãy thử lại.",
				)}`,
				request.url,
			),
		);
	}
}

function hasAccess(role, permissions, request) {
	return (
		ACCESSROLES.includes(role) ||
		permissions.some((permission) => ACCESSPERS.includes(permission))
	);
}

function isExpired(cacheEntry) {
	return Date.now() > cacheEntry.expirationTime;
}

function clearExpiredCacheEntries() {
	for (const [key, cacheEntry] of CACHE.entries()) {
		if (isExpired(cacheEntry)) {
			CACHE.delete(key);
		}
	}
}
