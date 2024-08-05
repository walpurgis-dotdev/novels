import vine from "@vinejs/vine";
import { StatusCodes } from "http-status-codes";
import uploadImage from "../cloudinary/upload.services.js";
import {
	getAccessDetails,
	getNovelsByUserId,
	getProfile,
	getUserById,
	getUserRole,
	updateUserById,
	upgradeRole,
} from "../services/user.services.js";
import DraftApiTransform from "../transform/DraftApiTransform.js";
import ProfileApiTransform from "../transform/ProfileApiTransform.js";
import UserApiTransform from "../transform/UserApiTransform.js";
import { avatarSizes } from "../utils/constants.js";
import { imageValidator } from "../utils/helper.js";
import resizeImage from "../utils/resizeImage.js";
import { queryNovelSchema } from "../validations/novel.validation.js";
import {
	userIdSchema,
	userSchema,
	validateUpgrade,
} from "../validations/user.validation.js";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class UserController {
	// GET /users/:userId
	static async getUserById(req, res, next) {
		try {
			const validator = vine.compile(userIdSchema);
			const payload = await validator.validate(req.params);
			const user = await getUserById(payload.userId);
			const userTransform = UserApiTransform.transform(user);
			return res.status(StatusCodes.OK).json({
				data: userTransform,
				ok: true,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}

	//  [GET] /users/me
	static async getUserInfo(req, res, next) {
		try {
			const userId = req.user?.userId;
			const me = await getProfile(userId);
			const userTransform = ProfileApiTransform.transform(me);
			return res.status(StatusCodes.OK).json({
				data: userTransform,
				ok: true,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}

	// GET /users/access-details
	static async getAccessDetails(req, res, next) {
		try {
			const { userId } = req.user;
			const user = await getAccessDetails(userId);
			return res.status(StatusCodes.OK).json({
				data: user,
				ok: true,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}

	// PUT /users/:id
	// dữ liệu birthday nên ở dạng ms timestamp
	static async update(req, res, next) {
		try {
			const { userId } = req.user;
			const body = req.body;

			const validator = vine.compile(userSchema);
			const payload = await validator.validate({ userId, ...body });
			const updatedUser = await updateUserById(payload.userId, {
				name: payload.name,
				prefix: payload.prefix,
				bio: payload.bio,
				birthday: payload.birthday,
			});
			const userTransform = ProfileApiTransform.transform(updatedUser);
			return res.status(StatusCodes.OK).json({
				data: userTransform,
				ok: true,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}

	// [PATCH] /users/avatar
	static async updateAvatar(req, res, next) {
		try {
			const { userId } = req.user;
			const uploadResults = {};
			if (!req.files || Object.keys(req.files).length === 0) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: "Không có file ảnh nào được tải lên.",
					ok: false,
					statusCode: StatusCodes.BAD_REQUEST,
				});
			}

			const avatar = req.files.avatar;
			const message = imageValidator(avatar?.size, avatar.mimetype);
			if (message !== null) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message,
					ok: false,
					statusCode: StatusCodes.BAD_REQUEST,
				});
			}
			// Tối ưu hình ảnh và upload lên cloudinary
			for (const size of avatarSizes) {
				const resizedImage = await resizeImage(avatar.data, size, size);

				const result = await uploadImage({
					folder: `avatar/${userId}`,
					file: resizedImage,
					fileName: `${size}`,
				});
				uploadResults[result?.width] = result?.secure_url;
			}
			// Cap nhat database
			const result = await updateUserById(userId, {
				avatar: uploadResults,
			});
			return res.json({
				message: "Cap nhat anh dai dien thanh cong.",
				ok: true,
				statusCode: StatusCodes.OK,
				data: result,
			});
		} catch (error) {
			next(error);
		}
	}

	// DELETE /users/:userId
	static async blockUser(req, res, next) {
		try {
			const { userId } = req.params;
			const validator = vine.compile(userIdSchema);
			const payload = await validator.validate({ userId });
			await updateUserById(payload.userId, {
				isBlocked: true,
			});
			return res.status(StatusCodes.OK).json({
				message: "Đã chặn người dùng thành công.",
				ok: true,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}

	// GET /users/novels
	// Lấy tất cả truyện mà user đã viết
	static async getNovels(req, res, next) {
		try {
			const { userId } = req.user;
			const query = req.query;
			const validator = vine.compile(queryNovelSchema);
			const payload = await validator.validate(query);
			const { novels, meta } = await getNovelsByUserId({
				userId,
				...payload,
			});
			const novelsTransform = DraftApiTransform.transform(novels);
			res.status(StatusCodes.OK).json({
				data: novelsTransform,
				meta,
				ok: true,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}

	// GET /users/upgrade
	static async upgrade(req, res, next) {
		const userId = req.user?.userId;
		try {
			const user = await getUserRole(userId);

			const errors = validateUpgrade(user);
			if (errors.length > 0) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: errors,
					ok: false,
					statusCode: StatusCodes.BAD_REQUEST,
				});
			}
			await upgradeRole(userId);
			return res.status(StatusCodes.OK).json({
				message: "Tài khoản của bạn đã trở thành CREATOR.",
				ok: true,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}
}
export default UserController;
