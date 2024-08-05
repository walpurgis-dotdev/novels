"use client";

import { Button } from "@/components/primitives/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/primitives/ui/form";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/primitives/ui/input-otp";
import { handleLogOut, sendOTP, verifyOTP } from "@/services/auth.service";
import { useTokenStore } from "@/stores/use-user-store";
import hideEmail from "@/utils/hidden-email";
import { OTPSchema } from "@/validations/otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function VerifyOTPForm({ user }) {
	const [isSended, setIsSended] = useState(false);
	const { accessToken } = useTokenStore();
	const router = useRouter();
	const form = useForm({
		resolver: zodResolver(OTPSchema),
		defaultValues: {
			otp: "",
		},
	});
	const logOut = async () => {
		const isLoggedOut = await handleLogOut();
		if (isLoggedOut) {
			window.location.href = "/login";
		} else {
			toast.error("Đăng xuất thất bại!", {
				description: "Hãy thử xoá cache trình duyệt và thử lại.",
			});
		}
	};

	const sendOtp = useMutation({
		mutationFn: ({ email }) => sendOTP({ email, accessToken }),
		onError: (error) => {
			toast.error("Đã xảy ra lỗi khi gửi OTP.", {
				description: error.message,
			});
		},
		onSuccess: (data) => {
			if (data.ok) {
				toast.success("Đã gửi mã OTP thành công.");
			} else {
				toast.error("Đã xảy ra lỗi khi gửi OTP.", {
					description: data.message,
				});
			}
		},
	});

	const verifyOtp = useMutation({
		mutationFn: ({ otp }) =>
			verifyOTP({ email: user?.email, otp, accessToken }),
		onError: (error) => {
			toast.error("Đã xảy ra lỗi khi xác minh OTP.", {
				description: error.message,
			});
		},
		onSuccess: (data) => {
			if (data.ok) {
				toast.success("Đã xác minh OTP thành công.");
				router.push("/");
			} else {
				toast.error("Đã xảy ra lỗi khi xác minh OTP.", {
					description: data.message,
				});
			}
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(verifyOtp.mutate)}
				className="w-full space-y-6"
			>
				<FormField
					control={form.control}
					name="otp"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Vui lòng nhập mã OTP</FormLabel>
							<FormControl>
								<InputOTP maxLength={6} {...field}>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
								</InputOTP>
							</FormControl>
							<FormDescription>
								{user?.email && isSended ? (
									<span>
										Mã OTP gồm 6 chữ số đã được gửi đến{" "}
										<strong>{hideEmail(user.email)}</strong>
									</span>
								) : (
									<span>Nhấn vào nút "Gửi OTP" để nhận mã OTP</span>
								)}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex items-center justify-center space-x-2">
					{!isSended || sendOtp.isPending ? (
						<>
							<Button
								onClick={() => {
									logOut();
								}}
								variant="secondary"
							>
								Đăng xuất
							</Button>
							<Button
								disabled={sendOtp.isPending}
								onClick={() => {
									sendOtp.mutate({ email: user?.email });
									setIsSended(true);
								}}
							>
								Gửi OTP
							</Button>
						</>
					) : (
						<>
							<Button type="submit" disabled={verifyOtp.isPending}>
								Xác minh OTP
							</Button>
						</>
					)}
				</div>
			</form>
		</Form>
	);
}
