import vine from "@vinejs/vine";

import { StatusCodes } from "http-status-codes";
import uploadImage from "../cloudinary/upload.services.js";
import {
	checkExist,
	createNovel,
	deleteNovelById,
	getLatestNovels,
	getNovelByIdAndConvertId,
	getNovelByIdOrSlug,
	publishNovel,
	updateNovel,
} from "../services/novel.services.js";
import NovelApiTransform from "../transform/NovelApiTransform.js";
import { ADMIN, MOD, SKIPLIMIT, coverSizes } from "../utils/constants.js";
import ensureArray from "../utils/ensureArray.js";
import { imageValidator } from "../utils/helper.js";
import resizeImage from "../utils/resizeImage.js";
import {
	checkNovelSchema,
	newNovelSchema,
	publishSchema,
	queryNovelSchema,
	updateNovelSchema,
	uploadCoverSchema,
} from "../validations/novel.validation.js";
import { idSchema } from "../validations/public.validation.js";
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class NovelController {
	// GET /novels?page=1&sort_by=new_chap_at&tag=1,3&genres=1,3&status=ONGOING&keyword=abc&props=CHATLUONGCAO

	// sort_by: sắp xếp theo thứ tự created_at/new_chap_at/view_week/view_month/view_all/review_count/review_score/favorite_count/flower_count/comment_count/chapter_count
	// tag: lọc theo tag (theo id)
	// genres: lọc theo thể loại (theo id)
	// status: lọc theo trạng thái ONGOING/COMPLETED/PAUSED
	// keyword: tìm kiếm theo tên
	// props: lọc theo thuộc tính CHATLUONGCAO/CHONLOC
	// const sort_by = req.query.sort_by;
	// const status = req.query.status;
	// const props = req.query.props;
	// const tags = req.query.tags;
	// const genre = req.query.genre;
	// const keyword = req.query.keyword;

	static async getNovels(req, res, next) {
		try {
			const query = req.query;
			if (query.tags) {
				query.tags = query.tags.split(",").map((tag) => Number(tag));
			}
			if (query.genres) {
				query.genres = query.genres.split(",").map((genre) => Number(genre));
			}
			const validator = vine.compile(queryNovelSchema);
			const payload = await validator.validate(query);
			// Math.max giúp tránh trường hợp page < 1

			const { novels, meta } = await getLatestNovels(
				SKIPLIMIT,
				payload.page,
				payload,
			);
			const transformedData = novels.map((novel) =>
				NovelApiTransform.transform(novel),
			);
			res.status(StatusCodes.OK).json({
				data: transformedData,
				meta,
				ok: true,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}
	// GET /novels/:idorslug
	static async getNovel(req, res, next) {
		try {
			const idOrSlug = req.params.idorslug;

			const validator = vine.compile(idSchema);
			const payload = await validator.validate({ id: idOrSlug });

			const data = await getNovelByIdOrSlug(payload.id);
			const transformedNovel = NovelApiTransform.transform(data);
			res.status(StatusCodes.OK).json({
				data: transformedNovel,
				ok: true,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}

	// POST /novels
	static async createNovel(req, res, next) {
		try {
			const body = req.body;
			const { userId } = req.user;
			body.tagIds = ensureArray(body.tagIds);
			const validator = vine.compile(newNovelSchema);
			const payload = await validator.validate(body);

			await createNovel({ ...payload, userId });
			res.status(StatusCodes.CREATED).json({
				message: "Đã tạo truyện thành công",
				ok: true,
				code: StatusCodes.CREATED,
			});
		} catch (error) {
			next(error);
		}
	}

	// GET /novels/:novelId/convert
	// lấy thông tin novel và chapter mới nhất
	static async convertNovel(req, res, next) {
		try {
			const { novelId } = req.params;
			const { userId } = req.user;

			const validator = vine.compile(idSchema);
			const payload = await validator.validate({ id: novelId });

			const novel = await getNovelByIdAndConvertId({
				novelId: payload.id,
				userId,
			});

			res.status(StatusCodes.OK).json({
				data: novel,
				ok: true,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}

	// POST /novels/check
	static async checkExist(req, res, next) {
		try {
			const body = req.body;
			const validator = vine.compile(checkNovelSchema);
			const payload = await validator.validate(body);
			const result = await checkExist(payload);
			if (result) {
				res.status(StatusCodes.OK).json({
					message: "Truyện đã tồn tại",
					ok: false,
					statusCode: StatusCodes.OK,
				});
			} else {
				res.status(StatusCodes.OK).json({
					message: "Truyện không tồn tại",
					ok: true,
					statusCode: StatusCodes.OK,
				});
			}
		} catch (error) {
			next(error);
		}
	}

	// PATCH /novels/:novelId/cover
	static async updateCover(req, res, next) {
		try {
			const { novelId } = req.params;
			const { userId } = req.user;
			const uploadResults = {};
			const validator = vine.compile(uploadCoverSchema);
			const payload = await validator.validate({
				novelId,
				userId,
			});
			if (!req.files || Object.keys(req.files).length === 0) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: "Không có file ảnh nào được tải lên.",
					ok: false,
					statusCode: StatusCodes.BAD_REQUEST,
				});
			}

			const coverImage = req.files.cover;
			const message = imageValidator(coverImage?.size, coverImage.mimetype);
			if (message !== null) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message,
					ok: false,
					statusCode: StatusCodes.BAD_REQUEST,
				});
			}

			// lấy thông tin để kiểm tra xem người upload có phải converter không và lấy slug
			const novel = await getNovelByIdAndConvertId(payload);

			// Tối ưu hình ảnh và upload lên cloudinary
			for (const size of coverSizes) {
				const resizedImage = await resizeImage(
					coverImage.data,
					size.width,
					size.height,
				);

				const uploadResult = await uploadImage({
					folder: `cover/${novel.slug}`,
					file: resizedImage,
					fileName: `${size.width}`,
				});

				uploadResults[uploadResult?.width] = uploadResult?.secure_url;
			}
			await updateNovel({
				novelId: payload.novelId,
				covers: uploadResults,
			});

			res.status(StatusCodes.OK).json({
				message: "Đã cập nhật ảnh bìa thành công",
				ok: true,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}

	// PUT /novels/:id
	static async update(req, res, next) {
		try {
			const novelId = req.params.id;
			const novelData = req.body;

			const validator = vine.compile(updateNovelSchema);
			const payload = await validator.validate({ novelId, ...novelData });

			const updatedComic = await updateNovel(payload);

			res.status(StatusCodes.OK).json({
				data: updatedComic,
				message: "Đã cập nhật truyện thành công",
				ok: true,
				code: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}

	// GET /novels/:id/publish
	static async publish(req, res, next) {
		try {
			const { novelId } = req.params;
			const { userId } = req.user;

			const validator = vine.compile(publishSchema);
			const payload = await validator.validate({ novelId, userId });

			await publishNovel(payload);

			res.status(StatusCodes.OK).json({
				message: "Đã xuất bản truyện thành công",
				ok: true,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}

	// DELETE /novels/:novelId
	static async delete(req, res, next) {
		try {
			const { novelId } = req.params;
			const { userId, role } = req.user;

			const validator = vine.compile(publishSchema);
			const payload = await validator.validate({
				novelId: novelId,
				userId: userId,
			});
			if (!(role === ADMIN || (await getNovelByIdAndConvertId(payload)))) {
				return res.status(StatusCodes.FORBIDDEN).json({
					message: "Bạn không có quyền xóa tiểu thuyết này",
					ok: false,
					statusCode: StatusCodes.FORBIDDEN,
				});
			}

			await deleteNovelById(payload.novelId);

			res.status(StatusCodes.OK).json({
				message: `Da xoa truyen voi ID: ${novelId} thanh cong`,
				ok: true,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}
}
export default NovelController;
