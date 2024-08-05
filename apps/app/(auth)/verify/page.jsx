"use client";
import { VerifyOTPForm } from "@/components/forms/verify-otp-form";
import { Card, CardHeader, CardTitle } from "@/components/primitives/ui/card";
import { Spinner } from "@/components/primitives/ui/spinner";
import { Shell } from "@/components/wrappers/shell-variants";
import { useUserStore } from "@/stores/use-user-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
	const { isLoading, userInfo } = useUserStore();
	const router = useRouter();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (userInfo?.isVerified) {
			router.push("/");
		}
	}, [userInfo]);

	if (isLoading) {
		return (
			<Shell as="div" variant="centered">
				<Card className="border-none shadow-none rounded-xl">
					<CardHeader className="px-16 text-center">
						<div className="flex flex-col items-center justify-center space-y-4">
							<Spinner />
							<p>Đang truy vấn thông tin người dùng</p>
						</div>
					</CardHeader>
				</Card>
			</Shell>
		);
	}

	return (
		<Shell as="div" variant="centered">
			<Card className="border-none shadow-none rounded-xl">
				<CardHeader className="px-16 text-center">
					{!userInfo?.isVerified && (
						<>
							<CardTitle className="text-lg">
								Xác minh tài khoản của bạn
							</CardTitle>
							<VerifyOTPForm user={userInfo} />
						</>
					)}
				</CardHeader>
			</Card>
		</Shell>
	);
}
