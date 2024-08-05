"use client";

import { Spinner } from "@/components/primitives/ui/spinner";
import { getProfile } from "@/services/user.service";
import { useTokenStore, useUserStore } from "@/stores/use-user-store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

export function UserProvider({ children }) {
	const { setUserInfo, setIsLoading } = useUserStore();
	const { accessToken } = useTokenStore();
	const router = useRouter();
	const { isPending, error, isError, isLoading } = useQuery({
		queryKey: ["getProfile", { accessToken }],
		queryFn: async ({ queryKey }) => {
			const [, { accessToken }] = queryKey;
			const data = await getProfile(accessToken);
			const userData = data?.data;
			setUserInfo(userData);
			if (!userData?.isVerified) {
				router.push("/verify");
			}
			return userData;
		},
		enabled: !!accessToken,
		refetchOnWindowFocus: false,
	});

	React.useEffect(() => {
		setIsLoading(isLoading);
	}, [isLoading, setIsLoading]);

	if (isError) {
		toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau", {
			description: error.message,
		});
		router.push("/login");
	}
	return <>{children}</>;
}
