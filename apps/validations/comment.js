import * as z from "zod";

export const createCommentSchema = z.object({
  content: z.string().nonempty("Nội dung vui lòng không được để trống !"),
});
