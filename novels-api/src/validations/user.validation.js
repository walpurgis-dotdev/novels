import vine, { SimpleMessagesProvider } from "@vinejs/vine";
import {
	CustomErrorReporter,
	customErrorMessage,
} from "./CustomErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();
vine.messagesProvider = new SimpleMessagesProvider(customErrorMessage);

export const userIdSchema = vine.object({
	userId: vine.string().trim(),
});

export const userSchema = vine.object({
	userId: vine.string().trim(),
	name: vine
		.string()
		.minLength(3)
		.maxLength(50)
		.regex(/^[^!@#$%())*&]+$/)
		.trim()
		.optional(),
	prefix: vine.string().minLength(1).maxLength(30).trim().optional(),
	bio: vine.string().trim().optional(),
	birthday: vine
		.date({
			formats: ["DD/MM/YYYY", "DD-MM-YYYY", "x"],
		})
		.optional(),
});
export const validateUpgrade = (user = {}) => {
	const currentDate = new Date();
	const userCreatedAt = new Date(user.createdAt);
	const oneMonth = 1000 * 60 * 60 * 24 * 30;
	const errors = [];
	if (user.role !== "USER") {
		errors.push("Chỉ người dùng mới có thể nâng cấp tài khoản.");
	}
	if (currentDate - userCreatedAt < oneMonth) {
		errors.push(
			"Tài khoản của bạn phải có ít nhất một tháng tuổi mới có thể nâng cấp.",
		);
	}
	if (!user.isVerified) {
		errors.push("Tài khoản của bạn chưa được xác minh.");
	}
	return errors;
};
