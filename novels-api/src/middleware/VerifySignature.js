import jwt from "jsonwebtoken";
import "dotenv/config";
import { StatusCodes } from "http-status-codes";

const verifySignature = (req, res, next) => {
	const sign = req.query.sign;
	const secret = process.env.JWT_SECRET;

	if (!sign) {
		return res.status(StatusCodes.FORBIDDEN).json({
			message: "Yêu cầu đã hết hạn hoặc thời gian trên máy không chính xác.",
			ok: false,
			statusCode: StatusCodes.FORBIDDEN,
		});
	}
	try {
		const decoded = jwt.verify(sign, secret);
		if (decoded.exp < Date.now() / 1000 || decoded.iss !== req?.path) {
			return res.status(StatusCodes.FORBIDDEN).json({
				message: "Yêu cầu đã hết hạn hoặc thời gian trên máy không chính xác.",
				ok: false,
				statusCode: StatusCodes.FORBIDDEN,
			});
		}
		next();
	} catch (error) {
		return res.status(StatusCodes.FORBIDDEN).json({
			message: "Yêu cầu đã hết hạn hoặc thời gian trên máy không chính xác.",
			ok: false,
			statusCode: StatusCodes.FORBIDDEN,
		});
	}
};

export default verifySignature;
