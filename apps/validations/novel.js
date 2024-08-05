import * as z from "zod";

export const checkExistNovelSchema = z.object({
	originalName: z.string().min(1, {
		message: "Tên tác phẩm không được để trống",
	}),
	originalLink: z.string().url({
		message: "Link tác phẩm không hợp lệ",
	}),
});

export const createNovelSchema = z
	.object({
		originalName: z.string().min(1, {
			message: "Tên tác phẩm không được để trống",
		}),
		originalLink: z.string().url({
			message: "Link tác phẩm không hợp lệ",
		}),
		title: z.string().min(1, {
			message: "Tên tác phẩm không được để trống",
		}),
		description: z.string().min(1, {
			message: "Mô tả không được để trống",
		}),
		genreId: z.string().min(1, {
			message: "Thể loại không được để trống",
		}),
		worldTagIds: z.array(z.number()).min(1, {
			message: "Bạn phải chọn ít nhất 1 tag cho bối cảnh thế giới",
		}),
		charTagIds: z.array(z.number()).min(1, {
			message: "Bạn phải chọn ít nhất 1 tag cho tính cách nhân vật",
		}),
		sightTagIds: z.string().min(1, {
			message: "góc nhìn không được để trống",
		}),
		facTagIds: z.array(z.number()).min(1, {
			message: "Bạn phải chọn ít nhất 1 tag cho hệ phái",
		}),
		authorName: z.string().min(1, {
			message: "Tên tác giả không được để trống",
		}),
		authorOriginalName: z.string().min(1, {
			message: "Tên tác giả gốc không được để trống",
		}),
	})
	.transform((data) => {
		const sightTagNumber = Number.parseInt(data.sightTagIds, 10);
		const newdata = {
			...data,
			tagIds: [
				...data.worldTagIds,
				...data.charTagIds,
				...data.facTagIds,
				!Number.isNaN(sightTagNumber) ? sightTagNumber : undefined,
			].filter((tagId) => tagId !== undefined),
		};

		// biome-ignore lint/performance/noDelete: <explanation>
		delete newdata.worldTagIds;
		// biome-ignore lint/performance/noDelete: <explanation>
		delete newdata.charTagIds;
		// biome-ignore lint/performance/noDelete: <explanation>
		delete newdata.facTagIds;
		// biome-ignore lint/performance/noDelete: <explanation>
		delete newdata.sightTagIds;
		return newdata;
	});

export const updateNovelSchema = z.object({
	title: z
		.string()
		.min(1, {
			message: "Tên tác phẩm không được để trống",
		})
		.optional(),
	description: z
		.string()
		.min(1, {
			message: "Mô tả không được để trống",
		})
		.optional(),
	genreId: z
		.string()
		.min(1, {
			message: "Thể loại không được để trống",
		})
		.optional(),
	authorName: z
		.string()
		.min(2, {
			message: "Tên tác giả ít nhất 2 ký tự",
		})
		.optional(),
	tagIds: z
		.array(z.number())
		.min(3, {
			message: "Bạn phải chọn ít nhất 3 tag",
		})
		.optional(),
});
