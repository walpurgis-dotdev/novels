"use client";

import { Icons } from "@/components/icons";
import { ChapterNav } from "@/components/navigation/navs/chapter-nav";
import { Link } from "@/components/primitives/link-button";
import { Button } from "@/components/primitives/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/primitives/ui/card";
import { Separator } from "@/components/primitives/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/primitives/ui/tooltip";
import { Shell } from "@/components/wrappers/shell-variants";
import { useOptionalControlStore } from "@/stores/use-optional-control-store";
import { cls } from "@/utils/cn-classes";
import { Bookmark } from "lucide-react";
import * as React from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TextContent } from "../_comps/text-content";
import { ChapterInf } from "../chapter-inf";
import { NovelInf } from "../novel-inf";

export function SubMain({ chapter, handleClick }) {
	const { previousChapter, nextChapter } = chapter;
	const { options } = useOptionalControlStore();
	const router = useRouter();

	const handleKeyDown = React.useCallback(
		(e) => {
			const keyActions = {
				ArrowLeft: () => {
					if (!previousChapter) {
						toast.warning("Đã là chương đầu tiên");
						return;
					}
					router.push(
						`/novel/${chapter?.novel?.slug}/chapter-${chapter?.chapterNo - 1}-${
							previousChapter?.id
						}`,
					);
				},
				ArrowRight: () => {
					if (!nextChapter) {
						toast.warning("Đã là chương cuối cùng");
						return;
					}
					router.push(
						`/novel/${chapter?.novel?.slug}/chapter-${chapter?.chapterNo + 1}-${
							nextChapter?.id
						}`,
					);
				},
				" ": () => {
					console.log("Scroll down");
				},
			};

			const action = keyActions[e.key];
			if (action) {
				action();
			}
		},
		[chapter, previousChapter, nextChapter, router],
	);

	React.useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	return (
		<Shell
			className={cls(
				"relative gap-0 p-0 md:p-0 mx-auto w-full rounded-xl",
				options.fontFamilySchema.fontFamily,
				options.themeColorSchema.accentColor,
				options.maxWidthSchema.maxWidth,
			)}
		>
			<nav
				className={cls(
					"sticky top-0 z-[2] mb-2",
					options.themeColorSchema.accentColor,
				)}
			>
				<ChapterNav />
				<Separator />
			</nav>
			<div className="relative min-h-screen z-[1] divide-y">
				{/* Book Details */}
				{chapter.chapterNo === 1 && (
					<section className="grid items-center w-[inherit] p-6">
						<NovelInf item={chapter} />
					</section>
				)}
				<section className="relative grid items-center w-[inherit] p-0 py-4 md:p-6">
					{/* BookMark */}
					<div className="absolute top-0 cursor-pointer right-20">
						<Tooltip>
							<TooltipTrigger asChild>
								<Bookmark size={24} className="text-muted-foreground" />
							</TooltipTrigger>
							<TooltipContent>
								<p>Add to library</p>
							</TooltipContent>
						</Tooltip>
					</div>
					{/* Content */}
					<Card className="bg-transparent border-none shadow-none">
						<ChapterInf item={chapter} />
						<div className="border-t border-dashed border-foreground/20" />
						<TextContent item={chapter.content} handleClick={handleClick} />
					</Card>
					{/* Control Buttons */}
					<Card className="bg-transparent shadow-none">
						<CardHeader className="flex-row items-center space-x-3 space-y-0">
							<div className="flex-1">
								{previousChapter ? (
									<Link
										href={`/novel/${chapter?.novel?.slug}/chapter-${
											chapter?.chapterNo - 1
										}-${previousChapter?.id}`}
										size="lg"
										variant="outline"
										aria-label="Chương trước"
										className="w-full rounded-2xl"
									>
										Chương trước
									</Link>
								) : (
									<Button
										variant="outline"
										size="lg"
										className="w-full rounded-2xl"
										disabled={true}
									>
										Đã hết chương
									</Button>
								)}
							</div>
							<div className="flex-1">
								<Button
									variant="outline"
									size="lg"
									className="w-full rounded-2xl"
								>
									Thư mục
								</Button>
							</div>
							<div className="flex-1">
								{nextChapter ? (
									<Link
										href={`/novel/${chapter?.novel?.slug}/chapter-${
											chapter?.chapterNo + 1
										}-${nextChapter?.id}`}
										size="lg"
										variant="outline"
										aria-label="Chương tiếp theo"
										className="w-full rounded-2xl"
									>
										Chương tiếp theo
									</Link>
								) : (
									<Button
										variant="outline"
										size="lg"
										className="w-full rounded-2xl"
										disabled={true}
									>
										Đã hết chương
									</Button>
								)}
							</div>
						</CardHeader>
						<CardContent>
							<CardDescription className="text-center">
								Nhấn "Nút bàn phím trái ←" để quay lại chương trước Nhấn "Nút
								bàn phím phải→" để vào chương tiếp theo Nhấn "Space Bar" để cuộn
								xuống
							</CardDescription>
						</CardContent>
					</Card>
				</section>
			</div>
		</Shell>
	);
}
