import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      message: "Email không được để trống",
    })
    .email({
      message: "Địa chỉ email không hợp lệ",
    }),
  password: z
    .string({
      message: "Mật khẩu không được để trống",
    })
    .min(8, {
      message: "Mật khẩu phải chứa ít nhất 8 ký tự",
    })
    .max(100),
});

export const registerSchema = z
  .object({
    name: z
      .string({
        message: "Tên không được để trống",
      })
      .min(3, {
        message: "Tên phải chứa ít nhất 3 ký tự",
      })
      .max(50, {
        message: "Tên không được quá 50 ký tự",
      })
      .regex(/^[^!@#$%())*&]+$/, {
        message: "Tên không được chứa ký tự đặc biệt",
      }),
    email: z.string({ message: "Địa chỉ email không được để trống" }).email({
      message: "Địa chỉ email không hợp lệ",
    }),
    password: z
      .string({
        message: "Mật khẩu không được để trống",
      })
      .min(8, {
        message: "Mật khẩu phải chứa ít nhất 8 ký tự",
      })
      .max(100),
    password_confirmation: z.string({
      message: "Mật khẩu không được để trống",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Mật khẩu không khớp",
    path: ["password_confirmation"],
  });
