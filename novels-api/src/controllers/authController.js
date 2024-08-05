import vine, { errors } from "@vinejs/vine";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { sendMail } from "../Mailer/mail.services.js";
import {
	comparePassword,
	removeRefreshToken,
	signAccessToken,
	signRefreshToken,
	verifyRefreshToken,
} from "../jwt/index.js";
import { addToBlacklist } from "../jwt/services.js";
import {
	countOtpByEmail,
	createOtp,
	verifyOtp,
} from "../services/otp.services.js";
import {
	createUser,
	getUserByEmail,
	getUserById,
	updateUserById,
	verifyUserEmail,
} from "../services/user.services.js";
import generateOtp from "../utils/generateOtp.js";
import {
	loginSchema,
	registerSchema,
	resetPassSchema,
} from "../validations/auth.validation.js";
import { emailSchema, otpSchema } from "../validations/otp.validation.js";
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class AuthController {
	// [POST] /login
	static async login(req, res, next) {
		try {
			const body = req.body;
			const validator = vine.compile(loginSchema);
			const payload = await validator.validate(body);
			const findUser = await getUserByEmail(payload.email);
			if (findUser) {
				if (findUser.isBlocked) {
					return res.status(StatusCodes.FORBIDDEN).json({
						message: "Tai khoan cua ban da bi khoa.",
						ok: false,
						statusCode: StatusCodes.FORBIDDEN,
					});
				}
				const isMatch = await comparePassword(
					payload.password,
					findUser.password,
				);
				if (!isMatch) {
					return res.status(StatusCodes.UNAUTHORIZED).json({
						message: "Tai khoan hoac mat khau khong dung, hay thu lai.",
						ok: false,
						statusCode: StatusCodes.UNAUTHORIZED,
					});
				}

				const payloadData = {
					userId: findUser.id,
					role: findUser.role,
				};

				const accessToken = await signAccessToken(payloadData);
				const refreshToken = await signRefreshToken(payloadData);
				return res.status(StatusCodes.OK).json({
					access_token: `Bearer ${accessToken}`,
					refresh_token: `Bearer ${refreshToken}`,
					ok: true,
					statusCode: StatusCodes.OK,
				});
			}
			return res.status(StatusCodes.UNAUTHORIZED).json({
				message: "Tài khoản hoặc mật khẩu không đúng, vui lòng thử lại.",
				ok: false,
				statusCode: StatusCodes.UNAUTHORIZED,
			});
		} catch (error) {
			next(error);
		}
	}
	// [POST] /register
	static async register(req, res, next) {
		try {
			const body = req.body;
			// validate body
			const validator = vine.compile(registerSchema);
			const payload = await validator.validate(body);
			// check if user already exists
			const findUser = await getUserByEmail(payload.email);
			if (findUser) {
				return res.status(StatusCodes.CONFLICT).json({
					message: "Tài khoản đã tồn tại, vui lòng sử dụng email khác.",
					ok: false,
					statusCode: StatusCodes.CONFLICT,
				});
			}

			const salt = bcrypt.genSaltSync(10);
			payload.password = bcrypt.hashSync(payload.password, salt);

			await createUser(payload);
			return res.status(StatusCodes.CREATED).json({
				message: "Đăng ký tài khoản thành công.",
				ok: true,
				statusCode: StatusCodes.CREATED,
			});
		} catch (error) {
			next(error);
		}
	}
	// [POST] /refresh-token
	static async refreshToken(req, res, next) {
		try {
			const { refreshToken } = req.body;
			if (!refreshToken) {
				return res.status(StatusCodes.UNAUTHORIZED).json({
					message: "Khong tim thay refresh token.",
					ok: false,
					statusCode: StatusCodes.UNAUTHORIZED,
				});
			}
			const result = await verifyRefreshToken(refreshToken);
			if (!result) {
				return res.status(StatusCodes.UNAUTHORIZED).json({
					message: "Token het han hoac khong chinh xac.",
					ok: false,
					statusCode: StatusCodes.UNAUTHORIZED,
				});
			}
			const payload = {
				userId: result?.userId,
				role: result?.role,
			};
			const newAccessToken = await signAccessToken(payload);
			const newRefreshToken = await signRefreshToken(payload);
			return res.status(StatusCodes.OK).json({
				message: "Refresh token thanh cong.",
				access_token: `Bearer ${newAccessToken}`,
				refresh_token: `Bearer ${newRefreshToken}`,
				ok: true,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}
	// [DELETE] /logout
	static async logout(req, res, next) {
		try {
			const { refreshToken } = req.body;
			const accessToken = req.headers.authorization.split(" ")[1];

			if (!refreshToken) {
				return res.status(StatusCodes.UNAUTHORIZED).json({
					message: "Khong tim thay refresh token.",
					ok: false,
					statusCode: StatusCodes.UNAUTHORIZED,
				});
			}
			const { userId } = await verifyRefreshToken(refreshToken);
			// Xoá refresh token trong redis
			await removeRefreshToken(userId);
			// Thêm access token vào blacklist
			const result = await addToBlacklist(accessToken);
			if (!result) {
				return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
					message:
						"Yeu cau da het han hoac thoi gian tren may khong chinh xac.",
					ok: false,
					statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
				});
			}
			return res.status(StatusCodes.OK).json({
				message: "Dang xuat thanh cong.",
				ok: true,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}

	// [POST] /reset-password
	static async resetPassword(req, res, next) {
		try {
			const userId = req.user?.userId;
			const validator = vine.compile(resetPassSchema);
			const payload = await validator.validate(req.body);

			// check password
			const findUser = await getUserById(userId);
			// kiem tra mat khau hien tai
			const isMatch = await comparePassword(
				payload.password,
				findUser.password,
			);
			if (!isMatch) {
				return res.status(StatusCodes.UNAUTHORIZED).json({
					message: "Mat khau hien tai khong chinh xac.",
					ok: false,
					statusCode: StatusCodes.UNAUTHORIZED,
				});
			}

			const salt = bcrypt.genSaltSync(10);
			const newPass = bcrypt.hashSync(payload.newpassword, salt);
			// update password
			await updateUserById(userId, { password: newPass });
			return res.status(StatusCodes.OK).json({
				message: "Mat khau da duoc thay doi.",
				ok: true,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			if (error instanceof errors.E_VALIDATION_ERROR) {
				res.status(StatusCodes.BAD_REQUEST).json({
					message: error.messages,
					ok: false,
					statusCode: StatusCodes.BAD_REQUEST,
				});
			}
			next(error);
		}
	}

	// [POST] /send-otp
	static async sendOtp(req, res, next) {
		try {
			const { email } = req.body;
			// kiểm tra xem số lần gửi otp đã vượt quá 3 lần chưa
			const validator = vine.compile(emailSchema);
			const payload = await validator.validate({ email });
			const count = await countOtpByEmail(payload.email);
			if (count >= 3) {
				return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
					message: "Ban da gui qua 3 lan, vui long thu lai sau.",
					ok: false,
					statusCode: StatusCodes.TOO_MANY_REQUESTS,
				});
			}
			const otp = generateOtp();
			await createOtp({ email: payload.email, otp });
			await sendMail({
				to: payload.email,
				subject: "Huyền Thư Lâu: Mã OTP xác thực",
				text: `Mã OTP của bạn là: ${otp}`,
				html: htmlMail(otp),
			});
			return res.status(StatusCodes.OK).json({
				message: "Mã OTP đã được gửi đến email của bạn.",
				ok: true,
				statusCode: StatusCodes.OK,
			});
		} catch (error) {
			next(error);
		}
	}

	// [POST] /verify-otp
	static async verifyOtp(req, res, next) {
		try {
			const { email, otp } = req.body;

			const validator = vine.compile(otpSchema);
			const payload = await validator.validate({ email, otp });

			const isMatch = verifyOtp(payload);
			if (isMatch) {
				await verifyUserEmail(payload.email);
				return res.status(StatusCodes.OK).json({
					message: "Xác thực mã OTP thành công.",
					ok: true,
					statusCode: StatusCodes.OK,
				});
			}
			return res.status(StatusCodes.UNAUTHORIZED).json({
				message: "Mã OTP không chính xác.",
				ok: false,
				statusCode: StatusCodes.UNAUTHORIZED,
			});
		} catch (error) {
			next(error);
		}
	}
}

const htmlMail = (otp) => {
	return `
   <div style="font-family: Arial, sans-serif">
   <h1 style="color: #333; font-size: 24px; font-weight: 600; text-align: center">Huyền Thư Lâu</h1>

   <p style="text-align: center">
   Sử dụng mã OTP sau để xác thực tài khoản của bạn.
   </p>
   <p style="text-align: center">
   Mã OTP của bạn sẽ hết hạn sau 30 phút.
   </p>
   <p style="color: #333; font-size: 28px; font-weight: 400; text-align: center; padding: 50px 0;">${otp}</p>
   <p style="text-align: center; color: #B0B0B0;font-size: 14px">
   Nếu bạn không yêu cầu mã OTP này, vui lòng bỏ qua email này.
   </p>
   </div>
   `;
};
export default AuthController;
