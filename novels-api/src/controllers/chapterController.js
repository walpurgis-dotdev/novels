import vine from "@vinejs/vine";
import { StatusCodes } from "http-status-codes";
import {
	checkOwner,
	createChapter,
	deleteChapterById,
	getChapterById,
	getChapters,
	updateChapterById,
} from "../services/chapter.services.js";
import {
	createChapterRating,
	deleteChapterRating,
} from "../services/ratingChapter.services.js";
import {
	createReaction,
	deleteReactionById,
} from "../services/reaction.services.js";
import ChapterApiTransform from "../transform/ChapterApiTransform.js";
import {
	chapterRateSchema,
	chapterReactionSchema,
	deleteRateSchema,
	deleteReactionSchema,
	newChapterSchema,
	updateChapterSchema,
} from "../validations/chapter.validation.js";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class ChapterController {
	// GET /chapters?novelId=1
	static async getChapters(req, res, next) {
		try {
			const { novelId } = req.query;
			if (!novelId)
				return res.status(StatusCodes.BAD_REQUEST).json({
					message:
						"Yêu cầu đã hết hạn hoặc thời gian thay đổi. Vui lòng thử lại sau.",
					ok: false,
					statusCode: StatusCodes.BAD_REQUEST,
				});
			const chapters = await getChapters({ novelId });
			return res.status(StatusCodes.OK).json({
				ok: true,
				data: chapters,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}

	// GET /chapters/:chapterId
	static async getChapterById(req, res, next) {
		try {
			const { chapterId } = req.params;
			const userId = req.user?.userId || null;
			const { currentChapter, nextChapter, previousChapter } =
				await getChapterById({
					chapterId,
					userId,
				});
			const chapterTransform = ChapterApiTransform.transform({
				...currentChapter,
				nextChapter,
				previousChapter,
			});

			return res.status(StatusCodes.OK).json({
				ok: true,
				data: chapterTransform,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}

	// POST /chapters
	static async create(req, res, next) {
		try {
			const body = req.body;
			const { userId } = req.user;
			const validator = vine.compile(newChapterSchema);
			const payload = await validator.validate(body);
			// kiểm tra có phải là converter không
			if (!checkOwner({ userId, novelId: payload.novelId })) {
				return res.status(StatusCodes.FORBIDDEN).json({
					message: "Bạn không có quyền thêm chương vào truyện này",
					ok: false,
					statusCode: StatusCodes.FORBIDDEN,
				});
			}
			const chapter = await createChapter(payload);
			return res.status(StatusCodes.CREATED).json({
				ok: true,
				data: chapter,
				statusCode: StatusCodes.CREATED,
			});
		} catch (error) {
			next(error);
		}
	}
	// PUT /chapters/:chapterId
	static async update(req, res, next) {
		try {
			const { chapterId } = req.params;
			const body = req.body;

			const validator = vine.compile(updateChapterSchema);
			const payload = await validator.validate({ ...body, chapterId });

			const chapter = await updateChapterById(payload);

			return res.status(StatusCodes.OK).json({
				ok: true,
				data: chapter,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}
	// DELETE /chapters/:chapterId
	static async delete(req, res, next) {
		try {
			const { chapterId } = req.params;
			await deleteChapterById(chapterId);
			return res.status(StatusCodes.OK).json({
				message: "Da xoa chuong truyen thanh cong",
				ok: true,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}

	// POST /rate
	static async createRate(req, res, next) {
		try {
			const body = req.body;
			const { userId } = req.user;

			const validator = vine.compile(chapterRateSchema);
			const payload = await validator.validate({ ...body, userId });
			await createChapterRating(payload);
			return res.status(StatusCodes.CREATED).json({
				message: "Đã đánh giá truyện thành công.",
				ok: true,
				statusCode: StatusCodes.CREATED,
			});
		} catch (error) {
			next(error);
		}
	}
	// DELETE /rate/:rateId
	static async deleteRate(req, res, next) {
		try {
			const { userId } = req.user;
			const { rateId } = req.params;

			const validator = vine.compile(deleteRateSchema);
			const payload = await validator.validate({
				rateId: rateId,
				userId: userId,
			});

			await deleteChapterRating(payload);
			return res.status(StatusCodes.OK).json({
				message: "Đã xoá đánh giá thành công.",
				ok: true,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}
	// Nếu chưa từng reaction sẽ tạo mới, đã từng reaction sẽ update
	// POST /reaction
	static async createReaction(req, res, next) {
		try {
			const { type, chapterId } = req.body;
			const { userId } = req.user;

			const validator = vine.compile(chapterReactionSchema);
			const payload = await validator.validate({ userId, type, chapterId });

			await createReaction(payload);

			return res.status(StatusCodes.CREATED).json({
				message: `Đã dùng reaction ${type} thành công.`,
				ok: true,
				statusCode: StatusCodes.CREATED,
			});
		} catch (error) {
			next(error);
		}
	}
	// DELETE /reaction/:reactionId
	static async deleteReaction(req, res, next) {
		try {
			const { reactionId } = req.body;
			const { userId } = req.user;

			const validator = vine.compile(deleteReactionSchema);
			const payload = await validator.validate({
				reactionId: reactionId,
				userId: userId,
			});

			await deleteReactionById(payload.reactionId, payload.userId);

			return res.status(StatusCodes.OK).json({
				message: `Da xoa reaction ${reactionId} thanh cong`,
				ok: true,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}
}
export default ChapterController;
