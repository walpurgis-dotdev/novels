"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/primitives/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/primitives/ui/form";
import { Input } from "@/components/primitives/ui/input";
import { BACKEND_BASE_URL } from "@/utils/constants";
import { registerSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterForm() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
			password_confirmation: "",
		},
	});
	async function onSubmit(data) {
		try {
			setIsLoading(true);
			const hmacSignature = await fetch("/api/auth/sign", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
				.then((res) => res.json())
				.then((res) => res.hmacSignature);
			const response = await fetch(`${BACKEND_BASE_URL}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-hmac-sign": hmacSignature,
				},
				body: JSON.stringify(data),
			});
			const responseData = await response.json();
			if (!response.ok) {
				toast.error("Đăng ký thất bại!", {
					description: responseData.message || "Vui lòng thử lại sau.",
				});
				return;
			}
			toast.info("Đăng ký thành công!", {
				description: "Chuyển hướng về trang đăng nhập...",
			});
			router.push("/login");
		} catch (error) {
			toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau.", {
				description: error.message || "Vui lòng thử lại sau.",
			});
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên hiển thị</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="Tuyết Sơn"
									autoCorrect="off"
									autoCapitalize="off"
									autoComplete="off"
									disabled={isLoading}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="username@htl.com"
									autoCorrect="off"
									autoCapitalize="off"
									autoComplete="off"
									disabled={isLoading}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mật khẩu</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="*********"
									autoCorrect="off"
									autoComplete="off"
									disabled={isLoading}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password_confirmation"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nhập lại mật khẩu</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="*********"
									autoCorrect="off"
									autoComplete="off"
									disabled={isLoading}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button disabled={isLoading} type="submit">
					{isLoading && (
						<Icons.loaderCircle className="w-4 h-4 mr-2 animate-spin" />
					)}
					Đăng ký
				</Button>
			</form>
		</Form>
	);
}
