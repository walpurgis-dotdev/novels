import { z } from "zod";

export const OTPSchema = z.object({
	otp: z.string().min(6, {
		message: "Vui lòng nhập mã OTP đủ 6 ký tự.",
	}),
});
