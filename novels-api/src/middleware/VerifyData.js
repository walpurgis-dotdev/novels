import { createHmac } from "crypto";
import { StatusCodes } from "http-status-codes";
import "dotenv/config";

const VerifyDataMiddleware = (req, res, next) => {
	const signature = req.headers["x-hmac-sign"];
	const body = req.body;
	const secret = process.env.HMAC_SECRET;
	if (!body || Object.keys(body).length === 0) {
		return next();
	}
	const hash = createHmac("sha256", secret)
		.update(JSON.stringify(body))
		.digest("hex");
	if (hash !== signature) {
		return res.status(StatusCodes.FORBIDDEN).json({
			message: "Yêu cầu đã hết hạn hoặc thời gian trên máy không chính xác.",
			ok: false,
			statusCode: StatusCodes.FORBIDDEN,
		});
	}
	next();
};

export default VerifyDataMiddleware;
