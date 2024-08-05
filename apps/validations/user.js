import * as z from "zod";

export const profileSchema = z.object({
  avatar: z.string().nonempty({
    message: "This field is required",
  }),
  name: z.string().nonempty({
    message: "This field is required",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  prefix: z.string().nonempty({
    message: "This field is required",
  }),
  bio: z.string().max(100, {
    message: "The bio must not exceed 100 characters",
  }),
});
