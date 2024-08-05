"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/primitives/ui/avatar";
import { Button } from "@/components/primitives/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/primitives/ui/dropdown-menu";
import { handleLogOut } from "@/services/auth.service";
import { useUserStore } from "@/stores/use-user-store";
import Image from "next/image";
import { toast } from "sonner";

import { Link } from "../primitives/link-button";

export function UserNav() {
	const { userInfo, isLoading } = useUserStore();
	const avatarUrls = userInfo?.avatar;

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

	return isLoading ? (
		<Image src="/loading.svg" alt="Loading" width={28} height={28} />
	) : userInfo ? (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative w-8 h-8 rounded-full">
					<Avatar className="w-8 h-8">
						<AvatarImage src={avatarUrls?.[60]} alt={userInfo?.name} />
						<AvatarFallback>{userInfo?.name}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{userInfo?.name}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{userInfo?.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Billing
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Settings
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>New Team</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => logOut()}>
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	) : (
		<Link href="/login">Đăng nhập</Link>
	);
}
