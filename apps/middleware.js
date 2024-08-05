import { NextResponse } from "next/server";

import { accessCreator } from "./middlewares/access-creator";
import { checkTokenExpirationMiddleware } from "./middlewares/check-token-expiration-middleware";

const privatePaths = ["/me", "/novels", "/verify"];
const authPaths = ["/login", "/register"];
export async function middleware(request) {
  const { pathname } = request.nextUrl;
  // kiểm tra đã đăng nhập hay chưa
  const accessToken = request.cookies.get("access_token");
  if (privatePaths.some((path) => pathname.startsWith(path)) && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // Đăng nhập rồi thì không cho vào login/register nữa
  if (authPaths.some((path) => pathname.startsWith(path)) && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  const tokenCheckResult = await checkTokenExpirationMiddleware(request);
  if (tokenCheckResult instanceof NextResponse) {
    return tokenCheckResult;
  }

  // kiểm tra xem có quyền truy cập vào trang thêm truyện không
  // if (pathname.startsWith("/novels")) {
  // 	const accessCheckResult = await accessCreator(request);
  // 	if (accessCheckResult instanceof NextResponse) {
  // 		return accessCheckResult;
  // 	}
  // }

  if (pathname === "/about") {
    return NextResponse.rewrite(new URL("/chapter/35478134/13475713", request.nextUrl));
  }

  // (cookies and headers)
  const themePreference = request.cookies.get("theme");
  const response = NextResponse.next();
  if (!themePreference) {
    response.cookies.set("theme", "light");
  }
  response.headers.set("custom-header", "custom-value");

  return response;
}

export const config = {
  matcher: ["/((?!_next|api/auth).*)(.+)"],
};
