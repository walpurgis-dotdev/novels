import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { StatusCodes } from "http-status-codes";
const authMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (authHeader === null || authHeader === undefined) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			message: "Ban chua dang nhap.",
			ok: false,
			statusCode: StatusCodes.UNAUTHORIZED,
		});
	}

	const token = authHeader.split(" ")[1];
	// verify token
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
		if (err) {
			return res.status(StatusCodes.FORBIDDEN).json({
				message: "Yeu cau da het han hoac thoi gian tren may khong chinh xac.",
				ok: false,
				statusCode: StatusCodes.FORBIDDEN,
			});
		}

		req.user = user;
		next();
	});
};

export default authMiddleware;
