"use client";

import { UserAvatar } from "@/components/account/user-avatar";
import { Icons } from "@/components/icons";
import { Link } from "@/components/primitives/link-button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/primitives/ui/card";
import { Separator } from "@/components/primitives/ui/separator";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/primitives/ui/tabs";
import { cls } from "@/utils/cn-classes";
import React from "react";

export function PersonalInf({ user }) {
	// {user.level.nextLevelPoints}
	// Kiểm tra xem nếu lv 0 thì hiển thị icon 1, nếu lên lv 20 thì hiển thị icon 2
	return (
		<Card
			className={cls(
				"w-72 my-6",
				"border-none shadow-none bg-gradient-to-b from-[#fffbf8] via-white to-white",
				"dark:from-[#1a1a1a] dark:via-[#1a1a1a] dark:to-[#1a1a1a] dark:text-white",
			)}
		>
			<CardHeader className="items-center pt-4 space-y-4">
				<UserAvatar
					src={user.avatar["300"]}
					alt="Wxs Dev"
					fallback="N"
					className="w-20 h-20"
				/>
				<CardTitle className="flex items-center justify-center space-x-2">
					<Link
						href={{
							pathname: `/user/${user.id}`,
							query: { prefix: user.prefix },
						}}
						className="text-foreground/90 hover:text-destructive"
					>
						{user.name} -【{user.level.name}】
					</Link>
				</CardTitle>
				<CardDescription className="px-6 text-xs text-center">
					Đạt Lv.{user.level.nextLevelPoints} danh hiệu "
					{user.level.nextLevelName}" với {user.level.points} điểm kinh nghiệm
				</CardDescription>
			</CardHeader>
			<CardContent className="pb-4">
				<div className="flex justify-center space-x-4">
					<span className="text-center">
						<CardDescription className="text-xs text-foreground/80">
							Tác phẩm
						</CardDescription>
						<CardTitle className="text-md text-foreground/90">
							{user.count.convertedNovels}
						</CardTitle>
					</span>
					<Separator orientation="vertical" className="h-8 mx-2" />
					<span className="text-center">
						<CardDescription className="text-xs text-foreground/80">
							Đề cử
						</CardDescription>
						<CardTitle className="text-md text-foreground/90">
							{user.count.votes}
						</CardTitle>
					</span>
					<Separator orientation="vertical" className="h-8 mx-2" />
					<span className="text-center">
						<CardDescription className="text-xs text-foreground/80">
							Yêu thích
						</CardDescription>
						<CardTitle className="text-md text-foreground/90">
							{user.count.likes}
						</CardTitle>
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
