"use client";

import { DataProvider } from "@/providers/data-provider";
import { TooltipProvider } from "@/providers/tooltip-provider";
import { useTokenStore } from "@/stores/use-user-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { UserProvider } from "./user-provider";

const queryClient = new QueryClient();
export function AppProvider({ token, children }) {
	const { setAccessToken } = useTokenStore();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (token) {
			setAccessToken(token);
		}
	}, [token]);

	return (
		<QueryClientProvider client={queryClient}>
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			<UserProvider>
				<DataProvider>
					<TooltipProvider>{children}</TooltipProvider>
				</DataProvider>
			</UserProvider>
		</QueryClientProvider>
	);
}
