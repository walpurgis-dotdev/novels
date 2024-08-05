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
import { loginSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function LoginForm() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	async function onSubmit(data) {
		try {
			setIsLoading(true);
			const loginResponse = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}).then((res) => res.json());
			if (!loginResponse.ok) {
				console.log(loginResponse);
				toast.error("Đăng nhập thất bại!", {
					description: loginResponse.message || "Vui lòng thử lại sau.",
				});
			} else {
				toast.info("Đăng nhập thành công!", {
					description: "Chuyển hướng về trang chủ...",
				});
				router.push("/");
				router.refresh();
			}
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
				<Button disabled={isLoading} type="submit">
					{isLoading && (
						<Icons.loaderCircle className="w-4 h-4 mr-2 animate-spin" />
					)}
					Đăng nhập
				</Button>
			</form>
		</Form>
	);
}
