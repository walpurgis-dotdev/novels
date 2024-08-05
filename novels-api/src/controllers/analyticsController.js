import { StatusCodes } from "http-status-codes";
import { analyticNovel } from "../services/analytic.services.js";
import AnalyticApiTransform from "../transform/AnalyticApiTransform.js";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class AnalyticsController {
	static async getAnaltics(req, res, next) {
		try {
			const { novelId } = req.query;
			if (!novelId) {
				return res.status(StatusCodes.FORBIDDEN).json({
					message:
						"Yeu cau da het han hoac thoi gian tren may khong chinh xac.",
					ok: false,
					statusCode: StatusCodes.FORBIDDEN,
				});
			}
			const result = await analyticNovel(novelId);
			const hasData = result[1].id;
			if (!hasData) {
				return res.status(StatusCodes.NOT_FOUND).json({
					ok: false,
					statusCode: StatusCodes.NOT_FOUND,
					message: "Không tìm thấy dữ liệu.",
				});
			}
			const dataTransform = AnalyticApiTransform.transform(result);
			return res.status(StatusCodes.OK).json({
				ok: true,
				statusCode: StatusCodes.OK,
				data: dataTransform,
			});
		} catch (error) {
			next(error);
		}
	}
}

export default AnalyticsController;
