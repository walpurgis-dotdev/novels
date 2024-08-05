import * as z from "zod";

export const createChapter = z.object({
	title: z.string({
		message: "Tiêu đề không được để trống",
	}),
	content: z
		.string({
			message: "Nội dung không được để trống",
		})
		.min(200, {
			message: "Nội dung phải có ít nhất 200 ký tự",
		}),
	chapterNo: z.number({
		message: "Số chương không được để trống",
	}),
	textTranslate: z.string().optional(),
});
